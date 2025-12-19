// utils/helpers.js
const { expect } = require('@playwright/test');

const login = async (page, username, password, expectSuccess = false) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', password);
    await page.click('[data-test="login-button"]');

    if (expectSuccess) {
        await expect(page).toHaveURL(/inventory\.html/);
    }
};

module.exports = {
    login
};
