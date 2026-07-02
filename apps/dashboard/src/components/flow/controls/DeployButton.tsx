"use client";

import { useState } from "react";
import { useGraphStore } from "../../../store/graphStore";
import { useDeployStore } from "../../../store/deployStore";
import { useCloudDeploy } from "../../../hooks/useCloudDeploy";
import {
  Rocket,
  Loader2,
  X,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import type { DeployStep } from "@sbc/shared";

const STEP_LABELS: Record<DeployStep, string> = {
  idle: "Idle",
  generating: "Generating Artifacts",
  "creating-repo": "Creating GitHub Repository",
  "pushing-files": "Pushing Files to GitHub",
  "linking-vercel": "Linking to Vercel",
  "deploying-vercel": "Deploying to Vercel",
  "provisioning-supabase": "Provisioning Supabase Database",
  "configuring-env": "Configuring Environment Variables",
  complete: "Deployment Complete",
  failed: "Deployment Failed",
};

export function DeployButton({ onViewLogs }: { onViewLogs?: () => void }) {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("my-project");
  const isValid = useGraphStore((s) => s.isValid);
  const nodeCount = useGraphStore((s) => s.nodes.length);
  const cloudConfig = useDeployStore((s) => s.cloudConfig);
  const { deploy, isDeploying, progress, result } = useCloudDeploy();

  const handleDeploy = async () => {
    setShowModal(true);
    await deploy(projectName);
  };

  const step = progress?.step ?? "idle";
  const percentage = progress?.percentage ?? 0;

  return (
    <>
      <button
        onClick={handleDeploy}
        disabled={!isValid || nodeCount === 0 || isDeploying}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
      >
        {isDeploying ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Rocket size={16} />
        )}
        Deploy to Cloud
      </button>
      {onViewLogs && (
        <button
          onClick={onViewLogs}
          disabled={!isValid || nodeCount === 0}
          className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          title="View deploy logs"
        >
          <Terminal size={16} />
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Cloud Deployment
              </h2>
              <button
                onClick={() => !isDeploying && setShowModal(false)}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                disabled={isDeploying}
              >
                <X size={20} />
              </button>
            </div>

            {!isDeploying && !result && (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
                  />
                </div>
                {!cloudConfig && (
                  <div className="flex items-center gap-2 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                    <AlertCircle size={16} />
                    Cloud tokens not configured. Set GitHub, Vercel, and
                    Supabase tokens first.
                  </div>
                )}
                <button
                  onClick={handleDeploy}
                  disabled={!cloudConfig}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Start Deployment
                </button>
              </div>
            )}

            {isDeploying && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {(Object.keys(STEP_LABELS) as DeployStep[])
                    .filter((s) => s !== "idle" && s !== "failed")
                    .map((s) => {
                      const isCurrent = step === s;
                      const isPast =
                        progress && percentage > getStepPercentage(s);
                      return (
                        <div key={s} className="flex items-center gap-3">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                              isCurrent
                                ? "bg-blue-600 text-white"
                                : isPast
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                            }`}
                          >
                            {isCurrent ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : isPast ? (
                              <CheckCircle2 size={12} />
                            ) : (
                              ""
                            )}
                          </div>
                          <span
                            className={`text-sm ${isCurrent ? "font-medium text-gray-800 dark:text-gray-100" : isPast ? "text-gray-600 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}
                          >
                            {STEP_LABELS[s]}
                          </span>
                        </div>
                      );
                    })}
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  {progress?.message}
                </p>
              </div>
            )}

            {!isDeploying && result && (
              <div className="space-y-4">
                {result.success ? (
                  <>
                    <div className="flex items-center gap-2 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle2 size={20} />
                      <span className="font-medium">
                        Deployment Successful!
                      </span>
                    </div>
                    <div className="space-y-2">
                      {result.githubUrl && (
                        <DeployLink label="GitHub" url={result.githubUrl} />
                      )}
                      {result.vercelUrl && (
                        <DeployLink label="Vercel" url={result.vercelUrl} />
                      )}
                      {result.supabaseUrl && (
                        <DeployLink label="Supabase" url={result.supabaseUrl} />
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    <AlertCircle size={20} />
                    <span>{result.error}</span>
                  </div>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function DeployLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      <span className="font-medium text-gray-700 dark:text-gray-200">{label}</span>
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <span className="truncate">{url}</span>
        <ExternalLink size={14} />
      </div>
    </a>
  );
}

function getStepPercentage(step: DeployStep): number {
  const map: Record<DeployStep, number> = {
    idle: 0,
    generating: 5,
    "creating-repo": 10,
    "pushing-files": 25,
    "linking-vercel": 40,
    "deploying-vercel": 55,
    "provisioning-supabase": 60,
    "configuring-env": 80,
    complete: 100,
    failed: 0,
  };
  return map[step] ?? 0;
}
