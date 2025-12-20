[![Playwright Tests](https://github.com/zjtheilen/playwright-login-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/zjtheilen/playwright-login-portfolio/actions/workflows/playwright.yml)

# QA Automation Portfolio: SauceDemo Login

This repository demonstrates automated testing of the [SauceDemo web app](https://www.saucedemo.com/) login workflow using Playwright. It highlights test planning, automated test implementation, and result verification.

## Goals
- Showcase automation skills with Playwright (JavaScript)
- Validate login workflows: valid, invalid, and empty credentials
- Demonstrate test design, execution, and reporting
- Implement Page Object Model (POM) for maintainable test code
- Tag tests with `@smoke` and `@regression` for selective execution

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

## Known Failing Test
**Reset App State resets Add to Cart Buttons** (`@regression`)
- **Observed Behavior**: After "Reset App State", the product remains in "Remove" state; "Add to Cart" button does not reappear.
- **Expected Behavior**: All items reset to unselected state; "Add to Cart" buttons visible.
- **Reason Not Skipped**: Documents a real application defect; ensures visibility if behavior changes.
- **Debugging Artifacts**: Screenshots, videos, and traces captured automatically on failure.

## Debugging & Artifacts
Playwright generates artifacts when tests fail (`screenshot`, `video`, `trace` enabled in `playwright.config.js`).

1. **Screenshots**
    - Saved on failure (`screenshot: "only-on-failure"`)
    - Example path: `test-results/cart-Cart-functionality-Re-638dd--to-Cart-Buttons-regression/test-failed-1.png`
2. **Videos**
    - Captures full test execution (`video: "retain-on-failure"`)
    - Example path: `test-results/cart-Cart-functionality-Re-638dd--to-Cart-Buttons-regression/video.webm`
3. **Traces**
    - Detailed timeline with DOM snapshots, network requests, console logs, actions
    - Example path: `test-results/cart-Cart-functionality-Re-638dd--to-Cart-Buttons-regression/trace.zip`
    - Inspect with:
    ```bash
    npx playwright show-trace test-results/cart-Cart-functionality-Re-638dd--to-Cart-Buttons-regression/trace.zip

    ```

## Highlights
- E2E automation with Playwright
- Refactored login tests using Page Object Model (POM)
- Test tagging for selective execution (`@smoke`, `@regression`)
- Reusable helper functions for login and cart actions
- Captured and documented a real bug on the demo site
- Cross-browser testing (Chrome, Firefox, WebKit)
