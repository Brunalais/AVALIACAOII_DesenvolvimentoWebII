const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Inicializa o Express
const app = express();

// Configuração de middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API ToDoList funcionando!' });
});

// Rotas de tarefas
const tarefasRoutes = require('./routes/tarefaRoutes');
app.use('/api/tarefas', tarefasRoutes);

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

// Configuração da porta
const PORT = process.env.PORT || 5000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
