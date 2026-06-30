import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/api/oauth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  if (isPublic) {
    return NextResponse.next();
  }

  const githubToken = request.cookies.get("sbc-token-github")?.value;
  const vercelToken = request.cookies.get("sbc-token-vercel")?.value;
  const supabaseToken = request.cookies.get("sbc-token-supabase")?.value;

  if (!githubToken && !vercelToken && !supabaseToken) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("auth_required", "true");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest|sw).*)"],
};
