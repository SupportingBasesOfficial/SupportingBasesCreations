"use client";

import { useCallback, type DragEvent } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  type Connection,
  type Edge,
  type Node,
  type NodeMouseHandler,
  BackgroundVariant,
  ConnectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGraphStore } from "../../store/graphStore";
import { useGraphValidation } from "../../hooks/useGraphValidation";
import { CustomNode, type CustomNodeData } from "./nodes/CustomNode";
import { NODE_PALETTE, getNodeConfig } from "./nodes/NodePalette";
import { NodeType, type GraphNode, type GraphEdge } from "@sbc/shared";
import { nanoid } from "nanoid";
import { useToast } from "../../components/Toast";
import { Sparkles, LayoutTemplate } from "lucide-react";

const nodeTypes = { custom: CustomNode };

function ArchitectureCanvasInner() {
  const nodes = useGraphStore((s) => s.nodes);
  const edges = useGraphStore((s) => s.edges);
  const addNode = useGraphStore((s) => s.addNode);
  const removeNode = useGraphStore((s) => s.removeNode);
  const updateNodePosition = useGraphStore((s) => s.updateNodePosition);
  const addEdgeStore = useGraphStore((s) => s.addEdge);
  const removeEdge = useGraphStore((s) => s.removeEdge);
  const setSelectedNode = useGraphStore((s) => s.setSelectedNode);
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const { getErrorForNode, getErrorForEdge } = useGraphValidation();
  const toast = useToast();

  const rfNodes: Node[] = nodes.map((n) => {
    const config = getNodeConfig(n.type);
    const error = getErrorForNode(n.id);
    return {
      id: n.id,
      type: "custom",
      position: n.position,
      data: {
        label: n.data.label,
        description: n.data.description,
        nodeType: config.label,
        color: config.color,
        icon: config.icon,
        hasError: !!error,
        errorMessage: error?.message,
        fields: n.data.fields,
        route: n.data.route,
        method: n.data.method,
        framework: n.data.framework,
      } as CustomNodeData,
      selected: n.id === selectedNodeId,
    };
  });

  const rfEdges: Edge[] = edges.map((e) => {
    const error = getErrorForEdge(e.id);
    return {
      id: e.id,
      source: e.source,
      target: e.target,
      animated: !error,
      style: error
        ? { stroke: "#ef4444", strokeWidth: 2 }
        : { stroke: "#94a3b8", strokeWidth: 2 },
    };
  });

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;
      const edge: GraphEdge = {
        id: nanoid(),
        source: connection.source,
        target: connection.target,
      };
      const success = addEdgeStore(edge);
      if (!success) {
        toast.error("Conexão inválida — esses blocos não podem se conectar");
      }
    },
    [addEdgeStore, toast],
  );

  const onNodeDragStop = useCallback(
    (_event: unknown, node: Node) => {
      updateNodePosition(node.id, node.position);
    },
    [updateNodePosition],
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const nodeTypeStr = event.dataTransfer.getData("application/nodeType");
      if (!nodeTypeStr) return;

      const nodeType = nodeTypeStr as NodeType;
      const config = getNodeConfig(nodeType);
      const position = { x: event.clientX - 250, y: event.clientY - 100 };

      const newNode: GraphNode = {
        id: nanoid(),
        type: nodeType,
        position,
        data: {
          label: `${config.label} ${nodes.length + 1}`,
          description: config.description,
          ...(nodeType === NodeType.CLOUD_DATABASE && {
            fields: [
              {
                name: "id",
                type: "uuid",
                required: true,
                unique: true,
                nullable: false,
              },
            ],
            tableName: `${config.label.toLowerCase().replace(/\s+/g, "_")}_${nodes.length + 1}`,
            features: [],
          }),
          ...(nodeType === NodeType.FRONTEND_COMPONENT && {
            framework: "NEXTJS",
            styling: "TAILWIND",
            features: [],
          }),
          ...(nodeType === NodeType.API_ROUTE && {
            method: "GET",
            route: "/api",
          }),
          ...(nodeType === NodeType.AUTH_SERVICE && {
            provider: "supabase",
          }),
        },
      };

      addNode(newNode);
    },
    [addNode, nodes.length],
  );

  return (
    <div
      className="relative h-full w-full"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {nodes.length === 0 && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="pointer-events-auto text-center">
            <div className="mb-3 flex justify-center gap-3">
              <Sparkles size={40} className="text-purple-400" />
              <LayoutTemplate size={40} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 dark:text-gray-500">
              Comece sua arquitetura
            </h3>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-600">
              Arraste blocos da esquerda, use a IA ou escolha um template
            </p>
          </div>
        </div>
      )}
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodesDelete={(deletedNodes) => {
          for (const node of deletedNodes) {
            removeNode(node.id);
          }
        }}
        onEdgesDelete={(deletedEdges) => {
          for (const edge of deletedEdges) {
            removeEdge(edge.id);
          }
        }}
        connectionMode={ConnectionMode.Loose}
        fitView
        className="bg-gray-50 dark:bg-gray-950"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#e2e8f0"
        />
        <Controls className="!bg-white !shadow-md !rounded-lg !border !border-gray-200 dark:!bg-gray-800 dark:!border-gray-700 dark:!text-gray-300" />
        <MiniMap
          className="!bg-white !shadow-md !rounded-lg !border !border-gray-200 dark:!bg-gray-800 dark:!border-gray-700"
          nodeColor={(node) => {
            const data = node.data as CustomNodeData;
            return data?.color ?? "#94a3b8";
          }}
        />
      </ReactFlow>
    </div>
  );
}

export function ArchitectureCanvas() {
  return (
    <ReactFlowProvider>
      <ArchitectureCanvasInner />
    </ReactFlowProvider>
  );
}

export { NODE_PALETTE };
