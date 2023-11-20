/// <reference types="cypress" />
describe('Meraki Learn Tests', function () {
    before(function () {
      cy.loginByJWT();
    });
    it('if-else', function () {
      cy.visit('https://www.merakilearn.org/');
      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get(':nth-child(4) > .jss1 > .MuiTypography-root').contains('JavaScript').click();
      cy.contains('JS if-else').click();
    
        const nav = [
            'Exercises-Console_Output_Question-2',
            'Exercises-Console_Output_Question-3',
            'Exercises-Console_Output_Question-4',
            'Exercises-Console_Output_Question-5',
            'Exercises-Console_Output_Question-6',
            'Exercises-Console_Output_Question-7',
            'Exercises-Console_Output_Question-8',
            'Exercises-Console_Output_Question-9',
            'Exercises-Console_Output_Question-10',
            'Exercises-Console_Output_Question-11',
            'Exercises-Console_Output_Question-12',
            'Exercises-Console_Output_Question-13',
            'Exercises-Debug_Question-1',
            'Exercises-Debug_Question-2',
            'Project1_How-to-take-input',
            'Project1_Project'

        ];
    
        nav.forEach((link1) => {
          cy.contains(link1).click();
        });
    
        cy.contains('Next').click();
        cy.contains('Next Up: JS Loops')
      });
  
      after(function () {
        cy.logOut();
      });
    });
  
  
  