import { Page, expect, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly shoppingCartLink: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async addSauceLabsBoltTShirt() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    }

    async addSauceLabsFleeceJacket() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    }

    async clickShoppingCart() {
        await this.shoppingCartLink.click();
    }

}