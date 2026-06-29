import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    http_req_duration: ['max<1000'],
    http_req_failed: ['rate===0'],
  },
};

const endpoints = [
  '/api/health',
  '/api/auth/session',
  '/api/users',
];

export default function () {
  for (const endpoint of endpoints) {
    const res = http.get(`${__ENV.BASE_URL}${endpoint}`);

    check(res, {
      [`${endpoint} status ok`]: (r) => r.status < 500,
    });
  }
}
