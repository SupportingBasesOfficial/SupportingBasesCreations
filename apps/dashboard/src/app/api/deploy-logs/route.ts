import { NextRequest, NextResponse } from "next/server";
import { UpstashRedisKV } from "@sbc/core";
import { createServerSupabaseClient } from "../../../lib/supabase-server";

export const runtime = "nodejs";

function getKV(): UpstashRedisKV | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new UpstashRedisKV({ url, token });
}

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deployId = request.nextUrl.searchParams.get("deployId");

  if (!deployId) {
    return NextResponse.json({ error: "Missing deployId" }, { status: 400 });
  }

  const kv = getKV();
  if (!kv) {
    return NextResponse.json(
      { error: "Logs storage not configured (Upstash Redis required)" },
      { status: 503 },
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const logKey = `deploy-logs:${deployId}`;
      let lastOffset = 0;

      const sendLogs = async () => {
        const logs = await kv.lrange(logKey, lastOffset, -1);
        if (logs && logs.length > 0) {
          for (const log of logs) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ log })}\n\n`),
            );
          }
          lastOffset += logs.length;
        }
      };

      await sendLogs();

      const status = await kv.get(`deploy-status:${deployId}`);
      if (status === "complete" || status === "failed") {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ done: true, status })}\n\n`),
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
        return;
      }

      let closed = false;

      const closeStream = () => {
        if (closed) return;
        closed = true;
        clearInterval(interval);
        clearTimeout(timeout);
        controller.close();
      };

      const interval = setInterval(async () => {
        await sendLogs();

        const currentStatus = await kv.get(`deploy-status:${deployId}`);
        if (currentStatus === "complete" || currentStatus === "failed") {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ done: true, status: currentStatus })}\n\n`,
            ),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          closeStream();
        }
      }, 2000);

      const timeout = setTimeout(() => {
        closeStream();
      }, 120000);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const kv = getKV();
  if (!kv) {
    return NextResponse.json(
      { error: "Logs storage not configured" },
      { status: 503 },
    );
  }

  try {
    const { deployId, log, status } = (await request.json()) as {
      deployId: string;
      log?: string;
      status?: string;
    };

    if (!deployId) {
      return NextResponse.json({ error: "Missing deployId" }, { status: 400 });
    }

    if (log) {
      await kv.rpush(`deploy-logs:${deployId}`, log);
    }

    if (status) {
      await kv.set(`deploy-status:${deployId}`, status);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to store log" }, { status: 500 });
  }
}
