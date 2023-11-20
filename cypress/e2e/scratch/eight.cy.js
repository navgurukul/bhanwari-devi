/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });

    it('Introduction to Scratch', function () {
      cy.visit('https://www.merakilearn.org/');
      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get('.MuiPaper-root > .MuiList-root > :nth-child(6)').contains('Introduction to Scratch').click();
      cy.contains('Story-telling with Events').click();

      const practi = [
        '2. Practice Question','3. Practice Question','4. Practice Question',
        '5. Practice Question','6. Practice Question','7. Practice Question','8. Practice Question','9. Practice Question',
        '10. Practice Question','11. Practice Question','12. Practice Question',
        'How to search for images on the internet and download them','How to remove the background of images',
        'How to use the images as backdrops and sprites'

      ];
      practi.forEach((link1) => {
        cy.contains(link1).click();
      });
      cy.contains('Next').click();
      cy.contains('Next Up: Loops: Repeat').click();

    });
    after(function () {
        cy.logOut();
    });  
});


  
  