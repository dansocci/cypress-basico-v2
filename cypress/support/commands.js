Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('João', {delay: 0})
    cy.get('#lastName').type('do Teste', {delay: 0})
    cy.get('#email').type('joao.test@test.com', {delay: 0})
    cy.get('#open-text-area').type('Fazendo um testinho maroto aqui.', {delay: 0})
    cy.get('.button[type="submit"]').click()
})