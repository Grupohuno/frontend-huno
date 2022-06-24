describe('search spec', () => {
  it('search for something', () => {
    cy.visit('localhost:3000')
    cy.get("#searchField").type("pisco")
    cy.get("#searchButton").click()
    cy.url().should('eq', 'http://localhost:3000/catalog?search=pisco')
  })
  it('search again', () => {
    cy.get("#clearSearchButton").click()
    cy.get("#searchField").type("cerveza")
    cy.get("#searchButton").click()
    cy.url().should('eq', 'http://localhost:3000/catalog?search=cerveza')
  })
  it('try empty search, url doesnt change', () => {
    cy.get("#clearSearchButton").click()
    cy.get('#searchField').invoke('val').should('eq', '');
    cy.get("#searchButton").click()
    cy.url().should('eq', 'http://localhost:3000/catalog?search=cerveza')
  })
})