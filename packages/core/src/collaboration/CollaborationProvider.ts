import type { ArchitectureGraph, GraphNode, GraphEdge } from "@sbc/shared";

type GraphUpdateHandler = (graph: ArchitectureGraph) => void;
type PresenceHandler = (peers: PeerInfo[]) => void;

export interface PeerInfo {
  id: string;
  name: string;
  color: string;
  cursor?: { x: number; y: number };
  selectedNodeId?: string;
}

export interface CollaborationProvider {
  connect(): Promise<void>;
  disconnect(): void;
  onGraphUpdate(handler: GraphUpdateHandler): void;
  onPresence(handler: PresenceHandler): void;
  updateNode(node: GraphNode): void;
  removeNode(nodeId: string): void;
  updateEdge(edge: GraphEdge): void;
  removeEdge(edgeId: string): void;
  updateCursor(position: { x: number; y: number }): void;
  setSelectedNode(nodeId: string | undefined): void;
  getGraph(): ArchitectureGraph;
  getPeers(): PeerInfo[];
  isConnected(): boolean;
}

export type { GraphUpdateHandler, PresenceHandler };
