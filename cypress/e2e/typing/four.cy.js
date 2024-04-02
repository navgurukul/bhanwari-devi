/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });
    it('Number Row (Typing)', function () {
        cy.visit('https://www.merakilearn.org/');
        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
        cy.get('.MuiList-root > :nth-child(3) > .jss1 > .MuiTypography-root').contains('Typing').click();
        cy.contains('Number Row (Typing').click();
    
        const practi = [
          'keys_0_1','keys_1_2_3',
          'keys_4_5_6',
          'keys_7_8_9'
        ];
        practi.forEach((link1) => {
          cy.contains(link1).click();
        });
        cy.contains('Next').click();
        cy.contains('Return to Dashboard').click();
      });

    after(function () {
      // Log out
      cy.logOut();
    });
  });
