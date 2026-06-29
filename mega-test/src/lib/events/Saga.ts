import { eventBus, type DomainEvent } from './EventBus';

export interface SagaStep {
  name: string;
  action: () => Promise<void>;
  compensate?: () => Promise<void>;
}

export class Saga {
  private steps: SagaStep[] = [];

  step(step: SagaStep): this {
    this.steps.push(step);
    return this;
  }

  async execute(): Promise<void> {
    const completed: SagaStep[] = [];

    try {
      for (const step of this.steps) {
        await step.action();
        completed.push(step);
      }
    } catch (error) {
      for (const step of completed.reverse()) {
        if (step.compensate) {
          await step.compensate().catch((err) => {
            console.error(`Compensation failed for ${step.name}:`, err);
          });
        }
      }
      throw error;
    }
  }
}

export class SagaOrchestrator {
  private sagas: Map<string, Saga> = new Map();

  register(name: string, saga: Saga): void {
    this.sagas.set(name, saga);
  }

  async run(name: string): Promise<void> {
    const saga = this.sagas.get(name);
    if (!saga) throw new Error(`Saga '${name}' not found`);
    await saga.execute();
  }
}
