import {expect, type Page, type Locator} from '@playwright/test';
import {Header} from './Header';
import type {ProductInfo, SortOption} from '../../data/testData';
import {castPriceToNumber} from '../../utils/price';

export class InventoryPage {
	readonly page: Page;
	readonly header: Header;
	readonly title: Locator;
	readonly items: Locator;
	readonly sortDropDown: Locator;
	readonly activeSortOption: Locator;

	constructor(page: Page) {
		this.page = page;
		this.header = new Header(page);
		this.title = page.getByTestId('title');
		this.items = page.getByTestId('inventory-item');
		this.sortDropDown = page.getByTestId('product-sort-container');
		this.activeSortOption = page.getByTestId('active-option');
	}

	async expectLoaded() {
		await expect(this.page).toHaveURL('/inventory.html');
		await expect(this.title).toHaveText('Products');
	}

	async getAllProducts(): Promise<ProductInfo[]> {
		const products: ProductInfo[] = [];
		const count = await this.items.count();

		for (let i = 0; i < count; i++) {
			const item = this.items.nth(i);
			const name = (await item.getByTestId('inventory-item-name').innerText()).trim();
			const price = castPriceToNumber(
				await item.getByTestId('inventory-item-price').innerText(),
			);
			products.push({name, price});
		}

		return products;
	}

	async addProductToCart(name: string) {
		const item = this.items.filter({has: this.page.getByText(name, {exact: true})});
		await item.getByRole('button', {name: 'Add to cart'}).click();
	}

	async sortBy(option: SortOption): Promise<void> {
		await this.sortDropDown.selectOption(option.label);
		await expect(this.activeSortOption).toHaveText(option.display);
	}

	async getAllPrices(): Promise<number[]> {
		const products = await this.getAllProducts();
		return products.map((products) => products.price);
	}

	getMostExpensive(products: ProductInfo[], count: number): ProductInfo[] {
		const sorted = products.slice();
		sorted.sort((a, b) => b.price - a.price);
		return sorted.slice(0, count);
	}
}
