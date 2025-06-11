# language: pt

Funcionalidade: Preenchimento do formulário de prática no DemoQA

  Cenário: Submeter formulário com dados válidos
    Dado que acesso a página do formulário
    Quando preencho todos os campos obrigatórios com dados válidos
    E faço o upload de um arquivo .txt
    E submeto o formulário
    Então o popup de confirmação deve ser exibido
    E fecho o popup
