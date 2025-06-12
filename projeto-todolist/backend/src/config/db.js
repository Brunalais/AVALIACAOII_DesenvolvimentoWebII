const sql = require('mssql');
require('dotenv').config();

// Configuração para SQL Server
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Para conexões Azure
    trustServerCertificate: true, // Em desenvolvimento
    enableArithAbort: true
  }
};

// Pool de conexões
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

// Avisa quando conectar
poolConnect.then(() => {
  console.log('Conectado ao SQL Server');
}).catch(err => {
  console.error('Erro ao conectar ao SQL Server:', err);
});

module.exports = {
  async query(text, params = []) {
    try {
      await poolConnect; // Garante que a conexão está pronta
      const request = pool.request();
      
      // Se houver parâmetros, adicione-os à requisição
      params.forEach((param, index) => {
        request.input(`param${index}`, param);
      });
      
      // Substitui ? por @paramX na query (compatibilidade com formato anterior)
      let sqlQuery = text;
      params.forEach((_, index) => {
        sqlQuery = sqlQuery.replace('?', `@param${index}`);
      });
      
      const result = await request.query(sqlQuery);
      return [result.recordset || result, undefined];
    } catch (error) {
      console.error('Erro ao executar query:', error);
      return [undefined, error];
    }
  },
  pool,
  sql
};