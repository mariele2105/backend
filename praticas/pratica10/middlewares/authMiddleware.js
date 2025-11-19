const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "Token invalido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: "Token invalido" });
  }
}

function gerarToken(payload) {
  const expiresIn = process.env.JWT_EXPIRES;

  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (error) {
    throw "Erro ao gerar o token";
  }
}

function crifarSenha(senha) {
  const salto = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(senha, salto);

  return hash;
}

function compararSenha(senha, hash) {
  return bcrypt.compareSync(senha, hash);
}
module.exports = {verificarToken, gerarToken, crifarSenha, compararSenha};
