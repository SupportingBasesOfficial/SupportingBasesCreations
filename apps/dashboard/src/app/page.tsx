"use client";

import { Suspense, useState } from "react";
import { ArchitectureCanvas } from "../components/flow/ArchitectureCanvas";
import { NodePaletteSidebar } from "../components/flow/panels/NodePaletteSidebar";
import { NodeInspector } from "../components/flow/panels/NodeInspector";
import { ValidationPanel } from "../components/flow/panels/ValidationPanel";
import { DeployButton } from "../components/flow/controls/DeployButton";
import { PresenceAvatars } from "../components/collaboration/PresenceAvatars";
import { ShareDialog } from "../components/collaboration/ShareDialog";

export default function DashboardPage() {
  const [roomId] = useState(
    () => `sbc-${Math.random().toString(36).slice(2, 10)}`,
  );

  return (
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
          <Suspense
            fallback={<div className="text-xs text-gray-400">Loading...</div>}
          >
            <PresenceAvatars roomId={roomId} />
          </Suspense>
          <div className="h-6 w-px bg-gray-200" />
          <ShareDialog />
          <DeployButton />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <NodePaletteSidebar />

        <div className="relative flex-1">
          <ArchitectureCanvas />
          <ValidationPanel />
        </div>

        <NodeInspector />
      </div>
    </div>
  );
}
