"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  FolderKanban,
  Trash2,
  ArrowLeft,
  Loader2,
  FileCode,
  Search,
  Boxes,
  Calendar,
} from "lucide-react";
import { UserMenu } from "../../components/UserMenu";
import { ThemeToggle } from "../../components/ThemeToggle";
import { ToastContainer, useToast } from "../../components/Toast";

interface Project {
  id: string;
  name: string;
  description: string;
  graph_data: { nodes?: unknown[]; edges?: unknown[] } | null;
  updated_at: string;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [search, setSearch] = useState("");
  const toast = useToast();

  const loadProjects = () => {
    fetch("/api/projects")
      .then((res) => (res.ok ? res.json() : { projects: [] }))
      .then((data) => {
        setProjects(data.projects ?? []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          graphData: { nodes: [], edges: [] },
        }),
      });
      if (res.ok) {
        toast.success("Projeto criado");
        setNewName("");
        setShowNew(false);
        loadProjects();
      } else {
        toast.error("Falha ao criar projeto");
      }
    } catch {
      toast.error("Falha ao criar projeto");
    }
    setCreating(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Excluir "${name}"? Isso não pode ser desfeito.`)) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Projeto excluído");
      loadProjects();
    } else {
      toast.error("Falha ao excluir projeto");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft size={16} />
            Voltar ao Painel
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-800 dark:text-gray-100">
            <FolderKanban size={20} className="text-blue-600" />
            Projetos
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl flex-1 overflow-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {projects.length} projeto{projects.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={() => setShowNew(!showNew)}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Plus size={16} />
            Novo Projeto
          </button>
        </div>

        {showNew && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nome do Projeto
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="my-architecture"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-600"
                autoFocus
              />
              <button
                onClick={handleCreate}
                disabled={creating || !newName.trim()}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {creating ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Criar"
                )}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-gray-400" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
              <FileCode size={32} className="text-blue-400" />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Nenhum projeto ainda
            </h3>
            <p className="mb-4 max-w-xs text-xs text-gray-500 dark:text-gray-400">
              Crie sua primeira arquitetura ou comece direto pelo painel com IA
              ou templates.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowNew(true)}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
              >
                <Plus size={14} />
                Criar Projeto
              </button>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Ir para o Painel
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar projetos..."
                className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {projects
                .filter((p) =>
                  p.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((project) => {
                  const nodeCount = project.graph_data?.nodes?.length ?? 0;
                  return (
                    <div
                      key={project.id}
                      className="group rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Link
                        href={`/dashboard?project=${project.id}`}
                        className="block"
                      >
                        <h3 className="font-medium text-gray-800 dark:text-gray-100">
                          {project.name}
                        </h3>
                        {project.description && (
                          <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                            {project.description}
                          </p>
                        )}
                        <div className="mt-3 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                          <span className="flex items-center gap-1">
                            <Boxes size={12} />
                            {nodeCount} bloco{nodeCount !== 1 ? "s" : ""}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(project.updated_at).toLocaleDateString(
                              "pt-BR",
                            )}
                          </span>
                        </div>
                      </Link>
                      <div className="mt-3 flex items-center justify-between">
                        <Link
                          href={`/dashboard?project=${project.id}`}
                          className="text-xs font-medium text-blue-600 hover:underline"
                        >
                          Abrir →
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id, project.name)}
                          className="text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            {projects.filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase()),
            ).length === 0 && (
              <p className="py-8 text-center text-sm text-gray-400">
                Nenhum projeto encontrado para "{search}"
              </p>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
