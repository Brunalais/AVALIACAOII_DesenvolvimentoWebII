const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Base URL para o JSON Server
const JSON_SERVER_URL = 'http://localhost:3001';

// Rotas para tarefas
app.get('/api/tarefas', async (req, res) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/tarefas`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

app.get('/api/tarefas/:id', async (req, res) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/tarefas/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefa' });
  }
});

app.post('/api/tarefas', async (req, res) => {
  try {
    const response = await axios.post(`${JSON_SERVER_URL}/tarefas`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

app.put('/api/tarefas/:id', async (req, res) => {
  try {
    const response = await axios.put(`${JSON_SERVER_URL}/tarefas/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});

app.delete('/api/tarefas/:id', async (req, res) => {
  try {
    await axios.delete(`${JSON_SERVER_URL}/tarefas/${req.params.id}`);
    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do ToDoList funcionando com JSON Server!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Usando JSON Server como banco de dados simulado');
});