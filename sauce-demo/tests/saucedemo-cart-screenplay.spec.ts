
import { test } from '@playwright/test';
import { Actor } from '../Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Login } from '../tasks/Login';
import { AddItemsToCart } from '../tasks/AddItemsToCart';
import { CompleteCheckout } from '../tasks/CompleteCheckout';
import { OrderSuccess } from '../questions/OrderSuccess';


test.describe("Test Suite -Purchase flow on SauceDemo", async () => {
  test('TC001 -ScreenPlay -End-to-end purchase flow on Sauce Demo', async ({ page }) => {
    //Definir el Actor y sus Habilidades
    const actor = Actor.named('QA Automatizador').whoCan(BrowseTheWeb.using(page));

    await test.step("Inicio de Sesión", async () => {
      await actor.attemptsTo(Login.asStandardUser());
    });

    await test.step("Añadir Productos al Carrito", async () => {
      await actor.attemptsTo(AddItemsToCart.sauceLabsBoltTshirtAndJacket());
    });

    await test.step("Resumen de Checkout", async () => {
      await actor.attemptsTo(CompleteCheckout.asGuestUser('QA', 'Automatizador', 'ec123456'));
    });

    await test.step("Confirmación de Compra", async () => {
      await actor.getThe(OrderSuccess.isConfirmed());
    });

  });

});