/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });

    it('Introduction to Python - If-else', function () {
        cy.visit('https://www.merakilearn.org/');
  
        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
        cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
        cy.contains('If-else').click()
  
        const prac = [
        'if-statement-flowcharts_how-to-make-flowchart',
        'if-statement-flowcharts_if-flowchart-question1',
        'if-statement-flowcharts_if-flowchart-question2',
        'if-statement-flowcharts_if-flowchart-question3',
        'if-statement-flowcharts_if-flowchart-question4',
        'if-statement-flowcharts_if-flowchart-question5',
        'if-statement-with-code_if-statement-code-intro',
        'if-statement-with-code_if-code-question1',
        'if-statement-with-code_if-code-question2',
        'if-statement-with-code_if-code-question3',
        'if-statement-with-code_if-code-question4',
        'if-statement-with-code_if-code-question5',
        'if-statement-with-code_if-code-question6',
        'if-statement-with-code_if-code-question7',
        'if-statement-with-code_if-code-question8',
        'if-statement-with-code_if-code-question9',
        'debugging-part1_debugging-intro' ,     
        'debugging-part1_debugging-question1',
        'debugging-part1_debugging-question2',
        'debugging-part1_debugging-question3',
        'debugging-part1_debugging-question4',
        'debugging-part1_debugging-question5',
        'debugging-part1_debugging-question6',
        'debugging-part1_debugging-question7',
        '26. Practice Question','27. Practice Question','28. Practice Question',
        '29. Practice Question','29. Practice Question','30. Practice Question','31. Practice Question','32. Practice Question',
        '33. Practice Question','34. Practice Question','35. Practice Question','36. Practice Question','37. Practice Question','38. Practice Question','39. Practice Question','40. Practice Question',
        'debugging-part1_Assessment',
        '42. Practice Question','43. Practice Question','44. Practice Question','45. Practice Question','46. Practice Question','47. Practice Question','48. Practice Question','49. Practice Question',
        '50. Practice Question','51. Practice Question','52. Practice Question','53. Practice Question','54. Practice Question','55. Practice Question'
    ];
                      
        prac.forEach((link) => {
          cy.contains(link).click();
        });
        cy.contains('Next').click();
        cy.contains('Next Up: Loops 101 (Using Python)').click();
      });
      after(function () {
    cy.logOut();
  });
});

