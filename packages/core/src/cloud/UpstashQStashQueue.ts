import type { CloudQueue, CloudQueueMessage, CloudQueueHandler, CloudQueueSubscription } from "./CloudQueue.js";

export class UpstashQStashQueue implements CloudQueue {
  private token: string;
  private baseUrl: string;
  private receiverBaseUrl?: string;

  constructor(options: { token: string; receiverBaseUrl?: string }) {
    this.token = options.token;
    this.baseUrl = "https://qstash.upstash.io";
    this.receiverBaseUrl = options.receiverBaseUrl;
  }

  private get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  async publish<T = unknown>(type: string, payload: T, options?: { delaySeconds?: number }): Promise<string> {
    if (!this.receiverBaseUrl) {
      throw new Error("UpstashQStashQueue requires receiverBaseUrl for publishing");
    }

    const body: Record<string, unknown> = {
      url: `${this.receiverBaseUrl}/api/queue/${type}`,
      body: JSON.stringify(payload),
    };

    if (options?.delaySeconds) {
      body.delay = `${options.delaySeconds}s`;
    }

    const res = await fetch(`${this.baseUrl}/v2/publish`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`QStash publish failed: ${await res.text()}`);

    const data = (await res.json()) as { messageId: string };
    return data.messageId;
  }

  async subscribe<T = unknown>(_type: string, _handler: CloudQueueHandler<T>): Promise<CloudQueueSubscription> {
    // In serverless, subscriptions are handled by API routes (e.g. /api/queue/[type])
    // No express server needed — Vercel/Next.js handles the HTTP endpoint
    return {
      unsubscribe: async () => {
        // No-op in serverless context
      },
    };
  }

  async ack(messageId: string): Promise<void> {
    await fetch(`${this.baseUrl}/v2/messages/${messageId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  async nack(messageId: string, delaySeconds?: number): Promise<void> {
    const body: Record<string, unknown> = {};
    if (delaySeconds) body.delay = `${delaySeconds}s`;

    await fetch(`${this.baseUrl}/v2/messages/${messageId}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  async purge(_type: string): Promise<void> {
    // QStash doesn't have a direct purge API
    // Messages are consumed or expire automatically
  }

  static parseMessage<T>(body: string, headers: Record<string, string>): CloudQueueMessage<T> {
    return {
      id: headers["upstash-message-id"] ?? "",
      type: headers["upstash-topic"] ?? "unknown",
      payload: JSON.parse(body) as T,
      attempts: parseInt(headers["upstash-retry-count"] ?? "0", 10),
      createdAt: Date.now(),
    };
  }
}
