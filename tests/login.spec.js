const { test, expect } = require('@playwright/test');
const { login } = require('../utils/helpers');

test.describe('SauceDemo Login Tests', () => {
    
    test('Login with valid credentials', async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test('Shows error for invalid password', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'wrong_password');
        await page.click('[data-test="login-button"]');

        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('Username and password do not match');
    });

    test('Login with invalid username', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        await page.fill('[data-test="username"]', 'invalid_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('Username and password do not match');
    });

    test('Blocks login when username is empty', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        const error = page.locator('[data-test="error"]');
        await expect(error).toContainText('Username is required');
    });

    test('Blocks login when password is empty', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        await page.fill('[data-test="username"]', 'standard_user');
        await page.click('[data-test="login-button"]');

        const error = page.locator('[data-test="error"]');
        await expect(error).toContainText('Password is required');
    });

    test('Login with locked out user', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        await page.fill('[data-test="username"]', 'locked_out_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        const error = page.locator('[data-test="error"]');
        await expect(error).toContainText('Sorry, this user has been locked out');
    });

});