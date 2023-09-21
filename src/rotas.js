const express = require("express");

const {
  validarCampos,
  atualizarConta,
  listarContas,
  deletarConta,
  depositar,
  sacar,
  transferir,
  saldoConta,
  extrato,
} = require("./controladores/controladores.js");

const { verificarsenha } = require("./intermediarios/intermediarios.js");

const rotas = express();

rotas.get("/contas", verificarsenha, listarContas);
rotas.post("/contas", validarCampos);
rotas.put("/contas/:numeroConta/usuario", atualizarConta);
rotas.delete("/contas/:numeroConta", deletarConta);

rotas.post("/transacoes/depositar", depositar);
rotas.post("/transacoes/sacar", sacar);
rotas.post("/transacoes/transferir", transferir);

rotas.get("/contas/saldo", saldoConta);
rotas.get("/contas/extrato", extrato);

module.exports = rotas;
