import {expect, type Page, type Locator, type FrameLocator, type Frame} from '@playwright/test'
import path from 'path'
import fs from 'fs'
import { getMimeType } from '../../utils/file';

export class UploadPage {
    readonly page: Page;
    readonly uploadFrame: FrameLocator;
    readonly successMessage: Locator;
    readonly dropZone: Locator;
    readonly browseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.uploadFrame = page.frameLocator('iframe[src="/static/upload.html"]')
        this.successMessage = this.uploadFrame.getByText(/file\(s\) selected/i)
        this.dropZone = this.uploadFrame.getByText('Drag and drop your files here')
        this.browseButton = this.uploadFrame.getByText('Browse files', {exact: true})
    }

    fileName(name:string) :Locator {
        return this.uploadFrame.getByText(name, {exact:true})
    }

    async goto() {
        await this.page.goto('/upload')
    }

    async expectFilesUploaded(fileNames: string[], message: string) {
        for (const name of fileNames) {
            await expect(this.fileName(name)).toBeVisible()
        }
        await expect(this.successMessage).toHaveText(message)
    }

    async dragAndDropFiles(filePaths: string[]) {
        const files = filePaths.map((filePath) => ({
            name: path.basename(filePath),
            type: getMimeType(filePath),
            base64: fs.readFileSync(filePath).toString('base64')
        }));


        const dataTransfer = await this.dropZone.evaluateHandle((_dropZone, files) => {
            const dataTransfer = new DataTransfer();
            for (const file of files) {
                const bytes = Uint8Array.from(atob(file.base64), (char) => char.charCodeAt(0));
                dataTransfer.items.add(new File([bytes], file.name, {type: file.type}))
            }
            return dataTransfer
        },  files)

        for (const eventType of ['dragenter', 'dragover', 'drop']) {
            await this.dropZone.dispatchEvent(eventType, {dataTransfer})
        }
        
        await dataTransfer.dispose();
    }

    async browseFiles(filePath: string[]) {
        const fileChooserPromise = this.page.waitForEvent('filechooser')
        await this.browseButton.click()
        const fileChooser = await fileChooserPromise
        await fileChooser.setFiles(filePath)
    }
}