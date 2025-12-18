# QA Automation Portfolio: SauceDemo Login

This repository demonstrates automated testing of the [SauceDemo web app](https://www.saucedemo.com) login workflow using Playwright. It highlights test planning, automated test implementation, and result verification.

## Goals
- Showcase automation skills using Playwright (JavaScript)
- Validate login workflows including valid, invalid, and empty credentials
- Demonstrate test design, execution, and reporting

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
│ └─ login.spec.js
├─ test-results/ # Generated test reports (after running tests)
├─ package.json # Project dependencies and scripts
├─ package-lock.json
└─ README.md
```

## Test Scenarios
| Scenario | Description |
|----------|-------------|
| Valid Login | User can log in with valid credentials |
| Invalid Username | Displays proper error message for invalid username |
| Invalid Password | Displays proper error message for invalid password |
| Empty Username/Password | Displays required field errors |
| Locked-Out User | Displays account locked error |

## How to Use
1. Clone the repository:
```bash
git clone <repo-url>
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

4. Run all tests
```bash
npx playwright test
```

5. View test results
```bash
npx playwright show-report
```

## Test Execution Summary
| Test | Status | Notes |
|------|--------|-------|
| login.spec.js | TBD | TBD |
