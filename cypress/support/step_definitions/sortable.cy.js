import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('que acesso a página Sortable do DemoQA', () => {
  cy.visit('https://demoqa.com/sortable');
});

When('rearranjo os itens em ordem crescente', () => {
  cy.get('.vertical-list-container .list-group-item').then(($items) => {
    const items = $items.map((index, el) => Cypress.$(el).text()).get();
    
    const sortedItems = [...items].sort();
    
    sortedItems.forEach((itemText, targetPosition) => {
      const currentPosition = items.indexOf(itemText);
      
      if (currentPosition !== targetPosition) {
        cy.get('.vertical-list-container .list-group-item')
          .contains(itemText)
          .trigger('mousedown', { which: 1 });
        
        cy.get('.vertical-list-container .list-group-item')
          .eq(targetPosition)
          .trigger('mousemove')
          .trigger('mouseup', { force: true });
    
        items.splice(targetPosition, 0, items.splice(currentPosition, 1)[0]);
      }
    });
  });
});

Then('os itens devem estar na ordem correta', () => {
  const expectedOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'].sort();
  cy.get('.vertical-list-container .list-group-item').should(($items) => {
    const currentOrder = $items.map((index, el) => Cypress.$(el).text()).get();
    expect(currentOrder).to.deep.equal(expectedOrder);
  });
});