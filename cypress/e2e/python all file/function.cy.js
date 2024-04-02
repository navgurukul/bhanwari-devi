// /// <reference types="cypress" />

// describe('Meraki Learn Tests', function () {
//     before(function () {
//       // Log in with JWT token
//       cy.loginByJWT();
//     });

// it('Introduction to Python - Functions', function () {
//     cy.visit('https://www.merakilearn.org/');

//     cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
//     cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click();
//     cy.contains('Functions').click();
//     const p = [
//       'Questions',
//       '2. Practice Question',
//       '3. Practice Question',
//       '4. Practice Question',
//       'DebugCode',
//       '6. Practice Question',
//       '7. Practice Question',
//       'functions-args',
//       '9. Practice Question',
//       '10. Practice Question',
//       '11. Practice Question',
//       'CodeDebug',
//       'functions-question2',
//       'Question2',
//       'functions-question3',
//       'functions-question4',
//       'functions-return_values',
//       '18. Practice Question',
//       '19. Practice Question',
//       'functions-question5',
//       'innerFunction',
//       'DebugCode_question5',
//       '23. Practice Question',
//       '24. Practice Question',
//       '25. Practice Question',
//       '26. Practice Question',
//       '27. Practice Question',
//       '27. Practice Question',
//       '28. Practice Question',
//       'InterviewQuestions_Assessment',
//       '30. Practice Question',
//       '31. Practice Question',
//       '32. Practice Question',
//       '33. Practice Question',
//       '34. Practice Question',
//       '35. Practice Question',
//       '36. Practice Question',
//       '37. Practice Question',
//       '38. Practice Question',
//       '39. Practice Question',
//       '40. Practice Question'
//     ];

//     p.forEach((link) => {
//       cy.contains(link).click();
//     });

//     cy.contains('Next').click();
//   });

//   after(function () {
//     cy.logOut();
//   });
// });


