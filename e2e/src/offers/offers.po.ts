import { browser, by, element } from "protractor";

export class OffersPage {
  navigateTo() {
    return browser.get("/offers");
  }

  getTableRowsCount() {
    return element.all(by.css("app-root .table-row-offer")).count();
  }

  deleteOffer() {
    element(by.css(".delete-offer-btn")).click();
  }
}
