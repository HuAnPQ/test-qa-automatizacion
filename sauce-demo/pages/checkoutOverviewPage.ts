import { Page, expect, Locator } from '@playwright/test';
import * as userData from '../test-data/data.json';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async assertOnCheckoutOverviewPage() {
    await expect(this.pageTitle).toContainText(userData.expect.checkout);
  }

  async assertTotal(expectedTotal: string) {
    await expect(this.totalLabel).toContainText(expectedTotal);
  }

  async clickFinish() {
    await this.finishButton.click();
  }
}