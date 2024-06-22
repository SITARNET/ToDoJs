// знаходимо елементи на сторінці
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

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

    // формуємо розмітку для нового завдання
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';
    
    // генеруємо розмітку для нового завдання
    const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${newTask.text}</span>
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

    // видаляємо поле вводу та повертаємо на нього фокус
    taskInput.value = "";
    taskInput.focus();

    // якщо є більше одного завдання, то скриваємо блок Список завдань пустий
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }
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

    parenNode.remove();

    // якщо є одне завдання, то показуємо блок Список завдань пустий
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }
}

function doneTask (event) {

    // перевіряємо чи клік був Не по кнопці Завдання виповнено
    if (event.target.dataset.action !== "done") return

    // перевіряємо чи був клік по кнопці Завдання виповнено
    const parentNode = event.target.closest('.list-group-item');
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
}