import type { CloudMutation } from "@sbc/shared";

const DEFAULT_COOLDOWN_MS = 2000;

export class LeakyBucket {
  private queue = new Map<string, CloudMutation>();
  private timers = new Map<string, ReturnType<typeof setTimeout>>();
  private cooldownMs: number;
  private dispatchFn: ((mutation: CloudMutation) => Promise<void>) | null =
    null;
  private rollbackFn: ((nodeId: string, reason: unknown) => void) | null = null;

  constructor(cooldownMs = DEFAULT_COOLDOWN_MS) {
    this.cooldownMs = cooldownMs;
  }

  onDispatch(fn: (mutation: CloudMutation) => Promise<void>): void {
    this.dispatchFn = fn;
  }

  onRollback(fn: (nodeId: string, reason: unknown) => void): void {
    this.rollbackFn = fn;
  }

  queueMutation(mutation: CloudMutation): void {
    const key = `${mutation.projectId}:${mutation.nodeId}`;

    const pastMutation = this.queue.get(key);
    if (pastMutation) {
      if (pastMutation.action === "CREATE" && mutation.action === "UPDATE") {
        mutation.action = "CREATE";
      }
      if (pastMutation.action === "CREATE" && mutation.action === "DELETE") {
        this.queue.delete(key);
        this.clearTimer(key);
        return;
      }
    }

    this.queue.set(key, mutation);
    this.triggerDebounce(key);
  }

  flush(): Promise<void[]> {
    const keys = Array.from(this.queue.keys());
    return Promise.all(keys.map((key) => this.dispatch(key)));
  }

  clear(): void {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers.clear();
    this.queue.clear();
  }

  size(): number {
    return this.queue.size;
  }

  private triggerDebounce(key: string): void {
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key)!);
    }

    const timer = setTimeout(() => {
      this.dispatch(key).catch((err) => {
        const mutation = this.queue.get(key);
        if (mutation && this.rollbackFn) {
          this.rollbackFn(mutation.nodeId, err);
        }
      });
    }, this.cooldownMs);

    this.timers.set(key, timer);
  }

  private async dispatch(key: string): Promise<void> {
    const mutation = this.queue.get(key);
    if (!mutation) return;

    this.queue.delete(key);
    this.clearTimer(key);

    if (this.dispatchFn) {
      try {
        await this.dispatchFn(mutation);
      } catch (err) {
        if (this.rollbackFn) {
          this.rollbackFn(mutation.nodeId, err);
        }
        throw err;
      }
    }
  }

  private clearTimer(key: string): void {
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }
}
