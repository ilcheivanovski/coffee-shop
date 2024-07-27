/// <reference types="cypress" />

const baseUrl = Cypress.config('baseUrl');

describe('Coffe types page has all elements', () => {
  beforeEach(() => {
    cy.visit(`${baseUrl}/coffee-types`);
  });

  it('Have create button', () => {
    cy.get('.MuiButtonBase-root').should('have.text', '+ Create Coffee');
    cy.get('[data-testid="DeleteIcon"]').should('have.length.above', 0);
    cy.get('[data-testid="EditIcon"]').should('have.length.above', 0);
  });

  it('Should have 4 coffees', () => {
    cy.get('.MuiDataGrid-row').should('have.length', 4);
  });

  it('Added one Coffee to the list', () => {
    cy.get('.MuiButtonBase-root').click();

    cy.get('[name="name"]').first().type('LATTE');
    cy.get('[name="ingredients.0.name"]').type('Creamer');
    cy.get('[name="ingredients.0.size"]').type('45');
    cy.get('button[type="submit"]').click();

    cy.get('.MuiDataGrid-row').last().children('.MuiDataGrid-cell').first().should('have.text', 'Test Optimistic Response');

    cy.get('.MuiDialog-container').should('not.exist');
    cy.get('.MuiDataGrid-row').last().children('.MuiDataGrid-cell').first().should('have.text', 'LATTE');
  });
});
