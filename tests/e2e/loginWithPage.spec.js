import { test } from '../support';

test('Deve logar como administrador', async ({ page }) => {
    await page.login.visit()

    await page.login.submitLoginForm('admin@zombieplus.com', 'pwd123')

    await page.login.isLoggedIn('Admin')
});

test('Não Deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit()

    await page.login.submitLoginForm('admin@zombieplus.com', 'abc123')


    //v4
    //await page.toast.containText(message)
    //const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await page.poupUp.haveText(message)
});

test('Não Deve logar quando o email não for  preenchido', async ({ page }) => {
    await page.login.visit()

    await page.login.submitLoginForm('', 'abc123')
    
    //v4
    //await page.alert.haveText('.email-alert', 'Campo obrigatório')

    await page.alert.haveText('.alert', 'Campo obrigatório')

});

test('Não Deve logar quando a senha não for  preenchido', async ({ page }) => {
    await page.login.visit()

    await page.login.submitLoginForm('admin@zombieplus.com', '')

    //v4
    //await page.alert.haveText('.password-alert', 'Campo obrigatório')

    await page.alert.haveText('.alert', 'Campo obrigatório')
});

test('Não Deve logar quando nenhum campo for  preenchido', async ({ page }) => {
    await page.login.visit()

    await page.login.submitLoginForm('', '')

    await page.alert.haveText('span[class$=alert]', ['Campo obrigatório', 'Campo obrigatório']) // span[class$=alert]
});