
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
│       │   ├── env/
│       │   │   ├── env.ts          # Environment variable loading
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
  npm test -- --tags "@smoke"  # Run tests with the @smoke tag
  npm test -- --tags "@regression and not @apitest" # Run tests with @regression but not @apitest
  ```

- **Run failed tests (rerun):**

  ```bash
  npm run test:failed
  ```

## Reporting

After running the tests, an HTML report will be generated in the `test-result` directory. Open `cucumber-report.html` to view the report.

## API Testing

The `AuthApi.ts` file demonstrates how to perform API authentication and store the token.

## Page Object Model (POM)

The `pageObjects` directory contains page object classes for interacting with specific pages of the application.  This promotes code reusability and maintainability.

## Configuration

- **Playwright Configuration:** `playwright.config.ts` configures Playwright settings, including browser selection, reporters, and parallel execution.
- **Cucumber Configuration:** `cucumber.json` (or `cucumber.js`) configures Cucumber.js, including feature file paths, step definition paths, and formatters.
- **TypeScript Configuration:** `tsconfig.json` configures TypeScript settings.

