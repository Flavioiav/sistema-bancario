module.exports = {
  numeroDaConta: 2,
  banco: {
    nome: "Cubos Bank",
    numero: "123",
    agencia: "0001",
    senha: "Cubos123Bank",
  },
  contas: [
    {
      numero_conta: "1",
      saldo: 0,
      usuario: {
        nome: "Foo Bar",
        cpf: "00011122233",
        data_nascimento: "2021-03-15",
        telefone: "71999998888",
        email: "foo@bar.com",
        senha: "1234",
      },
    },
    {
      numero_conta: "2",
      saldo: 1000,
      usuario: {
        nome: "Foo Bar 2",
        cpf: "00011122234",
        data_nascimento: "2021-03-15",
        telefone: "71999998888",
        email: "foo@bar2.com",
        senha: "12345",
      },
    },
  ],
  saques: [],
  depositos: [],
  transferencias: [],
};