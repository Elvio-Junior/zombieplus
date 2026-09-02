const { test } = require('@playwright/test')

/* Pré-rquiisto
Deve estar logado 
*/
const { LoginPage } = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')
const { Alert } = require('../pages/Components')
const { MoviesPage } = require('../pages/MoviesPage')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

/**
 * @type {LoginPage}
 */
let loginPage
/**
 * @type {Toast}
 */
let toast

/**
 * @type {Alert}
 */
let alert

/**
 * @type {MoviesPage}
 */
let moviesPage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    alert = new Alert(page)
    moviesPage = new MoviesPage(page)
})
test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data[0]

    executeSQL(`DELETE from movies WHERE title = '${movie.title}'`)
    await loginPage.visit()
    await loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()

    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

    await toast.containText('Cadastro realizado com sucesso!')
})