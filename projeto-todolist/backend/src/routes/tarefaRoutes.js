const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

// Rota para listar todas as tarefas
router.get('/tarefas', tarefaController.listarTarefas);

// Rota para obter uma tarefa específica
router.get('/tarefas/:id', tarefaController.buscarTarefa);

// Rota para criar uma nova tarefa
router.post('/tarefas', tarefaController.criarTarefa);

// Rota para atualizar o status de uma tarefa
router.put('/tarefas/:id', tarefaController.atualizarStatus);

// Rota para excluir uma tarefa
router.delete('/tarefas/:id', tarefaController.excluirTarefa);

module.exports = router;