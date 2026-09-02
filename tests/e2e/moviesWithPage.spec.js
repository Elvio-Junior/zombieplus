const { test } = require('../support')
/* Pré-rquiisto
Deve estar logado 
*/

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data[0]

    executeSQL(`DELETE from movies WHERE title = '${movie.title}'`)
    await page.login.visit()
    await page.login.submitLoginForm('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')
})