Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('do Teste')
    cy.get('#email').type('joao.test@test.com')
    cy.get('#open-text-area').type('Fazendo um testinho maroto aqui.')
    cy.get('.button[type="submit"]').click()
})