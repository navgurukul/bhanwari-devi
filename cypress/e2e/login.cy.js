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
    // cy.contains('1. how-to-begin').click();
    cy.contains('Practice Question').click();
    cy.contains('why').click();
    cy.contains('30. Practice Question').click();
  
    cy.contains('Next').click();
    cy.contains('Next Up: Variables').click();

  });
  this.afterAll(function () {
    cy.logOut();
  });
});
