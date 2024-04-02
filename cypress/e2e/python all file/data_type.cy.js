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

//     const practiceQuestions3 = [
//         '2. Practice Question','DataTypes_numeric','4. Practice Question','5. Practice Question','6. Practice Question','DataTypes_numbericQ',
//     '35. Practice Question','36. Practice Question','37. Practice Question','38. Practice Question','39. Practice Question','40. Practice Question','41. Practice Question'
// ];

//     practiceQuestions3.forEach((link3) => {
//         cy.log(link3)
//       cy.contains(link3).click();
//     });

//     cy.contains('Next').click();
//     cy.contains('Next Up: Operators').click();
//   });
//   after(function () {
//     cy.logOut();
//   });
// });
