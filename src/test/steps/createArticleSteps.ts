import { Given, When, Then } from "@cucumber/cucumber";
import NavigatePage from "../pageObjects/NavigatePage";
import LoginPage from "../pageObjects/LoginPage";
import * as dotenv from "dotenv";
import CreateArticleApi from "../api/CreateArticleApi";
import AuthApi from "../api/AuthApi";

dotenv.config({ path: "../Helper/env/.env.test" });

const authApi = new AuthApi();
const createArticle = new CreateArticleApi();

Given(
  "the user providing valid url for login and valid email {string} and password {string}",
  async function (email, password) {
    this.accessToken = await authApi.authRequest(email, password);
  }
);

When(
  "the user fills in the article details with title {string}, description {string}, body {string}",
  async function (title, description, body) {
    this.accessToken = await createArticle.createArticle(
      title,
      description,
      body
    );
  }
);
