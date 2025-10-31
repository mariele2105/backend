const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router(); 


router.post('/login', (req, res) => {
  const { email } = req.body;
  const token = authMiddleware.gerarToken({ email });
  return res.status(200).json({ token });
});

// Rota de renovar token
router.post('/renovar', authMiddleware.verificarToken, (req, res) => {
  const token = authMiddleware.gerarToken({ email: req.usuario.email });
  return res.status(200).json({ token });
});

module.exports = router;
