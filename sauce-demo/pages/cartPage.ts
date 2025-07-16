import { Page, expect, Locator } from '@playwright/test';
import * as userData from '../test-data/data.json';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async assertOnCartPage() {
    await expect(this.pageTitle).toContainText(userData.expect.yourCart);
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}