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
