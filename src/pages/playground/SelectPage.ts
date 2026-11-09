import {expect, type Page, type Locator} from '@playwright/test'

export class SelectPage{
    readonly page: Page;
    readonly language: Locator
    readonly city: Locator
    readonly version: Locator
    readonly colors: Locator
    readonly fruits: Locator
    readonly status: Locator

    constructor(page: Page) {
        this.page = page
        this.language = page.getByRole('combobox', {name: 'Programming Language'} )
        this.city = page.getByRole('combobox', {name: 'City'})
        this.version = page.getByRole('combobox', {name: 'Product Version'})
        this.colors = page.getByRole('listbox', {name: 'Colors'})
        this.fruits = page.getByRole('listbox', {name: 'Fruits'})
        this.status = page.getByText(/^select[A-Z]\w*: /)
    }

    async goto()  {
        await this.page.goto('/select')
    }

    async selectLanguage(label: string) {
        await this.language.selectOption({label})
    }

    async selectCity(label: string) {
        await this.city.selectOption({label})
    }

    async selectVersion(label: string) {
        await this.version.selectOption({label})
    }

    async selectColors(labels: string[]){
        await this.colors.selectOption(labels.map((label) => ({label})))
    }

    async selectFruits(labels: string[]){
        await this.fruits.selectOption(labels.map((label) => ({label})))
    }

    async expectStatus(text: string) {
        await expect(this.status).toHaveText(text);
    }
}