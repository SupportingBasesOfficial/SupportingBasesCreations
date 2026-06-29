export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function getEnvLevel(): LogLevel {
  const env = (process.env.SBC_LOG_LEVEL ?? 'info').toLowerCase() as LogLevel;
  return LEVEL_ORDER[env] !== undefined ? env : 'info';
}

function isJsonFormat(): boolean {
  return process.env.SBC_LOG_FORMAT === 'json';
}

export class StructuredLogger {
  private level: LogLevel;

  constructor(private name: string) {
    this.level = getEnvLevel();
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVEL_ORDER[level] >= LEVEL_ORDER[this.level];
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: { logger: this.name, ...context },
    };

    if (isJsonFormat()) {
      process.stdout.write(JSON.stringify(entry) + '\n');
    } else {
      const prefix = `[${entry.timestamp}] [${level.toUpperCase()}] [${this.name}]`;
      const contextStr = context ? ' ' + JSON.stringify(context) : '';
      const output = `${prefix} ${message}${contextStr}`;
      if (level === 'error') {
        process.stderr.write(output + '\n');
      } else {
        process.stdout.write(output + '\n');
      }
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.log('error', message, context);
  }
}
