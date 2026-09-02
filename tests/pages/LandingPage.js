import { expect } from '@playwright/test';

export class LandingPage {
    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000')
    }

    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click();

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email) {
        await this.page.getByPlaceholder('Informe seu nome').fill(name)
        await this.page.getByPlaceholder('Informe seu email').fill(email)

        await this.page.getByTestId('modal')
            .getByText('Quero entrar na fila').click()
    }
    /* Migrada para Components
    async toastHaveText(message) {
        const toast = this.page.locator('.toast')

        await expect(toast).toHaveText(message)
        // await expect(toast).toBeHidden({ timeout: 5000 }) //  Elemento não esta atachado no código HTML
        await expect(toast).not.toBeVisible({ timeout: 5000 }) // Elemento não esta visivel mas pode estar presente no HTML (propriedade oculta)
    }
    */

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}