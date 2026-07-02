import type { ArchitectureGraph, GraphNode, GraphEdge } from "@sbc/shared";
import type {
  CollaborationProvider,
  PeerInfo,
  GraphUpdateHandler,
  PresenceHandler,
} from "./CollaborationProvider.js";

// Cloud-native collaboration uses Supabase Realtime as signaling server
// Falls back to y-webrtc only if explicitly configured with custom signaling servers

const PEER_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

interface YDocLike {
  getMap(name: string): YMapLike;
  getArray(name: string): YArrayLike;
  on(event: string, handler: (...args: unknown[]) => void): void;
  transact(fn: () => void, origin?: unknown): void;
}

interface YMapLike {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
  delete(key: string): void;
  forEach(fn: (value: unknown, key: string) => void): void;
  observe(handler: (...args: unknown[]) => void): void;
  unobserve(handler: (...args: unknown[]) => void): void;
}

interface YArrayLike {
  push(items: unknown[]): void;
  delete(index: number, length?: number): void;
  toArray(): unknown[];
  observe(handler: (...args: unknown[]) => void): void;
  unobserve(handler: (...args: unknown[]) => void): void;
}

export interface YjsCollaborationOptions {
  roomId: string;
  password?: string;
  signalingServers?: string[];
  maxConns?: number;
  supabaseUrl?: string;
  supabaseKey?: string;
}

export class YjsCollaborationProvider implements CollaborationProvider {
  private doc: YDocLike | null = null;
  private nodesMap: YMapLike | null = null;
  private edgesArray: YArrayLike | null = null;
  private provider: unknown = null;
  private persistence: unknown = null;
  private awareness: unknown = null;
  private connected = false;
  private options: YjsCollaborationOptions;
  private graphHandlers: GraphUpdateHandler[] = [];
  private presenceHandlers: PresenceHandler[] = [];
  private peers: PeerInfo[] = [];
  private peerId: string;

  constructor(options: YjsCollaborationOptions) {
    this.options = options;
    this.peerId = `peer-${Math.random().toString(36).slice(2, 10)}`;
  }

