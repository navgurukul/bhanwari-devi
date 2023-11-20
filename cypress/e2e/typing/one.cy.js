/// <reference types="cypress" />

describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });


    it('Typing', function () {
      cy.visit('https://www.merakilearn.org/');
      cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
      cy.get('.MuiList-root > :nth-child(3) > .jss1 > .MuiTypography-root').contains('Typing').click();
      cy.contains('Home Row (Typing)').click();
  
      const practiceQuestions3 = [
        'keys_space_bar_with_f_j','keys_d_k',
        'keys_f_j_d_k','keys_s_l',
        'keys_g_h','keys_s_l_g_h',
        'keys_a_;','keys_s_l_a_;',
        'keys_a_s_d_f','keys_j_k_l_;',
        'keys_a_s_g_j','keys_a_s_k_l',
        'keys_d_f_h_;' ];
  
      practiceQuestions3.forEach((link1) => {
        cy.contains(link1).click();
      });
  
      cy.contains('Next').click();
      cy.contains('Return to Dashboard').click();
    });

    after(function ()  {
      // Log out
      cy.logOut();
    });
  });
