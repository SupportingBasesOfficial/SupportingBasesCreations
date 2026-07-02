import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function createServerSupabaseClient() {
  const config = getSupabaseConfig();
  if (!config) {
    return {
      auth: {
        getUser: async () => ({ data: { user: null } }),
        getSession: async () => ({ data: { session: null } }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            order: async () => ({ data: [], error: null }),
            single: async () => ({ data: null, error: { message: "Not configured" } }),
          }),
        }),
        insert: () => ({
          select: () => ({
            single: async () => ({ data: null, error: { message: "Not configured" } }),
          }),
        }),
        update: () => ({
          eq: () => ({
            select: () => ({
              single: async () => ({ data: null, error: { message: "Not configured" } }),
            }),
          }),
        }),
        delete: () => ({
          eq: async () => ({ error: null }),
        }),
      }),
    } as unknown as ReturnType<typeof createServerClient>;
  }

  const cookieStore = cookies();
  return createServerClient(config.url, config.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from Server Component — safe to ignore
        }
      },
    },
  });
}

export function createMiddlewareSupabaseClient(request: NextRequest) {
  const config = getSupabaseConfig();
  let response = NextResponse.next({ headers: request.headers });

  if (!config) {
    return {
      supabase: {
        auth: {
          getSession: async () => ({ data: { session: null } }),
        },
      } as unknown as ReturnType<typeof createServerClient>,
      response,
    };
  }

  const supabase = createServerClient(config.url, config.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ headers: request.headers });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  return { supabase, response };
}
