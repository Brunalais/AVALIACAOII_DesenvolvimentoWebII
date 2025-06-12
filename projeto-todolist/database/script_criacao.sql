-- Criação do banco de dados
IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'todolist')
BEGIN
    CREATE DATABASE todolist;
END
GO

USE todolist;
GO

-- Verifica se a tabela já existe antes de criar
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='tarefas' AND xtype='U')
BEGIN
    CREATE TABLE tarefas (
        id INT PRIMARY KEY IDENTITY(1,1),
        descricao NVARCHAR(255) NOT NULL,
        status BIT DEFAULT 0,  -- FALSE em SQL Server é 0
        data_criacao DATETIME DEFAULT GETDATE()
    );
END
GO

-- Dados iniciais para teste
-- Verificar se a tabela está vazia antes de inserir
IF NOT EXISTS (SELECT TOP 1 * FROM tarefas)
BEGIN
    INSERT INTO tarefas (descricao) VALUES 
    (N'Estudar Node.js'),
    (N'Desenvolver API REST'),
    (N'Integrar com SQL Server'),
    (N'Testar endpoints');
END
GO