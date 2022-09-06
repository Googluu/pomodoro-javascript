const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");

form.addEventListener("submit", e => {
  e.preventDefault();
  if (itTask.value !== '') {
    createTask(itTask.value);
    itTask.value = '';
    renderTask();
  }
});

function createTask(value) {

  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
}

function renderTask() {
  const html = tasks.map(task => {
    return `
            <div class="task">
              <div class="completed">
                ${task.completed ? `<span class="done">Done</span>` : `<button class="start-button" data-id=${task.id}>Start</button>`}
              </div>
              <div class="title">${task.title}</div>
            </div>
        `;
  });

  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join('');

  const startButtons = document.querySelector(".task .start-button");

  startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if(!timer) {
        const id = button.getAttribute("data-id");
        startButtonHandler(id);
        button.textContent = "In progress...";
      }
    });
  });
}