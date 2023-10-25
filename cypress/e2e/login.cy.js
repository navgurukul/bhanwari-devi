/// <reference types="cypress" />

describe('Google auth', function () {
    this.beforeAll(function () {

    //   cy.task('db:seed')
    // This is all about the UI testing with login meraki.
    // All contain are here and all thing we coverd here like content and all
    // Meraki login is done but using JWL token not a user id.

      cy.loginByJWT()
    })

  // It all about Introduction to Python

    it('shows onboarding', function () {
      cy.visit('https://www.merakilearn.org/')
      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')
      cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click()
      cy.contains('Learn the basics and become comfortable in one of the most popular programming languages Python.')
      cy.contains('Learning Outcomes')
      cy.get(':nth-child(1) > .jss58 > .MuiPaper-root > .jss61').click()
      cy.get(':nth-child(31) > .jss105 > .MuiListItemButton-root > .MuiTypography-root').click()
      cy.get('.MuiButton-textPrimary').click()
      cy.pause()

      cy.get('.MuiBox-root > .MuiButton-root').click()

      // cy.get('.MuiBox-root > .MuiButton-root').click()
      // cy.get(':nth-child(2) > .jss157 > .MuiPaper-root > .MuiCardContent-root').click()
      


















      // cy.get(':nth-child(2) > .jss105 > .MuiListItemButton-root').click()
      // cy.get(':nth-child(3) > .jss105 > .MuiListItemButton-root > .MuiTypography-root').click()
      // cy.get('.MuiButton-textPrimary').click()
      // cy.get(':nth-child(27) > .jss105 > .MuiListItemButton-root > .MuiTypography-root').click()
      // cy.contains('We can write comments in any program . When we run the program these comments do not get executed.')
      // cy.get('[style="display: flex; justify-content: space-between; align-items: center;"] > .MuiTypography-root').click()
      // cy.get(':nth-child(31) > .jss231 > .MuiListItemButton-root > .MuiTypography-root').click()


      // It is all about Variable...

      // cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')
      // cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click()

      // cy.get(':nth-child(2) > .jss284 > .MuiPaper-root').contains('Variables').click()





      



      
      // cy.contains('Get Started').should('be.visible')
    })

    // it('shows onboarding', function () {
    //   // cy.visit('https://www.merakilearn.org/')
    //   // cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')

    //   // cy.contains('Get Started').should('be.visible')
    // })

    this.afterAll(function () {
      //   cy.task('db:seed')
        cy.logOut()
      })
  })
  
  