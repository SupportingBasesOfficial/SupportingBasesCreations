import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "../../../lib/supabaseServer";

export async function GET() {
  try {
    const { data, error } = await getSupabaseServer()
      .from("user_settings")
      .select("cloud_config_encrypted")
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      cloud_config: data?.cloud_config_encrypted ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cloud_config } = body as { cloud_config: unknown };

    if (!cloud_config) {
      return NextResponse.json(
        { error: "Missing cloud_config" },
        { status: 400 },
      );
    }

    const { data, error } = await getSupabaseServer()
      .from("user_settings")
      .upsert(
        { cloud_config_encrypted: cloud_config },
        { onConflict: "user_id" },
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 },
    );
  }
}
