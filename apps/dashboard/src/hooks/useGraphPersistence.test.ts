import { describe, it, expect, beforeEach } from "vitest";
import { useGraphPersistence } from "../hooks/useGraphPersistence";
import { useGraphStore } from "../store/graphStore";
import { NodeType } from "@sbc/shared";
import { renderHook, act } from "@testing-library/react";

describe("useGraphPersistence", () => {
  beforeEach(() => {
    localStorage.clear();
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

  it("should save graph to localStorage", () => {
    const { result } = renderHook(() => useGraphPersistence());

    useGraphStore.setState({
      nodes: [
        {
          id: "n1",
          type: NodeType.ENTITY,
          position: { x: 0, y: 0 },
          data: { label: "Test", description: "" },
        },
      ],
      edges: [],
    });

    act(() => {
      result.current.save();
    });

    const stored = localStorage.getItem("sbc-architecture-graph");
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.nodes).toHaveLength(1);
  });

  it("should load graph from localStorage", () => {
    const { result } = renderHook(() => useGraphPersistence());

    const graph = {
      nodes: [
        {
          id: "loaded",
          type: NodeType.ENTITY,
          position: { x: 10, y: 20 },
          data: { label: "Loaded", description: "" },
        },
      ],
      edges: [],
    };
    localStorage.setItem("sbc-architecture-graph", JSON.stringify(graph));

    act(() => {
      const success = result.current.load();
      expect(success).toBe(true);
    });

    expect(useGraphStore.getState().nodes[0].id).toBe("loaded");
  });

  it("should return false when no saved graph", () => {
    const { result } = renderHook(() => useGraphPersistence());

    act(() => {
      const success = result.current.load();
      expect(success).toBe(false);
    });
  });

  it("should export graph as JSON", () => {
    const { result } = renderHook(() => useGraphPersistence());

    useGraphStore.setState({
      nodes: [
        {
          id: "n1",
          type: NodeType.ENTITY,
          position: { x: 0, y: 0 },
          data: { label: "Export", description: "" },
        },
      ],
      edges: [],
    });

    let json: string;
    act(() => {
      json = result.current.exportJson();
    });
    const parsed = JSON.parse(json!);
    expect(parsed.nodes).toHaveLength(1);
    expect(parsed.nodes[0].id).toBe("n1");
  });

  it("should clear saved graph", () => {
    const { result } = renderHook(() => useGraphPersistence());

    localStorage.setItem("sbc-architecture-graph", '{"nodes":[],"edges":[]}');

    act(() => {
      result.current.clear();
    });

    expect(localStorage.getItem("sbc-architecture-graph")).toBeNull();
  });
});
