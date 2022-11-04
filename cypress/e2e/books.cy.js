describe('books', () => {
  it('can list, show, create, edit and delete books', () => {
    // List books
    cy.visit('http://localhost:3000')
      .get('[data-cy=link-to-books]').click();
    // Create book
    cy.get('[href="/books/create"]').click()
      .get('[data-cy=input-book-title]')
      .type('New Book from Cypress')
      .get('[data-cy=button-submit-book]').click()
      .get('[data-cy=books-list]')
      .contains('New Book from Cypress');
  })
})