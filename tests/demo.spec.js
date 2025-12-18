// tests/demo.spec.js
const { test, expect } = require('@playwright/test');

test('basic page load', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveTitle(/Swag Labs/);
});
