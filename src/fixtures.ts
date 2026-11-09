import {test as base} from '@playwright/test';
import {LoginPage} from './pages/saucedemo/LoginPage';
import {InventoryPage} from './pages/saucedemo/InventoryPage';
import {CartPage} from './pages/saucedemo/CartPage';
import {CheckoutPage} from './pages/saucedemo/CheckoutPage';
import {ScrollToClickPage} from './pages/playground/ScrollToClick';
import {UploadPage} from './pages/playground/uploadPage';
import {SelectPage} from './pages/playground/SelectPage';
import { FramePage } from './pages/playground/FramesPage';

type SauceFixtures = {
	loginPage: LoginPage;
	inventoryPage: InventoryPage;
	cartPage: CartPage;
	checkoutPage: CheckoutPage;
};

type PlaygroundFixtures = {
	scrollToClickPage: ScrollToClickPage;
	uploadPage: UploadPage;
	selectPage: SelectPage;
    framePage: FramePage;
};

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
		await use(new ScrollToClickPage(page));
	},
	uploadPage: async ({page}, use) => {
		await use(new UploadPage(page));
	},
	selectPage: async ({page}, use) => {
		await use(new SelectPage(page));
	},
    framePage: async ({page}, use) => {
        await use(new FramePage(page))
    }
});

export {expect} from '@playwright/test';
