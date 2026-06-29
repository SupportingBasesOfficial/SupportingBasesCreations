import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { prisma } from '../../db';

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return prisma.user.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.user.findUnique({ where: { id: input.id } });
    }),

  create: publicProcedure
    .input(z.object({
      email: z.string(),
      name: z.string(),
      role: z.enum(['ADMIN', 'USER', 'GUEST']),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))
    .mutation(async ({ input }) => {
      return prisma.user.create({ data: input });
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      email: z.string().optional(),
      name: z.string().optional(),
      role: z.enum(['ADMIN', 'USER', 'GUEST']).optional(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.user.update({ where: { id }, data });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.user.delete({ where: { id: input.id } });
    }),
});


import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { prisma } from '../../db';

export const organizationRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return prisma.organization.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return prisma.organization.findUnique({ where: { id: input.id } });
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      settings: z.record(z.unknown()).optional(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }))
    .mutation(async ({ input }) => {
      return prisma.organization.create({ data: input });
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      settings: z.record(z.unknown()).optional(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.organization.update({ where: { id }, data });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.organization.delete({ where: { id: input.id } });
    }),
});
