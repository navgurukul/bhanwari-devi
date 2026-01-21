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
//       cy.contains('Getting started with Scratch').click();
//       const practi = [
//         '2. Practice Question','3. Practice Question','4. Practice Question','Block-Based Coding','6. Practice Question',
//         '7. Practice Question','Introduction to Scratch','9. Practice Question','10. Practice Question','11. Practice Question',
//         '12. Practice Question','Events in Scratch programming','14. Practice Question',
//         'Exercise -1(Scratch)','Sequence Vs Events-Based Programming','17. Practice Question','18. Practice Question',
//         'Exercise -2 (Scratch)','Important points to remember'
//       ];
//       practi.forEach((link1) => {
//         cy.contains(link1).click();
//       });
//       cy.contains('Next').click();
//       cy.contains('Next Up: Debugging').click();

//     });
//     after(function () {
//         cy.logOut();
//     });  
// });


  
  