/// <reference types="cypress" />


// ***********Meraki Home Page Test Cases*************
// UI and contains testing in cypress.
// Learn part is all here in this section

describe('Home Page (Learn)', () => {
    it('home (learn) should done successfully', () => {
        cy.visit('https://www.merakilearn.org/')
        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')
        cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Introduction to Python').click()
        cy.contains('Learn the basics and become comfortable in one of the most popular programming languages Python.')
        
        // cy.go('back')

        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')
        cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(2)').contains('Spoken English').click()
        cy.contains('English is a great tool needed to navigate the tech world and also in an International setting. Whether you are a total beginner or already know some English, prepare for the challenge with our Spoken English classes and online courses.')

        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')
        cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(3) > .jss1 > .MuiTypography-root').contains('Typing').click()
        cy.contains('The typing track allows you to practice keyboard typing in a adaptive manner. You require a keyboard if on Android or use your laptop keyboard.')


        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')
        cy.get('.css-1bsvif8 > .MuiPaper-root > .MuiList-root > :nth-child(4) > .jss1 > .MuiTypography-root').contains('JavaScript').click()
        cy.contains('Learn the nuances and basics of the technology that powers the web. Start with learning what is JavaScript and eventually build your own website.')

        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')
        cy.get(':nth-child(5) > .jss1 > .MuiTypography-root').contains('Residential Programmes').click()
        cy.contains('Navgurukul, our parent organization, offers fully funded 1 year software engineering programmer. Learn all about it in this introductory course and get ready to apply for it.')

        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')
        cy.get('.MuiPaper-root > .MuiList-root > :nth-child(6)').contains('Introduction to Scratch').click()
        cy.contains('Learn the basics of block-based programming language using Scratch and create digital stories, games and animations.')

        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')
        cy.get('.css-1bsvif8').contains('MCDigital Course-1').click()
        cy.contains('This course will help teachers in their professional roles and responsibilities, by: Introducing Block based programming by promoting the integration of coding and computational thinking across different subjects.')

        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')
        cy.get(':nth-child(9) > .jss1 > .MuiTypography-root').contains('Miscellaneous Courses').click()
        cy.contains('Do you want to delve into Android, Game Development, Web Dev Basics or just some fun projects? Check out these courses for a sneak peak into these exciting fields.')

        cy.get('.css-1t6c9ts > :nth-child(1)').contains('Learn').trigger('mouseover')

    });
  });



// About part is all here in this section


describe('Home Page (About)', () => {
    it('home (about) should done successfully', () => {
        cy.visit('https://www.merakilearn.org/')
        cy.get('.css-1t6c9ts > :nth-child(2)').contains('About').trigger('mouseover')

        cy.get('.css-1t6c9ts > :nth-child(2)').contains('About').trigger('mouseover')
        cy.get('.css-1letlzv > .MuiPaper-root > .MuiList-root > :nth-child(1) > .jss1 > .MuiTypography-root').contains('Our Story').click()

        cy.get('.css-1t6c9ts > :nth-child(2)').contains('About').trigger('mouseover')
        cy.get('.css-1letlzv > .MuiPaper-root > .MuiList-root > :nth-child(2) > .jss1 > .MuiTypography-root').contains('Meraki Team').click()

    });
});


// About part is all here in this section
describe('Home Page (Get Involved)', () => {
    it('home (get involved) should done successfully', () => {
        cy.visit('https://www.merakilearn.org/')
        cy.get('.css-1t6c9ts > :nth-child(3)').contains('Get Involved').trigger('mouseover')


        cy.get('.css-1t6c9ts > :nth-child(3)').contains('Get Involved').trigger('mouseover')
        cy.get('.css-1n5rj9b > .MuiPaper-root > .MuiList-root > :nth-child(1) > .jss1 > .MuiTypography-root').contains('Volunteer with Us').click()
        cy.contains('Help Students Get their Dream Job in Tech')

        cy.get('.css-1t6c9ts > :nth-child(3)').contains('Get Involved').trigger('mouseover')
        cy.get('.css-1n5rj9b > .MuiPaper-root > .MuiList-root > :nth-child(2) > .jss1 > .MuiTypography-root').contains('Our Partner').click()
        cy.contains("Partners are ones who open the doors to quality education for our students")

        cy.get('.css-1t6c9ts > :nth-child(3)').contains('Get Involved').trigger('mouseover')
        cy.get('.css-1n5rj9b > .MuiPaper-root > .MuiList-root > :nth-child(3) > .jss1 > .MuiTypography-root').contains('Careers').click()
        cy.contains('Partners are ones who open the doors to quality education for our students')


        cy.get('.css-1t6c9ts > :nth-child(3)').contains('Get Involved').trigger('mouseover')


        
    })
})