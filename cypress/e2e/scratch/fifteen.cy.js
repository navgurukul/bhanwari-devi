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
      cy.contains('Functions in Scratch').click();

      const practi = [
        'Task - Moving Road','3. Practice Question','4. Practice Question','5. Practice Question',
        '6. Practice Question','7. Practice Question','8. Practice Question','9. Practice Question',
        '10. Practice Question','11. Practice Question','12. Practice Question','Functions- Car Racing Game [Part 2]',
        '14. Practice Question','15. Practice Question','16. Practice Question','17. Practice Question',
        '18. Practice Question','Functions- Car Racing Game [Part 3]','20. Practice Question','21. Practice Question',
        '22. Practice Question','23. Practice Question','24. Practice Question','25. Practice Question','26. Practice Question',
        '27. Practice Question','28. Practice Question','29. Practice Question'

      ];
      practi.forEach((link) => {
        cy.contains(link).click();
      });
      cy.contains('Next').click();
      cy.contains('Return to Dashboard').click();

    });
    after(function () {
        cy.logOut();
    });  
});


  
  