"use client";

import { create } from "zustand";
import {
  type GraphNode,
  type GraphEdge,
  type ArchitectureGraph,
  type GraphValidationResult,
  type GraphValidationError,
  type ProjectConfig,
} from "@sbc/shared";
import { GraphValidator, GraphToConfigMapper } from "@sbc/core";

interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId: string | null;
  validationErrors: GraphValidationError[];
  isValid: boolean;

  addNode: (node: GraphNode) => void;
  removeNode: (nodeId: string) => void;
  updateNode: (nodeId: string, data: Partial<GraphNode["data"]>) => void;
  updateNodePosition: (
    nodeId: string,
    position: { x: number; y: number },
  ) => void;
  addEdge: (edge: GraphEdge) => boolean;
  removeEdge: (edgeId: string) => void;
  setSelectedNode: (nodeId: string | null) => void;
  validate: () => void;
  getGraph: () => ArchitectureGraph;
  toProjectConfig: (projectName: string) => ProjectConfig;
  loadGraph: (graph: ArchitectureGraph) => void;
}

function runValidation(graph: ArchitectureGraph): GraphValidationResult {
  const validator = new GraphValidator(graph);
  return validator.validate();
}

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  validationErrors: [],
  isValid: true,

  addNode: (node) => {
    const nodes = [...get().nodes, node];
    const graph = { nodes, edges: get().edges };
    const result = runValidation(graph);
    set({ nodes, validationErrors: result.errors, isValid: result.valid });
  },

  removeNode: (nodeId) => {
    const nodes = get().nodes.filter((n) => n.id !== nodeId);
    const edges = get().edges.filter(
      (e) => e.source !== nodeId && e.target !== nodeId,
    );
    const graph = { nodes, edges };
    const result = runValidation(graph);
    set({
      nodes,
      edges,
      validationErrors: result.errors,
      isValid: result.valid,
      selectedNodeId:
        get().selectedNodeId === nodeId ? null : get().selectedNodeId,
    });
  },

  updateNode: (nodeId, data) => {
    const nodes = get().nodes.map((n) =>
      n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n,
    );
    const graph = { nodes, edges: get().edges };
    const result = runValidation(graph);
    set({ nodes, validationErrors: result.errors, isValid: result.valid });
  },

  updateNodePosition: (nodeId, position) => {
    const nodes = get().nodes.map((n) =>
      n.id === nodeId ? { ...n, position } : n,
    );
    set({ nodes });
  },

  addEdge: (edge) => {
    const sourceNode = get().nodes.find((n) => n.id === edge.source);
    const targetNode = get().nodes.find((n) => n.id === edge.target);

    if (!sourceNode || !targetNode) return false;

    const validator = new GraphValidator({
      nodes: get().nodes,
      edges: get().edges,
    });
    const error = validator.validateEdge(sourceNode.type, targetNode.type);

    if (error) {
      return false;
    }

    const edges = [...get().edges, edge];
    const graph = { nodes: get().nodes, edges };
    const result = runValidation(graph);
    set({ edges, validationErrors: result.errors, isValid: result.valid });
    return true;
  },

  removeEdge: (edgeId) => {
    const edges = get().edges.filter((e) => e.id !== edgeId);
    const graph = { nodes: get().nodes, edges };
    const result = runValidation(graph);
    set({ edges, validationErrors: result.errors, isValid: result.valid });
  },

  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),

  validate: () => {
    const graph = get().getGraph();
    const result = runValidation(graph);
    set({ validationErrors: result.errors, isValid: result.valid });
  },

  getGraph: () => ({
    nodes: get().nodes,
    edges: get().edges,
  }),

  toProjectConfig: (projectName) => {
    const graph = get().getGraph();
    const mapper = new GraphToConfigMapper(graph, projectName);
    return mapper.map();
  },

  loadGraph: (graph) => {
    const result = runValidation(graph);
    set({
      nodes: graph.nodes,
      edges: graph.edges,
      validationErrors: result.errors,
      isValid: result.valid,
    });
  },
}));
