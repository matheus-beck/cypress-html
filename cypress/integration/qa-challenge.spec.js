describe('toTest.html challenge', function() {
  it('Visits the toTest.html page', function() {
    cy.visit('toTest.html')
  })

  it('Checks the status "Não Cadastrado" at the bottom of the page', function(){
    cy.get('#resultado').should('contain', 'Status: Nao cadastrado')
  })

  it('Clicks on the button "Clique Me!" and see an "Obrigado!" message', function() {
    cy.get('#buttonSimple').click()
    cy.get('#buttonSimple').should('have.value', 'Obrigado!')
  })

  it('Clicks on the button "Abrir Popup" and see a Popup with a textarea', function(){
    cy.window().then(win=>{
      cy.spy(win, 'open').as('winOpen')
    }) 

    cy.get('#buttonPopUpEasy').click()
    cy.get('@winOpen').should('be.called')
  })

  it('Clicks on the button "Abrir Popup do Mal" and see a Popup with a textarea', function(){
    cy.window().then(win=>{
      cy.spy(win, 'open').as('winOpen')
    }) 

    cy.get('#buttonPopUpHard').click()
    cy.get('@winOpen').should('be.called')
  })

  it('Clicks on the button "Resposta Demorada" and see a new element on the page', function(){
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('exist')
  })

  it('Fills in the field "Nome"', function(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Nome eh obrigatorio')
    })

    cy.get("#elementosForm\\:cadastrar").click()
    cy.get('#elementosForm\\:nome').type('Matheus').should('have.value', 'Matheus')
  })

  it('Fills in the field "Sobrenome"', function(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Sobrenome eh obrigatorio')
    })

    cy.get("#elementosForm\\:cadastrar").click()
    cy.get('#elementosForm\\:sobrenome').type('Beck').should('have.value', 'Beck')
  })

  it('Fills in the field "Sexo"', function(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Sexo eh obrigatorio')
    })

    cy.get("#elementosForm\\:cadastrar").click()
    cy.get('#elementosForm\\:sexo\\:0').check().should('be.checked') 
  })

  it('Fills in the field "Qual sua comida favorita?"', function(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Tem certeza que voce eh vegetariano?')
    })

    cy.get('#elementosForm\\:comidaFavorita\\:3').check().should('be.checked')
    cy.get('#elementosForm\\:comidaFavorita\\:1').check().should('be.checked')
    cy.get("#elementosForm\\:cadastrar").click() 
    cy.get('#elementosForm\\:comidaFavorita\\:1').uncheck().should('not.be.checked')
  })

  it('Fills in the field "Escolaridade"', function(){
    cy.get('#elementosForm\\:escolaridade').select('2graucomp').should('have.value', '2graucomp') 
  })

  it('Fills in the field "Pratica esportes?"', function(){
    cy.get('#elementosForm\\:esportes').select('Corrida').should('contain', 'Corrida') 
  })

  it('Fills in the field "Sugestoes"', function(){
    cy.get('#elementosForm\\:sugestoes').type('Me contrata Cubos! :D').should('have.value', 'Me contrata Cubos! :D')
  })

  it('Fills in the Checkboxes, Radios, and Inputs inside the form table', function(){
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(1) > td:nth-child(4) > input[type=checkbox]').check().should('be.checked')
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(2) > td:nth-child(4) > input[type=checkbox]').check().should('be.checked')  
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(3) > td:nth-child(4) > input[type=checkbox]').check().should('be.checked')  
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(4) > td:nth-child(4) > input[type=checkbox]').check().should('be.checked')  
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(5) > td:nth-child(4) > input[type=checkbox]').check().should('be.checked')    
    
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(1) > td:nth-child(5) > table > tbody > tr > td > input[type=radio]').check().should('be.checked') 
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(2) > td:nth-child(5) > table > tbody > tr > td > input[type=radio]').check().should('be.checked') 
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(3) > td:nth-child(5) > table > tbody > tr > td > input[type=radio]').check().should('be.checked') 
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(4) > td:nth-child(5) > table > tbody > tr > td > input[type=radio]').check().should('be.checked') 
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(5) > td:nth-child(5) > table > tbody > tr > td > input[type=radio]').check().should('be.checked') 
    
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(1) > td:nth-child(6) > input[type=text]').type('Goku').should('have.value', 'Goku')
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(2) > td:nth-child(6) > input[type=text]').type('Vegeta').should('have.value', 'Vegeta')
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(3) > td:nth-child(6) > input[type=text]').type('Gohan').should('have.value', 'Gohan')
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(4) > td:nth-child(6) > input[type=text]').type('Freeza').should('have.value', 'Freeza')
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(5) > td:nth-child(6) > input[type=text]').type('Majin Boo').should('have.value', 'Majin Boo')
  })

  it('Clicks on the button of "Francisco" and see an alert "Francisco"', function(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Francisco')
    })
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(1) > td:nth-child(3) > input[type=button]').click()
  })

  it('Clicks on the button of "Maria" and see an alert "Maria"', function(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Maria')
    })
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(2) > td:nth-child(3) > input[type=button]').click()
  })

  it('Clicks on the button of "Usuario A" and see an alert "Usuario A"', function(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Usuario A')
    })
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(3) > td:nth-child(3) > input[type=button]').click()
  })

  it('Clicks on the button of "Doutorado" and see an alert "Doutorado"', function(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Doutorado')
    })
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(4) > td:nth-child(3) > input[type=button]').click()
  })

  it('Clicks on the button of "Usuario B" and see an alert "Usuario B"', function(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Usuario B')
    })
    cy.get('#elementosForm\\:tableUsuarios > tbody > tr:nth-child(5) > td:nth-child(3) > input[type=button]').click()
  })

  it('Clicks on the button "Cadastrar" and validates the result', function(){
    cy.get("#elementosForm\\:cadastrar").click()
    cy.get("#resultado > span").should('contain', 'Cadastrado!')
    cy.get("#descNome").should('contain', 'Matheus')
    cy.get("#descSobrenome").should('contain', 'Beck') 
    cy.get("#descSexo").should('contain', 'Masculino') 
    cy.get("#descComida").should('contain', 'Vegetariano') 
    cy.get("#descEscolaridade").should('contain', '2graucomp') 
    cy.get("#descEsportes").should('contain', 'Corrida') 
    cy.get("#descSugestoes").should('contain', 'Me contrata Cubos! :D') 
  })

  it('Clicks on the button "Alert" and see an alert "Alert Simples"', function(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Alert Simples')
    })
    cy.get('#alert').click()
  })

  it('Clicks on the button "Confirm" and see an alert "Confirmado"', function(){
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Confirmado')
    })
    cy.get('#confirm').click()
  })

  it('Clicks on the button "Prompt" and see an input field', function(){
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('2')
   })
    cy.get('#prompt').click()
  })

  it('Clicks on the button "Voltar", go to the top of the page and check message "Voltou!" at the bottom', function(){
    cy.get('body > center > a').click().should('have.attr', 'href', '#')
    cy.get('#resultado').should('contain', 'Voltou!')
  })

  it('Checks the link to "Curso de Testes Funcionais automatizados com Selenium Webdriver" from Udemy', function(){
    cy.get('body > a').should('have.attr', 'href', 'http://bit.ly/CursoSeleniumWcaquino')
  })
})