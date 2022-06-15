describe('empty spec', () => {
  it('access about us', () => {
    cy.visit('localhost:3000')
    cy.get('#aboutNavbar').click()
    cy.get('#aboutTitle').contains('About Us').should('be.visible')
  })
})