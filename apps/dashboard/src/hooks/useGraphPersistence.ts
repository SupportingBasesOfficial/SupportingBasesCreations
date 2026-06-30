"use client";

import { useCallback } from "react";
import { useGraphStore } from "../store/graphStore";
import type { ArchitectureGraph } from "@sbc/shared";

const STORAGE_KEY = "sbc-architecture-graph";

export function useGraphPersistence() {
  const loadGraph = useGraphStore((s) => s.loadGraph);
  const getGraph = useGraphStore((s) => s.getGraph);

  const save = useCallback(() => {
    const graph = getGraph();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(graph));
  }, [getGraph]);

  const load = useCallback((): boolean => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    try {
      const graph = JSON.parse(stored) as ArchitectureGraph;
      loadGraph(graph);
      return true;
    } catch {
      return false;
    }
  }, [loadGraph]);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const exportJson = useCallback((): string => {
    const graph = getGraph();
    return JSON.stringify(graph, null, 2);
  }, [getGraph]);

  const importJson = useCallback(
    (json: string): boolean => {
      try {
        const graph = JSON.parse(json) as ArchitectureGraph;
        loadGraph(graph);
        return true;
      } catch {
        return false;
      }
    },
    [loadGraph],
  );

  return { save, load, clear, exportJson, importJson };
}
