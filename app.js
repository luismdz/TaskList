// Define UI var
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
    // Load Tasks from Local Storage
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear All tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from Local Storage
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        // create li
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        // create link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.style.cursor = 'pointer';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li);
    })
}

// Add a task
function addTask(e) {
    if (taskInput.value === '') {
        //alert('Add a task');
        showError('Please Add a Task');
    } else {
        // create li
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));

        // create link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.style.cursor = 'pointer';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li);

        // add to Local Storage
        addToLocalStorage(taskInput.value);
        taskInput.value = '';
    }
    e.preventDefault();
}

// Show Error
function showError(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    const cardContent = document.querySelector('.card-content');
    const cardTitle = document.querySelector('.card-title');

    cardContent.insertBefore(errorDiv, cardTitle);

    // Remove Error message after 3 seconds
    setTimeout(() => errorDiv.remove(), 3000);
}

// Add to local storage
function addToLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from Local Storage
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(i => {
        const item = i.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) !== -1) {
            i.style.display = 'block';
        } else {
            i.style.display = 'none';
        }
    })
}