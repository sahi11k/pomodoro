import { taskCategoryIcons } from "./data.js";
import { getTemplate } from "./utils.js";

const taskItemTemplate = `<li class="task-item">
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
        </li>`;

const $taskItemTemplate = getTemplate(taskItemTemplate);

export function renderTaskList($taskContainer, tasks) {
  const taskListFragment = document.createDocumentFragment();
  tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    taskListFragment.appendChild(taskItem);
  });
  $taskContainer.appendChild(taskListFragment);
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
