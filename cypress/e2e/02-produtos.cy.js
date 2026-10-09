describe('Produtos', () => {
  beforeEach(() => {
    cy.login()
  })

  it('deve exibir a lista de produtos', () => {
    cy.get('[data-test="inventory-item"]').should('have.length', 6)
  })

  it('deve ordenar por preço do menor para o maior', () => {
    cy.get('[data-test="product-sort-container"]').select('lohi')

    cy.get('[data-test="inventory-item-price"]').then(($precos) => {
      const precos = [...$precos].map((el) => Number(el.innerText.replace('$', '')))
      const ordenados = [...precos].sort((a, b) => a - b)
      expect(precos).to.deep.equal(ordenados)
    })
  })

  it('deve ordenar por preço do maior para o menor', () => {
    cy.get('[data-test="product-sort-container"]').select('hilo')

    cy.get('[data-test="inventory-item-price"]').then(($precos) => {
      const precos = [...$precos].map((el) => Number(el.innerText.replace('$', '')))
      const ordenados = [...precos].sort((a, b) => b - a)
      expect(precos).to.deep.equal(ordenados)
    })
  })

  it('deve ordenar por nome de Z a A', () => {
    cy.get('[data-test="product-sort-container"]').select('za')

    cy.get('[data-test="inventory-item-name"]').then(($nomes) => {
      const nomes = [...$nomes].map((el) => el.innerText)
      const ordenados = [...nomes].sort().reverse()
      expect(nomes).to.deep.equal(ordenados)
    })
  })

  it('deve abrir os detalhes de um produto', () => {
    cy.get('[data-test="inventory-item-name"]').first().then(($nome) => {
      const nome = $nome.text()
      cy.wrap($nome).click()
      cy.url().should('include', '/inventory-item.html')
      cy.get('[data-test="inventory-item-name"]').should('have.text', nome)
    })
  })
})
