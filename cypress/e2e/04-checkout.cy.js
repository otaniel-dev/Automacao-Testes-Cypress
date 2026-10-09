describe('Checkout', () => {
  beforeEach(() => {
    cy.login()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    cy.fixture('cliente').as('cliente')
  })

  it('deve concluir uma compra com sucesso', function () {
    cy.preencherDadosCheckout(this.cliente)
    cy.get('[data-test="finish"]').click()

    cy.url().should('include', '/checkout-complete.html')
    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
  })

  it('deve calcular corretamente subtotal, imposto e total', function () {
    cy.preencherDadosCheckout(this.cliente)

    // Soma os preços dos itens, em centavos
    cy.get('[data-test="inventory-item-price"]').then(($precos) => {
      const somaItens = [...$precos].reduce(
        (soma, el) => soma + Math.round(Number(el.innerText.replace('$', '')) * 100), 0
      )

      cy.get('[data-test="subtotal-label"]').textoParaCentavos().then((subtotal) => {
        expect(subtotal, 'subtotal = soma dos itens').to.eq(somaItens)

        cy.get('[data-test="tax-label"]').textoParaCentavos().then((imposto) => {
          // A loja aplica 8% de imposto sobre o subtotal
          expect(imposto, 'imposto = 8% do subtotal').to.eq(Math.round(subtotal * 0.08))

          cy.get('[data-test="total-label"]').textoParaCentavos()
            .should('eq', subtotal + imposto)
        })
      })
    })
  })

  // Técnica aplicada: partição de equivalência nos campos obrigatórios
  it('deve exigir o nome', function () {
    cy.preencherDadosCheckout({ ...this.cliente, nome: '' })
    cy.get('[data-test="error"]').should('contain', 'First Name is required')
  })

  it('deve exigir o sobrenome', function () {
    cy.preencherDadosCheckout({ ...this.cliente, sobrenome: '' })
    cy.get('[data-test="error"]').should('contain', 'Last Name is required')
  })

  it('deve exigir o CEP', function () {
    cy.preencherDadosCheckout({ ...this.cliente, cep: '' })
    cy.get('[data-test="error"]').should('contain', 'Postal Code is required')
  })
})
