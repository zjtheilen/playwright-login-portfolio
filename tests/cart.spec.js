// tests/cart.spec.js
const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/CartPage');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Cart functionality', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Add a single product to cart @smoke @regression', async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.addProduct('Sauce Labs Backpack');
        const items = await cartPage.getItems();
        expect(items).toContain('Sauce Labs Backpack');
    });

    test('Reset App State resets Add to Cart Buttons @regression', async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.addProduct('Sauce Labs Bike Light');
        await cartPage.resetAppState();

        // Buttons should reflect the reset state
        const product = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' });
        await expect(product.locator('button:has-text("Remove")')).not.toBeVisible();
        await expect(product.locator('button:has-text("Add to cart")')).toBeVisible();
    });

    test('Add multiple products to cart @regression', async ({ page }) => {
        const cartPage = new CartPage(page);

        const products = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];
        for (const product of products) {
            await cartPage.addProduct(product);
        }

        const items = await cartPage.getItems();
        expect(items).toEqual(expect.arrayContaining(products));
    });

    test('Cart retains items after page reload @regression', async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.addProduct('Sauce Labs Onesie');
        await page.reload();

        const items = await cartPage.getItems();
        expect(items).toContain('Sauce Labs Onesie');
    });

    test('Remove items from cart @regression', async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.addProduct('Sauce Labs Backpack');
        await cartPage.removeProduct('Sauce Labs Backpack');

        const items = await cartPage.getItems();
        expect(items).not.toContain('Sauce Labs Backpack');
    });

});
