import { expect } from '@playwright/test'

export class TvShows {
    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="/admin/tvshows"]').click()
        await this.page.locator('a[href$="/admin/tvshows/register"]').click()
    }

    async goTvShowsForm() {
        await this.page.locator('a[href$="/admin/tvshows"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' })
            .click()
    }

    async create(title, overview, company, release_year, season, cover, featured) {
        await this.goForm()

        await this.page.locator('#title').fill(title)
        await this.page.locator('#overview').fill(overview)

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

        await this.page.locator('#seasons')
            .fill((season).toString())

        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + cover)


        if (featured) {
            await this.page.locator('.featured .react-switch')
                .click()
        }

        await this.submit()
 
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

        await this.goTvShowsForm()

        await this.page.getByPlaceholder('Busque pelo nome')
            .fill(target)

        await this.page.click('.actions button')
    }

    async tableHave(content) {
        const rows = await this.page.getByRole('row')

        await expect(rows).toContainText(content)

    }
}