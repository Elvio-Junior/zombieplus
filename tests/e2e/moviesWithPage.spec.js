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

test('Deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data[0]

    //executeSQL(`DELETE from movies WHERE title = '${movie.title}'`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)
    //v4
    //await page.toast.containText('Cadastro realizado com sucesso!')

    await page.poupUp.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('Não deve poder cadastrar um filme quando o titulo é duplicado', async ({ page, api }) => {

    const movie = data[1]

    //executeSQL(`DELETE from movies WHERE title = '${movie.title}'`)

    await api.postMovies(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)

    //v4
    //await page.toast.containText('Oops!Este conteúdo já encontra-se cadastrado no catálogo')

    await page.poupUp.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

    /*
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year, movie.cover, movie.feature)

    await page.toast.containText('Oops!Este conteúdo já encontra-se cadastrado no catálogo')
    */
})

test('Não deve cadastrar um filme quando os campos obrigatórios não são preenchidos', async ({ page }) => {

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

test('Deve poder remover um filme', async ({ page }) => {

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

test('Deve realizar busca de um filme pelo termo Dead', async ({ page, api }) => {

    const searchMovies = movies.search

    searchMovies.data.forEach(async (movie) => {
       await api.postMovies(movie)
    })
    
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    
    await page.movies.search(searchMovies.input)

    await page.movies.tableHave(searchMovies.outputs)


 })

