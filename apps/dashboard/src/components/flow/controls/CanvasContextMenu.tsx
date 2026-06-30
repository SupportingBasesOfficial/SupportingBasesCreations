"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useGraphStore } from "../../../store/graphStore";
import { useToast } from "../../Toast";
import type { GraphNode } from "@sbc/shared";
import { Copy, Trash2, Edit3, ClipboardPaste, Scissors } from "lucide-react";

interface ContextMenuState {
  x: number;
  y: number;
  nodeId: string | null;
}

export function CanvasContextMenu() {
  const [menu, setMenu] = useState<ContextMenuState | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const addNode = useGraphStore((s) => s.addNode);
  const removeNode = useGraphStore((s) => s.removeNode);
  const nodes = useGraphStore((s) => s.nodes);
  const setSelectedNode = useGraphStore((s) => s.setSelectedNode);
  const clipboardRef = useRef<{ node: unknown } | null>(null);

  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      const canvas = document.querySelector(".react-flow");
      if (!canvas || !canvas.contains(e.target as Node)) return;

      e.preventDefault();
      const target = e.target as HTMLElement;
      const nodeEl = target.closest(".react-flow__node") as HTMLElement | null;
      const nodeId = nodeEl?.getAttribute("data-id") ?? null;
      setMenu({ x: e.clientX, y: e.clientY, nodeId });
    };
    document.addEventListener("contextmenu", onContextMenu);
    return () => document.removeEventListener("contextmenu", onContextMenu);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenu(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleCopy = useCallback(() => {
    if (!menu?.nodeId) return;
    const node = nodes.find((n) => n.id === menu.nodeId);
    if (node) {
      clipboardRef.current = { node };
      toast.info("Node copied to clipboard");
    }
    setMenu(null);
  }, [menu, nodes, toast]);

  const handlePaste = useCallback(() => {
    if (!clipboardRef.current) return;
    const node = clipboardRef.current.node as GraphNode;
    const clone: GraphNode = {
      ...node,
      id: `node-${Date.now()}`,
      position: {
        x: node.position.x + 40,
        y: node.position.y + 40,
      },
      data: { ...node.data, label: `${node.data.label} (paste)` },
    };
    addNode(clone);
    toast.info("Node pasted");
    setMenu(null);
  }, [addNode, toast]);

  const handleDelete = useCallback(() => {
    if (!menu?.nodeId) return;
    removeNode(menu.nodeId);
    toast.info("Node deleted");
    setMenu(null);
  }, [menu, removeNode, toast]);

  const handleDuplicate = useCallback(() => {
    if (!menu?.nodeId) return;
    const node = nodes.find((n) => n.id === menu.nodeId);
    if (node) {
      const clone = {
        ...node,
        id: `node-${Date.now()}`,
        position: {
          x: node.position.x + 40,
          y: node.position.y + 40,
        },
        data: { ...node.data, label: `${node.data.label} (copy)` },
      };
      addNode(clone);
      toast.info("Node duplicated");
    }
    setMenu(null);
  }, [menu, nodes, addNode, toast]);

  const handleSelect = useCallback(() => {
    if (!menu?.nodeId) return;
    setSelectedNode(menu.nodeId);
    setMenu(null);
  }, [menu, setSelectedNode]);

  if (!menu) return null;

  const hasNode = !!menu.nodeId;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[180px] rounded-lg border border-gray-200 bg-white py-1 shadow-xl dark:border-gray-700 dark:bg-gray-800"
      style={{ left: menu.x, top: menu.y }}
    >
      {hasNode && (
        <>
          <MenuItem
            icon={<Edit3 size={14} />}
            label="Select"
            onClick={handleSelect}
          />
          <MenuItem
            icon={<Copy size={14} />}
            label="Copy"
            onClick={handleCopy}
          />
          <MenuItem
            icon={<ClipboardPaste size={14} />}
            label="Paste"
            onClick={handlePaste}
            disabled={!clipboardRef.current}
          />
          <MenuItem
            icon={<Scissors size={14} />}
            label="Duplicate"
            onClick={handleDuplicate}
          />
          <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
          <MenuItem
            icon={<Trash2 size={14} />}
            label="Delete"
            onClick={handleDelete}
            danger
          />
        </>
      )}
      {!hasNode && (
        <MenuItem
          icon={<ClipboardPaste size={14} />}
          label="Paste"
          onClick={handlePaste}
          disabled={!clipboardRef.current}
        />
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        danger
          ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
