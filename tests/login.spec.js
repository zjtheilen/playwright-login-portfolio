const { test, expect } = require('@playwright/test');
const { login } = require('../utils/helpers');
const { LoginPage } = require('../pages/LoginPage');

test.describe('SauceDemo Login Tests', () => {

    // Smoke: critical login flows
    test('Login with valid credentials @smoke @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory\.html/);
    });

    test('Shows error for invalid password @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'wrong_password');

        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('Login with invalid username @regression', async ({ page }) => {
        await login(page, 'invalid_user', 'secret_sauce');

        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('Username and password do not match');
    });

    test('Blocks login when username is empty @regression', async ({ page }) => {
        await login(page, '', 'secret_sauce');

        const error = page.locator('[data-test="error"]');
        await expect(error).toContainText('Username is required');
    });

    test('Blocks login when password is empty @regression', async ({ page }) => {
        await login(page, 'standard_user', '');

        const error = page.locator('[data-test="error"]');
        await expect(error).toContainText('Password is required');
    });

    test('Login with locked out user @regression', async ({ page }) => {
        await login(page, 'locked_out_user', 'secret_sauce');

        const error = page.locator('[data-test="error"]');
        await expect(error).toContainText('Sorry, this user has been locked out');
    });

});
