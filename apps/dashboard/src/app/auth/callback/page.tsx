"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase-client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const handleCallback = async () => {
      // Check for code in URL query params (email verification redirect)
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const errorParam = params.get("error");
      const errorDescription = params.get("error_description");

      if (errorParam) {
        setError(errorDescription || errorParam);
        setTimeout(() => router.replace("/login"), 3000);
        return;
      }

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          setError(exchangeError.message);
          setTimeout(() => router.replace("/login"), 3000);
          return;
        }
      }

      // Check if we now have a session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace("/");
      } else {
        // No code and no session — redirect to login
        router.replace("/login");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      {error ? (
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <p className="mt-2 text-sm text-gray-500">Redirecting to login...</p>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Completing sign in...</p>
      )}
    </div>
  );
}
