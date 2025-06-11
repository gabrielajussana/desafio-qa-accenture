import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que acesso a página de Progress Bar", () => {
  cy.visit("https://demoqa.com/progress-bar");
});

When("inicio o progresso e paro antes de 25%", () => {
  cy.get("#startStopButton").click();
  cy.get("#progressBar").should(($bar) => {
    const text = $bar.text().replace("%", "");
    const value = parseInt(text);
    expect(value).to.be.lessThan(26); 
  });

  cy.wait(1000);
  cy.get("#startStopButton").click();
});

Then("o valor da barra deve ser menor ou igual a 25%", () => {
  cy.get("#progressBar").invoke("text").then((text) => {
    const progress = parseInt(text.replace("%", ""));
    expect(progress).to.be.lte(25);
  });
});


When("continuo o progresso até 100%", () => {
  cy.get("#startStopButton").click();
  cy.get("#progressBar", { timeout: 15000 }).should("have.text", "100%");
  cy.wait(500); // Aguarda a barra realmente parar em 100%
  cy.get("#resetButton").should("be.visible").click();
});

Then("a barra deve ser resetada", () => {
  cy.get("#progressBar", { timeout: 5000 }).should("have.text", "0%");
});
