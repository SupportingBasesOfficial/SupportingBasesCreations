import { eventBus } from '../EventBus';
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
