/// <reference types="cypress" />
describe('Meraki Learn Tests', function () {
    before(function () {
      cy.loginByJWT();
    });
    it('Operators', function () {
      cy.visit('https://www.merakilearn.org/');
      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get(':nth-child(4) > .jss1 > .MuiTypography-root').contains('JavaScript').click();
      cy.contains('JS Operators)').click();
    
        const nav = [
            'Types-Of-Operators_Arithmetic-operators',
            'Types-Of-Operators_Comparison',
            'Types-Of-Operators_Assignment-operators',
            'Types-Of-Operators_Logical-operators',
            'Types-Of-Operators_Operations-on-primitive-datatypes'
        ];
    
        nav.forEach((link1) => {
          cy.contains(link1).click();
        });
    
        cy.contains('Next').click();
        cy.contains('Next Up: JS if-else')
      });
  
      after(function () {
        cy.logOut();
      });
    });
  
  
  