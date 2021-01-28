import { OffersPage } from "./offers.po";

describe("protractor-tutorial - Public page", () => {
  let page: OffersPage;

  beforeEach(() => {
    page = new OffersPage();
  });

  it("when user browses to our app offers page he should see the offers table", () => {
    page.navigateTo();
    expect(page.getTableRowsCount()).toBeGreaterThan(0);
  });

  it("when user clicks delete button offer should be deleted", () => {
    page.navigateTo();
  });
});
