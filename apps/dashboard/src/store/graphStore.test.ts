import { describe, it, expect, beforeEach } from "vitest";
import { useGraphStore } from "../store/graphStore";
import type { GraphNode } from "@sbc/shared";
import { NodeType } from "@sbc/shared";

function createNode(id: string, type: NodeType = NodeType.ENTITY): GraphNode {
  return {
    id,
    type,
    position: { x: 0, y: 0 },
    data: { label: id, description: "" },
  };
}

describe("graphStore", () => {
  beforeEach(() => {
    useGraphStore.setState({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      validationErrors: [],
      isValid: true,
      history: [],
      historyIndex: -1,
    });
  });

  it("should add a node", () => {
    const node = createNode("n1");
    useGraphStore.getState().addNode(node);
    expect(useGraphStore.getState().nodes).toHaveLength(1);
    expect(useGraphStore.getState().nodes[0].id).toBe("n1");
  });

  it("should remove a node", () => {
    const node = createNode("n1");
    useGraphStore.getState().addNode(node);
    useGraphStore.getState().removeNode("n1");
    expect(useGraphStore.getState().nodes).toHaveLength(0);
  });

  it("should update node data", () => {
    const node = createNode("n1");
    useGraphStore.getState().addNode(node);
    useGraphStore.getState().updateNode("n1", { label: "Updated" });
    expect(useGraphStore.getState().nodes[0].data.label).toBe("Updated");
  });

  it("should update node position", () => {
    const node = createNode("n1");
    useGraphStore.getState().addNode(node);
    useGraphStore.getState().updateNodePosition("n1", { x: 100, y: 200 });
    expect(useGraphStore.getState().nodes[0].position).toEqual({
      x: 100,
      y: 200,
    });
  });

  it("should set selected node", () => {
    useGraphStore.getState().setSelectedNode("n1");
    expect(useGraphStore.getState().selectedNodeId).toBe("n1");
  });

  it("should undo and redo", () => {
    const node1 = createNode("n1");
    const node2 = createNode("n2");

    useGraphStore.getState().addNode(node1);
    useGraphStore.getState().addNode(node2);

    expect(useGraphStore.getState().nodes).toHaveLength(2);

    useGraphStore.getState().undo();
    expect(useGraphStore.getState().nodes).toHaveLength(1);

    useGraphStore.getState().redo();
    expect(useGraphStore.getState().nodes).toHaveLength(2);
  });

  it("should not undo beyond history start", () => {
    useGraphStore.getState().undo();
    expect(useGraphStore.getState().nodes).toHaveLength(0);
  });

  it("should get graph", () => {
    const node = createNode("n1");
    useGraphStore.getState().addNode(node);
    const graph = useGraphStore.getState().getGraph();
    expect(graph.nodes).toHaveLength(1);
    expect(graph.edges).toHaveLength(0);
  });

  it("should load graph", () => {
    const node = createNode("loaded-1");
    useGraphStore.getState().loadGraph({ nodes: [node], edges: [] });
    expect(useGraphStore.getState().nodes[0].id).toBe("loaded-1");
  });

  it("should track canUndo and canRedo", () => {
    expect(useGraphStore.getState().canUndo()).toBe(false);
    expect(useGraphStore.getState().canRedo()).toBe(false);

    useGraphStore.getState().addNode(createNode("n1"));
    useGraphStore.getState().addNode(createNode("n2"));
    expect(useGraphStore.getState().canUndo()).toBe(true);

    useGraphStore.getState().undo();
    expect(useGraphStore.getState().canRedo()).toBe(true);
  });
});
