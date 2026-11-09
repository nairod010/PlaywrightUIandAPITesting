import {expect, type Page, type Locator, type FrameLocator} from '@playwright/test'

type FrameButton = {label: string; locator: Locator}
export class FramePage {
    readonly page: Page;
    readonly outerFrame: FrameLocator
    readonly innerFrame: FrameLocator

    constructor(page: Page) {
        this.page = page
        this.outerFrame = page.frameLocator('#frame-outer')
        this.innerFrame = this.outerFrame.frameLocator('#frame-inner')
    }

    async goto() {
        await this.page.goto('/frames')
    }

    getFrames(): { name: string; frame: FrameLocator}[] {
        return [
            {name: 'Outer Frame (Level 1)', frame: this.outerFrame},
            {name: 'Inner Frame (Level 2)', frame: this.innerFrame}
        ]
    }

    getButtons(frame: FrameLocator): FrameButton[]{
        return [
            {
                label: 'Edit',
                locator: frame.locator('button[data-action="edit"]')
            },
            {
                label: 'Submit',
                locator: frame.getByText('Submit', {exact: true})
            },
            {
                label: 'Click me',
                locator: frame.locator('button[name="my-button"]')
            },
            {
                label: 'Primary',
                locator: frame.locator('xpath=//button[contains(@class, "btn-class")]')
            },
        ]
    }

    async clickAndExpectResult(frame: FrameLocator, button: FrameButton) {
        await button.locator.click()
        await expect(frame.locator('#result')).toHaveText(`Button pressed: ${button.label}`)
    }
}