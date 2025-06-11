import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que acesso a página de Browser Windows", () => {
  cy.visit("https://demoqa.com/browser-windows");
});

When("clico no botão {string}", (botao) => {
  cy.window().then((win) => {
    cy.stub(win, "open").as("windowOpen"); 
  });
  cy.contains("button", botao).click();
});

Then("uma nova aba é aberta com a mensagem {string}", (mensagemEsperada) => {
  cy.get("@windowOpen").should("be.called");

  cy.get("@windowOpen").then((stub) => {
    const url = stub.getCall(0).args[0];
    cy.visit(url); 
    cy.contains(mensagemEsperada).should("be.visible");
  });
});

Then("fecho a nova aba", () => {
  cy.go("back"); 
});
