describe('search spec', () => {
  it('search for something', () => {
    cy.visit('localhost:3000')
    cy.get("#searchField").type("pisco")
    cy.get("#searchButton").click()
    cy.url().should('eq', 'http://localhost:3000/catalog?search=pisco')
  })
})