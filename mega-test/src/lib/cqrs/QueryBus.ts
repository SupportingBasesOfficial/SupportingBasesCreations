export interface Query {
  type: string;
  filters?: Record<string, unknown>;
  pagination?: { page: number; limit: number };
  sort?: { field: string; direction: 'asc' | 'desc' };
}

export type QueryHandler<T extends Query = Query, R = unknown> = (query: T) => Promise<R>;

export class QueryBus {
  private handlers: Map<string, QueryHandler> = new Map();

  register<T extends Query, R>(type: string, handler: QueryHandler<T, R>): void {
    this.handlers.set(type, handler as QueryHandler);
  }

  async query<T extends Query, R>(query: T): Promise<R> {
    const handler = this.handlers.get(query.type);
    if (!handler) {
      throw new Error(`No handler registered for query type '${query.type}'`);
    }
    return handler(query) as Promise<R>;
  }
}

export const queryBus = new QueryBus();
