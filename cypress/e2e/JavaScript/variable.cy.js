/// <reference types="cypress" />
describe('Meraki Learn Tests', function () {
    before(function () {
      cy.loginByJWT();
    });
    it('Variables', function () {
      cy.visit('https://www.merakilearn.org/');
      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get(':nth-child(4) > .jss1 > .MuiTypography-root').contains('JavaScript').click();
      cy.contains('JS Variables)').click();
    
        const nav = [
          'Storing-a-value-into-variable',
          'Case-sensitive',
          'Escape-Sequences-in-strings',
          'Type-Coercion'
        ];
    
        nav.forEach((link1) => {
          cy.contains(link1).click();
        });
    
        cy.contains('Next').click();
        cy.contains('Next Up: JS Data Types')
      });
  
      after(function () {
        cy.logOut();
      });
    });
  
  
  