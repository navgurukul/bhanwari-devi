/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });
  

it('Introduction to Python - Operators', function () {
    cy.visit('https://www.merakilearn.org/');

    cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
    cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
    cy.contains('Operators').click()

    const practiceQuestions4 = ['Types_intro','Types_Arithmetic','4. Practice Question','5. Practice Question','6. Practice Question','7. Practice Question',
    '8. Practice Question','9. Practice Question','10. Practice Question','11. Practice Question','12. Practice Question','13. Practice Question','Types_Assignment','Types_Comparison',
    'Types_Logical','17. Practice Question','18. Practice Question','19. Practice Question','20. Practice Question',
    '21. Practice Question','22. Practice Question','23. Practice Question','24. Practice Question','24. Practice Question',
    '25. Practice Question','26. Practice Question','InterviewQuestions_Assessment_Operators','28. Practice Question','29. Practice Question','30. Practice Question','31. Practice Question','32. Practice Question','33. Practice Question','34. Practice Question',
    '35. Practice Question','36. Practice Question','37. Practice Question','38. Practice Question','39. Practice Question','40. Practice Question','41. Practice Question'
];

    practiceQuestions4.forEach((link4) => {
      cy.contains(link4).click();
    });

    cy.contains('Next').click();
    cy.contains('Next Up: If-else').click();
  });
  after(function () {
    cy.logOut();
  });
});

