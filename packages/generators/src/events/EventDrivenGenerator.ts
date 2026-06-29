import { Project, FeatureFlag, ArchitectureType } from '@sbc/core';
import type { Generator, GenerationContext } from '@sbc/core';
import type { GeneratedArtifact } from '@sbc/shared';

export class EventDrivenGenerator implements Generator {
  readonly name = 'event-driven';
  readonly version = '1.0.0';
  readonly supportedFeatures: readonly FeatureFlag[] = [FeatureFlag.AUDIT_LOG];
  readonly supportedArchitectures: readonly ArchitectureType[] = [
    ArchitectureType.MODULAR_MONOLITH,
    ArchitectureType.MICROSERVICES,
  ];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    artifacts.push({
      path: 'src/lib/events/EventBus.ts',
      content: this.generateEventBus(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/events/EventStore.ts',
      content: this.generateEventStore(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/events/Saga.ts',
      content: this.generateSaga(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/events/handlers/UserEvents.ts',
      content: this.generateUserEventHandlers(project),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/cqrs/CommandBus.ts',
      content: this.generateCommandBus(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/cqrs/QueryBus.ts',
      content: this.generateQueryBus(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'src/lib/cqrs/ReadModel.ts',
      content: this.generateReadModel(),
      language: 'typescript',
    });

    artifacts.push({
      path: 'docker-compose.kafka.yml',
      content: this.generateKafkaCompose(),
      language: 'yaml',
    });

    return artifacts;
  }

  private generateEventBus(): string {
    return `export interface DomainEvent {
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
`;
  }

  private generateEventStore(): string {
    return `import { prisma } from '../db';
import type { DomainEvent } from './EventBus';

export class EventStore {
  async append(event: DomainEvent): Promise<void> {
    await prisma.event.create({
      data: {
        id: event.id,
        type: event.type,
        aggregateId: event.aggregateId,
        aggregateType: event.aggregateType,
        payload: JSON.stringify(event.payload),
        timestamp: event.timestamp,
        version: event.version,
      },
    });
  }

  async getEvents(aggregateId: string): Promise<DomainEvent[]> {
    const rows = await prisma.event.findMany({
      where: { aggregateId },
      orderBy: { version: 'asc' },
    });

    return rows.map((row) => ({
      ...row,
      payload: JSON.parse(row.payload as string),
    })) as DomainEvent[];
  }

  async getAllEvents(after?: Date): Promise<DomainEvent[]> {
    const rows = await prisma.event.findMany({
      where: after ? { timestamp: { gt: after } } : undefined,
      orderBy: { timestamp: 'asc' },
    });

    return rows.map((row) => ({
      ...row,
      payload: JSON.parse(row.payload as string),
    })) as DomainEvent[];
  }
}

export const eventStore = new EventStore();
`;
  }

  private generateSaga(): string {
    return `import { eventBus, type DomainEvent } from './EventBus';

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
            console.error(\`Compensation failed for \${step.name}:\`, err);
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
    if (!saga) throw new Error(\`Saga '\${name}' not found\`);
    await saga.execute();
  }
}
`;
  }

  private generateUserEventHandlers(_project: Project): string {
    return `import { eventBus } from '../EventBus';
import { logger } from '../../observability/logger';

export function registerUserEventHandlers(): void {
  eventBus.subscribe('user.created', async (event) => {
    logger.info('User created', { userId: event.aggregateId, payload: event.payload });
    // TODO: Send welcome email, create default organization, etc.
  });

  eventBus.subscribe('user.updated', async (event) => {
    logger.info('User updated', { userId: event.aggregateId, payload: event.payload });
    // TODO: Invalidate cache, update search index, etc.
  });

  eventBus.subscribe('user.deleted', async (event) => {
    logger.warn('User deleted', { userId: event.aggregateId });
    // TODO: GDPR data cleanup, revoke sessions, etc.
  });
}
`;
  }

  private generateCommandBus(): string {
    return `export interface Command {
  type: string;
  payload: unknown;
  metadata?: {
    userId?: string;
    tenantId?: string;
    correlationId?: string;
    timestamp?: Date;
  };
}

export type CommandHandler<T extends Command = Command> = (command: T) => Promise<unknown>;

export class CommandBus {
  private handlers: Map<string, CommandHandler> = new Map();

  register<T extends Command>(type: string, handler: CommandHandler<T>): void {
    this.handlers.set(type, handler as CommandHandler);
  }

  async execute<T extends Command>(command: T): Promise<unknown> {
    const handler = this.handlers.get(command.type);
    if (!handler) {
      throw new Error(\`No handler registered for command type '\${command.type}'\`);
    }
    return handler(command);
  }
}

export const commandBus = new CommandBus();
`;
  }

  private generateQueryBus(): string {
    return `export interface Query {
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
      throw new Error(\`No handler registered for query type '\${query.type}'\`);
    }
    return handler(query) as Promise<R>;
  }
}

export const queryBus = new QueryBus();
`;
  }

  private generateReadModel(): string {
    return `import { prisma } from '../db';

export interface ReadModel<T> {
  findById(id: string): Promise<T | null>;
  findAll(options?: { page?: number; limit?: number }): Promise<T[]>;
  search(query: string): Promise<T[]>;
}

export class UserReadModel implements ReadModel<{ id: string; email: string; name: string; role: string }> {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true },
    });
  }

  async findAll(options = { page: 1, limit: 20 }) {
    return prisma.user.findMany({
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      select: { id: true, email: true, name: true, role: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async search(query: string) {
    return prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: { id: true, email: true, name: true, role: true },
      take: 20,
    });
  }
}
`;
  }

  private generateKafkaCompose(): string {
    return `version: '3.8'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
    image: confluentinc/cp-kafka:latest
    ports:
      - '9092:9092'
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  kafdrop:
    image: obsidiandynamics/kafdrop:latest
    ports:
      - '9000:9000'
    environment:
      KAFKA_BROKERCONNECT: kafka:9092
`;
  }
}
