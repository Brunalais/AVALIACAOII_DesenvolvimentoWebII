const { sql } = require('../config/db');

class Tarefa {
  // Buscar todas as tarefas
  static async getAll() {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .query('SELECT * FROM tarefas ORDER BY data_criacao DESC');
      return result.recordset;
    } catch (error) {
      console.error('Erro ao buscar todas as tarefas:', error.message);
      throw new Error('Erro ao buscar tarefas');
    }
  }

  // Buscar tarefa por ID
  static async getById(id) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM tarefas WHERE id = @id');
      
      return result.recordset[0];
    } catch (error) {
      console.error(`Erro ao buscar tarefa com ID ${id}:`, error.message);
      throw new Error('Erro ao buscar tarefa');
    }
  }

  // Criar uma nova tarefa
  static async create(tarefa) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('descricao', sql.VarChar(255), tarefa.descricao)
        .query(`
          INSERT INTO tarefas (descricao) 
          OUTPUT INSERTED.* 
          VALUES (@descricao)
        `);
      
      return result.recordset[0];
    } catch (error) {
      console.error('Erro ao criar tarefa:', error.message);
      throw new Error('Erro ao criar tarefa');
    }
  }

  // Atualizar status da tarefa
  static async update(id, status) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('status', sql.Bit, status)
        .query(`
          UPDATE tarefas 
          SET status = @status 
          OUTPUT INSERTED.* 
          WHERE id = @id
        `);
      
      return result.recordset[0];
    } catch (error) {
      console.error(`Erro ao atualizar tarefa com ID ${id}:`, error.message);
      throw new Error('Erro ao atualizar tarefa');
    }
  }

  // Excluir tarefa
  static async delete(id) {
    try {
      const pool = await sql.connect();
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM tarefas WHERE id = @id');
      
      return true;
    } catch (error) {
      console.error(`Erro ao excluir tarefa com ID ${id}:`, error.message);
      throw new Error('Erro ao excluir tarefa');
    }
  }
}

module.exports = Tarefa;