/// <reference types="cypress" />
describe('Meraki Learn Tests', function () {
    before(function () {
      // Log in with JWT token
      cy.loginByJWT();
    });
    it('Bottom Row (TG)', function () {
        cy.visit('https://www.merakilearn.org/');
        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover');
        cy.get('.MuiList-root > :nth-child(3) > .jss1 > .MuiTypography-root').contains('Typing').click();
        cy.contains('Bottom Row (TG)').click();
    
        const practi = [
          'keys_c_m','keys_v_m',
          'keys_x_dot','keys_b_n',
          'keys_z_dot','keys_z_c_n',
          'keys_z_fslash','keys_c_comma',
          'keys_c_v_b_n','keys_v_m_comma',
          'keys_x_dot_fslash','keys_x_c_dot_fslash',
          'keys_z_v_m_fslash','keys_z_x_dot_fslash'
        ];
    
        practi.forEach((link1) => {
          cy.contains(link1).click();
        });
        cy.contains('Next').click();
        cy.contains('Next Up: Number Row (Typing)').click();
      });


    after(function () {
      // Log out
      cy.logOut();
    });
  });

