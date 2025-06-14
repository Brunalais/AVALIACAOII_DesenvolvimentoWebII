# Sistema ToDoList - Gerenciador de Tarefas

Este projeto implementa um sistema completo para gerenciamento de tarefas (ToDoList), com backend em Node.js e frontend em HTML, CSS e JavaScript vanilla.

## Funcionalidades

- ✅ Cadastro de tarefas
- 📋 Listagem de tarefas
- 🔄 Filtros: todas, pendentes e concluídas
- ✓ Marcar/desmarcar tarefas como concluídas
- 🗑️ Excluir tarefas

## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- SQL Server (via mssql)

### Frontend
- HTML5
- CSS3
- JavaScript
- Font Awesome para ícones
  
## Como Executar o Projeto

### Requisitos Prévios
- Node.js instalado
- SQL Server instalado e configurado
- Git (opcional)

### Passo a Passo

1. **Configurar o Banco de Dados**
   - Execute o script SQL do arquivo `/database/script_criacao.sql` em seu SQL Server
  
2. **Configurar o Backend**
   
   ```bash
   # Entrar na pasta do backend
   cd projeto-todolist/backend
   
   # Instalar dependências
   npm install
   
   # Criar arquivo .env com as configurações de conexão

 # Iniciar o servidor
   npm start
   
Iniciar o Frontend
Abra o arquivo /frontend/index.html em um navegador web   
