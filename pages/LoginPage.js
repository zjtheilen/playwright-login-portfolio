import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name'); // your selector
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password, allowEmpty = false) {
    if (!allowEmpty && (!username || !password)) {
        throw new Error(
            `Login credentials are undefined! Check your .env file. username: ${username}, password: ${password}`
        );
    }
    await this.usernameInput.fill(username || '');
    await this.passwordInput.fill(password || '');
    await this.loginButton.click();
}

    async expectError(message) {
        await expect(this.errorMessage).toHaveText(message);
    }
}
