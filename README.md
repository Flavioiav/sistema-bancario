# API de Contas Bancárias

Este é o repositório da API de Contas Bancárias, uma aplicação que oferece funcionalidades para criar, listar, atualizar, excluir, depositar, sacar, transferir, verificar saldo e obter extratos de contas bancárias. A API foi desenvolvida em Node.js e utiliza o framework Express.

## Tabela de Conteúdo

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
  - [Rotas da API](#rotas-da-api)
    - [GET /contas](#get-contas)
    - [POST /contas](#post-contas)
    - [PUT /contas/:numeroConta](#put-contasnumeroconta)
    - [DELETE /contas/:numeroConta](#delete-contasnumeroconta)
    - [POST /depositar](#post-depositar)
    - [POST /sacar](#post-sacar)
    - [POST /transferir](#post-transferir)
    - [GET /saldo](#get-saldo)
    - [GET /extrato](#get-extrato)
- [Contribuição](#contribuição)

## Requisitos

Antes de usar a API de Contas Bancárias, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- Node.js

## Instalação

Siga as instruções abaixo para configurar e iniciar a API:

1. Clone o repositório para a sua máquina:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```
2. Acesse o diretório do projeto

```bash
cd seu-repositorio
```
3. Instale as dependências necessárias:
```bash
npm install
```

## Uso

Para utilizar a API de Contas Bancárias, siga os passos de instalação e execute o servidor com o comando npm start. A API estará disponível em `http://localhost:3000`.

### Rotas da API

A API oferece as seguintes rotas e funcionalidades:

GET /contas
- Descrição: Retorna a lista de todas as contas bancárias cadastradas.
- Resposta de Exemplo:
```bash
[
  {
    "numero_conta": "12345",
    "saldo": 1000.0,
    "usuario": {
      "nome": "João",
      "cpf": "123.456.789-00",
      "data_nascimento": "1990-01-01",
      "telefone": "(12) 3456-7890",
      "email": "joao@example.com",
      "senha": "senha123"
    }
  },
  // ...
]
```

POST /contas
Descrição: Cria uma nova conta bancária.
Corpo da Requisição (JSON):
```bash
{
  "nome": "Maria",
  "cpf": "987.654.321-00",
  "data_nascimento": "1995-05-05",
  "telefone": "(11) 9876-5432",
  "email": "maria@example.com",
  "senha": "senha456"
}
```
- Resposta de Sucesso (Status 204 - No Content)

PUT /contas/:numeroConta
- Descrição: Atualiza os dados de uma conta bancária existente.
- Parâmetros da URL: `numeroConta` (Número da Conta)
- Corpo da Requisição (JSON):
  ```bash
  {
  "nome": "Maria Silva",
  "cpf": "987.654.321-00",
  "data_nascimento": "1995-05-05",
  "telefone": "(11) 9876-5432",
  "email": "maria@example.com",
  "senha": "novasenha123"
  }
- Resposta de Sucesso (Status 204 - No Content)

DELETE /contas/:numeroConta
- Descrição: Exclui uma conta bancária existente.
- Parâmetros da URL: `numeroConta` (Número da Conta)
- Resposta de Sucesso (Status 204 - No Content)

POST /depositar
- Descrição: Realiza um depósito em uma conta bancária.
- Corpo da Requisição (JSON):
```bash
{
  "numero_conta": "12345",
  "valor": 500.0
}
```
- Resposta de Sucesso (Status 204 - No Content)

POST /sacar
- Descrição: Realiza um saque de uma conta bancária
- Corpo da Requisição (JSON):
```bash
{
  "numero_conta": "12345",
  "valor": 200.0,
  "senha": "senha123"
}
```
- Resposta de Sucesso (Status 204 - No Content)

POST /transferir
- Descrição: Realiza uma transferência entre duas contas bancárias.
- Corpo da Requisição (JSON):
```bash
{
  "numero_conta_origem": "12345",
  "numero_conta_destino": "54321",
  "valor": 300.0,
  "senha": "senha123"
}
```
- Resposta de Sucesso (Status 204 - No Content)

GET /saldo
- Descrição: Retorna o saldo de uma conta bancária.
- Parâmetros da Consulta (Query):
  - `numero_conta` (Número da Conta)
  - `senha` (Senha da Conta)
- Resposta de Sucesso:
```bash
{
  "saldo": 800.0
}
```

GET /extrato
- Descrição: Retorna o extrato de uma conta bancária, incluindo saques, depósitos e transferências.
- Parâmetros da Consulta (Query):
  - `numero_conta` (Número da Conta)
  - `senha` (Senha da Conta)
- Resposta de Sucesso:
```bash
{
  "saques": [
    {
      "data": "2023-09-21 14:30:00",
      "numero_conta": "12345",
      "valor": 200.0
    }
  ],
  "depositos": [
    {
      "data": "2023-09-20 10:15:00",
      "numero_conta": "12345",
      "valor": 500.0
    }
  ],
  "transferencias": [
    {
      "data": "2023-09-19 16:45:00",
      "numero_conta_origem": "12345",
      "numero_conta_destino":
```

## Contribuição

Contribuições são bem-vindas! Se você encontrar bugs, problemas de segurança ou melhorias que possam ser feitas nesta API, sinta-se à vontade para criar issues ou enviar pull requests.

 
