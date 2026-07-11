import { test as base, expect } from "@playwright/test";

// Extend test with authenticated context
// The middleware checks for either a Supabase session OR legacy cloud tokens
// We inject a fake cloud token cookie to bypass the auth redirect
export const test = base.extend({
  // eslint-disable-next-line no-empty-pattern
  page: async ({ page }, use) => {
    await page.context().addCookies([
      {
        name: "sbc-token-github",
        value: "fake-github-token-for-e2e-testing",
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      },
    ]);

    await use(page);
  },
});

export { expect };
