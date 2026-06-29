import { prisma } from '../db';
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
