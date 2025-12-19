const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('SauceDemo Login Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        // Navigate to login page before each test
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    // Scenario 1: Login with valid credentials
    test('Login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('standard_user', 'secret_sauce');

        // Assert successful navigation and inventory visible
        await expect(page).toHaveURL(/inventory\.html/);
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    // Scenario 2: Shows error for invalid password
    test('Login fails with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('standard_user', 'wrong_password');

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Username and password do not match any user in this service');
    });

    // Scenario 3: Login fails with invalid username
    test('Login fails with invalid username', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('invalid_user', 'secret_sauce');

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Username and password do not match any user in this service');
    });

    // Scenario 4: Blocks login when username is empty
    test('Login blocked when username is empty', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('', 'secret_sauce');

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Username is required');
    });

    // Scenario 5: Blocks login when password is empty
    test('Login blocked when password is empty', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('standard_user', '');

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Password is required');
    });

    // Scenario 6: Login with locked out user
    test('Login blocked for locked out user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('locked_out_user', 'secret_sauce');

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Sorry, this user has been locked out.');
    });

});
