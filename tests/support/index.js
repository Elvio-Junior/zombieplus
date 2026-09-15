const { test: base, expect } = require('@playwright/test')

const { Leads } = require('./actions/Leads')
const { Login } = require('./actions/Login')
const { Movies } = require('./actions/Movies')
const { TvShows } = require('./actions/Tvshows')
const { Toast, Alert, PoupUp } = require('../support/actions/Components')
const { API } = require('./api')

const test = base.extend({

    page: async ({ page }, use) => {

        page.leads = new Leads(page)
        page.login = new Login(page)
        page.movies = new Movies(page)
        page.toast = new Toast(page)
        page.alert = new Alert(page)
        page.poupUp = new PoupUp(page)
        page.tvShows = new TvShows(page)

        await use(page)
    },

    api: async({ request }, use) => {

        const api = new API(request)

        await api.setToken()

        await use(api)
    }
})

export { test, expect }