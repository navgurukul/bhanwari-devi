// /// <reference types="cypress" />

// describe('Meraki Learn Tests', function () {
//     before(function () {
//       // Log in with JWT token
//       cy.loginByJWT();
//     });
  
// it('Introduction to Python - Data Types', function () {
//     cy.visit('https://www.merakilearn.org/');

//     cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
//     cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
//     cy.contains('Data Types').click()

//     const practiceQuestions3 = ['2. Practice Question','DataTypes_numeric','4. Practice Question','5. Practice Question','6. Practice Question','DataTypes_numbericQ',
//     '8. Practice Question','DataTypes_String','10. Practice Question','11. Practice Question','DataTypes_StringQ','DataTypes_Boolean','DataTypes_table','type-conversion_type-conversion-intro',
//     '16. Practice Question','17. Practice Question','18. Practice Question','19. Practice Question','type-conversion_type-conversion-question',
//     'type-conversion_user-input-type-conversion','22. Practice Question','23. Practice Question','type-conversion_user-input-question1','type-conversion_user-input-question2',
//     'Debug_intro','Output_intro','Output_Question1','Output_Question2','Output_Assessment','31. Practice Question','32. Practice Question','33. Practice Question','34. Practice Question',
//     '35. Practice Question','36. Practice Question','37. Practice Question','38. Practice Question','39. Practice Question','40. Practice Question','41. Practice Question'
// ];

//     practiceQuestions3.forEach((link3) => {
//       cy.contains(link3).click();
//     });

//     cy.contains('Next').click();
//     cy.contains('Next Up: Operators').click();
//   });
//   after(function () {
//     cy.logOut();
//   });
// });
