const TarefaModel = require('../models/tarefaModel');

const TarefaController = {
  // Criar uma nova tarefa
  criarTarefa: async (req, res) => {
    try {
      const { descricao } = req.body;
      
      if (!descricao) {
        return res.status(400).json({ error: 'A descrição da tarefa é obrigatória' });
      }
      
      const id = await TarefaModel.criar(descricao);
      res.status(201).json({ id, descricao, status: false });
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).json({ error: 'Erro ao criar tarefa', detalhes: error.message });
    }
  },

  // Listar todas as tarefas
  listarTarefas: async (req, res) => {
    try {
      const tarefas = await TarefaModel.listarTodas();
      
      // Converte bit (0/1) para boolean
      const tarefasFormatadas = tarefas.map(t => ({
        ...t,
        status: t.status === 1 // Converte bit para boolean
      }));
      
      res.status(200).json(tarefasFormatadas);
    } catch (error) {
      console.error('Erro ao listar tarefas:', error);
      res.status(500).json({ error: 'Erro ao listar tarefas', detalhes: error.message });
    }
  },

  // Atualizar status da tarefa
  atualizarStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (typeof status !== 'boolean') {
        return res.status(400).json({ error: 'O status deve ser um booleano' });
      }
      
      const sucesso = await TarefaModel.atualizarStatus(id, status);
      
      if (sucesso) {
        res.status(200).json({ id, status });
      } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      res.status(500).json({ error: 'Erro ao atualizar tarefa', detalhes: error.message });
    }
  },

  // Excluir uma tarefa
  excluirTarefa: async (req, res) => {
    try {
      const { id } = req.params;
      const sucesso = await TarefaModel.excluir(id);
      
      if (sucesso) {
        res.status(200).json({ message: 'Tarefa excluída com sucesso' });
      } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      res.status(500).json({ error: 'Erro ao excluir tarefa', detalhes: error.message });
    }
  }
};

module.exports = TarefaController;