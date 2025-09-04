
import { Actor } from '../Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { CART_PAGE, CHECKOUT_INFO_PAGE, CHECKOUT_OVERVIEW_PAGE } from '../ui/locators';

export class CompleteCheckout {
  static asGuestUser(firstName: string, lastName: string, postalCode: string) {
    return new CompleteCheckout(firstName, lastName, postalCode);
  }

  private constructor(
    private firstName: string,
    private lastName: string,
    private postalCode: string
  ) { }

  async performAs(actor: Actor) {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);

    // Checkout: Your Information
    await browseTheWeb.click(CART_PAGE.CHECKOUT_BUTTON);
    await browseTheWeb.fill(CHECKOUT_INFO_PAGE.FIRST_NAME_INPUT, this.firstName);
    await browseTheWeb.fill(CHECKOUT_INFO_PAGE.LAST_NAME_INPUT, this.lastName);
    await browseTheWeb.fill(CHECKOUT_INFO_PAGE.POSTAL_CODE_INPUT, this.postalCode);
    await browseTheWeb.click(CHECKOUT_INFO_PAGE.CONTINUE_BUTTON);

    // Verificaciones
    await browseTheWeb.assertText(CHECKOUT_OVERVIEW_PAGE.PAGE_TITLE, 'Checkout: Overview');
    await browseTheWeb.assertText(CHECKOUT_OVERVIEW_PAGE.TOTAL_LABEL, 'Total: $71.26');

    // Checkout: Overview
    await browseTheWeb.click(CHECKOUT_OVERVIEW_PAGE.FINISH_BUTTON);
  }
}