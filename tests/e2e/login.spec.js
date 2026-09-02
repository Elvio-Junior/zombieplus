// @ts-check
import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')
const { Alert } = require('../pages/Components')
const { MoviesPage } = require('../pages/MoviesPage')
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

test.beforeEach(async ({page})=> {
 loginPage = new LoginPage(page)
 toast = new Toast(page)
 alert = new Alert(page)
 moviesPage = new MoviesPage(page)
}) 

test('Deve logar como administrador', async ({ page }) => {
    await loginPage.visit()

    await loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123')

    await moviesPage.isLoggedIn()
});

test('Não Deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit()

    await loginPage.submitLoginForm('admin@zombieplus.com', 'abc123')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await toast.containText(message)
});

test('Não Deve logar quando o email não for  preenchido', async ({ page }) => {
    await loginPage.visit()

    await loginPage.submitLoginForm('', 'abc123')

    await alert.haveText('.email-alert', 'Campo obrigatório')
});

test('Não Deve logar quando a senha não for  preenchido', async ({ page }) => {
    await loginPage.visit()

    await loginPage.submitLoginForm('admin@zombieplus.com', '')

    await alert.haveText('.password-alert', 'Campo obrigatório')
});

test('Não Deve logar quando nenhum campo for  preenchido', async ({ page }) => {
    await loginPage.visit()

    await loginPage.submitLoginForm('', '')

    await alert.haveText('span[class$=alert]', ['Campo obrigatório', 'Campo obrigatório']) // span[class$=alert]
});