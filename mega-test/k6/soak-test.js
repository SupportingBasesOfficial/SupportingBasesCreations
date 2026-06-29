import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10m', target: 50 },
    { duration: '4h', target: 50 },
    { duration: '10m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get(`${__ENV.BASE_URL}/api/health`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(Math.random() * 3 + 1);
}
