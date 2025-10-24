const mongoose = require("mongoose");
const Produto = require("../models/produtosModel");

async function criar(req, res) {
  try {
    const { nome, preco } = req.body;
    if (!nome || preco == null) {
      return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }

    const novoProduto = await Produto.create({ nome, preco });
    return res.status(201).json(novoProduto);
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao criar produto" });
  }
}

async function listar(req, res) {
  try {
    const produtos = await Produto.find({});
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao listar produtos" });
  }
}

async function buscar(req, res, next) {
  const { id } = req.params;

  // ID inválido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  try {
    const produto = await Produto.findById(id);

    // ID válido, mas não existe
    if (!produto) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    req.produto = produto;
    next();
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao buscar produto" });
  }
}

function exibir(req, res) {
  return res.status(200).json(req.produto);
}

async function atualizar(req, res) {
  const { id } = req.params;
  const { nome, preco } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  if (!nome || preco == null) {
    return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }

  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id,
      { nome, preco },
      { new: true, runValidators: true }
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    return res.status(200).json(produtoAtualizado);
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao atualizar produto" });
  }
}

async function remover(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  try {
    const produtoRemovido = await Produto.findByIdAndDelete(id);

    if (!produtoRemovido) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao remover produto" });
  }
}

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover,
};
