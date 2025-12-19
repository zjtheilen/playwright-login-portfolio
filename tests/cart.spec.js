// tests/cart.spec.js
const { test, expect } = require('@playwright/test');
const { login, addToCart, resetAppState, getCartItems } = require('../utils/helpers');

test.describe('Cart functionality', () => {
    
    // do this at the start of every test
    test.beforeEach(async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');
    });

    // Test scenarios

    // Scenario 1: add single item
    test('Add a single product to cart', async ({ page }) => {
        await addToCart(page, 'Sauce Labs Backpack');
        const items = await getCartItems(page);
        expect(items).toContain('Sauce Labs Backpack');
    });

    // Scenario 2: reset app state updates buttons
    test('Reset App State resets Add to Cart Buttons', async ({ page }) => {
        await addToCart(page, 'Sauce Labs Bike Light');

        // reset app state
        await resetAppState(page);

        // check to see if Add to Cart button resets
        const addButton = page.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]');
        const removeButton = page.locator('button[data-test="remove-sauce-labs-bike-light"]');

        await expect(removeButton).not.toBeVisible();
        await expect(addButton).toBeVisible();
    })

    // Scenario 3: add multiple products
    test('Add multiple products to cart', async ({ page }) => {
        const products = ['Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt'];
        for (const product of products) {
            await addToCart(page, product);
        }

        const items = await getCartItems(page);
        expect(items).toEqual(expect.arrayContaining(products));
    });

    // Scenario 4: cart persistance on page reload
    test('Cart retains items after page reload', async ({ page }) => {
        await addToCart(page, 'Sauce Labs Onesie');

        await page.reload();

        const items = await getCartItems(page);
        expect(items).toContain('Sauce Labs Onesie');
    });

    // Scenario 5: remove items from cart
    test('Remove items from cart', async ({ page }) => {
        await addToCart(page, 'Sauce Labs Backpack');

        // remove
        await page.click('button[data-test="remove-sauce-labs-backpack"]');

        const items = await getCartItems(page);
        expect(items).not.toContain('Sauce Labs Backpack');
    })
});
