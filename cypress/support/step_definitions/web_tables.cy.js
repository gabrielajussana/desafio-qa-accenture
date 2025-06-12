import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('que acesso a página de Web Tables', () => {
  cy.visit('https://demoqa.com/webtables');
});

When('crio um novo registro', () => {
  cy.get('#addNewRecordButton').click();
  cy.get('#firstName').type('Novo');
  cy.get('#lastName').type('Registro');
  cy.get('#userEmail').type('novo.registro@exemplo.com');
  cy.get('#age').type('30');
  cy.get('#salary').type('5000');
  cy.get('#department').type('TI');
  cy.get('#submit').click();
});

When('edito o registro criado', () => {

  cy.get('#edit-record-4').click();
  cy.get('#firstName').clear().type('Registro');
  cy.get('#lastName').clear().type('Editado');
  cy.get('#submit').click();
});

When('deleto o registro criado', () => {
  cy.get('#delete-record-4').click();
});

Then('o registro não deve mais estar visível', () => {
  cy.get('.rt-tbody').should('not.contain', 'Registro Editado');
});

When('crio 12 registros dinamicamente', () => {
  for (let i = 1; i <= 12; i++) {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(`Usuario${i}`);
    cy.get('#lastName').type(`Sobrenome${i}`);
    cy.get('#userEmail').type(`usuario${i}@exemplo.com`);
    cy.get('#age').type(`${20 + i}`);
    cy.get('#salary').type(`${1000 + i * 100}`);
    cy.get('#department').type(`Depto${i}`);
    cy.get('#submit').click();
    

    cy.wait(200);
  }
});

Then('deleto todos registros criados', () => {
  const deleteOneRecord = () => {
    cy.get('body').then(($body) => {
      if ($body.find('[title="Delete"]').length > 0) {
        cy.get('[title="Delete"]').first().click();
        cy.wait(300);
        deleteOneRecord(); 
      }
    });
  };
  
  deleteOneRecord();
  cy.get('.rt-noData').should('contain', 'No rows found');
});