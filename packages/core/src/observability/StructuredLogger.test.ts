import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { StructuredLogger } from './StructuredLogger.js';

describe('StructuredLogger', () => {
  let stdoutSpy: ReturnType<typeof vi.spyOn>;
  let stderrSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    stdoutSpy = vi.spyOn(process.stdout as any, 'write').mockReturnValue(true);
    stderrSpy = vi.spyOn(process.stderr as any, 'write').mockReturnValue(true);
    delete process.env.SBC_LOG_LEVEL;
    delete process.env.SBC_LOG_FORMAT;
  });

  afterEach(() => {
    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
  });

  it('should log info by default', () => {
    const logger = new StructuredLogger('test');
    logger.info('hello');
    expect(stdoutSpy).toHaveBeenCalled();
    const call = stdoutSpy.mock.calls[0][0] as string;
    expect(call).toContain('[INFO]');
    expect(call).toContain('hello');
  });

  it('should respect log level', () => {
    process.env.SBC_LOG_LEVEL = 'warn';
    const logger = new StructuredLogger('test');
    logger.info('hidden');
    logger.warn('visible');
    expect(stdoutSpy).toHaveBeenCalledOnce();
    const call = stdoutSpy.mock.calls[0][0] as string;
    expect(call).toContain('visible');
  });

  it('should output JSON when SBC_LOG_FORMAT=json', () => {
    process.env.SBC_LOG_FORMAT = 'json';
    const logger = new StructuredLogger('test');
    logger.info('json-msg', { key: 'val' });
    expect(stdoutSpy).toHaveBeenCalledOnce();
    const line = stdoutSpy.mock.calls[0][0] as string;
    const parsed = JSON.parse(line);
    expect(parsed.level).toBe('info');
    expect(parsed.message).toBe('json-msg');
    expect(parsed.context.key).toBe('val');
    expect(parsed.timestamp).toBeDefined();
  });

  it('should write errors to stderr in plain mode', () => {
    const logger = new StructuredLogger('test');
    logger.error('fail');
    expect(stderrSpy).toHaveBeenCalledOnce();
    const call = stderrSpy.mock.calls[0][0] as string;
    expect(call).toContain('[ERROR]');
    expect(call).toContain('fail');
  });
});
