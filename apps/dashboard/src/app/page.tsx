"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { ArchitectureCanvas } from "../components/flow/ArchitectureCanvas";
import { NodePaletteSidebar } from "../components/flow/panels/NodePaletteSidebar";
import { NodeInspector } from "../components/flow/panels/NodeInspector";
import { ValidationPanel } from "../components/flow/panels/ValidationPanel";
import { DeployButton } from "../components/flow/controls/DeployButton";
import { CanvasToolbar } from "../components/flow/controls/CanvasToolbar";
import { CanvasContextMenu } from "../components/flow/controls/CanvasContextMenu";
import { TemplatesGallery } from "../components/flow/controls/TemplatesGallery";
import { ExportZipButton } from "../components/flow/controls/ExportZipButton";
import { AICopilot } from "../components/flow/controls/AICopilot";
import { CodePreview } from "../components/flow/controls/CodePreview";
import { DeployLogs } from "../components/flow/controls/DeployLogs";
import { PresenceAvatars } from "../components/collaboration/PresenceAvatars";
import { ShareDialog } from "../components/collaboration/ShareDialog";
import { LiveCursors } from "../components/collaboration/LiveCursors";
import { CloudSettingsModal } from "../components/CloudSettingsModal";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { ThemeToggle } from "../components/ThemeToggle";
import { UserMenu } from "../components/UserMenu";
import { ToastContainer, useToast } from "../components/Toast";
import {
  CanvasSkeleton,
  SidebarSkeleton,
  InspectorSkeleton,
} from "../components/Skeletons";
import { useOAuthCallback } from "../hooks/useOAuthCallback";
import { useGraphPersistence } from "../hooks/useGraphPersistence";
import { Cloud, AlertCircle, CheckCircle2, FolderKanban, Settings } from "lucide-react";
import Link from "next/link";
import { useDeployStore } from "../store/deployStore";
import { useGraphStore } from "../store/graphStore";

export default function DashboardPage() {
  const [roomId, setRoomId] = useState<string>("");
  const [showCloudSettings, setShowCloudSettings] = useState(false);
  const [showDeployLogs, setShowDeployLogs] = useState(false);
  const [deployLogId, setDeployLogId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { oauthStatus, clearStatus } = useOAuthCallback();
  const { load, save } = useGraphPersistence();
  const cloudConfig = useDeployStore((s) => s.cloudConfig);
  const toast = useToast();
  const saveRef = useRef(save);
  saveRef.current = save;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = params.get("room");
    setRoomId(room ?? `sbc-${Math.random().toString(36).slice(2, 10)}`);

    load().finally(() => setIsLoading(false));

    // Load cloud config from server
    async function loadCloudConfig() {
      try {
        const res = await fetch("/api/cloud-config");
        const data = await res.json();
        if (data?.cloud_config) {
          useDeployStore.getState().setCloudConfig(data.cloud_config);
        }
      } catch {
        // offline
      }
    }
    loadCloudConfig();
  }, [load]);

  useEffect(() => {
    if (oauthStatus?.success) {
      toast.success(`${oauthStatus.provider} connected successfully`);
    } else if (oauthStatus && !oauthStatus.success) {
      toast.error(`OAuth failed: ${oauthStatus.error ?? "unknown error"}`);
    }
  }, [oauthStatus, toast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        useGraphStore.getState().undo();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        useGraphStore.getState().redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveRef.current();
        toast.success("Graph saved to cloud");
      } else if (e.key === "Delete" && !isInput) {
        e.preventDefault();
        const state = useGraphStore.getState();
        if (state.selectedNodeId) {
          state.removeNode(state.selectedNodeId);
          toast.info("Node deleted");
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === "d" && !isInput) {
        e.preventDefault();
        const state = useGraphStore.getState();
        if (state.selectedNodeId) {
          const node = state.nodes.find((n) => n.id === state.selectedNodeId);
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
            state.addNode(clone);
            toast.info("Node duplicated");
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toast]);

  return (
    <ErrorBoundary>
      <div className="flex h-screen flex-col overflow-hidden bg-gray-50 dark:bg-gray-950">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight text-gray-800 dark:text-gray-100">
              SBC <span className="text-blue-600">ASP</span>
            </h1>
            <span className="hidden rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400 sm:inline">
              Architecture Design Platform
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {oauthStatus && (
              <div
                className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${
                  oauthStatus.success
                    ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {oauthStatus.success ? (
                  <>
                    <CheckCircle2 size={12} />
                    {oauthStatus.provider} connected
                  </>
                ) : (
                  <>
                    <AlertCircle size={12} />
                    OAuth failed
                  </>
                )}
                <button
                  onClick={clearStatus}
                  className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  &times;
                </button>
              </div>
            )}

            <Suspense
              fallback={<div className="text-xs text-gray-400">Loading...</div>}
            >
              {roomId && <PresenceAvatars roomId={roomId} />}
            </Suspense>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
            <Link
              href="/projects"
              className="hidden items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 sm:flex"
            >
              <FolderKanban size={16} />
              Projects
            </Link>
            <Link
              href="/settings"
              className="hidden items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 sm:flex"
            >
              <Settings size={16} />
              Settings
            </Link>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
            <AICopilot />
            <CodePreview />
            <TemplatesGallery />
            <ShareDialog />
            <ThemeToggle />
            <UserMenu />
            <button
              onClick={() => setShowCloudSettings(true)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${
                cloudConfig
                  ? "border-green-300 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/30"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <Cloud size={16} />
              {cloudConfig ? "Connected" : "Cloud Setup"}
            </button>
            <ExportZipButton />
            <DeployButton onViewLogs={() => { setDeployLogId(`deploy-${Date.now()}`); setShowDeployLogs(true); }} />
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {isLoading ? <SidebarSkeleton /> : <NodePaletteSidebar />}

          <div className="relative flex-1">
            {isLoading ? (
              <CanvasSkeleton />
            ) : (
              <>
                <CanvasToolbar />
                <ArchitectureCanvas />
                {roomId && <LiveCursors roomId={roomId} />}
                <ValidationPanel />
                <CanvasContextMenu />
              </>
            )}
          </div>

          {isLoading ? <InspectorSkeleton /> : <NodeInspector />}
        </div>
      </div>

      <DeployLogs
        deployId={deployLogId}
        open={showDeployLogs}
        onClose={() => setShowDeployLogs(false)}
      />
      <CloudSettingsModal
        open={showCloudSettings}
        onClose={() => setShowCloudSettings(false)}
      />
      <ToastContainer />
    </ErrorBoundary>
  );
}
