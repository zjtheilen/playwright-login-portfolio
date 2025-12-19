const { test, expect } = require('@playwright/test');
const { login, addToCart, resetAppState, getCartItems } = require('../utils/helpers');

test.describe('Cart functionality', () => {

    test.beforeEach(async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');
    });

    test('Add a single product to cart @smoke @regression', async ({ page }) => {
        await addToCart(page, 'Sauce Labs Backpack');
        const items = await getCartItems(page);
        expect(items).toContain('Sauce Labs Backpack');
    });

    test('Reset App State resets Add to Cart Buttons @regression', async ({ page }) => {
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
            await addToCart(page, product);
        }

        const items = await getCartItems(page);
        expect(items).toEqual(expect.arrayContaining(products));
    });

    test('Cart retains items after page reload @regression', async ({ page }) => {
        await addToCart(page, 'Sauce Labs Onesie');

        await page.reload();

        const items = await getCartItems(page);
        expect(items).toContain('Sauce Labs Onesie');
    });

    test('Remove items from cart @regression', async ({ page }) => {
        await addToCart(page, 'Sauce Labs Backpack');
        await page.click('button[data-test="remove-sauce-labs-backpack"]');

        const items = await getCartItems(page);
        expect(items).not.toContain('Sauce Labs Backpack');
    });

});
