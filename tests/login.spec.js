const { test, expect } = require('@playwright/test');
const { login } = require('../utils/helpers');
const { LoginPage } = require('../pages/LoginPage');

test.describe('SauceDemo Login Tests', () => {

    // Test Scenarios
    
    // Scenario 1: Login with valid credentials
    test('Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory\.html/);
    });
    // test('Login with valid credentials', async ({ page }) => {
    //     await login(page, 'standard_user', 'secret_sauce');

    //     await expect(page).toHaveURL(/inventory\.html/);
    //     await expect(page.locator('.inventory_list')).toBeVisible();
    // });

    // Scenario 2: Shows error for invalid password
    test('Shows error for invalid password', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'wrong_password');
        await page.click('[data-test="login-button"]');

        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('Username and password do not match');
    });

    // Scenario 3: Login with invalid username
    test('Login with invalid username', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        await page.fill('[data-test="username"]', 'invalid_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('Username and password do not match');
    });

    // Scenario 4: Blocks login when username is empty
    test('Blocks login when username is empty', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        const error = page.locator('[data-test="error"]');
        await expect(error).toContainText('Username is required');
    });

    // Scenario 5: Blocks login when password is empty
    test('Blocks login when password is empty', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        await page.fill('[data-test="username"]', 'standard_user');
        await page.click('[data-test="login-button"]');

        const error = page.locator('[data-test="error"]');
        await expect(error).toContainText('Password is required');
    });

    // Scenario 6: Login with locked out user
    test('Login with locked out user', async ({ page }) => {
        await page.goto('https://www.saucedemo.com');

        await page.fill('[data-test="username"]', 'locked_out_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');

        const error = page.locator('[data-test="error"]');
        await expect(error).toContainText('Sorry, this user has been locked out');
    });

});