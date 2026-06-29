import { Pact } from '@pact-foundation/pact';
import path from 'path';

const provider = new Pact({
  consumer: 'frontend-web',
  provider: 'api-service',
  port: 1234,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'warn',
});

describe('Pact Consumer Tests', () => {
  beforeAll(() => provider.setup());
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  describe('User API', () => {
    it('returns a user by id', async () => {
      await provider.addInteraction({
        state: 'user exists',
        uponReceiving: 'a request for a user by id',
        withRequest: {
          method: 'GET',
          path: '/api/users/123',
          headers: { Authorization: 'Bearer token' },
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: {
            id: '123',
            email: 'test@example.com',
            name: 'Test User',
            role: 'USER',
          },
        },
      });

      const res = await fetch('http://localhost:1234/api/users/123', {
        headers: { Authorization: 'Bearer token' },
      });

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.id).toBe('123');
    });
  });
});
