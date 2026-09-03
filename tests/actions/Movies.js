import { expect } from '@playwright/test';

export class Movies {
    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        const logoutLink = this.page.locator('a[href="/logout"]')

        await this.page.waitForLoadState('networkidle') // aguarda o trafico de rede pos-login
        await expect(logoutLink).toBeVisible()
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' })
            .click()
    }

    async create(title, overview, company, release_year) {

        //await this.page.locator('a[href$="register"]').click()
        await this.goForm()

        //await this.page.locator('#title').fill(title) // input[name="title"]
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        await this.page.locator('#select_company_id .react-select__indicator')
            .click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: company })
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: release_year })
            .click()

        await this.submit()
        //await this.page.getByRole('button', {name: 'Cadastrar'})
        //    .click()        

    }
}