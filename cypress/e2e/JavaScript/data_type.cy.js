  
/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });
  
    it('Spoken English', function () {
      cy.visit('https://www.merakilearn.org/');
      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get(':nth-child(4) > .jss1 > .MuiTypography-root').contains('JavaScript').click();
      cy.contains('JS Data Types)').click();
  
      const practiceQuestions2 = [
        'DataTypes_StringExercises',
        'DataTypes_Number',
        'DataTypes_NumberExercises',
        'DataTypes_BooleanExercises',
        'DataTypes_Undefined',
        'DataTypes_Null',
        'DataTypes_Diff-btw-null-defined',
        'DataTypes_Object',
        'DataTypes_ObjectExercises',
        'DataTypes_Array',
        'DataTypes_Array',
        'DataTypes_ArrayExercises',
        'DataTypes_Typeof',
        'DataTypes_TypeofExercises'
  
      ];
  
      practiceQuestions2.forEach((link1) => {
        cy.contains(link1).click();
      });
  
      cy.contains('Next').click();
      cy.contains('Next Up: JS Operators')
    });
    after(function () {
      // Log out
      cy.logOut();
    });
  });
  