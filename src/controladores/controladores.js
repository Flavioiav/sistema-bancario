const { format } = require("date-fns");

let {
  contas,
  numeroDaConta,
  depositos,
  saques,
  transferencias,
} = require("../bancodedados.js");

const listarContas = (req, res) => {
  return res.json(contas);
};

function verficarCPF(cpf) {
  return contas.some((conta) => conta.usuario.cpf === cpf);
}
function verificarEmail(email) {
  return contas.some((conta) => conta.usuario.email === email);
}

function validarCampos(req, res) {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }

  const cpfValidado = verficarCPF(cpf);
  if (cpfValidado === true) {
    return res.status(403).json({ mensagem: "CPF já está em uso." });
  }
  const emailValidado = verificarEmail(email);
  if (emailValidado === true) {
    return res.status(403).json({ mensagem: "E-mail já está em uso." });
  }

  let novoNumeroConta = (numeroDaConta += 1);

  let novaConta = {
    numero_conta: novoNumeroConta.toString(),
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };
  res.status(204).send();

  contas.push(novaConta);
}

const atualizarConta = (req, res) => {
  const { numeroConta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios." });
  }
  const conta = contas.find((conta) => conta.numero_conta === numeroConta);
  if (!conta) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }
  const cpfValidado = verficarCPF(cpf);
  if (cpfValidado === true) {
    return res
      .status(403)
      .json({ mensagem: "O CPF informado já existe cadastrado!" });
  }
  const emailValidado = verificarEmail(email);
  if (emailValidado === true) {
    return res
      .status(403)
      .json({ mensagem: "O Email informado já existe cadastrado!" });
  }

  conta.usuario.nome = nome;
  conta.usuario.cpf = cpf;
  conta.usuario.data_nascimento = data_nascimento;
  conta.usuario.telefone = telefone;
  conta.usuario.email = email;
  conta.usuario.senha = senha;

  res.status(204).send();
};

const deletarConta = (req, res) => {
  const { numeroConta } = req.params;
  const conta = contas.find((conta) => {
    return conta.numero_conta === numeroConta;
  });
  if (!conta) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }
  if (conta.saldo !== 0) {
    return res
      .status(403)
      .json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
  }
  contas = contas.filter((conta) => {
    return conta.numero_conta !== numeroConta;
  });
  res.status(204).send();
};

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  if (!numero_conta || !valor) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta e o valor são obrigatórios!" });
  }
  if (valor <= 0) {
    return res
      .status(403)
      .json({ mensagem: "O valor deve ser maior que zero!" });
  }
  const conta = contas.find((conta) => conta.numero_conta === numero_conta);
  if (!conta) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }
  conta.saldo += valor;

  const transacao = {
    data: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
    numero_conta,
    valor,
  };
  depositos.push(transacao);
  res.status(204).send();
};

const sacar = (req, res) => {
  const { numero_conta, valor, senha } = req.body;
  if (!numero_conta || !valor) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta e o valor são obrigatórios!" });
  }
  if (valor <= 0) {
    return res
      .status(403)
      .json({ mensagem: "O valor deve ser maior que zero!" });
  }
  const conta = contas.find((conta) => conta.numero_conta === numero_conta);
  if (!conta) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }
  if (conta.saldo < valor) {
    return res.status(403).json({ mensagem: "Saldo insuficiente!" });
  }
  if (senha !== conta.usuario.senha) {
    return res.status(401).json({ mensagem: "Senha incorreta!" });
  }
  conta.saldo -= valor;

  const transacao = {
    data: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
    numero_conta,
    valor,
  };
  saques.push(transacao);
  res.status(204).send();
};
const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
  if (!numero_conta_origem || !numero_conta_destino || !valor) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta e o valor são obrigatórios!" });
  }
  if (valor <= 0) {
    return res
      .status(403)
      .json({ mensagem: "O valor deve ser maior que zero!" });
  }
  const contaOrigem = contas.find(
    (conta) => conta.numero_conta === numero_conta_origem
  );
  if (!contaOrigem) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }
  const contaDestino = contas.find(
    (conta) => conta.numero_conta === numero_conta_destino
  );
  if (!contaDestino) {
    return res
      .status(404)
      .json({ mensagem: "Conta de destino não encontrada." });
  }
  if (senha !== contaOrigem.usuario.senha) {
    return res.status(401).json({ mensagem: "Senha incorreta!" });
  }
  if (contaOrigem.saldo < valor) {
    return res.status(403).json({ mensagem: "Saldo insuficiente!" });
  }
  contaOrigem.saldo -= valor;
  contaDestino.saldo += valor;

  const transacao = {
    data: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  transferencias.push(transacao);
  res.status(204).send();
};
const saldoConta = (req, res) => {
  const { numero_conta, senha } = req.query;
  if (!numero_conta || !senha) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta e a senha são obrigatórios!" });
  }
  const conta = contas.find((conta) => conta.numero_conta === numero_conta);
  if (!conta) {
    return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
  }
  if (senha !== conta.usuario.senha) {
    return res.status(401).json({ mensagem: "Senha incorreta!" });
  }
  return res.status(200).json({ saldo: conta.saldo });
};
const extrato = (req, res) => {
  const { numero_conta, senha } = req.query;
  if (!numero_conta || !senha) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta e a senha são obrigatórios!" });
  }
  const conta = contas.find((conta) => conta.numero_conta === numero_conta);
  if (!conta) {
    return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
  }
  if (senha !== conta.usuario.senha) {
    return res.status(401).json({ mensagem: "Senha incorreta!" });
  }
  return res.status(200).json({ saques, depositos, transferencias });
};
module.exports = {
  verificarEmail,
  validarCampos,
  atualizarConta,
  listarContas,
  deletarConta,
  depositar,
  sacar,
  transferir,
  saldoConta,
  extrato,
};
