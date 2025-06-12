const db = require('../config/db');

const TarefaModel = {
  // Cadastrar uma nova tarefa
  criar: async (descricao) => {
    const query = `
      INSERT INTO tarefas (descricao) 
      OUTPUT INSERTED.id
      VALUES (?);
    `;
    
    const [result, error] = await db.query(query, [descricao]);
    
    if (error) {
      throw error;
    }
    
    // No SQL Server, OUTPUT INSERTED.id retorna um objeto com a propriedade id
    return result[0].id;
  },

  // Listar todas as tarefas
  listarTodas: async () => {
    const query = `
      SELECT id, descricao, status, data_criacao 
      FROM tarefas 
      ORDER BY status ASC, data_criacao DESC
    `;
    
    const [tarefas, error] = await db.query(query);
    
    if (error) {
      throw error;
    }
    
    return tarefas;
  },

  // Atualizar status de uma tarefa
  atualizarStatus: async (id, status) => {
    const statusValue = status ? 1 : 0; // Converte booleano para bit (0/1)
    
    const query = `
      UPDATE tarefas 
      SET status = ? 
      WHERE id = ?;
      
      SELECT @@ROWCOUNT as affectedRows;
    `;
    
    const [result, error] = await db.query(query, [statusValue, id]);
    
    if (error) {
      throw error;
    }
    
    return result[0].affectedRows > 0;
  },

  // Excluir uma tarefa
  excluir: async (id) => {
    const query = `
      DELETE FROM tarefas 
      WHERE id = ?;
      
      SELECT @@ROWCOUNT as affectedRows;
    `;
    
    const [result, error] = await db.query(query, [id]);
    
    if (error) {
      throw error;
    }
    
    return result[0].affectedRows > 0;
  }
};

module.exports = TarefaModel;