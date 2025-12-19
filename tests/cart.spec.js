// tests/cart.spec.js
const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/CartPage');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Cart functionality', () => {

    let cartPage;
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.SAUCE_USER, process.env.SAUCE_PASS);
    });

    test('Add a single product to cart @smoke @regression', async ({ page }) => {
        await cartPage.addProduct('Sauce Labs Backpack');
        const items = await cartPage.getCartItems();
        expect(items).toContain('Sauce Labs Backpack');
    });

    test('Reset App State resets Add to Cart Buttons @regression', async ({ page }) => {
        test.fail(true, 'Known bug: Reset App State does not reset item buttons on SauceDemo');

        await addToCart(page, 'Sauce Labs Bike Light');
        await resetAppState(page);

        const addButton = page.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]');
        const removeButton = page.locator('button[data-test="remove-sauce-labs-bike-light"]');

        await expect(removeButton).not.toBeVisible();
        await expect(addButton).toBeVisible();
    });

    test('Add multiple products to cart @regression', async ({ page }) => {
        const products = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];
        for (const product of products) {
            await cartPage.addProduct(product);
        }

        const items = await cartPage.getCartItems();
        expect(items).toEqual(expect.arrayContaining(products));
    });

    test('Cart retains items after page reload @regression', async ({ page }) => {
        await cartPage.addProduct('Sauce Labs Onesie');
        await page.reload();

        const items = await cartPage.getCartItems();
        expect(items).toContain('Sauce Labs Onesie');
    });

    test('Remove items from cart @regression', async ({ page }) => {
        await cartPage.addProduct('Sauce Labs Backpack');
        await cartPage.removeProduct('Sauce Labs Backpack');

        const items = await cartPage.getCartItems();
        expect(items).not.toContain('Sauce Labs Backpack');
    });

});
