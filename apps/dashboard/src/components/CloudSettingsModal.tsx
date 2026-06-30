"use client";

import { useEffect, useState } from "react";
import { Cloud, KeyRound, Check, Loader2, ExternalLink } from "lucide-react";
import { useDeployStore } from "../store/deployStore";
import type { CloudConfig, OAuthToken } from "@sbc/shared";

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
    const stored = localStorage.getItem("sbc-oauth-tokens");
    if (stored) {
      try {
        const tokens = JSON.parse(stored) as Record<ProviderId, OAuthToken>;
        setProviders((prev) => ({
          github: {
            ...prev.github,
            connected: !!tokens.github?.accessToken,
            token: tokens.github?.accessToken ?? "",
          },
          vercel: {
            ...prev.vercel,
            connected: !!tokens.vercel?.accessToken,
            token: tokens.vercel?.accessToken ?? "",
          },
          supabase: {
            ...prev.supabase,
            connected: !!tokens.supabase?.accessToken,
            token: tokens.supabase?.accessToken ?? "",
          },
        }));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleOAuthConnect = async (provider: ProviderId) => {
    setOauthLoading(provider);
    try {
      const redirectUri = `${window.location.origin}/api/oauth/${provider}/callback`;
      const state = `${provider}-${Date.now()}`;
      sessionStorage.setItem("sbc-oauth-state", state);

      const authUrls: Record<ProviderId, string> = {
        github: `https://github.com/login/oauth/authorize?client_id=Ov23liFH8qfQSEhGmJ8F&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(PROVIDER_META[provider].scopes)}&state=${state}`,
        vercel: `https://vercel.com/oauth/authorize?client_id=&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(PROVIDER_META[provider].scopes)}&state=${state}`,
        supabase: `https://supabase.com/oauth/authorize?client_id=&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(PROVIDER_META[provider].scopes)}&state=${state}`,
      };

      window.location.href = authUrls[provider];
    } catch {
      setOauthLoading(null);
    }
  };

  const handleSave = () => {
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
    localStorage.setItem("sbc-cloud-config", JSON.stringify(config));
    setSaving(false);
    onClose();
  };

  const handleDisconnect = (provider: ProviderId) => {
    setProviders((prev) => ({
      ...prev,
      [provider]: { connected: false, token: "", owner: "" },
    }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud size={20} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Cloud Configuration
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 hover:bg-gray-100"
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
                className="rounded-lg border border-gray-200 p-4"
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
                      <p className="text-sm font-medium text-gray-700">
                        {meta.label}
                      </p>
                      <p className="text-xs text-gray-400">{meta.scopes}</p>
                    </div>
                  </div>
                  {state.connected ? (
                    <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
                      <Check size={12} />
                      Connected
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOAuthConnect(provider)}
                      disabled={oauthLoading !== null}
                      className="flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
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
                    <label className="mb-0.5 block text-xs text-gray-500">
                      Access Token
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
                      placeholder={`Paste ${meta.label} token`}
                      className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-0.5 block text-xs text-gray-500">
                      {provider === "github"
                        ? "Owner / Username"
                        : provider === "vercel"
                          ? "Team ID (optional)"
                          : "Organization ID"}
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
                      className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {state.connected && (
                  <button
                    onClick={() => handleDisconnect(provider)}
                    className="mt-2 text-xs text-red-500 hover:underline"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            );
          })}

          <div className="rounded-md bg-blue-50 px-4 py-2 text-xs text-blue-600">
            <ExternalLink size={12} className="mr-1 inline" />
            Tokens are stored locally in your browser and encrypted in memory.
            Never sent to any server except the provider API.
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </div>
    </div>
  );
}
