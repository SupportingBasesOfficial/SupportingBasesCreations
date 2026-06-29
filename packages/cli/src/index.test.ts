import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import { mkdtempSync, writeFileSync, existsSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

const CLI_PATH = join(__dirname, '..', '..', '..', 'packages', 'cli', 'dist', 'index.js');

describe('CLI Integration', () => {
  let tempDir: string;

  beforeAll(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'sbc-cli-test-'));
  });

  afterAll(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  it('should show version', () => {
    const out = execSync(`node ${CLI_PATH} --version`, { encoding: 'utf-8' });
    expect(out.trim()).toBe('1.0.0');
  });

  it('should generate a project with default template', () => {
    const outputDir = join(tempDir, 'default-project');
    execSync(`node ${CLI_PATH} generate -n test-app -o ${outputDir} --dry-run`, { encoding: 'utf-8' });
    // dry run should not create files
    expect(existsSync(outputDir)).toBe(false);
  });

  it('should reject invalid project names', () => {
    expect(() => {
      execSync(`node ${CLI_PATH} generate -n "Bad Name"`, { encoding: 'utf-8' });
    }).toThrow();
  });

  it('should validate a config file', () => {
    const configPath = join(tempDir, 'valid.config.json');
    writeFileSync(configPath, JSON.stringify({
      name: 'config-app',
      architecture: 'MODULAR_MONOLITH',
      entities: [
        {
          name: 'User',
          fields: [{ name: 'id', type: 'UUID', options: {} }],
          options: {},
        },
      ],
    }));

    const out = execSync(`node ${CLI_PATH} validate -c ${configPath}`, { encoding: 'utf-8' });
    expect(out).toContain('Configuration is valid');
  });

  it('should reject invalid config file', () => {
    const configPath = join(tempDir, 'invalid.config.json');
    writeFileSync(configPath, JSON.stringify({
      name: 'bad name with spaces',
      architecture: 'UNKNOWN_ARCH',
    }));

    expect(() => {
      execSync(`node ${CLI_PATH} validate -c ${configPath}`, { encoding: 'utf-8' });
    }).toThrow();
  });

  it('should run health check', () => {
    const out = execSync(`node ${CLI_PATH} health`, { encoding: 'utf-8' });
    expect(out).toContain('Status:');
  });
});
