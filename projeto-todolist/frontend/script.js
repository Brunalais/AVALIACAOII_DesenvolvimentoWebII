// Configuração da API
const API_URL = 'http://localhost:3001';

// Elementos do DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTasksElement = document.getElementById('totalTasks');
const pendingTasksElement = document.getElementById('pendingTasks');
const completedTasksElement = document.getElementById('completedTasks');
const notificationElement = document.getElementById('notification');

// Estado da aplicação
let tasks = [];
let currentFilter = 'all';

// Funções principais
// 1. Carregar tarefas da API
async function loadTasks() {
    try {
        showLoading();
        const response = await fetch(`${API_URL}/tarefas`);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        tasks = await response.json();
        renderTasks();
        updateTaskStats();
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        showNotification('Erro ao carregar tarefas. Verifique o console para mais detalhes.', 'error');
        taskList.innerHTML = `<li class="task-item">Erro ao carregar tarefas. Tente novamente mais tarde.</li>`;
    }
}

// 2. Adicionar nova tarefa
async function addTask() {
    const description = taskInput.value.trim();
    
    if (!description) {
        showNotification('A descrição da tarefa não pode estar vazia!', 'error');
        return;
    }
    
    try {
        const newTaskData = {
            titulo: description,
            descricao: description,
            concluida: false,
            dataCriacao: new Date().toISOString(),
            prioridade: "Normal"
        };
        
        const response = await fetch(`${API_URL}/tarefas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTaskData)
        });
        
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        
        const newTask = await response.json();
        tasks.unshift(newTask);
        renderTasks();
        updateTaskStats();
        
        taskInput.value = '';
        showNotification('Tarefa adicionada com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        showNotification('Erro ao adicionar tarefa. Tente novamente.', 'error');
    }
}

// 3. Marcar/desmarcar tarefa como concluída
async function toggleTaskStatus(id, currentStatus) {
    try {
        const response = await fetch(`${API_URL}/tarefas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: !currentStatus })
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const updatedTask = await response.json();

        // Atualiza a tarefa na lista local
        tasks = tasks.map(task =>
            task.id === id ? updatedTask : task
        );

        renderTasks();
        updateTaskStats();

        const statusText = updatedTask.status ? 'concluída' : 'pendente';
        showNotification(`Tarefa marcada como ${statusText}!`, 'success');
    } catch (error) {
        console.error('Erro ao atualizar status da tarefa:', error);
        showNotification('Erro ao atualizar status. Tente novamente.', 'error');
    }
}

// 4. Excluir tarefa
async function deleteTask(id) {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tarefas/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        // Remove a tarefa da lista local
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
        updateTaskStats();
        showNotification('Tarefa excluída com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        showNotification('Erro ao excluir tarefa. Tente novamente.', 'error');
    }
}

// Funções de UI
// 1. Renderizar tarefas na lista
function renderTasks() {
    // Limpar a lista
    taskList.innerHTML = '';

    // Filtrar tarefas conforme o filtro atual
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'pending') return task.status === false;
        if (currentFilter === 'completed') return task.status === true;
        return true;
    });

    // Se não houver tarefas, mostrar mensagem
    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'task-item';
        emptyMessage.textContent = 'Nenhuma tarefa encontrada';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.fontStyle = 'italic';
        emptyMessage.style.color = '#888';
        taskList.appendChild(emptyMessage);
        return;
    }

    // Criar elementos para cada tarefa
    filteredTasks.forEach(task => {
        // Criar elemento de lista
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.status ? 'completed' : ''}`;

        // Checkbox para marcar como concluída
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.status;
        checkbox.addEventListener('change', () => toggleTaskStatus(task.id, task.status));

        // Texto da tarefa
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.descricao;

        // Data de criação
        const taskDate = document.createElement('span');
        taskDate.className = 'task-date';
        // Tenta diferentes propriedades possíveis para a data
        const dateValue = task.data_criacao || task.dataCriacao || task.data || '';
        taskDate.textContent = formatDate(dateValue);

        // Botão de excluir
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        // Montagem do elemento completo
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';
        actionsDiv.appendChild(deleteButton);

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(taskDate);
        taskItem.appendChild(actionsDiv);

        taskList.appendChild(taskItem);
    });
}

// 2. Atualizar estatísticas de tarefas
function updateTaskStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status).length;
    const pendingTasks = totalTasks - completedTasks;

    totalTasksElement.textContent = `Total: ${totalTasks}`;
    pendingTasksElement.textContent = `Pendentes: ${pendingTasks}`;
    completedTasksElement.textContent = `Concluídas: ${completedTasks}`;
}

// 3. Exibir notificação
function showNotification(message, type = 'info') {
    notificationElement.textContent = message;
    notificationElement.className = `notification ${type} show`;

    // Esconder a notificação após 3 segundos
    setTimeout(() => {
        notificationElement.className = 'notification';
    }, 3000);
}

// 4. Mostrar indicador de carregamento
function showLoading() {
    taskList.innerHTML = '<li class="task-item loading">Carregando tarefas...</li>';
}

// 5. Formatar data para exibição
function formatDate(dateString) {
    if (!dateString) return 'Data não disponível';

    try {
        const date = new Date(dateString);

        // Verifica se a data é válida
        if (isNaN(date.getTime())) {
            console.warn('Data inválida:', dateString);
            return 'Data inválida';
        }

        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return 'Erro na data';
    }
}

// Event Listeners
// 1. Carregar tarefas quando a página é carregada
document.addEventListener('DOMContentLoaded', loadTasks);

// 2. Adicionar tarefa ao clicar no botão
addTaskBtn.addEventListener('click', addTask);

// 3. Adicionar tarefa ao pressionar Enter
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// 4. Filtrar tarefas
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover classe 'active' de todos os botões
        filterBtns.forEach(b => b.classList.remove('active'));

        // Adicionar classe 'active' ao botão clicado
        btn.classList.add('active');

        // Atualizar filtro atual e renderizar tarefas
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});