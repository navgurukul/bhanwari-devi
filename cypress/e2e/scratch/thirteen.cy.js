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
      cy.contains('Lists').click();

      const practi = [
        'What are Variables?','What is a List?','How to modify the contents of a List?',
        '5. Practice Question','6. Practice Question','7. Practice Question','8. Practice Question',
        '9. Practice Question','10. Practice Question','11. Practice Question','12. Practice Question',
        'Variables and List: Quiz Game [Part 2]','Final code',
        '15. Practice Question','16. Practice Question','17. Practice Question','18. Practice Question',
        '19. Practice Question','20. Practice Question','21. Practice Question','22. Practice Question',
        '23. Practice Question','24. Practice Question'

      ];
      practi.forEach((link) => {
        cy.contains(link).click();
      });
      cy.contains('Next').click();
      cy.contains('Next Up: Conditional loops').click();

    });
    after(function () {
        cy.logOut();
    });  
});


  
  