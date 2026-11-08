import {expect, type Page, type Locator} from "@playwright/test"
import type { ProductInfo } from "../../data/testData"
import { castPriceToNumber } from "../../utils/price"

export class CartPage {
    readonly title: Locator;
    readonly items: Locator;
    readonly checkoutButton:  Locator;
    readonly page: Page

    constructor(page: Page) {
        this.page = page
        this.title = page.getByTestId('title');
        this.items = page.getByTestId('inventory-item');
        this.checkoutButton = page.getByTestId('checkout');
    }

    async expectLoaded(){
        await expect(this.page).toHaveURL('/cart.html')
        await expect(this.title).toHaveText('Your Cart')
    }
    
    async getCartItems(count: number): Promise<ProductInfo[]> {
        await expect(this.items).toHaveCount(count)
        const products: ProductInfo[] = []

        for (let i = 0;  i < count; i++){
            const item = this.items.nth(i);
            const name = (await item.getByTestId('inventory-item-name').innerText()).trim();
            const price = castPriceToNumber(await item.getByTestId('inventory-item-price').innerText());
            products.push({name, price});
        }

        return products;
    }

    async checkout() {
        await this.checkoutButton.click()
    }
}