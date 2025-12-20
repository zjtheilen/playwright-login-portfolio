// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import 'dotenv/config';

const { SAUCE_USER, SAUCE_PASS } = process.env;

test.describe('SauceDemo Login Tests', () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Login with valid credentials @smoke @regression', async ({ page }) => {
        await loginPage.login(process.env.SAUCE_USER, process.env.SAUCE_PASS);
        await expect(page).toHaveURL(/inventory\.html/);
    });

    test('Shows error for invalid password @regression', async ({ page }) => {
        await loginPage.login(process.env.SAUCE_USER, 'wrong_password');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    });

    test('Login with invalid username @regression', async ({ page }) => {
        await loginPage.login('invalid_user', process.env.SAUCE_PASS);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    });

    test('Blocks login when username is empty @regression', async ({ page }) => {
        await loginPage.login('', process.env.SAUCE_PASS, true);
        await expect(loginPage.errorMessage).toContainText('Username is required');
    });

    test('Blocks login when password is empty @regression', async ({ page }) => {
        await loginPage.login('standard_user', '', true); // allow empty password
        await expect(loginPage.errorMessage).toContainText('Password is required');
    });

    test('Login with locked out user @regression', async ({ page }) => {
        await loginPage.login('locked_out_user', process.env.SAUCE_PASS);
        await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
    });

});
