let loginForm = document.getElementById('loginForm');
let loginPage = document.getElementById('loginPage');
let todoPage = document.getElementById('todoPage');
let todoList = document.getElementById('todoList');
let todoNavItem = document.getElementById('todoNavItem');
let logoutNavItem = document.getElementById('logoutNavItem');
let todos = [];
let userCompletedTasks = []; 

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    login(username, password, function (success) {
        if (success) {
            loginPage.style.display = 'none';
            todoPage.style.display = 'block';
            todoNavItem.style.display = 'block';
            logoutNavItem.style.display = 'block';
            loadTodos();
        } else {
            alert('Invalid username or password.');
            if (username !== 'admin') {
                document.getElementById('username').focus();
            } else {
                document.getElementById('password').focus();
            }
        }
    });
});

function login(username, password, callback) {
    if (username === 'admin' && password === '12345') {
        callback(true);
    } else {
        callback(false);
    }
}

function loadTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            todos = data;
            displayTodos(data);
        });
}

function displayTodos(todosData) {
    todoList.innerHTML = '';

    todosData.forEach(todo => {
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;

        checkbox.addEventListener('change', () => {
            const index = todos.findIndex(t => t.id === todo.id);
            if (index !== -1) {
                todos[index].completed = checkbox.checked;
            }
            if (checkbox.checked) {
                listItem.classList.add('completed');
                if (!userCompletedTasks.includes(todo.id)) {
                    userCompletedTasks.push(todo.id);
                }
            } else {
                listItem.classList.remove('completed');
                const taskIndex = userCompletedTasks.indexOf(todo.id);
                if (taskIndex !== -1) {
                    userCompletedTasks.splice(taskIndex, 1);
                }
            }
            checkCompletion();
        });

        let label = document.createElement('label');
        label.textContent = todo.title;
        label.style.marginLeft = '10px';

        listItem.appendChild(checkbox);
        listItem.appendChild(label);

        if (todo.completed) {
            listItem.classList.add('completed');
        }

        todoList.appendChild(listItem);
    });
}

function checkCompletion() {
    let completedCount = userCompletedTasks.length;
    console.log(`User completed tasks: ${completedCount}`); 

    if (completedCount === 5) {
        alert("Congrats. 5 Tasks have been Successfully Completed");
    }
}


function showTodoPage() {
    loginPage.style.display = 'none';
    todoPage.style.display = 'block';
    todoNavItem.style.display = 'block';
    logoutNavItem.style.display = 'block';
    loadTodos();
}

function logout() {
    loginPage.style.display = 'flex';
    todoPage.style.display = 'none';
    todoNavItem.style.display = 'none';
    logoutNavItem.style.display = 'none';
    userCompletedTasks = []; 
}