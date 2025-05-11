/* eslint-disable no-undef */
describe('Route page', () => {
  beforeEach(() => {
    const username = Cypress.env('USERNAME');
    const password = Cypress.env('PASSWORD');
    cy.visit('http://localhost:5173/login');
    cy.get('[data-testid="Login-input-email"]').type(username);
    cy.get('[data-testid="Login-input-password"]').type(password);
    cy.get('[data-testid="Login-btn-login"]').click();
  });

  it('should create an auto route - same origin', () => {
    cy.get('[data-testid="Play-btn-records"]').click();
    cy.get('tbody tr').should('have.length.greaterThan', 1);
  });
});

