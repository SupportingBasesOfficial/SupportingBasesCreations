import { createLogger, transports, format } from 'winston';

const { combine, timestamp, json, errors } = format;

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: {
    service: process.env.OTEL_SERVICE_NAME || 'sbc-app',
    environment: process.env.NODE_ENV || 'development',
  },
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export function logRequest(req: Request, res: Response, duration: number): void {
  logger.info('http_request', {
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    durationMs: duration,
    userAgent: req.headers['user-agent'],
    ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
  });
}
