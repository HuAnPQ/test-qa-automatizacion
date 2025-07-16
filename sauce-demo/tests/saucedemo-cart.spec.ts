import { test, expect } from '@playwright/test';
import * as userData from '../test-data/data.json';

import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutInformationPage } from '../pages/checkoutInformationPage';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage';

test.describe("Test Suite -Flujo de compra SauceDemo", async () => {
  test('TC001 -POM -Finalizar compra como Standard User', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await test.step("Inicio de Sesión", async () => {
      await loginPage.goto();
      await loginPage.login(userData.standardUser.username, userData.standardUser.password);
      await loginPage.assertOnProductsPage();
    });

    await test.step("Añadir Productos al Carrito", async () => {
      await productsPage.addSauceLabsBoltTShirt();
      await productsPage.addSauceLabsFleeceJacket();
      await productsPage.clickShoppingCart();
    });


    await test.step("Validar el Carrito", async () => {
      await cartPage.assertOnCartPage();
      await cartPage.clickCheckout();
    });

    await test.step("Ingresar la información de Checkout", async () => {
      await checkoutInformationPage.assertOnCheckoutInformationPage();
      await checkoutInformationPage.fillYourInformation(userData.checkoutData.firstName, userData.checkoutData.lastName, userData.checkoutData.postalCode);
      await checkoutInformationPage.clickContinue();
    });

    await test.step("Resumen de Checkout", async () => {
      await checkoutOverviewPage.assertOnCheckoutOverviewPage();
      await checkoutOverviewPage.assertTotal(userData.expect.totalLabel);
      await checkoutOverviewPage.clickFinish();
    });

    await test.step("Confirmación de Compra", async () => {
      await checkoutCompletePage.assertOrderComplete();
    });

  });

});