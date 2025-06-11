# language: pt

Funcionalidade: Gerenciar registros na tabela Web Tables do DemoQA

  Cenário: Criar, editar e deletar um registro
    Dado que acesso a página de Web Tables
    Quando crio um novo registro
    E edito o registro criado
    E deleto o registro criado
    Então o registro não deve mais estar visível

  Cenário: Criar e deletar múltiplos registros dinamicamente
    Dado que acesso a página de Web Tables
    Quando crio 12 registros dinamicamente
    Então todos os 12 registros devem ser deletados
