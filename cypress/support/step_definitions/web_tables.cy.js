import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

function randomString(length = 5) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function generateUserData() {
  return {
    firstName: `Nome${randomString()}`,
    lastName: `Sobrenome${randomString()}`,
    email: `email${randomString()}@teste.com`,
    age: Math.floor(Math.random() * 50) + 18,
    salary: Math.floor(Math.random() * 10000),
    department: `Depto${randomString()}`
  };
}

let createdUserEmail;

Given("que acesso a página de Web Tables", () => {
  cy.visit("https://demoqa.com/webtables");
});

When("crio um novo registro com dados aleatórios", () => {
  const user = generateUserData();
  createdUserEmail = user.email;

  cy.get("#addNewRecordButton").click();

  cy.get("#firstName").type(user.firstName);
  cy.get("#lastName").type(user.lastName);
  cy.get("#userEmail").type(user.email);
  cy.get("#age").type(`${user.age}`);
  cy.get("#salary").type(`${user.salary}`);
  cy.get("#department").type(user.department);

  cy.get("#submit").click();

  cy.contains(".rt-tbody .rt-tr-group", user.email).should("exist");
});

When("edito o registro alterando o departamento", () => {
  const newDept = "DepartamentoAlterado";

  cy.contains(".rt-tbody .rt-tr-group", createdUserEmail)
    .find("[title='Edit']")
    .click();

  cy.get("#department").clear().type(newDept);

  cy.get("#submit").click();

  cy.contains(".rt-tbody .rt-tr-group", createdUserEmail)
    .should("contain.text", newDept);
});

When("deleto o registro criado", () => {
  cy.contains(".rt-tbody .rt-tr-group", createdUserEmail)
    .find("[title='Delete']")
    .click();
});

Then("o registro deve ser removido da lista", () => {
  cy.contains(".rt-tbody .rt-tr-group", createdUserEmail).should("not.exist");
});

When("crio 12 registros dinamicamente", () => {
  for (let i = 0; i < 12; i++) {
    const user = generateUserData();

    cy.get("#addNewRecordButton").click();

    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#userEmail").type(user.email);
    cy.get("#age").type(`${user.age}`);
    cy.get("#salary").type(`${user.salary}`);
    cy.get("#department").type(user.department);

    cy.get("#submit").click();

    cy.contains(".rt-tbody .rt-tr-group", user.email).should("exist");
  }
});

Then("deleto todos os registros criados", () => {
  cy.get(".rt-tbody .rt-tr-group").each(($row) => {
    cy.wrap($row).find("[title='Delete']").click();
  });

  cy.get(".rt-tbody").should("not.contain", "tr");
});
