// Técnica aplicada: partição de equivalência
// Partição válida: usuário ativo + senha correta
// Partições inválidas: senha errada, usuário bloqueado, campos vazios
describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.fixture('usuarios').as('usuarios')
  })

  it('deve fazer login com credenciais válidas', function () {
    cy.get('[data-test="username"]').type(this.usuarios.padrao)
    cy.get('[data-test="password"]').type(this.usuarios.senha, { log: false })
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
    cy.get('[data-test="title"]').should('have.text', 'Products')
  })

  it('não deve logar com senha incorreta', function () {
    cy.get('[data-test="username"]').type(this.usuarios.padrao)
    cy.get('[data-test="password"]').type('senha_errada')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('contain', 'Username and password do not match')
    cy.url().should('not.include', '/inventory.html')
  })

  it('não deve logar com usuário bloqueado', function () {
    cy.get('[data-test="username"]').type(this.usuarios.bloqueado)
    cy.get('[data-test="password"]').type(this.usuarios.senha, { log: false })
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('contain', 'this user has been locked out')
  })

  it('deve exigir o usuário', function () {
    cy.get('[data-test="password"]').type(this.usuarios.senha, { log: false })
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('contain', 'Username is required')
  })

  it('deve exigir a senha', function () {
    cy.get('[data-test="username"]').type(this.usuarios.padrao)
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('contain', 'Password is required')
  })

  it('não deve acessar a página de produtos sem login', () => {
    cy.visit('/inventory.html', { failOnStatusCode: false })
    cy.get('[data-test="error"]').should('contain', 'You can only access')
  })
})
