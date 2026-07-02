"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase-client";

export default function AuthConfirmPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const handleConfirm = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenHash = params.get("token_hash");
      const type = params.get("type");
      const code = params.get("code");
      const errorParam = params.get("error");
      const errorDescription = params.get("error_description");

      if (errorParam) {
        setError(errorDescription || errorParam);
        setTimeout(() => router.replace("/login"), 3000);
        return;
      }

      // PKCE flow: exchange code for session
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          setError(exchangeError.message);
          setTimeout(() => router.replace("/login"), 3000);
          return;
        }
        router.replace("/");
        return;
      }

      // Legacy flow: verify token hash
      if (tokenHash && type) {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type as "signup" | "email",
        });
        if (verifyError) {
          setError(verifyError.message);
          setTimeout(() => router.replace("/login"), 3000);
          return;
        }
        router.replace("/");
        return;
      }

      // No params — redirect to login
      router.replace("/login");
    };

    handleConfirm();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      {error ? (
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Redirecting to login...</p>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Verifying your email...</p>
      )}
    </div>
  );
}
