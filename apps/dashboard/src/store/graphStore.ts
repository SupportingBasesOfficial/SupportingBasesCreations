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

interface GraphSnapshot {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId: string | null;
  validationErrors: GraphValidationError[];
  isValid: boolean;

  history: GraphSnapshot[];
  historyIndex: number;

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

  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

function runValidation(graph: ArchitectureGraph): GraphValidationResult {
  const validator = new GraphValidator(graph);
  return validator.validate();
}

const MAX_HISTORY = 50;

function pushHistory(
  history: GraphSnapshot[],
  index: number,
  snap: GraphSnapshot,
): { history: GraphSnapshot[]; index: number } {
  const newHistory = history.slice(0, index + 1);
  newHistory.push(snap);
  if (newHistory.length > MAX_HISTORY) {
    newHistory.shift();
  }
  return { history: newHistory, index: newHistory.length - 1 };
}

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  validationErrors: [],
  isValid: true,
  history: [],
  historyIndex: -1,

  addNode: (node) => {
    const current = get();
    const nodes = [...current.nodes, node];
    const graph = { nodes, edges: current.edges };
    const result = runValidation(graph);
    const snap: GraphSnapshot = { nodes, edges: current.edges };
    const { history: newHistory, index: newIndex } = pushHistory(
      current.history,
      current.historyIndex,
      snap,
    );
    set({
      nodes,
      validationErrors: result.errors,
      isValid: result.valid,
      history: newHistory,
      historyIndex: newIndex,
    });
  },

  removeNode: (nodeId) => {
    const current = get();
    const nodes = current.nodes.filter((n) => n.id !== nodeId);
    const edges = current.edges.filter(
      (e) => e.source !== nodeId && e.target !== nodeId,
    );
    const graph = { nodes, edges };
    const result = runValidation(graph);
    const snap: GraphSnapshot = { nodes, edges };
    const { history: newHistory, index: newIndex } = pushHistory(
      current.history,
      current.historyIndex,
      snap,
    );
    set({
      nodes,
      edges,
      validationErrors: result.errors,
      isValid: result.valid,
      selectedNodeId:
        current.selectedNodeId === nodeId ? null : current.selectedNodeId,
      history: newHistory,
      historyIndex: newIndex,
    });
  },

  updateNode: (nodeId, data) => {
    const current = get();
    const nodes = current.nodes.map((n) =>
      n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n,
    );
    const graph = { nodes, edges: current.edges };
    const result = runValidation(graph);
    const snap: GraphSnapshot = { nodes, edges: current.edges };
    const { history: newHistory, index: newIndex } = pushHistory(
      current.history,
      current.historyIndex,
      snap,
    );
    set({
      nodes,
      validationErrors: result.errors,
      isValid: result.valid,
      history: newHistory,
      historyIndex: newIndex,
    });
  },

  updateNodePosition: (nodeId, position) => {
    const nodes = get().nodes.map((n) =>
      n.id === nodeId ? { ...n, position } : n,
    );
    set({ nodes });
  },

  addEdge: (edge) => {
    const current = get();
    const sourceNode = current.nodes.find((n) => n.id === edge.source);
    const targetNode = current.nodes.find((n) => n.id === edge.target);

    if (!sourceNode || !targetNode) return false;

    const validator = new GraphValidator({
      nodes: current.nodes,
      edges: current.edges,
    });
    const error = validator.validateEdge(sourceNode.type, targetNode.type);

    if (error) {
      return false;
    }

    const edges = [...current.edges, edge];
    const graph = { nodes: current.nodes, edges };
    const result = runValidation(graph);
    const snap: GraphSnapshot = { nodes: current.nodes, edges };
    const { history: newHistory, index: newIndex } = pushHistory(
      current.history,
      current.historyIndex,
      snap,
    );
    set({
      edges,
      validationErrors: result.errors,
      isValid: result.valid,
      history: newHistory,
      historyIndex: newIndex,
    });
    return true;
  },

  removeEdge: (edgeId) => {
    const current = get();
    const edges = current.edges.filter((e) => e.id !== edgeId);
    const graph = { nodes: current.nodes, edges };
    const result = runValidation(graph);
    const snap: GraphSnapshot = { nodes: current.nodes, edges };
    const { history: newHistory, index: newIndex } = pushHistory(
      current.history,
      current.historyIndex,
      snap,
    );
    set({
      edges,
      validationErrors: result.errors,
      isValid: result.valid,
      history: newHistory,
      historyIndex: newIndex,
    });
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
    const current = get();
    const result = runValidation(graph);
    const snap: GraphSnapshot = { nodes: graph.nodes, edges: graph.edges };
    const { history: newHistory, index: newIndex } = pushHistory(
      current.history,
      current.historyIndex,
      snap,
    );
    set({
      nodes: graph.nodes,
      edges: graph.edges,
      validationErrors: result.errors,
      isValid: result.valid,
      history: newHistory,
      historyIndex: newIndex,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < 1) return;
    const prev = history[historyIndex - 1];
    if (!prev) return;
    const graph = { nodes: prev.nodes, edges: prev.edges };
    const result = runValidation(graph);
    set({
      nodes: prev.nodes,
      edges: prev.edges,
      validationErrors: result.errors,
      isValid: result.valid,
      historyIndex: historyIndex - 1,
    });
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex >= history.length - 1) return;
    const next = history[historyIndex + 1];
    if (!next) return;
    const graph = { nodes: next.nodes, edges: next.edges };
    const result = runValidation(graph);
    set({
      nodes: next.nodes,
      edges: next.edges,
      validationErrors: result.errors,
      isValid: result.valid,
      historyIndex: historyIndex + 1,
    });
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,
}));
