
import { Actor } from '../Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { CHECKOUT_COMPLETE_PAGE } from '../ui/locators';

export class OrderSuccess {
    static isConfirmed() {
        return new OrderSuccess();
    }

    async answeredBy(actor: Actor): Promise<void> {
        const browseTheWeb = actor.abilityTo(BrowseTheWeb);
        await browseTheWeb.assertVisible(CHECKOUT_COMPLETE_PAGE.PONY_EXPRESS_IMAGE);
        await browseTheWeb.assertText(CHECKOUT_COMPLETE_PAGE.COMPLETE_HEADER, 'Thank you for your order!');
    }
}