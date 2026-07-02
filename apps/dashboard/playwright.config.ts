import { defineConfig, devices } from "@playwright/test";

const cloudUrl = process.env.BASE_URL ?? process.env.DASHBOARD_URL;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: cloudUrl ?? "http://localhost:3002",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  ...(cloudUrl
    ? {}
    : {
        webServer: {
          command: "pnpm dev",
          url: "http://localhost:3002",
          reuseExistingServer: !process.env.CI,
          timeout: 120000,
        },
      }),
});
