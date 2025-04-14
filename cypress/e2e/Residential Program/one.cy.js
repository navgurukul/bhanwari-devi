/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });

    it('Bottom Row (TG)', function () {
      cy.visit('https://www.merakilearn.org/');
      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get(':nth-child(5) > .jss1').contains('Residential Programmes').click();
      cy.contains('Admission Process & Criteria').click();
  
      const practi = [
        'Assessment-Process-Stage-Wise',
        'Admission-Process-Videos'
      ];
  
      practi.forEach((link1) => {
        cy.contains(link1).click();
      });
      cy.contains('Next').click();
      cy.contains('Next Up: About Navgurukul').click();
    });
    after(function () {
        cy.logOut();
      });
    });
  
  
  