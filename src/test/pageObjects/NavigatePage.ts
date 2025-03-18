import { pageFixture } from "../utiles/pageFixture";
import * as dotenv from "dotenv";

dotenv.config({ path: "../Helper/env/.env.test" });

export default class NavigatePage {
  async goToPage(path = "") {
    const baseUrl = process.env.BASE_URL;
    const fullUrl = `${baseUrl}${path}`;
    await pageFixture.page.goto(fullUrl);
    await pageFixture.logger.info("Opening Browser " + fullUrl);
  }
}
