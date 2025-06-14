-- Criar banco de dados
CREATE DATABASE todolist;
GO

-- Usar o banco de dados
USE todolist;
GO

-- Criar tabela de tarefas
CREATE TABLE tarefas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    status BIT DEFAULT 0, -- 0 = pendente, 1 = concluída
    data_criacao DATETIME DEFAULT GETDATE()
);
GO

-- Inserir algumas tarefas de exemplo
INSERT INTO tarefas (descricao) VALUES 
('Estudar Node.js'),
('Criar projeto ToDoList'),
('Praticar SQL Server'),
('Revisar conteúdo de APIs RESTful');
GO