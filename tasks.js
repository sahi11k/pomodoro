import { showModal } from "./addTaskModal.js";
import { CREATE, EDIT, taskCategoryIcons } from "./constants.js";
import { renderDailyProgress } from "./dailyProgress.js";
import store from "./store.js";
import { resetTimer, updateCurrentTask } from "./timer.js";
import { getTemplate } from "./utils.js";

const TASK_ITEM_TEMPLATE = `<li class="task-item" data-id="">
                <div class="task-item__status">
                  <button class="btn btn--icon" data-action="complete">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                    >
                      <path
                        d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                      />
                    </svg>
                  </button>
                </div>
                <div class="task-item__category">
                  <div class="task-item__category--icon"></div>
                </div>
                <div class="task-item__details">
                  <div class="task-item__details--name"></div>
                  <div class="task-item__details--progress-wrapper">
                    <div class="task-item__details--sessions"></div>
                    
                  </div>
                </div>
                <div class="task-item__actions">
                  <button class="btn btn--icon" data-action="edit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed"
                    >
                      <path
                        d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"
                      />
                    </svg>
                  </button>
                  <button class="btn btn--icon" data-action="delete">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed"
                    >
                      <path
                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"
                      />
                    </svg>
                  </button>
                  <button class="btn btn--icon" data-action="drag">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed"
                    >
                      <path
                        d="M360-160q-33 0-56.5-23.5T280-240q0-33 23.5-56.5T360-320q33 0 56.5 23.5T440-240q0 33-23.5 56.5T360-160Zm240 0q-33 0-56.5-23.5T520-240q0-33 23.5-56.5T600-320q33 0 56.5 23.5T680-240q0 33-23.5 56.5T600-160ZM360-400q-33 0-56.5-23.5T280-480q0-33 23.5-56.5T360-560q33 0 56.5 23.5T440-480q0 33-23.5 56.5T360-400Zm240 0q-33 0-56.5-23.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 33-23.5 56.5T600-400ZM360-640q-33 0-56.5-23.5T280-720q0-33 23.5-56.5T360-800q33 0 56.5 23.5T440-720q0 33-23.5 56.5T360-640Zm240 0q-33 0-56.5-23.5T520-720q0-33 23.5-56.5T600-800q33 0 56.5 23.5T680-720q0 33-23.5 56.5T600-640Z"
                      />
                    </svg>
                  </button>
                </div>
              </li>`;

const $taskItemTemplate = getTemplate(TASK_ITEM_TEMPLATE);
const $taskListEl = document.querySelector("#task-list");
const $addTaskModalHandler = document.querySelector("#add-task-modal-handler");

export function initTasks(store) {
  const taskItems = store.getTasks();
  renderTaskList(taskItems);
  attachEventListeners();
}

function attachEventListeners() {
  $taskListEl.addEventListener("mouseover", onHover);
  $taskListEl.addEventListener("mouseout", onHoverOut);
  $taskListEl.addEventListener("click", onTaskClick);
  $taskListEl.addEventListener("dragstart", onDragStart);
  $taskListEl.addEventListener("dragover", onDragOver);
  $taskListEl.addEventListener("drop", onDrop);

  $addTaskModalHandler.addEventListener("click", (e) => {
    e.preventDefault();
    showModal(CREATE);
  });
}

function onHover(e) {
  const $taskItem = e.target.closest(".task-item");
  if (!$taskItem) return;
  $taskItem.classList.add("hovered");
}

function onHoverOut(e) {
  const $taskItem = e.target.closest(".task-item");
  if (!$taskItem) return;
  $taskItem.classList.remove("hovered");
}

function onTaskClick(e) {
  const $target = e.target;
  const $taskItem = $target.closest(".task-item");
  const $actionButton = $target.closest("button");

  if (!$taskItem || !$actionButton) return;

  const action = $actionButton.dataset.action;

  switch (action) {
    case "edit":
      onTaskEdit($taskItem);
      break;
    case "delete":
      onTaskDelete($taskItem);
      break;
    case "complete":
      onTaskComplete($taskItem);
      break;
    default:
      return;
  }
}

const onTaskEdit = ($taskItem) => {
  const taskId = $taskItem.dataset.id;
  showModal(EDIT, taskId);
};

const onTaskDelete = ($taskItem) => {
  const taskId = $taskItem.dataset.id;
  store.removeTask(taskId);
  const tasks = store.getTasks();
  renderTaskList(tasks);
  // Todo : set current task , update timer and update progress
};

function onDragStart(e) {
  const $dragHandle = e.target.closest('[data-action="drag"]');
  if (!$dragHandle) return;
  const $taskItem = $dragHandle.closest(".task-item");
  e.dataTransfer.setData("text/plain", $taskItem.dataset.id);
  e.dataTransfer.setDragImage($taskItem, $taskItem.clientWidth, 0);
}

function onDragOver(e) {
  e.preventDefault();
}

function onDrop(e) {
  e.preventDefault();
  const draggedTaskId = e.dataTransfer.getData("text/plain");
  const $dropTarget = e.target.closest(".task-item");

  if (!$dropTarget || draggedTaskId === $dropTarget.dataset.id) return;

  const tasks = store.getTasks();
  const draggedTaskIndex = tasks.findIndex((task) => task.id === draggedTaskId);
  const dropTargetIndex = tasks.findIndex(
    (task) => task.id === $dropTarget.dataset.id
  );

  const [draggedTask] = tasks.splice(draggedTaskIndex, 1);
  tasks.splice(dropTargetIndex, 0, draggedTask);

  store.updateTasks(tasks);
  renderTaskList(tasks);
}

const onTaskComplete = ($taskItem) => {
  const taskId = $taskItem.dataset.id;
  const task = store.getTaskById(taskId);
  task.completed = !task.completed;
  task.completedSessions = task.completed ? task.sessions : 0;
  store.updateTask(task);
  const tasks = store.getTasks();
  renderTaskList(tasks);
};

export function renderTaskList(tasks) {
  const $emptyEl = document.querySelector(".task-list__empty");

  const taskListFragment = document.createDocumentFragment();
  tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    taskListFragment.appendChild(taskItem);
  });
  $taskListEl.innerHTML = "";
  $emptyEl.classList.toggle("show", tasks.length === 0);
  $taskListEl.appendChild(taskListFragment);
  updateCurrentTask(tasks);
  renderDailyProgress(tasks);
  resetTimer();
}

function createTaskItem(task) {
  const $taskClone = $taskItemTemplate.content.cloneNode(true);
  const $taskItem = $taskClone.querySelector(".task-item");

  $taskItem.dataset.id = task.id;
  $taskItem.classList.toggle("active", task.completed);

  $taskClone.querySelector(".task-item__details--name").textContent = task.name;

  $taskClone.querySelector(".task-item__category--icon").textContent =
    taskCategoryIcons[task.category];

  $taskClone.querySelector(".task-item__details--sessions").textContent =
    task.completed
      ? "Done"
      : `Sessions:  ${task.completedSessions}/${task.sessions}`;

  $taskClone.querySelector('[data-action="drag"]').draggable = true;

  return $taskClone;
}

export function finishSession(taskId) {
  const task = store.getTaskById(taskId);
  task.completedSessions++;
  if (task.completedSessions === task.sessions) {
    task.completed = true;
  }
  store.updateTask(task);
  const tasks = store.getTasks();
  renderTaskList(tasks);
}
