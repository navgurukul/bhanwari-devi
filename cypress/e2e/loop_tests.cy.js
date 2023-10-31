/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    this.beforeAll(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });
  
    it('Introduction to Python', function () {
      cy.visit('https://www.merakilearn.org/');

      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
      cy.contains('Introduction To Python').click()

      const practiceQuestions = [
        'how-to-begin', 'Practice Question', 'why', '4. Practice Question', '5. Practice Question',
        '6. Practice Question', 'WhatDoComputersDo', 'WhatIsProgramming', '9. Practice Question',
        'basic-definitions_Introduction', 'basic-definitions_definitions-part-1', '12. Practice Question',
        'basic-definitions_definition-part-2', '14. Practice Question', '15. Practice Question',
        '16. Practice Question', '17. Practice Question', '18. Practice Question', '19. Practice Question',
        '20. Practice Question', 'ipython', '22. Practice Question', 'indentation', '24. Practice Question',
        '25. Practice Question', 'comments', '27. Practice Question', '28. Practice Question',
        '29. Practice Question', '30. Practice Question'
      ];

      practiceQuestions.forEach((link) => {
        cy.contains(link).click();
      });
  
      cy.contains('Next').click();
      cy.contains('Next Up: Variables').click();
      
    });
    
    this.afterAll(function () {
      cy.logOut();
    });
  });




