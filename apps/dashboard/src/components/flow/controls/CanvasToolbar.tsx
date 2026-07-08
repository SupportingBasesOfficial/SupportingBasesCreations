"use client";

import { Undo2, Redo2, Save, FolderOpen, Download, Upload } from "lucide-react";
import { useGraphStore } from "../../../store/graphStore";
import { useGraphPersistence } from "../../../hooks/useGraphPersistence";
import { useRef } from "react";

export function CanvasToolbar() {
  const undo = useGraphStore((s) => s.undo);
  const redo = useGraphStore((s) => s.redo);
  const canUndo = useGraphStore((s) => s.canUndo());
  const canRedo = useGraphStore((s) => s.canRedo());
  const nodeCount = useGraphStore((s) => s.nodes.length);
  const { save, load, exportJson, importJson } = useGraphPersistence();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    save();
  };

  const handleLoad = () => {
    load();
  };

  const handleExport = () => {
    const json = exportJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `architecture-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const json = event.target?.result as string;
      importJson(json);
    };
    reader.readAsText(file);
  };

  return (
    <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <button
        onClick={undo}
        disabled={!canUndo}
        title="Desfazer (Ctrl+Z)"
        className="rounded p-1.5 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <Undo2 size={16} />
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        title="Refazer (Ctrl+Y)"
        className="rounded p-1.5 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <Redo2 size={16} />
      </button>

      <div className="mx-1 h-5 w-px bg-gray-200" />

      <button
        onClick={handleSave}
        disabled={nodeCount === 0}
        title="Salvar no navegador"
        className="rounded p-1.5 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <Save size={16} />
      </button>
      <button
        onClick={handleLoad}
        title="Carregar do navegador"
        className="rounded p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <FolderOpen size={16} />
      </button>

      <div className="mx-1 h-5 w-px bg-gray-200" />

      <button
        onClick={handleExport}
        disabled={nodeCount === 0}
        title="Exportar como JSON"
        className="rounded p-1.5 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <Download size={16} />
      </button>
      <button
        onClick={handleImport}
        title="Importar JSON"
        className="rounded p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <Upload size={16} />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
