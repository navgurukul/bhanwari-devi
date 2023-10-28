/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
  this.beforeAll(function () {
    // Log in with JWT token
    cy.loginByJWT();
  });

  it('should navigate to a course and sections', function () {
    // Visit the Meraki Learn website
    cy.visit('https://www.merakilearn.org/');

    // Navigate to the "Introduction to Python" course
    cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
    cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();

    // Click on specific sections ozr links you want to test
    cy.contains('Introduction To Python').click()
    cy.contains('how-to-begin').click();
    cy.contains('Practice Question').click();
    cy.contains('why').click();
    cy.contains('30. Practice Question').click();
  
    cy.contains('Next').click();
    cy.contains('Next Up: Variables').click();





    // Add meaningful assertions to validate the behavior
    // cy.contains('Some text you expect to see').should('be.visible');
    // cy.url().should('include', '/expected-url');

    // Add more interactions and assertions as needed
  });

  // Add more test cases as required

  this.afterAll(function () {
    // Log out or perform any necessary cleanup
    cy.logOut();
  });
});
