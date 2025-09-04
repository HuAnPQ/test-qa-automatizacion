
import { test } from '@playwright/test';
import { Actor } from '../Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Login } from '../tasks/Login';
import { AddItemsToCart } from '../tasks/AddItemsToCart';
import { CompleteCheckout } from '../tasks/CompleteCheckout';
import { OrderSuccess } from '../questions/OrderSuccess';
import { LOGIN_PAGE, CART_PAGE, CHECKOUT_OVERVIEW_PAGE } from '../ui/locators';

test('End-to-end purchase flow on Sauce Demo', async ({ page }) => {
  //Definir el Actor y sus Habilidades
  const actor = Actor.named('QA Automatizador').whoCan(BrowseTheWeb.using(page));

  //Realizar la Tarea Login
  await actor.attemptsTo(Login.asStandardUser());
  await actor.abilityTo(BrowseTheWeb).assertText(LOGIN_PAGE.PAGE_HEADER, 'Swag Labs');

  await actor.attemptsTo(AddItemsToCart.sauceLabsBoltTshirtAndJacket());
  await actor.abilityTo(BrowseTheWeb).assertText(CART_PAGE.PAGE_TITLE, 'Your Cart');

  await actor.attemptsTo(CompleteCheckout.asGuestUser('QA', 'Automatizador', 'ec123456'));
  await actor.abilityTo(BrowseTheWeb).assertText(CHECKOUT_OVERVIEW_PAGE.PAGE_TITLE, 'Checkout: Complete!');

  // 3. Obtener la Respuesta a las Preguntas
  await actor.getThe(OrderSuccess.isConfirmed());

});