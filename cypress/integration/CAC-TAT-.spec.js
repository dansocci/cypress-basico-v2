/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_MS = 3000
    
    beforeEach(function() {
        cy.visit('./src/index.html')
      })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('exerício 1 - preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui.'
        cy.clock()
        
        cy.get('#firstName').type('João', {delay: 0})
        cy.get('#lastName').type('do Teste', {delay: 0})
        cy.get('#email').type('joao.test@test.com', {delay: 0})
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_MS)

        cy.get('.success').should('be.not.visible')
    })

    it('exerício 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock()
        cy.get('#firstName').type('João', {delay: 0})
        cy.get('#lastName').type('do Teste', {delay: 0})
        cy.get('#email').type('joao.test_test.com', {delay: 0})
        cy.get('#open-text-area').type('Fazendo um testinho maroto aqui.', {delay: 0})
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_MS)

        cy.get('.error').should('be.not.visible')
    })

    it('exerício 3 - validar que o campo telefone aceita apenas números', function() {
        cy.get('#phone').type('telefone', {delay: 0})
        cy.get('#phone').should('be.empty')
    })

    it('exerício 4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock()
        cy.get('#firstName').type('João', {delay: 0})
        cy.get('#lastName').type('do Teste', {delay: 0})
        cy.get('#email').type('joao.test@test.com', {delay: 0})
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Fazendo um testinho maroto aqui.', {delay: 0})
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_MS)

        cy.get('.error').should('be.not.visible')
    })

    it('exerício 5 - deve limpar os campos preenchidos anteriormente', function() {
        cy.get('#firstName').type('João', {delay: 0}).should('have.value','João')
                            .clear().should('be.empty')
        cy.get('#lastName').type('do Teste', {delay: 0}).should('have.value', 'do Teste')
                           .clear().should('be.empty')
        cy.get('#email').type('joao.test@test.com', {delay: 0}).should('have.value', 'joao.test@test.com')
                        .clear().should('be.empty')
        cy.get('#open-text-area').type('Fazendo um testinho maroto aqui.', {delay: 0}).should('have.value', 'Fazendo um testinho maroto aqui.')
                                 .clear().should('be.empty')
    })

    it('exerício 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_MS)

        cy.get('.error').should('be.not.visible')
    })

    it('Exercício 7 - envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('exerício 8 - clicar no botão enviar usando contains', function() {
        const longText = 'Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui. Fazendo um testinho maroto aqui.'
        
        cy.clock()
        
        cy.get('#firstName').type('João', {delay: 0})
        cy.get('#lastName').type('do Teste', {delay: 0})
        cy.get('#email').type('joao.test@test.com', {delay: 0})
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_MS)

        cy.get('.success').should('be.not.visible')
    })

    it('Exercício - seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('Exercício 1 - seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('Exercício 2 - seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('[type="radio"]').check('feedback').should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length',3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked')
        cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
          .invoke('removeAttr','target')
          .click()
        
        cy.contains('Talking About Testing').should('be.be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20)
        cy.get('#open-text-area').invoke('val', longText)
                                 .should('have.value', longText)
      })

      it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
          .should(function(response) {
            const { status, statusText, body } = response
            expect(status).to.eq(200)
            expect(statusText).to.eq('OK')
            expect(body).to.include('CAC TAT')
          })
      })

      it('encontre o gato', function() {
        cy.get('#cat')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
      })
  })
  