const Tarefa = require('../models/Tarefa');

// Controlador para gerenciar operações de tarefas
const tarefaController = {
  // Listar todas as tarefas
  async listarTarefas(req, res) {
    try {
      const tarefas = await Tarefa.getAll();
      res.status(200).json(tarefas);
    } catch (error) {
      console.error('Erro ao listar tarefas:', error.message);
      res.status(500).json({ erro: 'Erro interno ao listar tarefas' });
    }
  },

  // Buscar tarefa por ID
  async buscarTarefa(req, res) {
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.getById(id);
      
      if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
      }
      
      res.status(200).json(tarefa);
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error.message);
      res.status(500).json({ erro: 'Erro interno ao buscar tarefa' });
    }
  },

  // Criar nova tarefa
  async criarTarefa(req, res) {
    try {
      const { descricao } = req.body;
      
      // Validar entrada
      if (!descricao || descricao.trim() === '') {
        return res.status(400).json({ erro: 'A descrição da tarefa é obrigatória' });
      }
      
      const novaTarefa = await Tarefa.create({ descricao });
      res.status(201).json(novaTarefa);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error.message);
      res.status(500).json({ erro: 'Erro interno ao criar tarefa' });
    }
  },

  // Atualizar status da tarefa
  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      // Validar entrada
      if (typeof status !== 'boolean') {
        return res.status(400).json({ erro: 'Status deve ser um valor booleano' });
      }
      
      const tarefaAtualizada = await Tarefa.update(id, status);
      
      if (!tarefaAtualizada) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
      }
      
      res.status(200).json(tarefaAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error.message);
      res.status(500).json({ erro: 'Erro interno ao atualizar tarefa' });
    }
  },

  // Excluir tarefa
  async excluirTarefa(req, res) {
    try {
      const { id } = req.params;
      await Tarefa.delete(id);
      res.status(200).json({ mensagem: 'Tarefa excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error.message);
      res.status(500).json({ erro: 'Erro interno ao excluir tarefa' });
    }
  }
};

module.exports = tarefaController;