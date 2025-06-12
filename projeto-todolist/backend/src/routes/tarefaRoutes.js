const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/tarefaController');

// Rotas para tarefas
router.post('/tarefas', TarefaController.criarTarefa);
router.get('/tarefas', TarefaController.listarTarefas);
router.put('/tarefas/:id', TarefaController.atualizarStatus);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

module.exports = router;