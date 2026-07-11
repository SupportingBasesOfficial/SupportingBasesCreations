"use client";

import { useEffect, useState } from "react";
import { Cloud, KeyRound, Check, Loader2, ExternalLink } from "lucide-react";
import { useDeployStore } from "../store/deployStore";
import type { CloudConfig } from "@sbc/shared";

type ProviderId = "github" | "vercel" | "supabase";

interface ProviderState {
  connected: boolean;
  token: string;
  owner: string;
}

const PROVIDER_META: Record<
  ProviderId,
  { label: string; color: string; scopes: string }
> = {
  github: { label: "GitHub", color: "#24292e", scopes: "repo, user" },
  vercel: { label: "Vercel", color: "#000000", scopes: "user" },
  supabase: {
    label: "Supabase",
    color: "#3ecf8e",
    scopes: "projects:write, organizations:read",
  },
};

export function CloudSettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const setCloudConfig = useDeployStore((s) => s.setCloudConfig);
  const cloudConfig = useDeployStore((s) => s.cloudConfig);

  const [providers, setProviders] = useState<Record<ProviderId, ProviderState>>(
    {
      github: { connected: false, token: "", owner: "" },
      vercel: { connected: false, token: "", owner: "" },
      supabase: { connected: false, token: "", owner: "" },
    },
  );
  const [saving, setSaving] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<ProviderId | null>(null);

  useEffect(() => {
    if (cloudConfig) {
      setProviders({
        github: {
          connected: !!cloudConfig.github.token,
          token: cloudConfig.github.token,
          owner: cloudConfig.github.owner,
        },
        vercel: {
          connected: !!cloudConfig.vercel.token,
          token: cloudConfig.vercel.token,
          owner: cloudConfig.vercel.teamId ?? "",
        },
        supabase: {
          connected: !!cloudConfig.supabase.token,
          token: cloudConfig.supabase.token,
          owner: cloudConfig.supabase.organizationId,
        },
      });
    }
  }, [cloudConfig, open]);

  useEffect(() => {
    if (!open) return;
    async function loadCloudConfig() {
      try {
        const res = await fetch("/api/cloud-config");
        const data = await res.json();
        if (data?.cloud_config) {
          const cfg = data.cloud_config as CloudConfig;
          setProviders({
            github: {
              connected: !!cfg.github?.token,
              token: cfg.github?.token ?? "",
              owner: cfg.github?.owner ?? "",
            },
            vercel: {
              connected: !!cfg.vercel?.token,
              token: cfg.vercel?.token ?? "",
              owner: cfg.vercel?.teamId ?? "",
            },
            supabase: {
              connected: !!cfg.supabase?.token,
              token: cfg.supabase?.token ?? "",
              owner: cfg.supabase?.organizationId ?? "",
            },
          });
        }
      } catch {
        // offline
      }
    }
    loadCloudConfig();
  }, [open]);

  const handleOAuthConnect = async (provider: ProviderId) => {
    setOauthLoading(provider);
    try {
      const redirectUri = `${window.location.origin}/api/oauth/${provider}/callback`;
      const state = `${provider}-${Date.now()}`;
      document.cookie = `sbc-oauth-state=${state};path=/;max-age=600;SameSite=Lax`;

      const ghClientId = process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID ?? "";
      const vercelClientId =
        process.env.NEXT_PUBLIC_VERCEL_OAUTH_CLIENT_ID ?? "";
      const supabaseClientId =
        process.env.NEXT_PUBLIC_SUPABASE_OAUTH_CLIENT_ID ?? "";

      const authUrls: Record<ProviderId, string> = {
        github: `https://github.com/login/oauth/authorize?client_id=${ghClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(PROVIDER_META[provider].scopes)}&state=${state}`,
        vercel: `https://vercel.com/oauth/authorize?client_id=${vercelClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(PROVIDER_META[provider].scopes)}&state=${state}`,
        supabase: `https://supabase.com/oauth/authorize?client_id=${supabaseClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(PROVIDER_META[provider].scopes)}&state=${state}`,
      };

      window.location.href = authUrls[provider];
    } catch {
      setOauthLoading(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const config: CloudConfig = {
      github: {
        token: providers.github.token,
        owner: providers.github.owner,
      },
      vercel: {
        token: providers.vercel.token,
        teamId: providers.vercel.owner || undefined,
      },
      supabase: {
        token: providers.supabase.token,
        organizationId: providers.supabase.owner,
      },
    };
    setCloudConfig(config);
    try {
      await fetch("/api/cloud-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cloud_config: config }),
      });
    } catch {
      // offline
    }
    setSaving(false);
    onClose();
  };

  const handleDisconnect = (provider: ProviderId) => {
    setProviders((prev) => ({
      ...prev,
      [provider]: { connected: false, token: "", owner: "" },
    }));
    document.cookie = `sbc-token-${provider}=;path=/;max-age=0;SameSite=Lax`;
    const updatedConfig: CloudConfig = {
      github: {
        token: provider === "github" ? "" : providers.github.token,
        owner: provider === "github" ? "" : providers.github.owner,
      },
      vercel: {
        token: provider === "vercel" ? "" : providers.vercel.token,
        teamId:
          provider === "vercel"
            ? undefined
            : providers.vercel.owner || undefined,
      },
      supabase: {
        token: provider === "supabase" ? "" : providers.supabase.token,
        organizationId: provider === "supabase" ? "" : providers.supabase.owner,
      },
    };
    setCloudConfig(updatedConfig);
    fetch("/api/cloud-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cloud_config: updatedConfig }),
    }).catch(() => {});
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud size={20} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Configuração de Nuvem
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>

        <div className="space-y-4">
          {(Object.keys(PROVIDER_META) as ProviderId[]).map((provider) => {
            const meta = PROVIDER_META[provider];
            const state = providers[provider];
            return (
              <div
                key={provider}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                      style={{ backgroundColor: meta.color }}
                    >
                      {meta.label[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {meta.label}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {meta.scopes}
                      </p>
                    </div>
                  </div>
                  {state.connected ? (
                    <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
                      <Check size={12} />
                      Conectado
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOAuthConnect(provider)}
                      disabled={oauthLoading !== null}
                      className="flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      {oauthLoading === provider ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <KeyRound size={12} />
                      )}
                      OAuth
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="mb-0.5 block text-xs text-gray-500 dark:text-gray-400">
                      Token de Acesso
                    </label>
                    <input
                      type="password"
                      value={state.token}
                      onChange={(e) =>
                        setProviders((prev) => ({
                          ...prev,
                          [provider]: {
                            ...prev[provider],
                            token: e.target.value,
                            connected: !!e.target.value,
                          },
                        }))
                      }
                      placeholder={`Cole o token do ${meta.label}`}
                      className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="mb-0.5 block text-xs text-gray-500 dark:text-gray-400">
                      {provider === "github"
                        ? "Usuário / Dono"
                        : provider === "vercel"
                          ? "ID do Time (opcional)"
                          : "ID da Organização"}
                    </label>
                    <input
                      type="text"
                      value={state.owner}
                      onChange={(e) =>
                        setProviders((prev) => ({
                          ...prev,
                          [provider]: {
                            ...prev[provider],
                            owner: e.target.value,
                          },
                        }))
                      }
                      placeholder={
                        provider === "github"
                          ? "your-username"
                          : provider === "vercel"
                            ? "team_xxx"
                            : "org_xxx"
                      }
                      className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                    />
                  </div>
                </div>

                {state.connected && (
                  <button
                    onClick={() => handleDisconnect(provider)}
                    className="mt-2 text-xs text-red-500 hover:underline"
                  >
                    Desconectar
                  </button>
                )}
              </div>
            );
          })}

          <div className="rounded-md bg-blue-50 px-4 py-2 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <ExternalLink size={12} className="mr-1 inline" />
            Tokens são armazenados localmente no seu navegador e criptografados
            em memória. Nunca enviados para nenhum servidor exceto a API do
            provedor.
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar Configuração"}
          </button>
        </div>
      </div>
    </div>
  );
}
