"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGraphStore } from "../store/graphStore";
import type { ArchitectureGraph } from "@sbc/shared";

const CACHE_KEY = "sbc-architecture-graph";
const ARCH_ID_KEY = "sbc-arch-id";
const PROJECT_ID_KEY = "sbc-project-id";
const AUTOSAVE_INTERVAL = 30_000;

function getProjectIdFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("project");
}

export function useGraphPersistence() {
  const loadGraph = useGraphStore((s) => s.loadGraph);
  const getGraph = useGraphStore((s) => s.getGraph);
  const saveRef = useRef<() => boolean>(() => false);

  const saveToCache = useCallback(() => {
    const graph = getGraph();
    localStorage.setItem(CACHE_KEY, JSON.stringify(graph));
  }, [getGraph]);

  const save = useCallback(async (): Promise<boolean> => {
    const graph = getGraph();
    saveToCache();

    try {
      const urlProjectId = getProjectIdFromUrl();
      const storedProjectId = localStorage.getItem(PROJECT_ID_KEY);
      const projectId = urlProjectId ?? storedProjectId;

      if (projectId) {
        const res = await fetch(`/api/projects/${projectId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ graphData: graph }),
        });
        return res.ok;
      }

      const existingId = localStorage.getItem(ARCH_ID_KEY);
      const body = { graph_json: graph };

      if (existingId) {
        const res = await fetch("/api/architectures", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: existingId, ...body }),
        });
        return res.ok;
      } else {
        const res = await fetch("/api/architectures", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Untitled", ...body }),
        });
        const data = await res.json();
        if (data?.architecture?.id) {
          localStorage.setItem(ARCH_ID_KEY, data.architecture.id);
        }
        return res.ok;
      }
    } catch {
      return false;
    }
  }, [getGraph, saveToCache]);

  saveRef.current = save;

  const load = useCallback((): boolean => {
    const stored = localStorage.getItem(CACHE_KEY);
    if (!stored) return false;
    try {
      const graph = JSON.parse(stored) as ArchitectureGraph;
      loadGraph(graph);
      return true;
    } catch {
      return false;
    }
  }, [loadGraph]);

  const loadFromCloud = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/architectures");
      if (!res.ok) return false;
      const data = await res.json();
      const archs = data?.architectures;
      if (archs && archs.length > 0) {
        const latest = archs[0];
        localStorage.setItem(ARCH_ID_KEY, latest.id);
        const graph = latest.graph_json as ArchitectureGraph | null;
        if (
          !graph ||
          !Array.isArray(graph.nodes) ||
          !Array.isArray(graph.edges)
        ) {
          return false;
        }
        loadGraph(graph);
        localStorage.setItem(CACHE_KEY, JSON.stringify(graph));
        return true;
      }
    } catch {
      // offline — use cache
    }
    return false;
  }, [loadGraph]);

  const clear = useCallback(() => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(ARCH_ID_KEY);
    localStorage.removeItem(PROJECT_ID_KEY);
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

  useEffect(() => {
    const interval = setInterval(() => {
      saveRef.current();
    }, AUTOSAVE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return {
    save,
    load,
    loadFromCloud,
    clear,
    exportJson,
    importJson,
    setProjectId: (id: string) => {
      localStorage.setItem(PROJECT_ID_KEY, id);
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(ARCH_ID_KEY);
    },
  };
}
