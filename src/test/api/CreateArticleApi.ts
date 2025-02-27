import axios from 'axios';
import * as dotenv from 'dotenv';
import { access } from 'fs';
import * as path from 'path';
import value from '../api/.auth/user.json';

dotenv.config({ path: path.resolve(__dirname, '../Helper/env/.env.test') });

export default class CreateArticleApi {

    private baseUrlApi: string;

    constructor() {
        this.baseUrlApi = process.env.BASE_URL_API;
        if (!this.baseUrlApi) {
            throw new Error("BASE_URL_API environment variable is not defined.");
        }
    }

    async createArticle(title: string, description: string, body: string): Promise<string> {
        const fullUrl = `${this.baseUrlApi}/api/articles/`;

        try {
            const response = await axios.post(fullUrl, {
                article: {
                    title,
                    description,
                    body,
                    "tagList":[]
                }, {
                headers: {
                    'Authorization': `Bearer ${value}`
                },
            });

            if (!response.data || !response.data.article || !response.data.article.slug) {
                throw new Error('Slug not found in the response');
            }

            return response.data.article.slug;

        } catch (error) {
            throw new Error(`Failed to create article: ${error.response ? error.response.status : error.message}`);
        }
    }
}
