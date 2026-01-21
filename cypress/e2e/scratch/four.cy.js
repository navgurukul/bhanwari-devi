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
//       cy.contains('Debugging').click();

//       const practi = [
//         '2. Practice Question','3. Practice Question','Debugging steps','5. Practice Question','6. Practice Question',
//         '7. Practice Question','8. Practice Question','9. Practice time(Debugging)'
//       ];
//       practi.forEach((link) => {
//         cy.contains(link).click();
//       });
//       cy.contains('Next').click();
//       cy.contains('Next Up: Introduction to Events').click();

//     });
//     after(function () {
//         cy.logOut();
//     });  
// });


  
  