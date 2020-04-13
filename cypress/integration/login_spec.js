describe('Successful Login', () => {
    it('Visit the site and attempt to login', () => {
        cy.server();
        cy.route('POST', '**/users/authenticate').as('authenticate');
        cy.visit('localhost:4200/login');
        cy.get('[data-cy=usernameInput]').type("NewUser");
        cy.get('[data-cy=passwordInput]').type("password");
        cy.get('[data-cy=loginButton]').click().wait('@authenticate');
        cy.url().should('not.include', 'login');
    })
})

describe('Unsuccessful Login', () => {
    it('Visit the site and attempt to login with invalid username', () => {
        cy.server();
        cy.route('POST', '**/users/authenticate').as('authenticate');
        cy.visit('localhost:4200/login');
        cy.get('[data-cy=usernameInput]').type("UnregisteredUser");
        cy.get('[data-cy=passwordInput]').type("password");
        cy.get('[data-cy=loginButton]').click().wait('@authenticate');
        cy.url().should('include', 'login');
    })
})

describe('Unsuccessful Login 2', () => {
    it('Visit the site and attempt to login with invalid password', () => {
        cy.server();
        cy.route('POST', '**/users/authenticate').as('authenticate');
        cy.visit('localhost:4200/login');
        cy.get('[data-cy=usernameInput]').type("NewUser");
        cy.get('[data-cy=passwordInput]').type("incorrectPassword");
        cy.get('[data-cy=loginButton]').click().wait('@authenticate');
        cy.url().should('include', 'login');
    })
})

describe('Moving to Registration', () => {
    it('Navigate to the registration page by clicking the register button', () => {
        cy.visit('localhost:4200/login');
        cy.get('[data-cy=registerButton]').click();
        cy.url().should('include', 'register');
    })
})