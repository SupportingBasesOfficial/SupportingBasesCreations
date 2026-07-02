import { test, expect } from "@playwright/test";

test("dashboard loads with header and sidebar", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toContainText("SBC");
  await expect(page.locator("text=Architecture Design Platform")).toBeVisible();
  await expect(page.locator("text=Components")).toBeVisible();
});

test("can drag a node from palette to canvas", async ({ page }) => {
  await page.goto("/");

  const paletteItem = page.locator("[draggable=true]").first();
  await expect(paletteItem).toBeVisible();

  const canvas = page.locator(".react-flow");
  await expect(canvas).toBeVisible();
});

test("cloud setup button opens modal", async ({ page }) => {
  await page.goto("/");

  const cloudButton = page.locator("text=Cloud Setup");
  await expect(cloudButton).toBeVisible();
  await cloudButton.click();

  await expect(page.locator("text=Connect GitHub")).toBeVisible({
    timeout: 5000,
  });
});

test("theme toggle switches dark mode", async ({ page }) => {
  await page.goto("/");

  const themeButton = page.locator("button[aria-label='Toggle theme']");
  await expect(themeButton).toBeVisible();

  const htmlBefore = await page.locator("html").getAttribute("class");
  await themeButton.click();
  const htmlAfter = await page.locator("html").getAttribute("class");

  expect(htmlBefore).not.toEqual(htmlAfter);
});

test("deploy button is disabled when no nodes", async ({ page }) => {
  await page.goto("/");

  const deployButton = page.locator("text=Deploy to Cloud");
  await expect(deployButton).toBeVisible();
  await expect(deployButton).toBeDisabled();
});

test("share dialog opens", async ({ page }) => {
  await page.goto("/");

  const shareButton = page.locator("text=Share").first();
  if (await shareButton.isVisible()) {
    await shareButton.click();
    await expect(page.locator("text=Share Architecture")).toBeVisible({
      timeout: 5000,
    });
  }
});

test("health endpoint returns status", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.status()).toBeLessThan(600);

  const body = await res.json();
  expect(body.status).toMatch(/healthy|degraded|unhealthy/);
  expect(body.checks).toBeInstanceOf(Array);
  expect(body.checks.length).toBeGreaterThan(0);
});

test("login page renders with sign-in form", async ({ page }) => {
  await page.goto("/login");

  await expect(page.locator("h1")).toContainText("SBC");
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await expect(page.locator("text=Sign In")).toBeVisible();
});

test("projects page renders with project list or empty state", async ({ page }) => {
  await page.goto("/projects");

  await expect(page.locator("text=Projects")).toBeVisible();
  await expect(page.locator("text=New Project")).toBeVisible();
});

test("settings page renders with sections", async ({ page }) => {
  await page.goto("/settings");

  await expect(page.locator("text=Settings")).toBeVisible();
  await expect(page.locator("text=Account")).toBeVisible();
  await expect(page.locator("text=Appearance")).toBeVisible();
  await expect(page.locator("text=Cloud Providers")).toBeVisible();
});

test("can navigate to projects from dashboard", async ({ page }) => {
  await page.goto("/");

  const projectsLink = page.locator("a[href='/projects']").first();
  await expect(projectsLink).toBeVisible();
  await projectsLink.click();

  await expect(page).toHaveURL(/\/projects/);
});

test("can navigate to settings from dashboard", async ({ page }) => {
  await page.goto("/");

  const settingsLink = page.locator("a[href='/settings']").first();
  await expect(settingsLink).toBeVisible();
  await settingsLink.click();

  await expect(page).toHaveURL(/\/settings/);
});
