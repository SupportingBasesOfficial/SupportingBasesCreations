"use client";

import { useEffect, useState } from "react";
import { useDeployStore } from "../store/deployStore";
import type { CloudConfig } from "@sbc/shared";

export function useOAuthCallback() {
  const setCloudConfig = useDeployStore((s) => s.setCloudConfig);
  const [oauthStatus, setOauthStatus] = useState<{
    provider: string;
    success: boolean;
    error?: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const success = params.get("oauth_success");
    const error = params.get("oauth_error");
    const token = params.get("token");

    async function handleOAuthSuccess() {
      if (!success || !token) return;
      const provider = success as "github" | "vercel" | "supabase";
      setOauthStatus({ provider, success: true });

      let existing: Partial<CloudConfig> = {};
      try {
        const res = await fetch("/api/cloud-config");
        const data = await res.json();
        if (data?.cloud_config) {
          existing = data.cloud_config as Partial<CloudConfig>;
        }
      } catch {
        // offline fallback
      }

      const config: CloudConfig = {
        github: existing.github ?? { token: "", owner: "" },
        vercel: existing.vercel ?? { token: "", teamId: undefined },
        supabase: existing.supabase ?? { token: "", organizationId: "" },
        [provider]: {
          token,
          owner:
            (existing[provider] as { owner?: string })?.owner ??
            (existing[provider] as { teamId?: string })?.teamId ??
            "",
        },
      } as CloudConfig;

      setCloudConfig(config);

      try {
        await fetch("/api/cloud-config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cloud_config: config }),
        });
      } catch {
        // offline — will sync later
      }

      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }

    if (success && token) {
      handleOAuthSuccess();
    }

    if (error) {
      setOauthStatus({ provider: "", success: false, error });
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }
  }, [setCloudConfig]);

  return { oauthStatus, clearStatus: () => setOauthStatus(null) };
}
