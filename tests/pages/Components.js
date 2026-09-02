import { expect } from '@playwright/test';

export class Toast {

    constructor(page) {
        this.page = page
    }

    async containText(message) {
        const toast = this.page.locator('.toast')

        await expect(toast).toContainText(message)
        // await expect(toast).toBeHidden({ timeout: 5000 }) //  Elemento não esta atachado no código HTML
        await expect(toast).not.toBeVisible({ timeout: 5000 }) // Elemento não esta visivel mas pode estar presente no HTML (propriedade oculta)
    }
}

export class Alert {

    constructor(page) {
        this.page = page
    }

    async haveText(locator, text) {
        const alert = this.page.locator(locator)

        await expect(alert).toHaveText(text)
    }
}