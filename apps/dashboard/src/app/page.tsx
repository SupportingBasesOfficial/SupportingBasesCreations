"use client";

import { Suspense, useState, useEffect } from "react";
import { ArchitectureCanvas } from "../components/flow/ArchitectureCanvas";
import { NodePaletteSidebar } from "../components/flow/panels/NodePaletteSidebar";
import { NodeInspector } from "../components/flow/panels/NodeInspector";
import { ValidationPanel } from "../components/flow/panels/ValidationPanel";
import { DeployButton } from "../components/flow/controls/DeployButton";
import { CanvasToolbar } from "../components/flow/controls/CanvasToolbar";
import { PresenceAvatars } from "../components/collaboration/PresenceAvatars";
import { ShareDialog } from "../components/collaboration/ShareDialog";
import { LiveCursors } from "../components/collaboration/LiveCursors";
import { CloudSettingsModal } from "../components/CloudSettingsModal";
import { ErrorBoundary } from "../components/ErrorBoundary";
import {
  CanvasSkeleton,
  SidebarSkeleton,
  InspectorSkeleton,
} from "../components/Skeletons";
import { useOAuthCallback } from "../hooks/useOAuthCallback";
import { useGraphPersistence } from "../hooks/useGraphPersistence";
import { Cloud, AlertCircle, CheckCircle2 } from "lucide-react";
import { useDeployStore } from "../store/deployStore";
import { useGraphStore } from "../store/graphStore";

export default function DashboardPage() {
  const [roomId, setRoomId] = useState<string>("");
  const [showCloudSettings, setShowCloudSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { oauthStatus, clearStatus } = useOAuthCallback();
  const { load } = useGraphPersistence();
  const cloudConfig = useDeployStore((s) => s.cloudConfig);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = params.get("room");
    setRoomId(room ?? `sbc-${Math.random().toString(36).slice(2, 10)}`);

    load();
    setIsLoading(false);

    const stored = localStorage.getItem("sbc-cloud-config");
    if (stored) {
      try {
        const config = JSON.parse(stored);
        useDeployStore.getState().setCloudConfig(config);
      } catch {
        // ignore
      }
    }
  }, [load]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        useGraphStore.getState().undo();
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        useGraphStore.getState().redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ErrorBoundary>
      <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 shadow-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-gray-800">
              SBC <span className="text-blue-600">ASP</span>
            </h1>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
              Architecture Design Platform
            </span>
          </div>

          <div className="flex items-center gap-3">
            {oauthStatus && (
              <div
                className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${
                  oauthStatus.success
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
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
                  className="ml-1 text-gray-400 hover:text-gray-600"
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
            <div className="h-6 w-px bg-gray-200" />
            <ShareDialog />
            <button
              onClick={() => setShowCloudSettings(true)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${
                cloudConfig
                  ? "border-green-300 text-green-600 hover:bg-green-50"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Cloud size={16} />
              {cloudConfig ? "Connected" : "Cloud Setup"}
            </button>
            <DeployButton />
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
              </>
            )}
          </div>

          {isLoading ? <InspectorSkeleton /> : <NodeInspector />}
        </div>
      </div>

      <CloudSettingsModal
        open={showCloudSettings}
        onClose={() => setShowCloudSettings(false)}
      />
    </ErrorBoundary>
  );
}
