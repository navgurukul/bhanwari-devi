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
//       cy.contains('Introduction to Events').click();

//       const practi = [
//         '2. Practice Question','3. Practice Question','4. Practice Question','Mouse and Key driven Events',
//         '6. Practice Question','7. Practice Question','Broadcast events','9. Practice Question','10. Practice Question',
//         '11. Practice Question','Events for gaming','Practice time(Event)','Glide Vs Go to'
//       ];
//       practi.forEach((link) => {
//         cy.contains(link).click();
//       });
//       cy.contains('Next').click();
//       cy.contains('Next Up: Sprite Costumes').click();

//     });
//     after(function () {
//         cy.logOut();
//     });  
// });


  
  