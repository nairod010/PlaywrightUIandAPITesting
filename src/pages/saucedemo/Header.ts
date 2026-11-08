import {expect, type Page, type Locator} from '@playwright/test';

export class Header {
	readonly cartLink: Locator;
	readonly cartBadge: Locator;

	constructor(page: Page) {
		this.cartLink = page.getByTestId('shopping-cart-link');
		this.cartBadge = page.getByTestId('shopping-cart-badge');
	}

	async openCart() {
		await this.cartLink.click();
	}

	async expectCartCount(count: number) {
		if (count === 0) {
			await expect(this.cartBadge).toBeHidden();
		} else {
			await expect(this.cartBadge).toHaveText(String(count));
		}
	}
}
