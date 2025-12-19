const { expect } = require('@playwright/test');

const login = async (page, username, password) => {
    await page.goto('https://www.saucedemo.com');

    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', password);
    await page.click('[data-test="login-button"]');

    // verify login success by checking inventory
    await expect(page).toHaveURL(/inventory\.html/);
};

const addToCart = async (page, productName) => {
    const product = page.locator('.inventory_item').filter({ hasText: productName });
    
    await product.locator('button').click();
}

const resetAppState = async (page) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#reset_sidebar_link');

    // close sidebar after reset
    await page.click('#react-burger-cross-btn');
};

const getCartItems = async (page) => {
    await page.click('.shopping_cart_link');

    const items = await page.$$eval(
        '.cart_item .inventory_item_name',
        elements => elements.map(el => el.textContent)
    );

    return items;
};

module.exports = {
    login,
    addToCart,
    resetAppState, 
    getCartItems
};