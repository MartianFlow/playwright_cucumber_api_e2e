import { request, APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import {loggerFixture} from '../../utils/logger';
import {getEnvPath} from '../env/envPath';

let apiContext: APIRequestContext;
dotenv.config({ path: getEnvPath() });

// add or update varibles in .env file
function updateEnvVariable(key: string, value: string, envPath: string = getEnvPath()) {
    let envContent = '';

    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf-8');
    }

    const lines = envContent.split('\n');
    let found = false;

    const updatedLines = lines.map(line => {
        if (line.startsWith(`${key}=`)) {
            found = true;
            return `${key}=${value}`;
        }
        return line;
    });

    if (!found) {
        updatedLines.push(`${key}=${value}`);
    }

    fs.writeFileSync(envPath, updatedLines.join('\n'), { encoding: 'utf-8' });
    loggerFixture.logger.info(`${key} added/updated successfully in ${envPath}`);
}


export async function getLoginApiContext(): Promise<APIRequestContext> {
    if (!apiContext) {
        loggerFixture.logger.info('API context created successfully');
        return await request.newContext({
            baseURL: 'https://peoplematic.wym.services',
            extraHTTPHeaders: {
                Accept: 'application/json',
                'X-Application-Token': process.env.APPLICATION_TOKEN,
            },
        });
    }

}


export async function getAuthenticatedContext(): Promise<APIRequestContext> {
    const token = process.env.LOGIN_ACCESS_TOKEN;
    const api = await getLoginApiContext();

    if (!token) {
        const loginResponse = await api.post('/api/v1/application/auth/login', {
            form: {
                email: 'felipex@ocmiwc.com',
                password: 'Teamwork123!',
                device_name: 'iPhone 14 Pro',
            },
        });

        const body = await loginResponse.json();
        const token = body.access_token;

        // Save token in .env without deleting others variables
        updateEnvVariable('LOGIN_ACCESS_TOKEN', token);
    }

    return await request.newContext({
        baseURL: 'https://peoplematic.wym.services',
        extraHTTPHeaders: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
}