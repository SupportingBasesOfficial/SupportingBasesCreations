"use client";

import { useState } from "react";
import { Code2, Loader2, X, File, Folder, FolderOpen, Eye } from "lucide-react";
import { useGraphStore } from "../../../store/graphStore";
import { useToast } from "../../Toast";

interface PreviewFile {
  path: string;
  content: string;
  language: string;
}

interface TreeNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: TreeNode[];
  language?: string;
}

interface PreviewResponse {
  files: PreviewFile[];
  fileTree: TreeNode[];
  totalFiles: number;
  totalLines: number;
}

export function CodePreview() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<PreviewResponse | null>(null);
  const [selectedFile, setSelectedFile] = useState<PreviewFile | null>(null);
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set());
  const toProjectConfig = useGraphStore((s) => s.toProjectConfig);
  const nodeCount = useGraphStore((s) => s.nodes.length);
  const isValid = useGraphStore((s) => s.isValid);
  const toast = useToast();

  const handlePreview = async () => {
    setLoading(true);
    setOpen(true);
    setSelectedFile(null);
    setPreview(null);

    try {
      const projectId =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("project")
          : null;
      const projectName = projectId ?? "preview-project";
      const config = toProjectConfig(projectName);
      const res = await fetch("/api/code-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config, projectName }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Falha ao gerar preview");
        return;
      }

      setPreview(data as PreviewResponse);
      const firstFile = (data as PreviewResponse).files.find(
        (f) => f.path === "package.json" || f.path.endsWith("README.md"),
      );
      if (firstFile) setSelectedFile(firstFile);
    } catch {
      toast.error("Não foi possível gerar o preview");
    } finally {
      setLoading(false);
    }
  };

  const toggleDir = (path: string) => {
    setExpandedDirs((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const selectFile = (file: PreviewFile) => {
    setSelectedFile(file);
  };

  const renderTree = (nodes: TreeNode[], depth = 0): React.ReactNode => {
    return nodes.map((node) => {
      const isExpanded = expandedDirs.has(node.path);
      if (node.type === "directory") {
        return (
          <div key={node.path}>
            <button
              onClick={() => toggleDir(node.path)}
              className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-xs text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
              {isExpanded ? (
                <FolderOpen size={14} className="text-blue-500" />
              ) : (
                <Folder size={14} className="text-blue-500" />
              )}
              {node.name}
            </button>
            {isExpanded &&
              node.children &&
              renderTree(node.children, depth + 1)}
          </div>
        );
      }
      const isSelected = selectedFile?.path === node.path;
      return (
        <button
          key={node.path}
          onClick={() => {
            const file = preview?.files.find((f) => f.path === node.path);
            if (file) selectFile(file);
          }}
          className={`flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-xs transition-colors ${
            isSelected
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <File size={14} className="text-gray-400" />
          {node.name}
        </button>
      );
    });
  };

  return (
    <>
      <button
        onClick={handlePreview}
        disabled={!isValid || nodeCount === 0 || loading}
        className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        title="Ver código gerado"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Code2 size={16} />
        )}
        <span className="hidden sm:inline">Ver Código</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !loading && setOpen(false)}
        >
          <div
            className="flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Eye size={20} className="text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Código Gerado
                </h2>
                {preview && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {preview.totalFiles} arquivos · {preview.totalLines} linhas
                  </span>
                )}
              </div>
              <button
                onClick={() => !loading && setOpen(false)}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="w-64 overflow-y-auto border-r border-gray-200 bg-gray-50 py-2 dark:border-gray-800 dark:bg-gray-950">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 size={20} className="animate-spin text-gray-400" />
                  </div>
                ) : preview ? (
                  renderTree(preview.fileTree)
                ) : (
                  <p className="px-3 py-4 text-xs text-gray-400">
                    Nenhum arquivo gerado
                  </p>
                )}
              </div>

              <div className="flex-1 overflow-auto bg-gray-900 p-4">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <Loader2 size={24} className="animate-spin text-gray-500" />
                  </div>
                ) : selectedFile ? (
                  <pre className="text-xs leading-relaxed text-gray-100">
                    <code className={`language-${selectedFile.language}`}>
                      {selectedFile.content}
                    </code>
                  </pre>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    Selecione um arquivo para visualizar
                  </div>
                )}
              </div>
            </div>

            {selectedFile && (
              <div className="border-t border-gray-200 px-4 py-2 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
                {selectedFile.path} · {selectedFile.content.split("\n").length}{" "}
                linhas
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
