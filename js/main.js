// знаходимо елементи на сторінці
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}

// tasks.forEach(function (task) {
//     renderTask(task);
// })

checkEmptyList();

// додаємо завдання
form.addEventListener('submit', addTask);

// видалення завдання
tasksList.addEventListener('click', deleteTask);

// відмічаємо завдання відміченими
tasksList.addEventListener('click', doneTask);

// функції
function addTask (event) {
    // відміняємо відправку форми
    event.preventDefault();

    // достаєм текст завдання із поля вводу
    const taskText = taskInput.value

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    // додаємо завдання в масив з завданнями
    tasks.push(newTask);

    // зберігаємо список завдань у сховище браузера LocalStorage
    saveToLocalStorage();

    // рендерім завдання на сторінці
    renderTask(newTask);

    // видаляємо поле вводу та повертаємо на нього фокус
    taskInput.value = "";
    taskInput.focus();

    checkEmptyList();
}

function deleteTask (event) {
    // перевіряємо якщо клік був Не по кнопці Видалити завдання
    if (event.target.dataset.action !== 'delete') return

    // перевіряємо що клік був по кнопці Видалити завдання
    const parenNode = event.target.closest('.list-group-item');

    // знаходимо ID завдання
    const id = Number(parenNode.id);

    // знаходимо індекс завдання у масиві
    // const index = tasks.findIndex(function (task) {
    //     return task.id === id;
    // })

    // стрілкова функція
    //const index = tasks.findIndex((task) => task.id === id);

    // видаляємо завдання з масиву з завданнями
    //tasks.splice(index, 1);

    // видалення завдання за допомогою сортування
    //tasks = tasks.filter(function (task) {
    //    return task.id === id;
    //})

    // стрілкова функція
    tasks = tasks.filter((task) => task.id !== id);

    // зберігаємо список завдань у сховище браузера LocalStorage
    saveToLocalStorage();

    // видаляємо завдання із розмітки
    parenNode.remove();

    checkEmptyList();
}

function doneTask (event) {

    // перевіряємо чи клік був Не по кнопці Завдання виповнено
    if (event.target.dataset.action !== "done") return

    // перевіряємо чи був клік по кнопці Завдання виповнено
    const parentNode = event.target.closest('.list-group-item');

    // знаходимо id завдання
    const id = Number(parentNode.id);

    // const task = tasks.find(function(task) {
    //     if (task.id === id) {
    //         return true;
    //     }
    // });

    const task = tasks.find( (task) => task.id === id);
    task.done = !task.done;

    // зберігаємо список завдань у сховище браузера LocalStorage
    saveToLocalStorage();

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список завдань пустий</div>
        </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    // формуємо розмітку для нового завдання
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';
    
    // генеруємо розмітку для нового завдання
    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${task.text}</span>
                            <div class="task-item__buttons">
                                <button type="button" data-action="done" class="btn-action">
                                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                </button>
                                <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                    </li>`;
                    
    // додаємо завдання на сторінку
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}