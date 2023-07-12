describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe("Log-in Page", () =>{
  it("has a title", () =>{
  cy.visit("/sessions/new");
  cy.get("h1").should("contain", "CineTrackr");
  });
});

describe("Log-in Page - Sign-Up Button Check", () => {
  it("has a link to sign-up", () => {
    cy.visit("/sessions/new"); // Replace with the URL of your login page

    cy.get('a[href="/users/new"]').should("be.visible");
  });
});

describe("Log-in Page - Log-in Button Check", () => {
  it("has a button for logging in", () => {
    cy.visit("/sessions/new");
  cy.get("input#submit").should("be.visible")
  });
});