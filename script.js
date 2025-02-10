let loginForm = document.getElementById('loginForm');
let loginPage = document.getElementById('loginPage');
let todoPage = document.getElementById('todoPage');
let todoList = document.getElementById('todoList');
let todoNavItem = document.getElementById('todoNavItem');
let todos = [];

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    login(username, password, function (success) {
        if (success) {
            loginPage.style.display = 'none';
            todoPage.style.display = 'block';
            document.getElementById("todoNavItem").style.display = "block"; 
            document.getElementById("logoutNavItem").style.display = "block";
            loadTodos();
        } else {
            alert('Invalid username or password.');
            if(username!=='admin')
                {
                    username.focus();
                }
                else
                {
                    password.focus();
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

function displayTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = todo.title;
        if (todo.completed) {
            listItem.classList.add('completed');
        }
        listItem.addEventListener('click', () => {
            todo.completed = !todo.completed;  
            if (todo.completed) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
            checkCompletion();
        });

        todoList.appendChild(listItem);
    });
}


function checkCompletion() {
    let completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount >= 5) {
        new Promise(resolve => setTimeout(resolve, 0)).then(() => {
            alert("Congrats.5 Tasks have been Successfully Completed");
        });
    }
}


function showTodoPage() {
    loginPage.style.display = 'none';
    todoPage.style.display = 'block';
    todoNavItem.style.display = 'block';
    loadTodos();
}

function logout() {
    loginPage.style.display = 'flex';
    todoPage.style.display = 'none';
    document.getElementById("todoNavItem").style.display = "none"; 
    document.getElementById("logoutNavItem").style.display = "none";
}

