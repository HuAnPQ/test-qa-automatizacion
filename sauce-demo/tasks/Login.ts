
import { Actor } from '../Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { LOGIN_PAGE } from '../ui/locators';

export class Login {
  static asStandardUser() {
    return new Login('standard_user', 'secret_sauce');
  }

  private constructor(private username: string, private password: string) {}

  async performAs(actor: Actor) {
    const browseTheWeb = actor.abilityTo(BrowseTheWeb);
    await browseTheWeb.navigateTo('https://www.saucedemo.com/');
    
    await browseTheWeb.assertgetByText('Swag Labs');

    await browseTheWeb.fill(LOGIN_PAGE.USERNAME_INPUT, this.username);
    await browseTheWeb.fill(LOGIN_PAGE.PASSWORD_INPUT, this.password);
    await browseTheWeb.click(LOGIN_PAGE.LOGIN_BUTTON);

    await browseTheWeb.assertText(LOGIN_PAGE.PAGE_HEADER, 'Swag Labs');
  }
}