import {expect, type Locator, type Page} from "@playwright/test"
import { castPriceToNumber } from "../../utils/price"
import type { Customer } from "../../data/testData"

export class CheckoutPage{
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;
    readonly itemTotal: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page
        this.firstName = page.getByTestId('firstName')
        this.lastName = page.getByTestId('lastName')
        this.postalCode = page.getByTestId('postalCode')
        this.continueButton = page.getByTestId('continue')
        this.itemTotal = page.getByTestId('subtotal-label')
        this.finishButton = page.getByTestId('finish')
        this.completeHeader = page.getByTestId('complete-header')
        this.backHomeButton = page.getByTestId('back-to-products')
    }

    async fillInformation(customer: Customer) {
        await expect(this.page).toHaveURL('/checkout-step-one.html')
        await this.firstName.fill(customer.firstName)
        await this.lastName.fill(customer.lastName)
        await this.postalCode.fill(customer.postalCode)
        await this.continueButton.click()
        await expect(this.page).toHaveURL('/checkout-step-two.html')
    }

    async getItemTotal(): Promise<number> {
        return castPriceToNumber(await this.itemTotal.innerText());
    }

    async finishOrder() {
        await this.finishButton.click()
    }

    async expectOrderCompleted() {
        await expect(this.page).toHaveURL('/checkout-complete.html')
        await expect(this.completeHeader).toHaveText('Thank you for your order!')
        await expect(this.backHomeButton).toBeVisible()
    }
}
