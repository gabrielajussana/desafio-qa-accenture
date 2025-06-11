import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que acesso a página do formulário", () => {
  cy.visit("https://demoqa.com/automation-practice-form");
});

When("preencho todos os campos obrigatórios com dados válidos", () => {
  cy.get("#firstName").type("João");
  cy.get("#lastName").type("Silva");
  cy.get("#userEmail").type("joao.silva@example.com");
  cy.get('[name="gender"][value="Male"]').check({ force: true });
  cy.get("#userNumber").type("9999999999");

  cy.get("#dateOfBirthInput").click();
  cy.get(".react-datepicker__month-select").select("May");
  cy.get(".react-datepicker__year-select").select("1995");
  cy.get(".react-datepicker__day--015").click();

  cy.get(".subjects-auto-complete__value-container").type("Maths{enter}");

  cy.get('label[for="hobbies-checkbox-1"]').click(); 
  cy.get('label[for="hobbies-checkbox-2"]').click(); 

  cy.get("#currentAddress").type("Rua Exemplo, 123");
});

When("faço o upload de um arquivo .txt", () => {
  cy.get("#uploadPicture").selectFile("cypress/fixtures/exemplo.txt", { force: true });
});

When("submeto o formulário", () => {
  cy.get("#state").click().get("#react-select-3-option-0").click(); 
  cy.get("#city").click().get("#react-select-4-option-0").click(); 
  cy.get("#submit").click({ force: true });
});

Then("o popup de confirmação deve ser exibido", () => {
  cy.get("#example-modal-sizes-title-lg").should("contain.text", "Thanks for submitting the form");
});

Then("fecho o popup", () => {
  cy.get("#closeLargeModal").click({ force: true });
});