// playwright.config.js
require('dotenv').config();

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    retries: 1, // retry once on failure
    projects: [
        { name: 'Chromium', use: { browserName: 'chromium' } },
        // { name: 'Firefox', use: { browserName: 'firefox' } },
        // { name: 'WebKit', use: { browserName: 'webkit' } },
    ],
    reporter: [
        ['list'], // keep the console output simple
        ['html', { open: 'never' }] // HTML report for detailed view
    ],
    use: {
        baseURL: 'https://www.saucedemo.com/',
        screenshot: 'only-on-failure', // capture screenshots on failure
        video: 'retain-on-failure', // video recording of test
        trace: 'retain-on-failure', // full trace for debugging
        headless: false
    },
});