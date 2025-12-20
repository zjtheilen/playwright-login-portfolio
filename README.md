![Playwright Tests](https://github.com/zjtheilen/playwright-login-portfolio/actions/workflows/playwright.yml/badge.svg)


# QA Automation Portfolio: SauceDemo Login

This repository demonstrates automated testing of the [SauceDemo web app](https://www.saucedemo.com) login workflow using Playwright. It highlights test planning, automated test implementation, and result verification.

## Goals
- Showcase automation skills using Playwright (JavaScript)
- Validate login workflows including valid, invalid, and empty credentials
- Demonstrate test design, execution, and reporting
- Implement Page Object Model (POM) for maintainable test code
- Tag tests with @smoke and @regression for selective execution

## Tools & Technologies
- Playwright Test Runner (`@playwright/test`)
- Node.js / npm
- JavaScript
- Git for version control
- Chrome, Firefox, and WebKit browsers (via Playwright)

## Project Structure
```
playwright-login-portfolio/
├─ tests/ # Playwright test scripts
│ ├─ login.spec.js
│ ├─ cart.spec.js 
├─ pages/ # Page Object Models
│ └─ LoginPage.js
├─ utils/ # Helper functions
│ └─ helpers.js
├─ test-results/ # Generated test reports (after running tests)
├─ package.json # Project dependencies and scripts
├─ package-lock.json
└─ README.md
```

## Test Scenarios
| Scenario | Description | Tag |
|----------|-------------|-----|
| Valid Login | User can log in with valid credentials | @smoke @regression |
| Invalid Username | Displays proper error message for invalid username | @regression |
| Invalid Password | Displays proper error message for invalid password | @regression |
| Empty Username/Password | Displays required field errors | @regression |
| Locked-Out User | Displays account locked error | @regression |
| Cart: Add Single Item | Adds a single product to cart | @smoke @regression |
| Cart: Reset App State | Resets Add to Cart buttons | @regression |
| Cart: Add Multiple Items | Adds multiple products to cart | @regression |
| Cart: Cart Persistence | Cart retains items after page reload | @regression |
| Cart: Remove Items | Removes items from cart | @regression |

## How to Use
1. Clone the repository:
```bash
git clone https://github.com/zjtheilen/playwright-login-portfolio.git
cd playwright-login-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Install browsers
```bash
npx playwright install
```

4. Run tests
```bash
npx playwright test # run all tests
npx playwright test --grep @smoke # run smoke tests (only critical tests)
npx playwright test --grep-invert @smoke  # run everything except smoke
```

5. View test results
```bash
npx playwright show-report # view HTML report
```

## Test Execution Summary
| Area Tested | Test Cases | Passed | Failed | Notes |
|-------------|------------|--------|--------|-------|
| Login | 6 | 6 | 0 | All login scenarios covered |
| Cart | 6 | 5 | 1 | Bug on Reset App State captured |
| Total | 12 | 11 | 1 | Failures are intentional (demo site does not reset cart state correctly) |

## Known Failing Test (Intentional)
The following test is expected to fail and is intentionally kept active:

**Reset App State resets Add to Cart Buttons** (`@regression`)

**Observed Behavior**
- After using "Reset App State", the product remains in a "Remove" state
- The "Add to Cart" button does not reappear as expected

**Expected Behavior**
- All items should reset to an unselected state
- "Add to Cart" buttons should be visible

**Why this test is not skipped**
- Skipping would hide a known defect
- Keeping it active documents real application behavior
- Ensures the issue remains visible if behavior changes

**Debugging Artifacts**
- Screenshot: captured at failure
- Video: full test execution
- Trace: step-by-step replay with DOM snapshots

These artifacts can be reviewed via the Playwright HTML report.


## Investigating Failing Tests
When a test fails in Playwright, artifacts are automatically generated when you have `screenshot`, `video`, or `trace` enabled in `playwright.config.js`.

1. **Screenshots**
- Captured automatically when a test fails (requires `screenshot: "only-on-failure"` in `playwright.config.js`)
- Example file path:
```bash
test-results\cart-Cart-functionality-Re-638dd--to-Cart-Buttons-regression\test-failed-1.png
```
- Open with any image viewer to see the page state at failure.

2. **Videos**
- Capture the entire test execution when enabled (`video: "on"` or `"retain-on-failure"`)
- Example file path:
```bash
test-results\cart-Cart-functionality-Re-638dd--to-Cart-Buttons-regression\video.webm
```
- Open in a browser or media player to see step-by-step test execution.

3. **Traces**
- Provide a detailed timeline of the test: DOM snapshots, network requests, console logs, and actions.
- Example file path:
```bash
test-results\cart-Cart-functionality-Re-638dd--to-Cart-Buttons-regression\trace.zip
```
- To inpsect:
```bash
npx playwright show-trace test-results/cart-Cart-functionality-Re-638dd--to-Cart-Buttons-regression/trace.zip
```
- Playwright UI allows you to:
    - Step through each action
    - View screenshots at each step
    - Inspect network requests and console logs
    - Debug timing or flaky issues interactively

## Highlights
- Implemented E2E test automation with Playwright
- Refactored login tests to use Page Object Model (POM)
- Tagged tests with @smoke and @regression for selective runs
- Created reusable helper functions for login and cart actions
- Captured and documented a real bug in a demo website
- Used cross-browser testing (Chrome, Firefox, WebKit)
