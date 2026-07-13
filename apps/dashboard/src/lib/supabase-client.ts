"use client";

import { createClient } from "@supabase/ssr";

let cachedClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return {
      auth: {
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: new Error("Supabase não configurado. Contate o administrador.") }),
        signUp: async () => ({ data: { user: null }, error: new Error("Supabase não configurado. Contate o administrador.") }),
        signInWithOAuth: async () => {},
        signOut: async () => {},
      },
    } as unknown as ReturnType<typeof createBrowserClient>;
  }

  cachedClient = createBrowserClient(url, key);
  return cachedClient;
}
