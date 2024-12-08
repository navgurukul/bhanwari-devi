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
      cy.contains('Scrolling Background: Operators').click();

      const practi = [
        'How Sprites can change costumes in the Scratch','How changing costumes of the sprites can make characters move',
        'Working of a backdrop','Another example to explain movement in Scratch','What is IF conditional operator',
        'What are Operators in Scratch and its types?',
        '8. Practice Question','9. Practice Question','10. Practice Question',
        '11. Practice Question','12. Practice Question','13. Practice Question','14. Practice Question',
        '15. Practice Question','16. Practice Question','17. Practice Question'

      ];
      practi.forEach((link) => {
        cy.contains(link).click();
      });
      cy.contains('Next').click();
      cy.contains('Next Up: Sensing and Conditional blocks').click();

    });
    after(function () {
        cy.logOut();
    });  
});


  
  