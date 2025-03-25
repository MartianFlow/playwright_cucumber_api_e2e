import { expect } from '@playwright/test';
import { Given, Then } from '@cucumber/cucumber';
import {loggerFixture} from '../../utils/logger';
import { getLoginApiContext} from '../../helper/peoplematic_legacy/apiContext';

let response: any;


Given('I send a login request with a valid user', async () => {
    const api = await getLoginApiContext();
    loggerFixture.logger.info('send request POST to endpoint /auth/login');

    response = await api.post('/api/v1/application/auth/login', {
        form: {
            email: 'felipex@ocmiwc.com',
            password: 'Teamwork123!',
            device_name: 'iPhone 14 Pro',
        },
    });

    loggerFixture.logger.info(`status response: ${response.status()}`);
});

Then('the response status should be 200', async () => {
    expect(response.status()).toBe(200);
    loggerFixture.logger.info('status 200 confirmed');
});

Then('the response should contain a token', async () => {
    const body = await response.json();
    expect(body).toHaveProperty('access_token');
    loggerFixture.logger.info('access_token present in body response');
});