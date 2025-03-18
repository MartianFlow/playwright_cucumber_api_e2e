import { Given, When, Then } from "@cucumber/cucumber";
import AuthApi from "../api/AuthApi";

const authApi = new AuthApi();

Given(
  `the user provides valid API credentials with email {string} and password {string}`,
  async function (email, password) {
    this.accessToken = await authApi.authRequest(email, password);
  }
);

When(
  `the user sends a login request to the authentication API`,
  async function () {
    if (!this.accessToken) {
      throw new Error("Access token was not generated, login failed");
    }
  }
);

// Then: Access token should be received
Then(`the user should receive a valid access token`, async function () {
  if (!this.accessToken) {
    throw new Error("No access token received");
  }
});

// And: Access token should be saved
Then(
  `the access token should be saved in the authentication file`,
  async function () {
    if (!this.accessToken) {
      throw new Error("No access token to save");
    }
    await authApi.saveToken(this.accessToken);
  }
);
