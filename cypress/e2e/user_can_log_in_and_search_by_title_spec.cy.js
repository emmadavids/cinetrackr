describe('Login and Search', () => {
    beforeEach(() => {
      // Visit the login page
      cy.visit('/sessions/new');
    });
  
    it('should log in and search by title', () => {
      // Fill in the login form
      cy.get('input[name="email"]').type('test@test.com');
      cy.get('input[name="password"]').type('password1');
  
      // Submit the form
      cy.get('#submit').click();
  
      // Wait for the user to be logged in
      cy.url().should('include', '/movies');

  
      // Perform a search by title
      cy.get('#search-input-title').type('The Avengers');
      cy.get('#search-button').click();
  
      cy.url().should('include', '/movies/search');
      cy.get('.movie-item').should('exist');

      // Click on the first movie in the search results
      cy.get('.movie-item').first().find('a').click();
  
      cy.url().should('include', '/movies/');

    // Debugging statement: Output the current URL to the console
    cy.url().then((url) => {
      console.log('Current URL:', url);
    });

    // Leave a review
    cy.get('textarea[name="review"]').type('Derivative nonsense');

    // Debugging statement: Output the content of the textarea to the console
    cy.get('textarea[name="review"]').then((element) => {
      console.log('Textarea content:', element.val());
    });

    cy.get('form[action^="/movies/"]').submit();

    // Assert that the review is submitted successfully
    cy.get('.reviews-container .review').should('contain', 'Derivative nonsense');
  });
});
