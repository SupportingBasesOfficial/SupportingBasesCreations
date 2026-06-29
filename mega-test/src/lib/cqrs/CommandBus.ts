export interface Command {
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
      throw new Error(`No handler registered for command type '${command.type}'`);
    }
    return handler(command);
  }
}

export const commandBus = new CommandBus();
