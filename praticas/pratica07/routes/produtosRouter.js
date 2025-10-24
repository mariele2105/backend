const express = require("express");
const mongoose = require("mongoose");
const Produto = require("../models/produtosModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find();
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao listar produtos" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  try {
    const produto = await Produto.findById(id);
    if (!produto) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }
    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao buscar produto" });
  }
});

router.post("/", async (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco === undefined) {
    return res
      .status(422)
      .json({ msg: "Nome e preço do produto são obrigatórios" });
  }

  try {
    const produto = new Produto({ nome, preco });
    await produto.save();
    return res.status(201).json(produto);
  } catch (error) {
    return res
      .status(422)
      .json({ msg: "Nome e preço do produto são obrigatórios" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  if (!nome || preco === undefined) {
    return res
      .status(422)
      .json({ msg: "Nome e preço do produto são obrigatórios" });
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
    return res
      .status(422)
      .json({ msg: "Nome e preço do produto são obrigatórios" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  try {
    const produto = await Produto.findByIdAndDelete(id);

    if (!produto) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao remover produto" });
  }
});

module.exports = router;
