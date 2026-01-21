// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js
const userObj = JSON.parse(Cypress.env('user'));

Cypress.Commands.add('loginByJWT', () => {
    // Click the Google login button  
    // cy.lo  
    cy.visit('https://www.merakilearn.org/', {
      onBeforeLoad(win) {
        win.localStorage.setItem("__AUTH__",JSON.stringify(userObj))
      },
    })   
  })


Cypress.Commands.add('logOut', () => {
  // Click the Google login button  
  // cy.lo  
  cy.clearLocalStorage("__AUTH__")
})