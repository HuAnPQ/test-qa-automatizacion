import { Page, expect, Locator } from '@playwright/test';
import * as userData from '../test-data/data.json';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly ponyExpressImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
  }

  async assertOrderComplete() {
    await expect(this.ponyExpressImage).toBeVisible();
    await expect(this.completeHeader).toContainText(userData.expect.completeHeader);
  }
}