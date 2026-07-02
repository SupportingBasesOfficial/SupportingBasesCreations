import { describe, it, expect, beforeEach, vi } from "vitest";
import { useGraphPersistence } from "../hooks/useGraphPersistence";
import { useGraphStore } from "../store/graphStore";
import { NodeType } from "@sbc/shared";
import { renderHook, act } from "@testing-library/react";

const mockFetch = vi.fn();

vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  vi.clearAllMocks();
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
        json: async () => ({ project: { id: "p1" } }),
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
      "/api/projects",
      expect.objectContaining({ method: "POST" }),
    );

    // Second save should update
    await act(async () => {
      await result.current.save();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/projects/p1",
      expect.objectContaining({ method: "PUT" }),
    );
  });

  it("should load graph from API", async () => {
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

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ projects: [{ id: "p1", graph_data: graph }] }),
    });

    const { result } = renderHook(() => useGraphPersistence());

    await act(async () => {
      const success = await result.current.load();
      expect(success).toBe(true);
    });

    expect(useGraphStore.getState().nodes[0].id).toBe("loaded");
  });

  it("should return false when no projects from API", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ projects: [] }),
    });

    const { result } = renderHook(() => useGraphPersistence());

    await act(async () => {
      const success = await result.current.load();
      expect(success).toBe(false);
    });
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

  it("should clear projects via API", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ projects: [{ id: "p1" }, { id: "p2" }] }),
      })
      .mockResolvedValue({ ok: true });

    const { result } = renderHook(() => useGraphPersistence());

    await act(async () => {
      await result.current.clear();
    });

    expect(mockFetch).toHaveBeenCalledWith("/api/projects/p1", {
      method: "DELETE",
    });
    expect(mockFetch).toHaveBeenCalledWith("/api/projects/p2", {
      method: "DELETE",
    });
  });
});
