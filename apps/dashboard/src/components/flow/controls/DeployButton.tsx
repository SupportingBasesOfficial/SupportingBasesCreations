"use client";

import { useState, useEffect } from "react";
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
  idle: "Aguardando",
  generating: "Gerando arquivos do projeto",
  "creating-repo": "Criando repositório no GitHub",
  "pushing-files": "Enviando arquivos para o GitHub",
  "linking-vercel": "Conectando com a Vercel",
  "deploying-vercel": "Publicando na Vercel",
  "provisioning-supabase": "Configurando banco de dados Supabase",
  "configuring-env": "Configurando variáveis de ambiente",
  complete: "Deploy concluído!",
  failed: "Deploy falhou",
};

export function DeployButton({
  onViewLogs,
  onDeployStart,
}: {
  onViewLogs?: (deployId: string | null) => void;
  onDeployStart?: (deployId: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("my-project");
  const isValid = useGraphStore((s) => s.isValid);
  const nodeCount = useGraphStore((s) => s.nodes.length);
  const cloudConfig = useDeployStore((s) => s.cloudConfig);
  const { deploy, isDeploying, progress, result, deployId } = useCloudDeploy();

  const openModal = () => {
    setShowModal(true);
  };

  const handleDeploy = async () => {
    const res = await deploy(projectName);
    if (res.success && deployId) {
      onDeployStart?.(deployId);
    }
  };

  useEffect(() => {
    if (deployId && isDeploying) {
      onDeployStart?.(deployId);
    }
  }, [deployId, isDeploying, onDeployStart]);

  const step = progress?.step ?? "idle";
  const percentage = progress?.percentage ?? 0;

  return (
    <>
      <button
        onClick={openModal}
        disabled={!isValid || nodeCount === 0 || isDeploying}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
      >
        {isDeploying ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Rocket size={16} />
        )}
        Publicar na Nuvem
      </button>
      {onViewLogs && (
        <button
          onClick={() => onViewLogs?.(deployId)}
          disabled={!isValid || nodeCount === 0}
          className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          title="Ver logs do deploy"
        >
          <Terminal size={16} />
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Publicar Projeto
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
                    Nome do projeto
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="ex: minha-loja, blog-pessoal, app-delivery"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-600"
                  />
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    Use apenas letras minúsculas e hífens. Ex: minha-loja
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50">
                  <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    O que vai acontecer:
                  </p>
                  <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Código gerado a partir do seu diagrama
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Repositório criado no GitHub
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      App publicado na Vercel (acessível por link)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Banco de dados configurado no Supabase
                    </li>
                  </ul>
                </div>

                {!cloudConfig && (
                  <div className="flex items-center gap-2 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                    <AlertCircle size={16} />
                    Tokens de nuvem não configurados. Conecte GitHub, Vercel e
                    Supabase primeiro nas configurações.
                  </div>
                )}
                {!isValid && nodeCount > 0 && (
                  <div className="flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    <AlertCircle size={16} />
                    Há erros no diagrama. Corrija antes de publicar.
                  </div>
                )}
                {nodeCount === 0 && (
                  <div className="flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    <AlertCircle size={16} />
                    Adicione blocos ao diagrama antes de publicar.
                  </div>
                )}
                <button
                  onClick={handleDeploy}
                  disabled={!cloudConfig || !isValid || nodeCount === 0}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Rocket size={16} />
                    Iniciar Publicação
                  </span>
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
                    <div className="flex flex-col items-center gap-2 rounded-md bg-green-50 px-4 py-4 text-center dark:bg-green-900/30">
                      <CheckCircle2
                        size={32}
                        className="text-green-600 dark:text-green-400"
                      />
                      <span className="font-semibold text-green-700 dark:text-green-400">
                        Projeto publicado com sucesso!
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-500">
                        Seu app já está no ar e acessível pelos links abaixo
                      </span>
                    </div>
                    <div className="space-y-2">
                      {result.vercelUrl && (
                        <DeployLink
                          label="Seu app (Vercel)"
                          url={result.vercelUrl}
                        />
                      )}
                      {result.githubUrl && (
                        <DeployLink
                          label="Código (GitHub)"
                          url={result.githubUrl}
                        />
                      )}
                      {result.supabaseUrl && (
                        <DeployLink
                          label="Banco (Supabase)"
                          url={result.supabaseUrl}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 rounded-md bg-red-50 px-4 py-3 dark:bg-red-900/30">
                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                      <AlertCircle size={20} />
                      <span className="font-medium">Falha na publicação</span>
                    </div>
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {result.error}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Fechar
                </button>
                {result.success && (
                  <button
                    onClick={() => {
                      handleDeploy();
                    }}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-indigo-700"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Rocket size={16} />
                      Publicar Novamente
                    </span>
                  </button>
                )}
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
      <span className="font-medium text-gray-700 dark:text-gray-200">
        {label}
      </span>
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
