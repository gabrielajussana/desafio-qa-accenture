#language: pt

Funcionalidade: Validação da Progress Bar no DemoQA

  Cenário: Controlar e validar a barra de progresso
    Dado que acesso a página de Progress Bar
    Quando inicio o progresso e paro antes de 25%
    Então o valor da barra deve ser menor ou igual a 25%
    Quando continuo o progresso até 100%
    Então a barra deve ser resetada
