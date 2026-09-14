import { expect } from '@playwright/test'

export class Movies {
    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' })
            .click()
    }

    async create(title, overview, company, release_year, cover, featured) {
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

        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + cover)

        if (featured) {
            await this.page.locator('.featured .react-switch')
                .click()
        }

        await this.submit()
        //await this.page.getByRole('button', {name: 'Cadastrar'})
        //    .click()        

        await this.page.locator('.swal2-actions')
            .getByRole('button')
            .click()

    }

    async remove(title) {
        await this.page.getByRole('row', { name: title })
            .getByRole('button')
            .click()

        await this.page.click('.confirm-removal')
    }

    async search(target) {
        await this.page.getByPlaceholder('Busque pelo nome')
            .fill(target)

        await this.page.click('.actions button')
    }

    async tableHave(content) {
        const rows = await this.page.getByRole('row')

        await expect(rows).toContainText(content)

    }
}