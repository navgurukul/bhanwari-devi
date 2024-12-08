/// <reference types="cypress" />
describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });
    
    it('Top Row (Typing)', function () {
        cy.visit('https://www.merakilearn.org/');
        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
        cy.get('.MuiList-root > :nth-child(3) > .jss1 > .MuiTypography-root').contains('Typing').click();
        cy.contains('Top Row (Typing)').click();
    
        const practi = [
          'keys_r_u','keys_t_y',
          'keys_w_o','keys_q_p',
          'keys_q_e_i_p','keys_q_e_p',
          'keys_w_o_spacebar','keys_w_r_o',
          'keys_w_r_y_o'];
    
        practi.forEach((link1) => {
          cy.contains(link1).click();
        });
        cy.contains('Next').click();
        cy.contains('Next Up: Bottom Row (TG)').click();
      });
      after(function () {
        // Log out
        cy.logOut();
      });
    });
  


