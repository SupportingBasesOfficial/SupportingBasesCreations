export interface CloudQueueMessage<T = unknown> {
  id: string;
  type: string;
  payload: T;
  attempts: number;
  createdAt: number;
}

export type CloudQueueHandler<T = unknown> = (message: CloudQueueMessage<T>) => Promise<void>;

export interface CloudQueueSubscription {
  unsubscribe(): Promise<void>;
}

export interface CloudQueue {
  publish<T = unknown>(type: string, payload: T, options?: { delaySeconds?: number }): Promise<string>;
  subscribe<T = unknown>(type: string, handler: CloudQueueHandler<T>): Promise<CloudQueueSubscription>;
  ack(messageId: string): Promise<void>;
  nack(messageId: string, delaySeconds?: number): Promise<void>;
  purge(type: string): Promise<void>;
}
