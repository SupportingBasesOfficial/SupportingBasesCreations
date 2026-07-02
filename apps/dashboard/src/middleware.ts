import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareSupabaseClient } from "./lib/supabase-server";

const PUBLIC_PATHS = ["/login", "/auth/callback", "/auth/confirm", "/api/oauth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // Check Supabase auth session
  const { supabase, response } = createMiddlewareSupabaseClient(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Also check legacy cloud provider tokens (for OAuth flow before auth)
    const hasCloudToken =
      request.cookies.get("sbc-token-github")?.value ||
      request.cookies.get("sbc-token-vercel")?.value ||
      request.cookies.get("sbc-token-supabase")?.value;

    if (!hasCloudToken) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest|sw).*)"],
};
