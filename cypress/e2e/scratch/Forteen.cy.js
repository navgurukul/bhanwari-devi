/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });

    it('Introduction to Scratch', function () {
      cy.visit('https://www.merakilearn.org/');
      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get('.MuiPaper-root > .MuiList-root > :nth-child(6)').contains('Introduction to Scratch').click();
      cy.contains('Conditional loops').click();

      const practi = [
        'Loops','Conditional Loops','Task-1: Snowfall with a repeat until block',
        'Task-2: Create a Snowfall scene using a cloning concept',
        '6. Practice Question','7. Practice Question','8. Practice Question',
        '9. Practice Question','10. Practice Question','11. Practice Question','12. Practice Question',
        '13. Practice Question'
      ];
      practi.forEach((link) => {
        cy.contains(link).click();
      });
      cy.contains('Next').click();
      cy.contains('Next Up: Functions in Scratch').click();

    });
    after(function () {
        cy.logOut();
    });  
});


  
  