# language: pt

Funcionalidade: Fluxo completo de API na demoqa

  Cenário: Realizar fluxo completo de criação de usuário e aluguel de livros
    Dado que envio uma requisição para criar um usuário
    E gero um token de autenticação
    E valido que o usuário está autorizado
    Quando consulto os livros disponíveis
    E alugo dois livros da lista
    Então valido os detalhes do usuário com os livros alugados
