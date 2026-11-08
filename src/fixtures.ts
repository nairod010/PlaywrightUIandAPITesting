import {test as base} from '@playwright/test';
import {LoginPage} from './pages/saucedemo/LoginPage';
import {InventoryPage} from './pages/saucedemo/InventoryPage';
import {CartPage} from './pages/saucedemo/CartPage';
import {CheckoutPage} from './pages/saucedemo/CheckoutPage';
import { ScrollToClickPage } from './pages/playground/ScrollToClick';

type SauceFixtures = {
	loginPage: LoginPage;
	inventoryPage: InventoryPage;
	cartPage: CartPage;
	checkoutPage: CheckoutPage;
};

type PlaygroundFixtures = {
    scrollToClickPage: ScrollToClickPage
}

export const test = base.extend<SauceFixtures & PlaygroundFixtures>({
	loginPage: async ({page}, use) => {
		await use(new LoginPage(page));
	},
	inventoryPage: async ({page}, use) => {
		await use(new InventoryPage(page));
	},
	cartPage: async ({page}, use) => {
		await use(new CartPage(page));
	},
	checkoutPage: async ({page}, use) => {
		await use(new CheckoutPage(page));
	},
    scrollToClickPage: async ({page}, use) => {
        await use(new ScrollToClickPage(page))
    }
});

export {expect} from '@playwright/test';
