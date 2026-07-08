import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { createServerSupabaseClient } from "../../../lib/supabase-server";

interface PluginRegistration {
  name: string;
  version: string;
  entry: string; // npm package or URL
  config?: Record<string, unknown>;
}

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      {
        error:
          "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required",
      },
      { status: 500 },
    );
  }

  try {
    const body = (await req.json()) as PluginRegistration;

    if (!body.name || !body.entry) {
      return NextResponse.json(
        { error: "name and entry are required" },
        { status: 400 },
      );
    }

    const pluginKey = `plugin:${body.name}`;
    const pluginData = JSON.stringify({
      name: body.name,
      version: body.version ?? "1.0.0",
      entry: body.entry,
      config: body.config ?? {},
      registeredAt: new Date().toISOString(),
    });

    await redis.set(pluginKey, pluginData);

    return NextResponse.json({
      success: true,
      plugin: { name: body.name, version: body.version, entry: body.entry },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to register plugin", details: String(err) },
      { status: 500 },
    );
  }
}

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      {
        error:
          "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required",
      },
      { status: 500 },
    );
  }

  try {
    const scanResult = await redis.scan(0, { match: "plugin:*", count: 100 });
    const keys = scanResult[1] as string[];

    const plugins: Array<Record<string, unknown>> = [];
    for (const key of keys) {
      const data = await redis.get(key);
      if (data) {
        plugins.push(JSON.parse(data as string));
      }
    }

    return NextResponse.json({ plugins });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to list plugins", details: String(err) },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      {
        error:
          "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required",
      },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { error: "name query parameter is required" },
      { status: 400 },
    );
  }

  try {
    await redis.del(`plugin:${name}`);
    return NextResponse.json({ success: true, deleted: name });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete plugin", details: String(err) },
      { status: 500 },
    );
  }
}
