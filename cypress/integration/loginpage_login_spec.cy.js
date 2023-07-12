

  describe("Log-in Page", () =>{
    it("has a title", () =>{
    cy.visit("/sessions/new");
    cy.get("h1").should("contain", "Cinetrackr");
    });
});

describe("Log-in Page - Sign-Up Button Check", () => {
    it("has a link to sign-up", () => {
    cy.get('a[href="/users/new"]').should('be.visible');
    });
});

describe("Log-in Page - Log-in Button Check", () => {
    it("has a button for logging in", () => {
    cy.get("#submit").should("be.visible")
    });
});