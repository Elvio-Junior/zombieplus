const { test: base, expect } = require('@playwright/test')

const { LandingPage } = require('../pages/LandingPage')
const { LoginPage } = require('../pages/LoginPage')
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast, Alert } = require('../pages/Components')

const test = base.extend({

    page: async ({ page }, use) => {

        page.landing = new LandingPage(page)
        page.login = new LoginPage(page)
        page.movies = new MoviesPage(page)
        page.toast = new Toast(page)
        page.alert = new Alert(page)

        await use(page)
    }
})

export { test, expect }