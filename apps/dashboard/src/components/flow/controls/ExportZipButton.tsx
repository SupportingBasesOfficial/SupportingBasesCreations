"use client";

import { useState } from "react";
import { useGraphStore } from "../../../store/graphStore";
import { useToast } from "../../Toast";
import { Download, Loader2 } from "lucide-react";

export function ExportZipButton() {
  const [exporting, setExporting] = useState(false);
  const getGraph = useGraphStore((s) => s.getGraph);
  const toProjectConfig = useGraphStore((s) => s.toProjectConfig);
  const toast = useToast();

  const handleExport = async () => {
    setExporting(true);
    try {
      const graph = getGraph();
      if (graph.nodes.length === 0) {
        toast.error("Nenhum bloco para exportar");
        return;
      }

      const config = toProjectConfig("exported-project");
      const json = JSON.stringify(config, null, 2);

      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "project-config.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Configuração do projeto exportada");
    } catch {
      toast.error("Falha ao exportar projeto");
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      {exporting ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Download size={16} />
      )}
      Exportar JSON
    </button>
  );
}
