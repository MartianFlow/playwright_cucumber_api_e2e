import { Given, When, Then } from '@cucumber/cucumber';
import NavigatePage from '../pageObjects/NavigatePage';
import LoginPage from '../pageObjects/LoginPage';
import * as dotenv from 'dotenv';
import { expect } from '@playwright/test';

dotenv.config({ path: '../Helper/env/.env.test' });

const navigatePage = new NavigatePage();
const loginPage = new LoginPage();

Given('providing valid url for login',async function () {
    const loginPath = '/login';
    await navigatePage.goToPage(loginPath);
  });

  When('providing valid email and password',async function () {
    const username = process.env.USER;
    const password = process.env.PASSWORD;
    await loginPage.enterUserNameAndPassword(username, password);
  });

  Then('clicking login button',async function () {
    await loginPage.submit()

  });

  When('providing valid email as {string} and password as {string}',async function (email, password) {
    await loginPage.enterUserNameAndPassword(email, password)
    expect(false).toBe(true);
  });