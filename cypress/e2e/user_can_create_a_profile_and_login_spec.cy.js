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

  describe("Sign-up Page", () => {
    it("allows user to create an account", () => {
      cy.visit("/users/new"); // Replace with the URL of your sign-up page
  
      cy.get('input[name="firstName"]').type("Cypress");
      cy.get('input[name="lastName"]').type("Test");
      cy.get('input[name="email"]').type("cypresstest@example.com");
      cy.get('input[name="password"]').type("password1");
      cy.get('input[type="submit"]').click();
  
      cy.url().should("include", "/sessions/new");
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
    });
});
