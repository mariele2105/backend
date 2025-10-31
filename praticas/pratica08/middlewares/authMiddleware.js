const jwt = require('jsonwebtoken');

// Função para verificar o token
function verificarToken(req, res, next) {
  const token = req.headers['authorization']; // extrai o token do cabeçalho

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // verifica o token
      req.usuario = decoded; // adiciona o resultado na requisição
      return next(); // segue para o próximo middleware
    } catch (error) {
      return res.status(401).json({ msg: 'Token inválido' });
    }
  } else {
    return res.status(401).json({ msg: 'Não autorizado' });
  }
}

function gerarToken(payload) {
  const expiresIn = 120;
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  } catch (error) {
    throw new Error('Erro ao gerar o token');
  }
}

module.exports = {
  verificarToken,
  gerarToken,
};
