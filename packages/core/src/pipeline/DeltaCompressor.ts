import type { CloudMutation } from "@sbc/shared";

export class DeltaCompressor {
  private previousState = new Map<string, Record<string, unknown>>();

  snapshot(nodeId: string, state: Record<string, unknown>): void {
    this.previousState.set(nodeId, JSON.parse(JSON.stringify(state)));
  }

  compress(mutation: CloudMutation): CloudMutation | null {
    const prev = this.previousState.get(mutation.nodeId);

    if (mutation.action === "CREATE" || !prev) {
      this.previousState.set(
        mutation.nodeId,
        JSON.parse(JSON.stringify(mutation.payload)),
      );
      return mutation;
    }

    if (mutation.action === "DELETE") {
      this.previousState.delete(mutation.nodeId);
      return mutation;
    }

    const delta: Record<string, unknown> = {};
    let hasChanges = false;

    for (const [k, v] of Object.entries(mutation.payload)) {
      const prevVal = prev[k];
      if (JSON.stringify(prevVal) !== JSON.stringify(v)) {
        delta[k] = v;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return null;
    }

    this.previousState.set(
      mutation.nodeId,
      JSON.parse(JSON.stringify(mutation.payload)),
    );

    return {
      ...mutation,
      payload: delta,
    };
  }

  clear(): void {
    this.previousState.clear();
  }
}
