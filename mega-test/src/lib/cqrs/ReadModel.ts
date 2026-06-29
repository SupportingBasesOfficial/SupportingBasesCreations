import { prisma } from '../db';

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
