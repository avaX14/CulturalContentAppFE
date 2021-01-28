import { browser, by, element } from "protractor";

export class LoginPage {
  private credentias = {
    username: "MarkoMarkovic12",
    password: "test1234",
  };

  navigateTo() {
    return browser.get("/login");
  }

  fillCredentials(credentias: any = this.credentias) {
    element(by.css('[name="username"]')).sendKeys(credentias.username);
    element(by.css('[name="password"]')).sendKeys(credentias.password);
    element(by.css(".btn-success")).click();
  }

  getPageTitleText() {
    return element(by.css("app-root h2")).getText();
  }

  getErrorMessage() {
    return element(by.css(".validation-message")).getText();
  }
}
