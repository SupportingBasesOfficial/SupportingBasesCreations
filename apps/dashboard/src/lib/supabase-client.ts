import { createBrowserClient } from "@supabase/ssr";

let cachedClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a stub client during build/SSG when env vars aren't available
    return {
      auth: {
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: new Error("Supabase not configured") }),
        signUp: async () => ({ data: { user: null }, error: new Error("Supabase not configured") }),
        signInWithOAuth: async () => {},
        signOut: async () => {},
      },
    } as unknown as ReturnType<typeof createBrowserClient>;
  }

  cachedClient = createBrowserClient(url, key);
  return cachedClient;
}
