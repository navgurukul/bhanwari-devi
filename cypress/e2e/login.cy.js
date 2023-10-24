describe('Google auth', function () {
    this.beforeAll(function () {
    //   cy.task('db:seed')
      cy.loginByJWT()
    })
  
    it('shows onboarding', function () {
      cy.visit('https://www.merakilearn.org/')
      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')

      // cy.contains('Get Started').should('be.visible')
    })

    it('shows onboarding', function () {
      // cy.visit('https://www.merakilearn.org/')
      // cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')

      // cy.contains('Get Started').should('be.visible')
    })

    this.afterAll(function () {
      //   cy.task('db:seed')
        cy.logOut()
      })
  })
  
  