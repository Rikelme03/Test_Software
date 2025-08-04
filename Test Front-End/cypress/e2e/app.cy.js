class RegistroForm{
  elements ={
    titleInput: () => cy.get('#title'),
    titleFeedback: () => cy.get('#titleFeedback'),
    ImageUrlInput: () => cy.get('#imageUrl'),
    ImageUrlInputFeedback: () => cy.get('#urlFeedback'),
    submitBtn: () => cy.get('#btnSubmit')
  }

  clickSubmit() {
    this.elements.submitBtn().click()
  }

  typeTitle(text){
    if (!text) return;
    this.elements.titleInput().type(text)
  }

  typeUrl(url){
    if (!url) return;
    this.elements.ImageUrlInput().type(url)
  }
}

const registroForm = new RegistroForm();

describe('Resgistro de mídia', () => {
  describe('Enviar uma imagem com entradas inválidas', () => {
    const imagem = {
      titulo: 'teste',
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-srFLw-ELMITJsQD6DCMadTY7_0QOliN8yA&s'
    }

    it('Estou na página de cadastro de imagens', () => {
      cy.visit('/')
    })
    
    it(`Quando eu digito "${imagem.titulo}" no campo do titulo`, () => {
      registroForm.typeTitle(imagem.titulo)
    })

    it(`Quando eu digito "${imagem.url}" no campo de URL`, () => {
      registroForm.typeUrl(imagem.url)
    })

    it('Eu clico no botão de envio', () => {
      registroForm.clickSubmit()
    })

    it('Então eu devo ver a mensagem "Please type a title for the image." acima do campo de titulo', () => {
      registroForm.elements.titleFeedback().should("contains.text", "Please type a title for the image.")
    })

    it('E eu devo ver a mensagem "Please type a valid URL" abaixo do campo de URL da imagem', () => {
      registroForm.elements.ImageUrlInputFeedback().should("contains.text", "Please type a valid URL")
    })
  })
})