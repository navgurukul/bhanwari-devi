/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });
    it('Introduction to Python - Loops 101 (Using Python)', function () {
        cy.visit('https://www.merakilearn.org/');
        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
        cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
        cy.contains('Loops 101 (Using Python)').click()
        const practiceQuestions6 = [
            'QuestionSet1_question0',
            '3. Practice Question',
            '4. Practice Question',
            'QuestionSet1_question1',
            'QuestionSet1_question2','QuestionSet1_question03','QuestionSet1_question4','9. Practice Question',
            'Counters_introduction','11. Practice Question','Counters_examples','QuestionSet2_introduction',
            '60. Practice Question','61. Practice Question','62. Practice Question','63. Practice Question','64. Practice Question','65. Practice Question','66. Practice Question','67. Practice Question',
            '68. Practice Question','69. Practice Question','70. Practice Question','71. Practice Question','72. Practice Question'
        ];
        practiceQuestions6.forEach((link) => {
            cy.contains(link).click();
        });
        cy.contains('Next').click();
        cy.contains('Next Up: Lists 101 (Using Python)').click();
    });
    after(function () {
        cy.logOut();
  });
});



