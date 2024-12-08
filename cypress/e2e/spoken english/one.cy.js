/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });
  
    it('Spoken English', function () {
      cy.visit('https://www.merakilearn.org/');
      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get('.MuiList-root > :nth-child(2) > .jss1 > .MuiTypography-root').contains('Spoken English').click();
      cy.contains('Spoken-English').click();
  
      const practiceQuestions2 = [
        'spoken-english_spoken-english-week1', 'spoken-english_spoken-english-week2',
        'spoken-english_spoken-english-week3', 'spoken-english_spoken-english-week4',
        'spoken-english_spoken-english-week5', 'spoken-english_spoken-english-week6',
        'spoken-english_spoken-english-week7', 'spoken-english_spoken-english-week8',
        'spoken-english_spoken-english-week9', 'spoken-english_spoken-english-week10',
        'spoken-english_spoken-english-week11', 'spoken-english_spoken-english-week12',
        'spoken-english_spoken-english-week13', 'spoken-english_spoken-english-week14',
        'spoken-english_spoken-english-week15'
      ];
  
      practiceQuestions2.forEach((link1) => {
        cy.contains(link1).click();
      });
  
      cy.contains('Next').click();
      cy.contains('Return to Dashboard').click()
    });
    after(function () {
      // Log out
      cy.logOut();
    });
  });
