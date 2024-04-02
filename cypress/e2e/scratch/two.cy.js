// /// <reference types="cypress" />

// describe('Meraki Learn Tests', function () {
//     before(function () {
//       // Log in with JWT token
//       cy.loginByJWT();
//     });

//     it('Introduction to Scratch', function () {
//       cy.visit('https://www.merakilearn.org/');
//       cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
//       cy.get('.MuiPaper-root > .MuiList-root > :nth-child(6)').contains('Introduction to Scratch').click();
//       cy.contains('Algorithm, Commands & Sequence').click();
//       const practi = [
//         'Algorithms','4. Practice Question','4. Practice Question','Why do we need algorithms',
//         '6. Practice Question','7. Practice Question','Sequence and Commands','9. Practice Question',
//         '10. Practice Question','11. Practice Question','Practice time','EXERCISE 1','EXERCISE 2',
//         'Important points discussed'
//       ];
//       practi.forEach((link1) => {
//         cy.contains(link1).click();
//       });
//       cy.contains('Next').click();
//       cy.contains('Next Up: Getting started with Scratch').click();

//     });
//     after(function () {
//         cy.logOut();
//     });  
// });


  
  