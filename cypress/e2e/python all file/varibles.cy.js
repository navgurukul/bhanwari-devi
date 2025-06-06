/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });
    it('Introduction to Python - Variables', function () {
        cy.visit('https://www.merakilearn.org/');
        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
        cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
        cy.contains('Variables').click()
      // cy.pause()
      const practiceQuestions3 = [
      '2. Practice Question', 
      '3. Practice Question', '4. Practice Question', '5. Practice Question',
      'variables_variables-question', 'variables_variables-naming-rules', '8. Practice Question', '9. Practice Question',
      '10. Practice Question', '11. Practice Question', '12. Practice Question', 'variables_variables-naming-conventions',
      '14. Practice Question', '15. Practice Question', '16. Practice Question', '17. Practice Question', '18. Practice Question',
      '19. Practice Question', '21. Practice Question', 'variables_variables-naming-question2',
      'variables_variables-naming-question3', 'variables_variables-naming-question4', 'variables_Assessment', '26. Practice Question',
      '27. Practice Question', '28. Practice Question', '29. Practice Question', '30. Practice Question',
      '31. Practice Question', '32. Practice Question', '33. Practice Question', '34. Practice Question',
      '35. Practice Question', '36. Practice Question', '37. Practice Question', '38. Practice Question',
      '39. Practice Question', '40. Practice Question'];

      practiceQuestions3.forEach((link1) => {
        cy.contains(link1).click();
      });
  
      cy.contains('Next').click();
      cy.contains('Next Up: Data Types').click();
    });
    after(function () {
        cy.logOut();
      });
    });
    