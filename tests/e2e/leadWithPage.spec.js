import { test, expect } from '../support';
const { faker } = require('@faker-js/faker')

test('Deve cadastar 1 lead na espera', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // XPATH
  //await page.click('//button[text()="Aperte o play... se tiver coragem"]');

  // 
  //await page.getByRole('button', {name:'Aperte o play... se tiver coragem'}).click();

  // Busca por substring
  await page.getByRole('button', { name: /Aperte o play/ }).click();

  // await page.locator('input[name=name]').fill('email@email.com');
  // await page.locator('input[placeholder="Seu nome completo"]').fill('email@email.com');
  // await page.locator('#name').fill('email@email.com');

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu nome').fill('Fernano Papito')

  await page.getByPlaceholder('Informe seu email').fill('email@email.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila').click()

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'

  // const content = await.page.content() -- obter o HTML da pagina
  await expect(page.locator('.toast')).toHaveText(message)

  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })

});

test('Deve cadastar 1 lead na espera - caminho feliz', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  // visit
  await page.landing.visit()

  // openLeadModal
  await page.landing.openLeadModal()

  // submitLeadForm
  await page.landing.submitLeadForm(leadName, leadEmail)

  // toastHaveText
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await page.toast.containText(message)

});

test('Não deve cadastar 1 lead na espera com mesmo lead', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  // visit
  await page.landing.visit()
  // openLeadModal
  await page.landing.openLeadModal()
  // submitLeadForm
  await page.landing.submitLeadForm(leadName, leadEmail)

  // toastHaveText
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'

  await page.toast.containText(message)

});

test('Não Deve cadastar com email incorreto', async ({ page }) => {
  /*
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu nome').fill('Fernano Papito')

  await page.getByPlaceholder('Informe seu e-mail').fill('email')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila').click()

  await expect(page.locator('.alert')).toHaveText('Email incorreto')
  */
  //const landingPage = new LandingPage(page)

  // visit
  await page.landing.visit()

  // openLeadModal
  await page.landing.openLeadModal()

  // submitLeadForm
  await page.landing.submitLeadForm('Fernano Papito', 'email')

  // alertHaveText
  await page.landing.alertHaveText('Email incorreto')
});

test('Não Deve cadastar quando o nome não é preenchido', async ({ page }) => {
  /*
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu e-mail').fill('email@email.com')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  */

  // visit
  await page.landing.visit()

  // openLeadModal
  await page.landing.openLeadModal()

  // submitLeadForm
  await page.landing.submitLeadForm('', 'email@email.com')

  // alertHaveText
  await page.landing.alertHaveText('Campo obrigatório')
});

test('Não Deve cadastar quando o email não é preenchido', async ({ page }) => {
  /*
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu nome').fill('Fernano Papito')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
    */
  //const landingPage = new LandingPage(page)

  // visit
  await page.landing.visit()

  // openLeadModal
  await page.landing.openLeadModal()

  // submitLeadForm
  await page.landing.submitLeadForm('Fernando Papito', '')

  // alertHaveText
  await page.landing.alertHaveText('Campo obrigatório')
});

test('Não Deve cadastar quando nenhum campo é preenchido', async ({ page }) => {
  /*
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila').click()

  await expect(page.locator('.alert')).toHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
  */
  //const landingPage = new LandingPage(page)

  // visit
  await page.landing.visit()

  // openLeadModal
  await page.landing.openLeadModal()

  // submitLeadForm
  await page.landing.submitLeadForm('', '')

  // alertHaveText
  await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
});