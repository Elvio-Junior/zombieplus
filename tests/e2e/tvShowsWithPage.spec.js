const { test } = require('../support')

/* Pré-rquiisto
Deve estar logado 
*/

const data = require('../support/fixtures/tvshows.json')
const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    executeSQL('DELETE from public.tvshows')
})

test('Deve poder cadastrar uma nova serie', async ({ page }) => {

    const tvShows = data.create

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvShows.create(tvShows.title, tvShows.overview, tvShows.company, tvShows.release_year, tvShows.season, tvShows.cover, tvShows.featured)

    await page.poupUp.haveText(`A série '${tvShows.title}' foi adicionada ao catálogo.`)
})

test('Não deve poder cadastrar uma serie quando o titulo é duplicado', async ({ page, api }) => {

    const tvShows = data.duplicate

    await api.postTvShows(tvShows)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvShows.create(tvShows.title, tvShows.overview, tvShows.company, tvShows.release_year, tvShows.season, tvShows.cover, tvShows.featured)

    await page.poupUp.haveText(`O título '${tvShows.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

})

test('Não deve cadastrar uma serie quando os campos obrigatórios não são preenchidos', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvShows.goForm()

    await page.tvShows.submit()

    await page.alert.haveText('.alert',
        ['Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório',
            'Campo obrigatório (apenas números)'
        ])

})

test('Deve poder remover uma serie', async ({ page }) => {

    const tvShows = data.to_remove

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvShows.create(tvShows.title, tvShows.overview, tvShows.company, tvShows.release_year, tvShows.season, tvShows.cover, tvShows.featured)

    await page.poupUp.haveText(`A série '${tvShows.title}' foi adicionada ao catálogo.`)

    await page.tvShows.remove(tvShows.title)

    await page.poupUp.haveText('Série removida com sucesso.')

})

test('Deve realizar busca de uma filme pelo termo zombie', async ({ page, api }) => {

    const searchTvShows = data.search

    searchTvShows.data.forEach(async (tvShows) => {
       await api.postTvShows(tvShows)
    })
    
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    
    await page.tvShows.search(searchTvShows.input)

    await page.tvShows.tableHave(searchTvShows.outputs)


 })
