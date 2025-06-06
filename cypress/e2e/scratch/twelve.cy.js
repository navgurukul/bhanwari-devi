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
//       cy.contains('Sensing and Conditional blocks').click();

//       const practi = [
//         '2. Practice Question','Creation of a Maze Game!!','How the code for the movement of the sprite works?',
//         'What are specific numbers allocated to every color?','6. Practice Question','7. Practice Question',
//         '8. Practice Question','9. Practice Question',
//         ,'Sensing Block [ Part 2]','How can we Level Up the Game?',

//         '12. Practice Question','13. Practice Question','14. Practice Question',
//         '15. Practice Question'

//       ];
//       practi.forEach((link) => {
//         cy.contains(link).click();
//       });
//       cy.contains('Next').click();
//       cy.contains('Next Up: Lists').click();

//     });
//     after(function () {
//         cy.logOut();
//     });  
// });


  
  