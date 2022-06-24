describe('catalog spec', () => {
    it('access all categories in catalog', () => {
      cy.visit('localhost:3000')
      cy.get('#catalogNavbar').trigger("mouseover")
      cy.get('#all').click()
      cy.get('#catalogTitle').contains('Catálogo').should('be.visible')
      cy.url().should('eq','http://localhost:3000/catalog')
    })

    it('access pisco category in catalog', () => {
      cy.visit('localhost:3000')
      cy.get('#catalogNavbar').trigger("mouseover")
      cy.get('#piscoCategory').click()
      cy.get('#catalogTitle').contains('Catálogo').should('be.visible')
      cy.url().should('eq','http://localhost:3000/catalog?category=pisco')
    })

    it('access beer category in catalog', () => {
        cy.visit('localhost:3000')
        cy.get('#catalogNavbar').trigger("mouseover")
        cy.get('#beerCategory').click()
        cy.get('#catalogTitle').contains('Catálogo').should('be.visible')
        cy.url().should('eq','http://localhost:3000/catalog?category=cerveza')
      })

    it('access soda category in catalog', () => {
      cy.visit('localhost:3000')
      cy.get('#catalogNavbar').trigger("mouseover")
      cy.get('#sodaCategory').click()
      cy.get('#catalogTitle').contains('Catálogo').should('be.visible')
      cy.url().should('eq','http://localhost:3000/catalog?category=bebida')
    })

  })

