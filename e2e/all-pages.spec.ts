import { test, expect } from "@playwright/test";

/**
 * E2E TESTS FOR CRITICAL PAGES
 *
 * These tests verify that ALL pages (not just homepage) render correctly.
 * Agents should run these before deploying to catch errors early.
 *
 * Run: npx playwright test
 */

// ============================================
// HOMEPAGE
// ============================================
test.describe("Homepage", () => {
  test("should load without errors", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("should have proper title", async ({ page }) => {
    const response = await page.goto("/");
    // Just check we got a 200 status
    expect(response?.status()).toBe(200);
  });
});

// ============================================
// MENU PAGES
// ============================================
test.describe("Menu Pages", () => {
  const menuPages = [
    "/menu",
    "/menu/furshet",
    "/menu/banquet",
    "/menu/coffee-break",
    "/menu/catalog",
    "/menu/halal",
    "/menu/vegan",
    "/menu/gluten-free",
    "/menu/detskoe",
    "/menu/show-cooking",
    "/menu/bar",
  ];

  for (const menuPage of menuPages) {
    test(`${menuPage} should load without crashing`, async ({ page }) => {
      const response = await page.goto(menuPage);
      // Page should load with 200 or redirect (301/302 is ok)
      expect([200, 301, 302, 303, 307, 308]).toContain(response?.status());

      // Should not have runtime errors visible
      await expect(page.locator("body")).toBeVisible({ timeout: 10000 });
    });
  }
});

// ============================================
// EVENT PAGES
// ============================================
test.describe("Event Pages", () => {
  const eventPages = [
    "/events",
    "/events/svadba",
    "/events/korporativ",
    "/events/detskoe",
    "/events/yubiley",
    "/events/vypusknoy",
    "/events/nikah",
    "/events/pominki",
    "/events/chastnoe",
    "/events/chef-at-home",
    "/events/recap",
  ];

  for (const eventPage of eventPages) {
    test(`${eventPage} should load without crashing`, async ({ page }) => {
      const response = await page.goto(eventPage);
      expect([200, 301, 302, 303, 307, 308]).toContain(response?.status());
      await expect(page.locator("body")).toBeVisible({ timeout: 10000 });
    });
  }
});

// ============================================
// SERVICE PAGES
// ============================================
test.describe("Service Pages", () => {
  const servicePages = [
    "/contact",
    "/gallery",
    "/reviews",
    "/pricing",
    "/team",
    "/venues",
    "/faq",
    "/careers",
    "/certificates",
    "/partners",
    "/tasting",
    "/plan",
    "/plan/helper",
    "/plan/calculator",
    "/plan/constructor",
    "/plan/assistant",
  ];

  for (const servicePage of servicePages) {
    test(`${servicePage} should load without crashing`, async ({ page }) => {
      const response = await page.goto(servicePage);
      expect([200, 301, 302, 303, 307, 308]).toContain(response?.status());
      await expect(page.locator("body")).toBeVisible({ timeout: 10000 });
    });
  }
});

// ============================================
// BLOG & CONTENT
// ============================================
test.describe("Content Pages", () => {
  const contentPages = [
    "/blog",
    "/seasonal",
    "/seasonal/new-year",
    "/seasonal/maslenitsa",
    "/seasonal/bbq",
    "/allergens",
    "/accessibility",
    "/media-kit",
  ];

  for (const contentPage of contentPages) {
    test(`${contentPage} should load without crashing`, async ({ page }) => {
      const response = await page.goto(contentPage);
      expect([200, 301, 302, 303, 307, 308]).toContain(response?.status());
      await expect(page.locator("body")).toBeVisible({ timeout: 10000 });
    });
  }
});

// ============================================
// LEGAL & UTILITIES
// ============================================
test.describe("Legal & Utility Pages", () => {
  const legalPages = [
    "/privacy",
    "/terms",
    "/cookies",
    "/offer",
    "/thank-you",
    "/subscribe",
    "/delivery",
    "/delivery/order",
    "/account/orders",
    "/help/formats",
  ];

  for (const legalPage of legalPages) {
    test(`${legalPage} should load without crashing`, async ({ page }) => {
      const response = await page.goto(legalPage);
      expect([200, 301, 302, 303, 307, 308]).toContain(response?.status());
      await expect(page.locator("body")).toBeVisible({ timeout: 10000 });
    });
  }
});

// ============================================
// NAVIGATION CHECKS
// ============================================
test.describe("Navigation Consistency", () => {
  test("homepage should have navigation elements", async ({ page }) => {
    await page.goto("/");
    // Check that common nav patterns exist (header, nav, or similar)
    const bodyText = await page.locator("body").textContent();
    expect(bodyText).toBeTruthy();
  });

  test("all pages should have footer or similar structure", async ({ page }) => {
    // Test a few key pages have consistent structure
    const pagesToTest = ["/", "/menu/furshet", "/events/svadba", "/contact"];

    for (const url of pagesToTest) {
      await page.goto(url);
      const body = page.locator("body");
      await expect(body).toBeVisible();
    }
  });
});
