// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    retries: 1, // retry once on failure
    reporter: [
        ['list'], // keep the console output simple
        ['html', { open: 'never' }] // HTML report for detailed view
    ],
    use: {
        screenshot: 'only-on-failure', // capture screenshots on failure
        video: 'retain-on-failure', // video recording of test
        trace: 'retain-on-failure', // full trace for debugging
        headless: true
    },
});