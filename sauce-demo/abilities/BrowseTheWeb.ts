
import { Page, expect, Locator } from '@playwright/test';

export class BrowseTheWeb {
  public constructor(private page: Page) {}

  static using(page: Page) {
    return new BrowseTheWeb(page);
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page.locator(selector).click();
  }

  async fill(selector: string, value: string) {
    await this.page.locator(selector).fill(value);
  }

  async locate(selector: string): Promise<Locator> {
    return this.page.locator(selector);
  }

  async assertText(selector: string, expectedText: string) {
    await expect(this.page.locator(selector)).toContainText(expectedText);
  }

  async assertVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }
}