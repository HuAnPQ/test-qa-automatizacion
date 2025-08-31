
import { test } from '@playwright/test';
import { Actor } from '../Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { Login } from '../tasks/Login';
import { LOGIN_PAGE } from '../ui/locators';

test('End-to-end purchase flow on Sauce Demo', async ({ page }) => {
  //Definir el Actor y sus Habilidades
  const actor = Actor.named('QA Automatizador').whoCan(BrowseTheWeb.using(page));

  //Realizar la Tarea Login
  await actor.attemptsTo(Login.asStandardUser());
  await actor.abilityTo(BrowseTheWeb).assertText(LOGIN_PAGE.PAGE_HEADER, 'Swag Labs');
});