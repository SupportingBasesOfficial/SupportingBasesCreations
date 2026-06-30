import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } },
) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      `${origin}/?oauth_error=${encodeURIComponent(error)}`,
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(`${origin}/?oauth_error=missing_params`);
  }

  const storedState = request.cookies.get("sbc-oauth-state")?.value;
  if (storedState && storedState !== state) {
    return NextResponse.redirect(`${origin}/?oauth_error=state_mismatch`);
  }

  const redirectUri = `${origin}/api/oauth/${params.provider}/callback`;

  const tokenEndpoints: Record<string, string> = {
    github: "https://github.com/login/oauth/access_token",
    vercel: "https://api.vercel.com/v2/oauth/access_token",
    supabase: "https://api.supabase.com/v1/oauth/token",
  };

  const clientIds: Record<string, string> = {
    github: process.env.GITHUB_OAUTH_CLIENT_ID ?? "",
    vercel: process.env.VERCEL_OAUTH_CLIENT_ID ?? "",
    supabase: process.env.SUPABASE_OAUTH_CLIENT_ID ?? "",
  };

  const clientSecrets: Record<string, string> = {
    github: process.env.GITHUB_OAUTH_CLIENT_SECRET ?? "",
    vercel: process.env.VERCEL_OAUTH_CLIENT_SECRET ?? "",
    supabase: process.env.SUPABASE_OAUTH_CLIENT_SECRET ?? "",
  };

  const tokenEndpoint = tokenEndpoints[params.provider];
  const clientId = clientIds[params.provider];
  const clientSecret = clientSecrets[params.provider];

  if (!tokenEndpoint || !clientId) {
    return NextResponse.redirect(`${origin}/?oauth_error=unknown_provider`);
  }

  try {
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code,
    });

    const res = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body,
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(
        `OAuth token exchange failed for ${params.provider}:`,
        errText,
      );
      return NextResponse.redirect(
        `${origin}/?oauth_error=token_exchange_failed`,
      );
    }

    const data = await res.json();
    const token = (data as { access_token: string }).access_token;

    const response = NextResponse.redirect(
      `${origin}/?oauth_success=${params.provider}&token=${token}`,
    );
    response.cookies.set(`sbc-token-${params.provider}`, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 3600,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error(`OAuth callback error for ${params.provider}:`, err);
    return NextResponse.redirect(`${origin}/?oauth_error=exception`);
  }
}
