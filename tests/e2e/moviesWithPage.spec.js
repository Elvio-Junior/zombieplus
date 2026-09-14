const { test } = require('../support')
import { expect } from '@playwright/test'

/* Pré-rquiisto
Deve estar logado 
*/

const data = require('../support/fixtures/movies.json')
const movies = require('../support/fixtures/searchMovies.json')
const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    executeSQL('DELETE from public.movies')
})

test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data[0]

    //executeSQL(`DELETE from movies WHERE title = '${movie.title}'`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)
    //v4
    //await page.toast.containText('Cadastro realizado com sucesso!')

    await page.poupUp.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('Não deve poder cadastrar quando o titulo é duplicado', async ({ page, api }) => {

    const movie = data[1]

    //executeSQL(`DELETE from movies WHERE title = '${movie.title}'`)

    await api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)

    //v4
    //await page.toast.containText('Oops!Este conteúdo já encontra-se cadastrado no catálogo')

    await page.poupUp.haveText('Oops!Este conteúdo já encontra-se cadastrado no catálogo')

    /*
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)

    await page.toast.containText('Oops!Este conteúdo já encontra-se cadastrado no catálogo')
    */
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.goForm()

    await page.movies.submit()

    //v4
    /*
    await page.alert.haveText('.alert',
        ['Por favor, informe o título.',
            'Por favor, informe a sinopse.',
            'Por favor, informe a empresa distribuidora.',
            'Por favor, informe o ano de lançamento.'
        ])
    */
    await page.alert.haveText('.alert',
        ['Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório'
        ])

})

test('deve poder remover um filme', async ({ page }) => {

    const movie = data[3]

    //executeSQL(`DELETE from movies WHERE title = '${movie.title}'`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)
    //v4
    //await page.toast.containText('Cadastro realizado com sucesso!')

    await page.poupUp.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)

    //await page.click(`td[text()=${movie.title}]/..//button`)

    await page.movies.remove(movie.title)

    await page.poupUp.haveText('Filme removido com sucesso.')

})

test('deve realizar busca pelo termo Dead', async ({ page }) => {

    const searchMovies = movies

    const m0 = searchMovies.search.data[0]
    const m1 = searchMovies.search.data[1]
    const m2 = searchMovies.search.data[2]
    const m3 = searchMovies.search.data[3]

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(m0.title, m0.overview, m0.company, m0.release_year, m0.cover, m0.feature)

    await page.poupUp.haveText(`O filme '${m0.title}' foi adicionado ao catálogo.`)

    await page.movies.create(m1.title, m1.overview, m1.company, m1.release_year, m1.cover, m1.feature)

    await page.poupUp.haveText(`O filme '${m1.title}' foi adicionado ao catálogo.`)

    await page.movies.create(m2.title, m2.overview, m2.company, m2.release_year, m2.cover, m2.feature)

    await page.poupUp.haveText(`O filme '${m2.title}' foi adicionado ao catálogo.`)

    await page.movies.create(m3.title, m3.overview, m3.company, m3.release_year, m3.cover, m3.feature)

    await page.poupUp.haveText(`O filme '${m3.title}' foi adicionado ao catálogo.`)

    await page.movies.tableHave(searchMovies.search.outputs)


 })

