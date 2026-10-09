describe('Carrinho', () => {
  beforeEach(() => {
    cy.login()
  })

  it('deve adicionar um produto e atualizar o contador', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
  })

  it('deve adicionar dois produtos e exibi-los no carrinho', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="inventory-item"]').should('have.length', 2)
    cy.contains('Sauce Labs Backpack').should('be.visible')
    cy.contains('Sauce Labs Bike Light').should('be.visible')
  })

  it('deve remover um produto do carrinho', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  })

  it('deve manter os itens ao navegar entre páginas', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="continue-shopping"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
  })
})
