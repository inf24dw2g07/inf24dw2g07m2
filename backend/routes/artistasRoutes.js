const express = require('express');
const router = express.Router();
const { Artista } = require('../models');

// Rota GET para listar todos os artistas
router.get('/', async (req, res) => {
  try {
    const artistas = await Artista.findAll();
    res.json(artistas);
  } catch (err) {
    console.error("Erro ao buscar artistas:", err);
    res.status(500).json({ error: "Erro ao buscar artistas" });
  }
});

// Rota POST para salvar artistas, evitando duplicatas
router.post('/', async (req, res) => {
  try {
    const artistas = req.body;

    if (!Array.isArray(artistas)) {
      return res.status(400).json({ error: "Esperado um array de artistas" });
    }

    const artistasInseridos = [];

    for (const artista of artistas) {
      const existente = await Artista.findOne({
        where: { nome: artista.nome }
      });

      if (!existente) {
        const novo = await Artista.create(artista);
        artistasInseridos.push(novo);
      }
    }

    res.status(201).json({
      message: "Processo concluído",
      inseridos: artistasInseridos.length,
      artistas: artistasInseridos
    });
  } catch (error) {
    console.error("Erro ao salvar artistas:", error);
    res.status(500).json({ error: "Erro interno ao salvar artistas" });
  }
});

module.exports = router;
