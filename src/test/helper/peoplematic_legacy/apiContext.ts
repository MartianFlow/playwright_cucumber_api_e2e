import { request, APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {loggerFixture} from '../../utils/logger';

let apiContext: APIRequestContext;
dotenv.config({ path: '.env.test' });
const envPath = path.join(__dirname, '../env/.env.test');

// Función para actualizar o agregar variables en .env
function updateEnvVariable(key: string, value: string, envPath: string) {
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
    loggerFixture.logger.info('LOGIN_ACCESS_TOKEN added successfully to .env.test');
}


export async function getLoginApiContext(): Promise<APIRequestContext> {
    if (!apiContext) {
        loggerFixture.logger.info('API context created successfully');
        return await request.newContext({
            baseURL: 'https://peoplematic.wym.services',
            extraHTTPHeaders: {
                Accept: 'application/json',
                'X-Application-Token': '1|I9lHFqPMAT0YdtO1b5PSsLuisRQk81A2PGS5ccUt'
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

        // Guardar token en .env.test sin borrar las otras variables
        updateEnvVariable('LOGIN_ACCESS_TOKEN', token, envPath);
    }

    return await request.newContext({
        baseURL: 'https://peoplematic.wym.services',
        extraHTTPHeaders: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
}