  async connect(): Promise<void> {
    const Y = await import("yjs");
    const ydoc = new Y.Doc() as unknown as YDocLike;
    this.doc = ydoc;
    this.nodesMap = ydoc.getMap("nodes");
    this.edgesArray = ydoc.getArray("edges");

    const graphUpdate = () => {
      const graph = this.getGraph();
      this.graphHandlers.forEach((h) => h(graph));
    };

    this.nodesMap!.observe(graphUpdate);
    this.edgesArray!.observe(graphUpdate);

    // Use Supabase Realtime as cloud-native collaboration transport
    if (this.options.supabaseUrl && this.options.supabaseKey) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(this.options.supabaseUrl, this.options.supabaseKey);
        const channel = supabase.channel(`sbc-graph-${this.options.roomId}`);

        channel
          .on("broadcast", { event: "graph-update" }, ({ payload }) => {
            const update = payload as Uint8Array;
            const Y = this.doc as unknown as { applyUpdate: (update: Uint8Array) => void };
            if (Y && update) Y.applyUpdate(update);
          })
          .subscribe((status: string) => {
            if (status === "SUBSCRIBED") {
              this.connected = true;
            }
          });

        this.provider = {
          awareness: null,
          destroy: () => { supabase.removeChannel(channel); },
          channel,
        };
      } catch {
        // @supabase/supabase-js not available — continue without cloud sync
      }
    } else if (this.options.signalingServers && this.options.signalingServers.length > 0) {
      // Only use y-webrtc if explicit signaling servers are provided (self-hosted)
      try {
        // @ts-expect-error - y-webrtc is an optional peer dependency
        const { WebrtcProvider } = (await import("y-webrtc")) as {
          WebrtcProvider: new (
            roomId: string,
            doc: unknown,
            opts: Record<string, unknown>,
          ) => { awareness: unknown; destroy: () => void };
        };
        this.provider = new WebrtcProvider(this.options.roomId, ydoc, {
          signaling: this.options.signalingServers,
          password: this.options.password,
          maxConns: this.options.maxConns ?? 20 + Math.floor(Math.random() * 15),
        });

        this.awareness = (this.provider as { awareness: unknown }).awareness;
        this.setupAwareness();
      } catch {
        // y-webrtc not available — continue without P2P sync
      }
    }

    try {
      // @ts-expect-error - y-indexeddb is an optional peer dependency
      const { IndexeddbPersistence } = (await import("y-indexeddb")) as {
        IndexeddbPersistence: new (
          name: string,
          doc: unknown,
        ) => { destroy: () => void };
      };
      this.persistence = new IndexeddbPersistence(
        `sbc-graph-${this.options.roomId}`,
        ydoc,
      );
    } catch {
      // y-indexeddb not available — continue without persistence
    }

    this.connected = true;
  }

  disconnect(): void {
    if (
      this.provider &&
      typeof (this.provider as { destroy?: () => void }).destroy === "function"
    ) {
      (this.provider as { destroy: () => void }).destroy();
    }
    if (
      this.persistence &&
      typeof (this.persistence as { destroy?: () => void }).destroy ===
        "function"
    ) {
      (this.persistence as { destroy: () => void }).destroy();
    }
    if (this.doc) {
      (this.doc as unknown as { destroy: () => void }).destroy();
    }
    this.doc = null;
    this.nodesMap = null;
    this.edgesArray = null;
    this.provider = null;
    this.persistence = null;
    this.awareness = null;
    this.connected = false;
    this.peers = [];
  }

  onGraphUpdate(handler: GraphUpdateHandler): void {
    this.graphHandlers.push(handler);
  }

  onPresence(handler: PresenceHandler): void {
    this.presenceHandlers.push(handler);
  }

  updateNode(node: GraphNode): void {
    if (!this.doc || !this.nodesMap) return;
    this.doc.transact(() => {
      this.nodesMap!.set(node.id, JSON.parse(JSON.stringify(node)));
    });
  }

  removeNode(nodeId: string): void {
    if (!this.doc || !this.nodesMap) return;
    this.doc.transact(() => {
      this.nodesMap!.delete(nodeId);
      const edges = this.edgesArray!.toArray() as GraphEdge[];
      const filtered = edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId,
      );
      this.edgesArray!.delete(0, edges.length);
      this.edgesArray!.push(filtered);
    });
  }

  updateEdge(edge: GraphEdge): void {
    if (!this.doc || !this.edgesArray) return;
    const edges = this.edgesArray.toArray() as GraphEdge[];
    const idx = edges.findIndex((e) => e.id === edge.id);
    if (idx >= 0) {
      this.edgesArray.delete(idx, 1);
    }
    this.edgesArray.push([JSON.parse(JSON.stringify(edge))]);
  }

  removeEdge(edgeId: string): void {
    if (!this.doc || !this.edgesArray) return;
    const edges = this.edgesArray.toArray() as GraphEdge[];
    const filtered = edges.filter((e) => e.id !== edgeId);
    this.doc.transact(() => {
      this.edgesArray!.delete(0, edges.length);
      this.edgesArray!.push(filtered);
    });
  }

  updateCursor(position: { x: number; y: number }): void {
    if (!this.awareness) return;
    const awareness = this.awareness as {
      setLocalStateField: (field: string, value: unknown) => void;
    };
    awareness.setLocalStateField("cursor", position);
  }

  setSelectedNode(nodeId: string | undefined): void {
    if (!this.awareness) return;
    const awareness = this.awareness as {
      setLocalStateField: (field: string, value: unknown) => void;
    };
    awareness.setLocalStateField("selectedNodeId", nodeId);
  }

  getGraph(): ArchitectureGraph {
    if (!this.nodesMap || !this.edgesArray) {
      return { nodes: [], edges: [] };
    }

    const nodes: GraphNode[] = [];
    this.nodesMap.forEach((value) => {
      nodes.push(value as GraphNode);
    });

    const edges = this.edgesArray.toArray() as GraphEdge[];

    return { nodes, edges };
  }

  getPeers(): PeerInfo[] {
    return this.peers;
  }

  isConnected(): boolean {
    return this.connected;
  }

  private setupAwareness(): void {
    if (!this.awareness) return;

    const awareness = this.awareness as {
      on: (event: string, handler: (...args: unknown[]) => void) => void;
      getStates: () => Map<number, Record<string, unknown>>;
      setLocalStateField: (field: string, value: unknown) => void;
    };

    awareness.setLocalStateField("user", {
      name: `User-${this.peerId.slice(-4)}`,
      color: PEER_COLORS[Math.floor(Math.random() * PEER_COLORS.length)],
    });

    awareness.on("change", () => {
      const states = awareness.getStates();
      const peers: PeerInfo[] = [];

      states.forEach((state, clientId) => {
        const user = state.user as { name: string; color: string } | undefined;
        if (user) {
          peers.push({
            id: `client-${clientId}`,
            name: user.name,
            color: user.color,
            cursor: state.cursor as { x: number; y: number } | undefined,
            selectedNodeId: state.selectedNodeId as string | undefined,
          });
        }
      });

      this.peers = peers;
      this.presenceHandlers.forEach((h) => h(peers));
    });
  }
}
