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
//       cy.contains('Introduction to Meraki Scratch Platform').click();
//       const practi = [
//         'Three main sections in Meraki Scratch',
//         'Introduction to blocks'
//       ];
//       practi.forEach((link1) => {
//         cy.contains(link1).click();
//       });
//       cy.contains('Next').click();
//       cy.contains('Next Up: Algorithm, Commands & Sequence').click();

//     });
//     after(function () {
//         cy.logOut();
//     });  
// });


  
  