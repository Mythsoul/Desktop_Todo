// renderer.js
function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(text) {
    const todos = getTodos();
    todos.push({
        id: Date.now(),
        text,
        completed: false
    });
    saveTodos(todos);
    renderTodos();
}

function deleteTodo(id) {
    const todos = getTodos().filter(todo => todo.id !== id);
    saveTodos(todos);
    renderTodos();
}

function toggleTodo(id) {
    const todos = getTodos().map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos(todos);
    renderTodos();
}

function editTodo(id, newText) {
    const todos = getTodos().map(todo => {
        if (todo.id === id) {
            return { ...todo, text: newText };
        }
        return todo;
    });
    saveTodos(todos);
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    getTodos().forEach(todo => {
        const li = document.createElement('li');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(todo.id));
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        span.className = `todo-text ${todo.completed ? 'completed' : ''}`;
        span.addEventListener('dblclick', () => {
            const newText = prompt('Edit todo:', todo.text);
            if (newText !== null && newText.trim() !== '') {
                editTodo(todo.id, newText.trim());
            }
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Event Listeners
document.getElementById('addTodo').addEventListener('click', () => {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        addTodo(text);
        input.value = '';
    }
});

document.getElementById('todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = e.target.value.trim();
        if (text) {
            addTodo(text);
            e.target.value = '';
        }
    }
});

// Initial render
renderTodos();
