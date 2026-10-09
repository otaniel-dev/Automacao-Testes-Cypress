// Faz login pela tela.
// O SauceDemo não mantém a sessão restaurada pelo cy.session, então
// o login é feito de verdade antes de cada teste. Custa cerca de 1s
// por teste e garante que cada um comece de um estado conhecido.
Cypress.Commands.add('login', (usuario = 'standard_user') => {
  cy.fixture('usuarios').then(({ senha }) => {
    cy.visit('/')
    cy.get('[data-test="username"]').type(usuario)
    cy.get('[data-test="password"]').type(senha, { log: false })
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })
})

// Preenche os dados do comprador na primeira etapa do checkout.
Cypress.Commands.add('preencherDadosCheckout', ({ nome, sobrenome, cep }) => {
  if (nome) cy.get('[data-test="firstName"]').type(nome)
  if (sobrenome) cy.get('[data-test="lastName"]').type(sobrenome)
  if (cep) cy.get('[data-test="postalCode"]').type(cep)
  cy.get('[data-test="continue"]').click()
})

// Converte um texto como "$29.99" ou "Total: $43.18" em centavos (inteiro).
// Trabalhar com inteiros evita erros de arredondamento de ponto flutuante.
Cypress.Commands.add('textoParaCentavos', { prevSubject: true }, (elemento) => {
  const valor = elemento.text().replace(/[^0-9.]/g, '')
  return Math.round(Number(valor) * 100)
})
