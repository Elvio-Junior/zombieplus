const { test } = require('@playwright/test')

/* Pré-rquiisto
Deve estar logado 
*/
const { LoginPage } = require('../pages/LoginPage')
const { Toast, Alert, PoupUp } = require('../pages/Components')
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

/**
 * @type {PoupUp}
 */
let poupUp

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    alert = new Alert(page)
    moviesPage = new MoviesPage(page)
    poupUp = new PoupUp(page)
})
test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data[0]

    executeSQL(`DELETE from movies WHERE title = '${movie.title}'`)
    await loginPage.visit()
    await loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()

    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

    //v4
    //await toast.containText('Cadastro realizado com sucesso!')

    await poupUp.haveText('.swal2-html-container', `O filme '${movie.title}' foi adicionado ao catálogo.`)
})