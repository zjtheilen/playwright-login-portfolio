// tests/cart.spec.js
const { test, expect } = require('@playwright/test');
const { login, addToCart, resetAppState, getCartItems, removeFromCart } = require('../utils/helpers');

test.describe('Cart functionality', () => {

    test.beforeEach(async ({ page }) => {
        // Log in before every test
        await login(page, 'standard_user', 'secret_sauce');
    });

    // Scenario 1: Add a single product to the cart
    test('Add a single product to cart', async ({ page }) => {
        await addToCart(page, 'Sauce Labs Backpack');
        const items = await getCartItems(page);
        await expect(items).toContain('Sauce Labs Backpack');
    });

    // Scenario 2: Reset App State resets Add to Cart buttons
    test('Reset App State resets Add to Cart Buttons', async ({ page }) => {
        await addToCart(page, 'Sauce Labs Bike Light');

        // Reset app state
        await resetAppState(page);

        const addButton = page.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]');
        const removeButton = page.locator('button[data-test="remove-sauce-labs-bike-light"]');

        await expect(removeButton).not.toBeVisible();
        await expect(addButton).toBeVisible();
    });

    // Scenario 3: Add multiple products
    test('Add multiple products to cart', async ({ page }) => {
        const products = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];
        for (const product of products) {
            await addToCart(page, product);
        }

        const items = await getCartItems(page);
        await expect(items).toEqual(expect.arrayContaining(products));
    });

    // Scenario 4: Cart retains items after page reload
    test('Cart retains items after page reload', async ({ page }) => {
        await addToCart(page, 'Sauce Labs Onesie');

        await page.reload();

        const items = await getCartItems(page);
        await expect(items).toContain('Sauce Labs Onesie');
    });

    // Scenario 5: Remove items from cart
    test('Remove items from cart', async ({ page }) => {
        await addToCart(page, 'Sauce Labs Backpack');

        // Remove product
        await removeFromCart(page, 'Sauce Labs Backpack');

        const items = await getCartItems(page);
        await expect(items).not.toContain('Sauce Labs Backpack');
    });
});
