export interface DomainEvent {
  id: string;
  type: string;
  aggregateId: string;
  aggregateType: string;
  payload: unknown;
  timestamp: Date;
  version: number;
}

export type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => Promise<void>;

export class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  subscribe<T extends DomainEvent>(eventType: string, handler: EventHandler<T>): void {
    const existing = this.handlers.get(eventType) ?? [];
    existing.push(handler as EventHandler);
    this.handlers.set(eventType, existing);
  }

  async publish<T extends DomainEvent>(event: T): Promise<void> {
    const handlers = this.handlers.get(event.type) ?? [];
    await Promise.all(handlers.map((h) => h(event)));
  }

  async publishAll(events: DomainEvent[]): Promise<void> {
    await Promise.all(events.map((e) => this.publish(e)));
  }
}

export const eventBus = new EventBus();
