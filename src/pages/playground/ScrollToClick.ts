import {expect, type Page, type Locator} from "@playwright/test";

export class ScrollToClickPage{
    readonly page: Page;
    readonly pageScrollButton: Locator;
    readonly containerScrollButton: Locator;
    readonly nestedScrollButton: Locator;
    readonly hoverRow: Locator;
    readonly hoverButton: Locator;
    readonly clickedButton: Locator;
    readonly progressText: Locator;
    
    constructor(page: Page) {
        this.page = page
        this.pageScrollButton = page.getByRole('button', {name: 'Button 1', exact:true})
        this.containerScrollButton = page.getByRole('button', {name: 'Button 2', exact:true})
        this.nestedScrollButton = page.getByRole('button', {name: 'Button 3'})
        this.hoverRow = page.getByText('Weekly status report', {exact: true})
        this.hoverButton = page.getByRole('button', {name: 'Flag'})
        this.clickedButton = page.getByRole('button', {name:'Clicked!', exact: true, includeHidden:true})
        this.progressText = page.getByText(/buttons clicked/i)
    }

    async goto() {
        await this.page.goto('/scrolltoclick')
    }

    private async scrollAndClick(button: Locator) {
        await button.scrollIntoViewIfNeeded()
        await button.click()
    }

    private async hoverAndClick(row: Locator, button: Locator) {
        await row.scrollIntoViewIfNeeded()
        await row.hover()
        await button.click()
    }

    async clickAllButtons() {
        await this.scrollAndClick(this.pageScrollButton)
        await this.scrollAndClick(this.containerScrollButton)
        await this.scrollAndClick(this.nestedScrollButton)
        await this.hoverAndClick(this.hoverRow, this.hoverButton)
    }

    async expectAllButtonsClicked(message: string) {
        await expect(this.clickedButton).toHaveCount(4)
        await expect(this.progressText).toHaveText(message)
    }
}