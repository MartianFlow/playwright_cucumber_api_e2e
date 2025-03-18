import axios from "axios";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../Helper/env/.env.test") });

const authFile = path.resolve(__dirname, ".auth", "user.json");

export default class AuthApi {
  async authRequest(email: string, password: string): Promise<string> {
    const baseUrlApi = process.env.BASE_URL_API;
    if (!baseUrlApi) {
      throw new Error("BASE_URL environment variable is not defined.");
    }

    const fullUrl = `${baseUrlApi}/api/users/login`;

    try {
      const response = await axios.post(fullUrl, {
        user: {
          email: email,
          password: password,
        },
      });

      if (!response.data || !response.data.user || !response.data.user.token) {
        throw new Error("Access token not found in the response");
      }

      return response.data.user.token;
    } catch (error) {
      throw new Error(
        `Failed to authenticate: ${
          error.response ? error.response.status : error.message
        }`
      );
    }
  }

  async saveToken(accessToken: string) {
    try {
      const user = JSON.parse(fs.readFileSync(authFile, "utf-8"));
      user.origins[0].localStorage[0].value = accessToken;
      fs.writeFileSync(authFile, JSON.stringify(user, null, 2));
      process.env["ACCESS_TOKEN"] = accessToken;
    } catch (error) {
      console.error("Error while saving the token:", error);
      throw error;
    }
  }
}
