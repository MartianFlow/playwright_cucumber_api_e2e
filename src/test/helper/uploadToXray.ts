import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import {getEnvPath} from './env/envPath';

const REPORT_PATH = path.resolve(
  __dirname,
  '../../../test-result/cucumber-report.json'
);

dotenv.config({ path: getEnvPath() });

const XRAY_CLIENT_ID = process.env.XRAY_CLIENT_ID;
const XRAY_CLIENT_SECRET = process.env.XRAY_CLIENT_SECRET;

if (!XRAY_CLIENT_ID || !XRAY_CLIENT_SECRET) {
  console.error(
    'ERROR: Xray credentials are not configured in the environment variables'
  );
  process.exit(1);
}

async function authenticateXray(): Promise<string> {
  try {
    const response = await axios.post<string>(
      'https://xray.cloud.getxray.app/api/v2/authenticate',
      {
        client_id: XRAY_CLIENT_ID,
        client_secret: XRAY_CLIENT_SECRET,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data; // Return the authentication token.
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error authenticating in Xray: ',
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      console.error('Unknown error: ', error.message);
    } else {
      console.error('Unexpected error: ', error);
    }
    process.exit(1);
  }
}

async function uploadResultsToXray(token: string): Promise<void> {
  try {
    if (!fs.existsSync(REPORT_PATH)) {
      console.error('ERROR: Report file not found in ', REPORT_PATH);
      process.exit(1);
    }

    const reportData = fs.readFileSync(REPORT_PATH, 'utf8');

    const response = await axios.post(
      'https://xray.cloud.getxray.app/api/v2/import/execution/cucumber',
      reportData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Report successfully uploaded to Xray: ', response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error uploading the report to Xray: ',
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      console.error('Unknown error: ', error.message);
    } else {
      console.error('Unexpected error: ', error);
    }
    process.exit(1);
  }
}

(async () => {
  const token = await authenticateXray();
  await uploadResultsToXray(token);
})();
