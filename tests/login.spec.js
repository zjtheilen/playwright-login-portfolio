// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('SauceDemo Login Tests', () => {

    // Smoke: critical login flow
    test('Login with valid credentials @smoke @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory\.html/);
    });

    // Regression: negative login scenarios
    test('Shows error for invalid password @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'wrong_password');

        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('Login with invalid username @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('invalid_user', 'secret_sauce');

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    });

    test('Blocks login when username is empty @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('', 'secret_sauce');

        await expect(loginPage.errorMessage).toContainText('Username is required');
    });

    test('Blocks login when password is empty @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', '');

        await expect(loginPage.errorMessage).toContainText('Password is required');
    });

    test('Login with locked out user @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('locked_out_user', 'secret_sauce');

        await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
    });

});
