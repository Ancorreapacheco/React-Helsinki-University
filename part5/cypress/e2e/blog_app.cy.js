describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    //Creo user DB
    const user= {
      'username': 'andres',
      'name':'andres',
      'password': 'andres'
    }
    cy.request('POST', 'http://localhost:3003/api/users',user) //Creo un usuario en la DB
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#logIn_form')
  })

  describe('Login', function () {
  
    it('succeeds with correct credentials', function() {
      cy.get('#logIn_form').get('#username').type('andres')
      cy.get('#logIn_form').get('#password').type('andres')
      cy.get('#logIn_form').get('#logIn_btn').click()
      cy.get('.msjSuccess').contains('Login Succesful')
    })
  
    it('fails with wrong credentials', function() {
      cy.get('#logIn_form').get('#username').type('wrongUser')
      cy.get('#logIn_form').get('#password').type('wrongPass')
      cy.get('#logIn_form').get('#logIn_btn').click()
      cy.get('.msjNoSuccess')
        .should('contain','Username o password wrong')
        .and('have.css','color','rgb(255, 0, 0)')
      
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#logIn_form').get('#username').type('andres')
      cy.get('#logIn_form').get('#password').type('andres')
      cy.get('#logIn_form').get('#logIn_btn').click()
    })

    it('A blog can be created', function() {
      cy.contains('New Blog Entry').click()
      cy.get('#title').type('title from cypress')
      cy.get('#author').type('author from cypress')
      cy.get('#url').type('url from cypress')
      cy.get('#btn-save').click()
      cy.get('.msjSuccess')
        .should('contain','New blog added: title from cypress by author from cypress')
      cy.contains('title from cypress by author from cypress')
    })

    describe('and a blog entry exist', function(){
      beforeEach(function(){
        cy.contains('New Blog Entry').click()
        cy.get('#title').type('title existing')
        cy.get('#author').type('author existing')
        cy.get('#url').type('url existing')
        cy.get('#btn-save').click()
      })

      it.only('users can like a blog', function(){
        cy.contains('View').click()
        cy.get('.btnLike').click()
        cy.get('#cantLikes').should('contain','1')
        //cy.contains('another note created by cypress').contains('Make not important')
      })
    })



  })
})

