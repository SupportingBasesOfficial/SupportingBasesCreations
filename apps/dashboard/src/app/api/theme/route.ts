import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "../../../lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { theme } = await request.json() as { theme?: string };

  if (!theme || (theme !== "light" && theme !== "dark")) {
    return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
  }

  if (user) {
    await supabase
      .from("user_settings")
      .upsert({
        user_id: user.id,
        theme,
        updated_at: new Date().toISOString(),
      });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("sbc-theme", theme, {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}
