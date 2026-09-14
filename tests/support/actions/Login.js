import { expect } from '@playwright/test';

export class Login {
    constructor(page) {
        this.page = page
    }

    async do(name, password, userName) {
        await this.visit()
        await this.submitLoginForm(name, password)
        await this.isLoggedIn(userName)
    }
    
    async visit() {
        await this.page.goto('/admin/login')

        const loginForm = this.page.locator('.login-form')

        await expect(loginForm).toBeVisible()
    }

    async submitLoginForm(name, password) {
        await this.page.getByPlaceholder('E-mail').fill(name)
        await this.page.getByPlaceholder('Senha').fill(password)

        await this.page.getByText('Entrar').click()
    }

    async isLoggedIn(userName) {

        const loggedUser = this.page.locator('.logged-user')
        const logoutLink = this.page.locator('a[href="/logout"]')

        await this.page.waitForLoadState('networkidle') // aguarda o trafico de rede pos-login
        await expect(logoutLink).toBeVisible()
        await expect(this.page).toHaveURL(/.*admin/)

        await expect(loggedUser).toHaveText(`Olá, ${userName}`)
    }

}
