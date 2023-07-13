describe("Home Page", () => {
    it("has loaded correctly", () => {
        cy.visit("/sessions/new");
        cy.get("h1").should("contain", "CineTrackr");
        cy.get('a#green-button').should('be.visible').contains('Sign Up');
        cy.get('input[type="submit"]').should('be.visible').contains('Login');
    });
});

describe("Home Page > Sign-up Page", () => {
    it("redirects to sign-up page", () => {
        cy.visit("/sessions/new"); // Replace with the URL of your login page

        cy.get('a#green-button').click(); // Click on the sign-up button
        cy.url().should("include", "/users/new"); // Verify the URL contains "/users/new"
    });
});

describe("Log-in Page - Log-in Functionality", () => {
    it("user can log-in successfully", () => {

        // sign in
        cy.visit("/sessions/new");
        cy.get("#email").type("test@test.com");
        cy.get("#password").type("password1");
        cy.get("#submit").click();

        cy.url().should("contain", "/movies")

        cy.get('#search-input-title').type('Batman');
        cy.get('#search-button').click();

        cy.url().should('include', '/movies/search');
        cy.get('.movie-item').should('exist');
        cy.get('.movie-item').eq(0).find('.add-to-watchlist').click();


        cy.visit("/profile")
        cy.contains('.card-title', 'Batman')
  .siblings('.remove-form')
  .find('button.btn-custom[type="submit"]')
  .contains('Remove')
  .click();






    })
});
