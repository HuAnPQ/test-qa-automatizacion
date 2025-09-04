
import { Actor } from '../Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { PRODUCTS_PAGE } from '../ui/locators';

export class AddItemsToCart {
    static sauceLabsBoltTshirtAndJacket() {
        return new AddItemsToCart();
    }

    async performAs(actor: Actor) {
        const browseTheWeb = actor.abilityTo(BrowseTheWeb);
        await browseTheWeb.click(PRODUCTS_PAGE.T_SHIRT);
        await browseTheWeb.click(PRODUCTS_PAGE.JACKET);
        await browseTheWeb.click(PRODUCTS_PAGE.SHOPPING_CART_LINK);
    }
}