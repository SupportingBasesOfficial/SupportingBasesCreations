import { describe, it, expect, beforeEach, vi } from "vitest";
import { useGraphPersistence } from "../hooks/useGraphPersistence";
import { useGraphStore } from "../store/graphStore";
import { NodeType } from "@sbc/shared";
import { renderHook, act } from "@testing-library/react";

const mockFetch = vi.fn();

vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  vi.clearAllMocks();
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

describe("useGraphPersistence", () => {
  it("should save graph via API (create then update)", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ architecture: { id: "arch-1" } }),
      })
      .mockResolvedValue({ ok: true });

    const { result } = renderHook(() => useGraphPersistence());

    useGraphStore.setState({
      nodes: [
        {
          id: "n1",
          type: NodeType.CLOUD_DATABASE,
          position: { x: 0, y: 0 },
          data: { label: "Test", description: "" },
        },
      ],
      edges: [],
    });

    await act(async () => {
      await result.current.save();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/architectures",
      expect.objectContaining({ method: "POST" }),
    );

    // Second save should update (PUT)
    await act(async () => {
      await result.current.save();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/architectures",
      expect.objectContaining({ method: "PUT" }),
    );
  });

  it("should load graph from cache", () => {
    const graph = {
      nodes: [
        {
          id: "loaded",
          type: NodeType.CLOUD_DATABASE,
          position: { x: 10, y: 20 },
          data: { label: "Loaded", description: "" },
        },
      ],
      edges: [],
    };

    localStorage.setItem("sbc-architecture-graph", JSON.stringify(graph));

    const { result } = renderHook(() => useGraphPersistence());

    let success = false;
    act(() => {
      success = result.current.load();
    });

    expect(success).toBe(true);
    expect(useGraphStore.getState().nodes[0].id).toBe("loaded");
  });

  it("should return false when no cached graph", () => {
    const { result } = renderHook(() => useGraphPersistence());

    let success = true;
    act(() => {
      success = result.current.load();
    });

    expect(success).toBe(false);
  });

  it("should export graph as JSON", () => {
    const { result } = renderHook(() => useGraphPersistence());

    useGraphStore.setState({
      nodes: [
        {
          id: "n1",
          type: NodeType.CLOUD_DATABASE,
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

  it("should clear localStorage cache", () => {
    localStorage.setItem("sbc-architecture-graph", "{}");
    localStorage.setItem("sbc-arch-id", "arch-1");

    const { result } = renderHook(() => useGraphPersistence());

    act(() => {
      result.current.clear();
    });

    expect(localStorage.getItem("sbc-architecture-graph")).toBeNull();
    expect(localStorage.getItem("sbc-arch-id")).toBeNull();
  });
});
