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

    if (success && token) {
      const provider = success as "github" | "vercel" | "supabase";
      setOauthStatus({ provider, success: true });

      const stored = localStorage.getItem("sbc-cloud-config");
      const existing: Partial<CloudConfig> = stored ? JSON.parse(stored) : {};

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
      localStorage.setItem("sbc-cloud-config", JSON.stringify(config));

      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }

    if (error) {
      setOauthStatus({ provider: "", success: false, error });
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }
  }, [setCloudConfig]);

  return { oauthStatus, clearStatus: () => setOauthStatus(null) };
}
