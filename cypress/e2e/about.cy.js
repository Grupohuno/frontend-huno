describe('about spec', () => {
  it('access about us & go back home', () => {
    cy.visit('localhost:3000')
    cy.get('#aboutNavbar').click()
    cy.url().should('eq', 'http://localhost:3000/about')
    cy.get('#aboutTitle').contains('About Us').should('be.visible')
    cy.get('#homeNavbar').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})