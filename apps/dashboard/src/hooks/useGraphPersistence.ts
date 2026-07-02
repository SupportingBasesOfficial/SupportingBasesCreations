"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGraphStore } from "../store/graphStore";
import type { ArchitectureGraph } from "@sbc/shared";

const AUTOSAVE_INTERVAL = 30_000;

export function useGraphPersistence() {
  const loadGraph = useGraphStore((s) => s.loadGraph);
  const getGraph = useGraphStore((s) => s.getGraph);
  const saveRef = useRef<() => void>(() => {});
  const projectIdRef = useRef<string | null>(null);

  const save = useCallback(async () => {
    const graph = getGraph();
    try {
      if (projectIdRef.current) {
        const res = await fetch(`/api/projects/${projectIdRef.current}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Untitled",
            graphData: graph,
          }),
        });
        if (!res.ok) console.error("Failed to update project");
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Untitled",
            graphData: graph,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.project?.id) projectIdRef.current = data.project.id;
        } else {
          console.error("Failed to save project to cloud");
        }
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
  }, [getGraph]);

  saveRef.current = save;

  const load = useCallback(async (): Promise<boolean> => {
    try {
      const params = new URLSearchParams(window.location.search);
      const projectId = params.get("project");

      if (projectId) {
        const res = await fetch(`/api/projects/${projectId}`);
        if (!res.ok) return false;
        const data = await res.json();
        if (data.project?.graph_data) {
          loadGraph(data.project.graph_data);
          projectIdRef.current = data.project.id;
          return true;
        }
        return false;
      }

      const res = await fetch("/api/projects");
      if (!res.ok) return false;
      const data = await res.json();
      const projects = data.projects as Array<{ id: string; graph_data: ArchitectureGraph }>;
      if (projects && projects.length > 0) {
        loadGraph(projects[0].graph_data);
        projectIdRef.current = projects[0].id;
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [loadGraph]);

  const clear = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        const projects = data.projects as Array<{ id: string }>;
        for (const p of projects) {
          await fetch(`/api/projects/${p.id}`, { method: "DELETE" });
        }
      }
      projectIdRef.current = null;
    } catch (err) {
      console.error("Clear failed:", err);
    }
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

  return { save, load, clear, exportJson, importJson };
}
