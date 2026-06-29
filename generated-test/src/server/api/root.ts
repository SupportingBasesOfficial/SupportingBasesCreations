import { createTRPCRouter } from './trpc';
import { userRouter } from './routers/user';
import { organizationRouter } from './routers/organization';

export const appRouter = createTRPCRouter({
  user: userRouter,
  organization: organizationRouter,
});

export type AppRouter = typeof appRouter;
