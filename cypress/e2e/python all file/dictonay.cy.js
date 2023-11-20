/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });


it('Introduction to Python - Dictionary (Using Python)', function () {
    cy.visit('https://www.merakilearn.org/');

    cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
    cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
    cy.contains('Dictionary (Using Python)').click()

    const pra = [
    // '2. Practice Question',
    '3. Practice Question',
    'access_element_dictionary',
    'add_element_to_dictionary',
    '6. Practice Question',
    '7. Practice Question',
    '8. Practice Question',
    '9. Practice Question',
    '10. Practice Question',
    '11. Practice Question',
    '12. Practice Question',
    'update_element_dictionary',
    'remove_element_dictionary',
    '15. Practice Question',
    '16. Practice Question',
    'iterations',
    '18. Practice Question',
    '19. Practice Question',
    '20. Practice Question',
    '21. Practice Question',
    '22. Practice Question',
    '23. Practice Question',
    '24. Practice Question',
    'Questions_intro',
    'Questions_question1',
    '27. Practice Question',
    '28. Practice Question',
    '29. Practice Question',
    '30. Practice Question',
    '31. Practice Question',
    '32. Practice Question',
    '33. Practice Question',
    '34. Practice Question',
    '35. Practice Question',
    '36. Practice Question',
    'Questions_question2',
    'Questions_question3',
    '39. Practice Question',
    '40. Practice Question',
    'Questions_question4',
    'Questions_question5',
    'Questions_question6',
    'Questions_question7',
    'Questions_question8',
    'Questions_question10',
    'Questions_question11',
    'Questions_question12',
    'Questions_question13',
    'OutputOfCode_question1',
    'OutputOfCode_question2',
    'OutputOfCode_question3',
    'OutputOfCode_question4',
    'OutputOfCode_question5',
    'OutputOfCode_question6',
    'OutputOfCode_question7',
    'DebugCode_intro',
    'DebugCode_question1',
    'DebugCode_question2',
    'DebugCode_question3',
    'DebugCode_question4',
    'BonusTask_intro',
    'InterviewQuestions_intro',
    'InterviewQuestions_Assessment_Dictionary','67. Practice Question','68. Practice Question','69. Practice Question',
    '70. Practice Question','71. Practice Question','72. Practice Question','73. Practice Question',
    '74. Practice Question','75. Practice Question','76. Practice Question','77. Practice Question','79. Practice Question'
];             
    pra.forEach((link) => {
      cy.contains(link).click();
    });

    cy.contains('Next').click();
    cy.contains('Functions').click();
  });
  after(function () {
    cy.logOut();
});
});


