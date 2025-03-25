[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=playwright_cucumber_e2e&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=playwright_cucumber_e2e)


# Playwright Cucumber E2E Test Framework

This repository contains an end-to-end (E2E) testing framework built with Playwright and Cucumber.js for testing web applications.  It demonstrates best practices for structuring a test suite, including API testing, page object model (POM), and reporting.

## Table of Contents


- [Playwright Cucumber E2E Test Framework](#playwright-cucumber-e2e-test-framework)
  - [Table of Contents](#table-of-contents)
  - [Directory Structure](#directory-structure)
  - [Features](#features)
  - [Setup](#setup)
  - [Running Tests](#running-tests)
  - [Reporting](#reporting)
  - [Enhancing Device Reports in Playwright Cucumber E2E](#enhancing-device-reports-in-playwright-cucumber-e2e)
    - [1. Playwright Configuration (`playwright.config.ts`)](#1-playwright-configuration-playwrightconfigts)
    - [2. Report Generation (`src/test/utiles/report.ts` and `test-result/cucumber-report.html`)](#2-report-generation-srctestutilesreportts-and-test-resultcucumber-reporthtml)
    - [3. Cucumber Hooks (`src/test/utiles/hooks.ts`)](#3-cucumber-hooks-srctestutileshooksts)
    - [4. Logs (`src/test/utiles/logger.ts`)](#4-logs-srctestutilesloggerts)
    - [Steps to Improve Your Reports](#steps-to-improve-your-reports)
  - [API Testing](#api-testing)
  - [Page Object Model (POM)](#page-object-model-pom)
  - [Configuration](#configuration)

## Directory Structure

```
jorgeo452-playwright_cucumber_e2e/
├── @rerun.txt                     # Stores failed scenarios for rerun
├── cucumber.json                 # Cucumber configuration file
├── package.json                   # Project dependencies and scripts
├── playwright.config.ts          # Playwright configuration file
├── tsconfig.json                  # TypeScript configuration file
├── src/
│   └── test/
│       ├── Helper/
│       │   ├── browsers.ts        # Browser launch configuration
│       │   ├── init.ts            # Test setup (e.g., directory cleanup)
│       │   ├── uploadToXray.ts    # Uploads test results to Xray
│       │   ├── env/
│       │   │   ├── envPath.ts          # Environment variable loading
│       │   │   └── .env.test      # Test environment variables
│       │   └── types/
│       │       └── env.d.ts       # TypeScript definitions for environment variables
│       ├── api/
│       │   ├── AuthApi.ts         # API authentication logic
│       │   └── .auth/
│       │       └── user.json      # Stores authentication token
│       ├── config/
│       │   └── cucumber.js        # Cucumber configuration (alternative to cucumber.json)
│       ├── features/
│       │   ├── auth.feature       # Cucumber feature file for authentication tests
│       │   ├── login.feature      # Cucumber feature file for login tests
│       │   └── loginScenario.feature # Cucumber feature file for login scenario outline tests
│       ├── pageObjects/
│       │   ├── LoginPage.ts       # Page object for the login page
│       │   └── NavigatePage.ts      # Page object for navigation
│       ├── steps/
│       │   ├── authSteps.ts       # Cucumber step definitions for authentication
│       │   └── loginSteps.ts       # Cucumber step definitions for login
│       └── utiles/
│           ├── hooks.ts           # Cucumber hooks (e.g., before/after scenario)
│           ├── logger.ts          # Logging configuration
│           ├── pageFixture.ts      # Provides access to Playwright's page and logger
│           └── report.ts          # Generates HTML reports
└── test-result/                   # Test result artifacts
    ├── cucumber-report.html      # HTML test report
    ├── cucumber-report.json      # JSON test report
    ├── index.html                # HTML test report (alternative)
    ├── assets/                   # Assets for the HTML report
    │   ├── css/
    │   ├── fonts/
    │   └── js/
    │       └── darkmode.js
    ├── features/                 # HTML reports for individual feature files
    └── logs/                     # Log files for each scenario
```

## Features

- **API Testing:** Includes examples of API authentication using `axios`.
- **UI Testing:** Demonstrates UI testing with Playwright.
- **Cucumber Integration:** Uses Cucumber.js for Behavior-Driven Development (BDD).
- **Page Object Model (POM):** Implements the POM pattern for maintainability.
- **Reporting:** Generates HTML reports using `multiple-cucumber-html-reporter`.
- **Logging:** Uses `winston` for logging test execution.
- **Parallel Execution:** Configured for parallel test execution.
- **Retry Mechanism:** Includes a retry mechanism for failed tests.
- **Environment Configuration:** Supports different environments using `.env` files.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JorgeO452/playwright_cucumber_e2e.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Running Tests

- **Run all tests:**

  ```bash
  npm test
  ```

- **Run tests with specific tags:**

  ```bash
  TAGS="@default" npm test  # set the 'TAGS' environment variable to run tests with the required tag
  
  TAGS="@regression and not @apitest" npm test # Run tests with @regression but not @apitest
  ```

- **Run failed tests (rerun):**

  ```bash
  npm run test:failed
  ```

## Reporting

After running the tests, an HTML report will be generated in the `test-result` directory. Open `cucumber-report.html` to view the report.

## Enhancing Device Reports in Playwright Cucumber E2E

To obtain more detailed reports about the devices used in your tests, you can modify various aspects of your configuration and code. Here's how:

### 1. Playwright Configuration (`playwright.config.ts`)

This file defines the browsers and devices that Playwright will use to run your tests.

* **Projects and Devices:**
    * The `projects` section is where you configure browsers and devices.
    * You can add or modify existing devices to better reflect your testing needs. For example, you can add specific mobile devices or adjust desktop browser configurations.
    * Example:

    ```typescript
    import { defineConfig, devices } from '@playwright/test';

    export default defineConfig({
      projects: [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
        },
        {
          name: 'Mobile Chrome',
          use: { ...devices['Pixel 5'] },
        },
      ],
    });
    ```

    * If you need to add custom devices, refer to the Playwright documentation to see how to create new devices.

### 2. Report Generation (`src/test/utiles/report.ts` and `test-result/cucumber-report.html`)

This is where your test's HTML report is generated.

* **`src/test/utiles/report.ts`:**
    * This file contains the code that uses `multiple-cucumber-html-reporter` to generate the report.
    * You can modify this code to customize the information displayed in the report. For example, you can add columns to show additional device information.
    * Playwright creates a folder named `test-result` on the root of the project where the reports are saved.
* **`test-result/cucumber-report.html`:**
    * This is the generated HTML report.
    * Playwright includes basic browser and device information in the test results.
    * If you need more detailed information, you can modify the code in `src/test/utiles/report.ts` to extract and display that information.

### 3. Cucumber Hooks (`src/test/utiles/hooks.ts`)

Hooks allow you to execute code before and after each test scenario.

* **Information Capture:**
    * You can use the `Before` and `After` hooks to capture runtime environment information, such as browser and device names.
    * This information can be stored and then added to the reports.
    * Example:

    ```typescript
    import { Before, After, ITestCaseHookParameter } from '@cucumber/cucumber';
    import { pageFixture } from './pageFixture';

    Before(async function (scenario: ITestCaseHookParameter) {
      const browserName = pageFixture.page.context().browser()?.browserType().name();
      console.log(`Running scenario: ${scenario.pickle.name} on ${browserName}`);
    });
    ```

### 4. Logs (`src/test/utiles/logger.ts`)

This file configures your project's log registration.

* **Information Registration:**
    * You can add logs to record device information during test execution.
    * These logs can be useful for debugging and adding additional information to the reports.

### Steps to Improve Your Reports

1.  **Review `playwright.config.ts`:** Ensure that devices are configured correctly and add or modify devices as needed.
2.  **Modify `src/test/utiles/report.ts`:** Customize the report generation code to display the device information you need.
3.  **Use `src/test/utiles/hooks.ts`:** Capture additional device information and store it for use in reports.
4.  **Add logs in `src/test/utiles/logger.ts`:** Record relevant information for debugging and adding to reports.

## API Testing

The `AuthApi.ts` file demonstrates how to perform API authentication and store the token.

## Page Object Model (POM)

The `pageObjects` directory contains page object classes for interacting with specific pages of the application.  This promotes code reusability and maintainability.

## Configuration

- **Playwright Configuration:** `playwright.config.ts` configures Playwright settings, including browser selection, reporters, and parallel execution.
- **Cucumber Configuration:** `cucumber.json` (or `cucumber.js`) configures Cucumber.js, including feature file paths, step definition paths, and formatters.
- **TypeScript Configuration:** `tsconfig.json` configures TypeScript settings.

