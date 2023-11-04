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

    const practiceQuestions2 = [
      'how-to-begin', 'Practice Question', 'why', '4. Practice Question', '5. Practice Question',
      '6. Practice Question', 'WhatDoComputersDo', 'WhatIsProgramming', '9. Practice Question',
      'basic-definitions_Introduction', 'basic-definitions_definitions-part-1', '12. Practice Question',
      'basic-definitions_definition-part-2', '14. Practice Question', '15. Practice Question',
      '16. Practice Question', '17. Practice Question', '18. Practice Question', '19. Practice Question',
      '20. Practice Question', 'ipython', '22. Practice Question', 'indentation', '24. Practice Question',
      '25. Practice Question', 'comments', '27. Practice Question', '28. Practice Question',
      '29. Practice Question', '30. Practice Question'
    ];

    practiceQuestions2.forEach((link1) => {
      cy.contains(link1).click();
    });

    cy.contains('Next').click();
    cy.contains('Next Up: Variables').click();
  });


                          // *************** SECOND **************

  it('Introduction to Python - Variables', function () {
      cy.visit('https://www.merakilearn.org/');

      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
      cy.contains('Variables').click()

      const practiceQuestions3 = ['2. Practice Question', '3. Practice Question', '4. Practice Question', '5. Practice Question',
      'variables_variables-question', 'variables_variables-naming-rules', '8. Practice Question', '9. Practice Question',
      '10. Practice Question', '11. Practice Question', '12. Practice Question', 'variables_variables-naming-conventions',
      '14. Practice Question', '15. Practice Question', '16. Practice Question', '17. Practice Question', '18. Practice Question',
      '19. Practice Question', '20. Practice Question', '21. Practice Question', 'variables_variables-question-naming-question2',
      'variables_variables-naming-question3', 'variables_variables-naming-question4', 'variables_Assessment', '26. Practice Question',
      '27. Practice Question', '28. Practice Question', '29. Practice Question', '30. Practice Question',
      '31. Practice Question', '32. Practice Question', '33. Practice Question', '34. Practice Question',
      '35. Practice Question', '36. Practice Question', '37. Practice Question', '38. Practice Question',
      '39. Practice Question', '40. Practice Question'];

      practiceQuestions3.forEach((link2) => {
        cy.contains(link2).click();
      });
  
      cy.contains('Next').click();
      cy.contains('Next Up: Data Types').click();
    });

                               // *******************************************

    it('Introduction to Python - Data Types', function () {
      cy.visit('https://www.merakilearn.org/');

      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
      cy.contains('Data Types').click()

      const practiceQuestions3 = ['2. Practice Question','DataTypes_numeric','4. Practice Question','5. Practice Question','6. Practice Question','DataTypes_numbericQ',
      '8. Practice Question','DataTypes_String','10. Practice Question','11. Practice Question','DataTypes_StringQ','DataTypes_Boolean','DataTypes_table','type-conversion_type-conversion-intro',
      '16. Practice Question','17. Practice Question','18. Practice Question','19. Practice Question','type-conversion_type-conversion-question',
      'type-conversion_user-input-type-conversion','22. Practice Question','23. Practice Question','type-conversion_user-input-question1','type-conversion_user-input-question2',
      'Debug_intro','Output_intro','Output_Question1','Output_Question2','Output_Assessment','31. Practice Question','32. Practice Question','33. Practice Question','34. Practice Question',
      '35. Practice Question','36. Practice Question','37. Practice Question','38. Practice Question','39. Practice Question','40. Practice Question','41. Practice Question'
  ];

      practiceQuestions3.forEach((link3) => {
        cy.contains(link3).click();
      });
  
      cy.contains('Next').click();
      cy.contains('Next Up: Operators').click();
    });



                   // *******************************


    it('Introduction to Python - Operators', function () {
      cy.visit('https://www.merakilearn.org/');

      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
      cy.contains('Operators').click()

      const practiceQuestions4 = ['Types_intro','Types_Arithmetic','4. Practice Question','5. Practice Question','6. Practice Question','7. Practice Question',
      '8. Practice Question','DataTypes_String','10. Practice Question','11. Practice Question','12. Practice Question','13. Practice Question','Types_Assignment','Types_Comparison',
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


                                          // **********************


    it('Introduction to Python - If-else', function () {
      cy.visit('https://www.merakilearn.org/');

      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
      cy.contains('If-else').click()

      const practiceQuestions5 = ['if-statement-flowcharts_how-to-make-flowchart','if-statement-flowcharts_if_flowchart-question1','if-statement-flowcharts_if_flowchart-question2',
      'if-statement-flowcharts_if_flowchart-question3','if-statement-flowcharts_if_flowchart-question4','if-statement-flowcharts_if_flowchart-question5','if-statement-with-code_if-statement-code-intro',
      'if-statement-with-code_if-code-question1','if-statement-with-code_if-code-question2','if-statement-with-code_if-code-question3','if-statement-with-code_if-code-question4','if-statement-with-code_if-code-question5',
      'if-statement-with-code_if-code-question6','if-statement-with-code_if-code-question7','if-statement-with-code_if-code-question8','if-statement-with-code_if-code-question9','debugging-part1_debugging-intro' ,     
      'debugging-part1_debugging-question1','debugging-part1_debugging-question2','debugging-part1_debugging-question3','debugging-part1_debugging-question4','debugging-part1_debugging-question5',
      'debugging-part1_debugging-question6','debugging-part1_debugging-question7',
      '26. Practice Question','27. Practice Question','28. Practice Question',
      '29. Practice Question','29. Practice Question','30. Practice Question','31. Practice Question','32. Practice Question',
      '33. Practice Question','34. Practice Question','35. Practice Question','36. Practice Question','37. Practice Question','38. Practice Question','39. Practice Question','40. Practice Question',
      'debugging-part1_Assessment',
      '42. Practice Question','43. Practice Question','44. Practice Question','45. Practice Question','46. Practice Question','47. Practice Question','48. Practice Question','49. Practice Question',
      '50. Practice Question','51. Practice Question','52. Practice Question','53. Practice Question','54. Practice Question','55. Practice Question'
  ];
                    
      practiceQuestions5.forEach((link5) => {
        cy.contains(link5).click();
      });
  
      cy.contains('Next').click();
      cy.contains('Next Up: Loops 101 (Using Python)').click();
    });



                                      // *****************************************

  //     it('Introduction to Python - Loops 101 (Using Python)', function () {
  //     cy.visit('https://www.merakilearn.org/');

  //     cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
  //     cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
  //     cy.contains('Loops 101 (Using Python)').click()

  //     const practiceQuestions6 = ['QuestionSet1_question0','3.Practice Question','4.Practice Question','QuestionSet1_question1','QuestionSet1_question2','QuestionSet1_question03','QuestionSet1_question4','9. Practice Question',
  //     'Counters_introduction','11. Practice Question','Counters_examples','QuestionSet2_introduction'.at
  //     '60. Practice Question','61. Practice Question','62. Practice Question','63. Practice Question','64. Practice Question','65. Practice Question','66. Practice Question','67. Practice Question',
  //     '68. Practice Question','69. Practice Question','70. Practice Question','71. Practice Question','72. Practice Question'
  // ];
                    
  //     practiceQuestions6.forEach((link6) => {
  //       cy.contains(link6).click();
  //     });
  
  //     cy.contains('Next').click();
  //     cy.contains('Next Up: Lists 101 (Using Python)').click();
  //   });
                                    

  this.afterAll(function () {
    cy.logOut();
  });
});







