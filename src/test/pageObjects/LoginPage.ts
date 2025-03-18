import { pageFixture } from "../utiles/pageFixture";

export default class LoginPage {
  private Elements = {
    user_loc: "//input[@formcontrolname='email']",
    password_loc: "//input[@formcontrolname='password']",
    submit_loc: "//button[@type='submit']",
  };

  async enterUserName(user: string) {
    await pageFixture.page.locator(this.Elements.user_loc).fill(user);
    await pageFixture.logger.info("providing username");
  }

  async enterPasswrod(password: string) {
    await pageFixture.page.locator(this.Elements.password_loc).fill(password);
    await pageFixture.logger.info("providing password");
  }

  async submit() {
    await pageFixture.page.locator(this.Elements.submit_loc).click();
    await pageFixture.logger.info("clicking submit button");
  }

  async enterUserNameAndPassword(user: string, password: string) {
    await this.enterUserName(user);
    await this.enterPasswrod(password);
  }
}
