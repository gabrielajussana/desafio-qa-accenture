# language: pt

Funcionalidade: Verificar nova janela no DemoQA

  Cenário: Abrir nova janela e validar conteúdo
    Dado que acesso a página de Browser Windows
    Quando clico no botão "New Window"
    Então uma nova aba é aberta com a mensagem "This is a sample page"
    E fecho a nova aba
