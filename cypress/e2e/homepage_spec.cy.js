describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe("Log-in Page", () =>{
  it("has a title", () =>{
  cy.visit("/sessions/new");
  cy.get("h1").should("contain", "Cinetrackr");
  });
});