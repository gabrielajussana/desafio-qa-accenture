import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const username = "usuario_" + Date.now();
const password = "Teste@123456";

Given("que envio uma requisição para criar um usuário", () => {
  cy.request("POST", "/Account/v1/User", {
    userName: username,
    password: password
  }).then((res) => {
    expect(res.status).to.eq(201);
    Cypress.env("userId", res.body.userID);
    Cypress.env("username", username);
    Cypress.env("password", password);
  });
});

Given("gero um token de autenticação", () => {
  cy.request("POST", "/Account/v1/GenerateToken", {
    userName: Cypress.env("username"),
    password: Cypress.env("password")
  }).then((res) => {
    expect(res.status).to.eq(200);
    Cypress.env("token", res.body.token);
  });
});

Given("valido que o usuário está autorizado", () => {
  cy.request("POST", "/Account/v1/Authorized", {
    userName: Cypress.env("username"),
    password: Cypress.env("password")
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.be.true;
  });
});

When("consulto os livros disponíveis", () => {
  cy.request("GET", "/BookStore/v1/Books").then((res) => {
    expect(res.status).to.eq(200);
    Cypress.env("livros", res.body.books);
    expect(res.body.books.length).to.be.greaterThan(1);
  });
});

When("alugo dois livros da lista", () => {
  const livros = Cypress.env("livros");
  const isbn1 = livros[0].isbn;
  const isbn2 = livros[1].isbn;
  const token = Cypress.env("token");
  const userId = Cypress.env("userId");

  cy.request({
    method: "POST",
    url: "/BookStore/v1/Books",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: {
      userId: userId,
      collectionOfIsbns: [
        { isbn: isbn1 },
        { isbn: isbn2 }
      ]
    }
  }).then((res) => {
    expect([200, 201]).to.include(res.status); // aceita 200 ou 201
  });
});

Then("valido os detalhes do usuário com os livros alugados", () => {
  const token = Cypress.env("token");
  const userId = Cypress.env("userId");
  const username = Cypress.env("username");

  cy.request({
    method: "GET",
    url: `/Account/v1/User/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.books.length).to.eq(2);
    expect(res.body.username).to.eq(username);
  });
});