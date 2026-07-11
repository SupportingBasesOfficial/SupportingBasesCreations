import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareSupabaseClient } from "./lib/supabase-server";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/auth/callback",
  "/auth/confirm",
  "/api/oauth",
  "/api/health",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  if (isPublic) {
    const publicResponse = NextResponse.next();
    addSecurityHeaders(publicResponse);
    return publicResponse;
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
      const redirectResponse = NextResponse.redirect(loginUrl);
      addSecurityHeaders(redirectResponse);
      return redirectResponse;
    }
  }

  addSecurityHeaders(response);
  return response;
}

function addSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest|sw).*)"],
};
