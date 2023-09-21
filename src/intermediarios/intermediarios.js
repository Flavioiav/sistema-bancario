const verificarsenha = (req, res, next) => {
  const senhaBanco = req.query.senha_banco;

  if (!senhaBanco) {
    return res
      .status(403)
      .json({ mensagem: "A senha do banco deve ser informada!" });
  }

  if (senhaBanco !== "Cubos123Bank") {
    return res
      .status(401)
      .json({ mensagem: "A senha do banco informada é inválida!" });
  }

  next();
};

module.exports = {
  verificarsenha,
};
