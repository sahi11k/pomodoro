import { taskCategoryIcons } from "./constants.js";
import store from "./store.js";
import { getTemplate } from "./utils.js";

const TASK_ITEM_TEMPLATE = `<li class="task-item">
          <div class="task-item__status">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              class="task-item__status--toggle-btn"
              role="button"
            >
              <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
            </svg>
          </div>
          <div class="task-item__category">
            <div class="task-item__category--icon"></div>
          </div>
          <div class="task-item__details">
            <div class="task-item__details--name"></div>
            <div class="task-item__details--progress-wrapper">
              <div class="task-item__details--sessions"></div>
              <div class="task-item__details--completion-time"></div>
            </div>
          </div>
          <div class="task-item__actions">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="task-item__actions--more-btn"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
          </div>
        </li>`;

const $taskItemTemplate = getTemplate(TASK_ITEM_TEMPLATE);

export function initTasks(store) {
  const taskItems = store.getTasks();
  renderTaskList(taskItems);
  attachEventListeners();
}

function attachEventListeners() {
  const $taskListEl = store.elements.$taskList;
  $taskListEl.addEventListener("click", (e) => {
    console.log(e.target);
  });
}

export function renderTaskList(tasks) {
  const $taskListEl = store.elements.$taskList;
  const taskListFragment = document.createDocumentFragment();
  tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    taskListFragment.appendChild(taskItem);
  });
  $taskListEl.innerHTML = "";
  $taskListEl.appendChild(taskListFragment);
}

function createTaskItem(task) {
  const $taskClone = $taskItemTemplate.content.cloneNode(true);

  $taskClone
    .querySelector(".task-item__status--toggle-btn")
    .classList.toggle("active", task.completed);

  $taskClone.querySelector(".task-item__details--name").textContent = task.name;

  $taskClone.querySelector(".task-item__category--icon").textContent =
    taskCategoryIcons[task.category];

  $taskClone.querySelector(".task-item__details--sessions").textContent =
    task.completed ? "Done" : `Sessions:  0/${task.sessions}`;

  $taskClone.querySelector(".task-item__details--completion-time").textContent =
    task.completionTime;

  return $taskClone;
}
