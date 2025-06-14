const sql = require('mssql');
require('dotenv').config();

// Configuração da conexão
const dbConfig = {
  user: process.env.DB_USER,
 server: process.env.DB_SERVER || 'BRUNA\\SQLEXPRESS',
  database: process.env.DB_DATABASE,
  options: {
   trustServerCertificate: true,
    enableArithAbort: true,
    encrypt: false,
    trustedConnection: true,
    integratedSecurity: true
  }
};

// Função para conectar ao banco de dados
async function connectDB() {
  try {
    console.log('Tentando conectar ao SQL Server...');
    // Tenta conectar ao SQL Server
    const pool = await sql.connect(dbConfig);
    console.log('Conectado ao SQL Server com sucesso!');
    return pool;
  } catch (error) {
    console.error('Erro ao conectar ao SQL Server:', error.message);
    // Não encerre o programa automaticamente para visualizar o erro
    return null;
  }
}

module.exports = {
  sql,
  connectDB
};