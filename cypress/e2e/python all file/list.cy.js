/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });
    it('Introduction to Python - Lists 101 (Using Python)', function () {
        cy.visit('https://www.merakilearn.org/');
  
        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
        cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
        cy.contains('Lists 101 (Using Python)').click()
  
        const practiceQuestions6 = [
            '2. Practice Question',
            'defining-lists','defining-lists-2',
            '5. Practice Question',
            '6. Practice Question',
            '7. Practice Question',
            'lists-operations',
            'lists-iteration',
            '10. Practice Question',
            '11. Practice Question',
            '12. Practice Question',
            '13. Practice Question',
            '14. Practice Question',
            '15. Practice Question',
            '16. Practice Question',
            '17. Practice Question',
            '18. Practice Question',
            '19. Practice Question',
            'questions_introduction',
            'questions_count-elements',
            '22. Practice Question',
            'questions_lists-question1',
            'questions_lists-question2',
            'questions_lists-question3',
            '27. Practice Question',
            '28. Practice Question',
            '29. Practice Question',
            '30. Practice Question',
            'questions_second-max-element',
            'questions_binary-to-decimal',
            'nested-lists','questions-2_introduction',
            'questions-2_difference',
            'questions-2_report-card-2',
            '37. Practice Question',
            '38. Practice Question',
        'questions-2 report-card-2','questions-2_total-sum','questions-2_magic-square','lists-len-function','kitne-aadmi-the_kitne-aadmi-the','kitne-aadmi-the_aao-jodein',
        'kitne-aadmi-the_average-kitna-hai','kitne-aadmi-the_sab-saath-mei','questions-n_introduction','questions-n_kitne-crorepati','questions-n_count-occurences',
        'questions-n_duplicates','questions-n_substring-nikalo','advanced-questions_introduction','debugging-part2_debugging-intro','debugging-part2_debugging-question1',
        '55. Practice Question','56. Practice Question','57. Practice Question','58. Practice Question','59. Practice Question','debugging-part2_debugging-question2',
        'debugging-part2_Assessment','62. Practice Question','63. Practice Question','64. Practice Question','65. Practice Question','66. Practice Question',
        '67. Practice Question','68. Practice Question','69. Practice Question','70. Practice Question','71. Practice Question','72. Practice Question','73. Practice Question',
        '74. Practice Question','75. Practice Question','76. Practice Question'
    ];
                      
        practiceQuestions6.forEach((link6) => {
          cy.contains(link6).click();
        });
  
        cy.contains('Next').click();
        cy.contains('Dictionary (Using Python)').click();
      });
  


  

  after(function () {
    cy.logOut();
  });
});

