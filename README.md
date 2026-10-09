# Automação de Testes E2E com Cypress | Swag Labs

Projeto de estudo de automação de testes **E2E** com Cypress, aplicado ao [Swag Labs (saucedemo.com)](https://www.saucedemo.com), loja de demonstração criada para prática de automação.

## Escopo dos testes

| Área | O que é validado |
|---|---|
| Login | Credenciais válidas, senha incorreta, usuário bloqueado, campos obrigatórios, acesso sem login |
| Produtos | Listagem, ordenação por preço e por nome, detalhes do produto |
| Carrinho | Adicionar, remover, contador e persistência entre páginas |
| Checkout | Compra completa, cálculo de subtotal, imposto e total, campos obrigatórios |

## Técnicas e boas práticas aplicadas

- **Partição de equivalência** no login e nos campos obrigatórios do checkout
- **Testes positivos e negativos** em todos os fluxos
- **Validação de cálculo** no checkout: subtotal, imposto de 8% e total conferidos em centavos, evitando erro de arredondamento
- **Login por comando customizado** (`cy.login()`), executado antes de cada teste para garantir um estado inicial conhecido
- **Seletores estáveis** com `data-test`, menos sensíveis a mudanças de layout
- **Massa de dados em fixtures** (`cypress/fixtures`)
- **Comandos customizados** para reaproveitar passos (`cypress/support/commands.js`)

## Estrutura

```
cypress/
  e2e/         specs, na ordem do fluxo do usuário
  fixtures/    massa de dados
  support/     comandos customizados
```

## Como executar

Requer Node.js 22 ou superior.

```bash
npm install
npm run cy:open   # modo interativo
npm test          # modo headless
```

## Próximos passos

- [ ] Page Objects para organizar os seletores
- [ ] Testes com os usuários `problem_user` e `performance_glitch_user`
- [ ] Testes de API em um projeto separado
- [ ] Relatórios com Mochawesome

## Autor

**Otaniel G. da Silva**, Analista de Testes/QA
