import { taskCategories, MIN_SESSIONS, MAX_SESSIONS } from "./constants.js";
import store from "./store.js";
import { getTemplate } from "./utils.js";
import { renderTaskList } from "./tasks.js";

const taskTemplate = `<div class="category-list__item">
                        <div class="category-list__item-icon"></div>
                        <div class="category-list__item-label"></div>
                      </div>`;

const $modal = document.querySelector(".modal");
const $dialog = document.querySelector("#add-task-modal");

const $taskCategoryList = document.querySelector(".category-list");
const $taskCategoryTemplate = getTemplate(taskTemplate);
const $form = document.querySelector("#add-task-form");

let listenersAttached = false;

export function initTaskModal() {
  const $addTaskModalHandler = document.querySelector(
    "#add-task-modal-handler"
  );

  $addTaskModalHandler.addEventListener("click", showModal);
}

function showModal() {
  $modal.classList.add("show-modal");
  $dialog.showModal();
  renderTaskModal();
}

function closeModal() {
  resetForm();
  $dialog.close();
  $modal.classList.remove("show-modal");
}

export function renderTaskModal() {
  removeErrors();
  renderTaskCategoryList();
  attachEventListeners();
}

function attachEventListeners() {
  document.querySelector("input").focus();

  if (!listenersAttached) {
    const $cancelBtn = document.querySelector(".modal__button--cancel");
    const $submitBtn = document.querySelector(".modal__button--primary");
    const $sessionControls = document.querySelector(".session-controls");

    $taskCategoryList.addEventListener("click", onCategoryChange);
    $cancelBtn.addEventListener("click", closeModal);
    $submitBtn.addEventListener("click", onSubmit);
    $sessionControls.addEventListener("click", onSessionChange);
    listenersAttached = true;
  }
}

/**Category Functions */

function renderTaskCategoryList(activeCategory = null) {
  const $taskCategoryFragment = document.createDocumentFragment();

  Object.entries(taskCategories).forEach(([_, taskCategory]) => {
    const $taskCategoryItem = createTaskCategoryItem(
      taskCategory,
      activeCategory
    );
    $taskCategoryFragment.appendChild($taskCategoryItem);
  });
  $taskCategoryList.innerHTML = "";
  $taskCategoryList.appendChild($taskCategoryFragment);
}

function createTaskCategoryItem(taskCategory, activeCategory) {
  const $taskCategoryItem = $taskCategoryTemplate.content.cloneNode(true);

  const $taskCategoryItemElement = $taskCategoryItem.querySelector(
    ".category-list__item"
  );
  $taskCategoryItemElement.dataset.id = taskCategory.id;

  $taskCategoryItemElement.classList.toggle(
    "active",
    taskCategory.id === activeCategory
  );

  $taskCategoryItem.querySelector(".category-list__item-icon").textContent =
    taskCategory.icon;
  $taskCategoryItem.querySelector(".category-list__item-label").textContent =
    taskCategory.name;

  return $taskCategoryItem;
}

function onCategoryChange(e) {
  const $target = e.target.closest(".category-list__item");
  if ($target) {
    const categoryId = $target.dataset.id;
    $form.dataset.category = categoryId;
    renderTaskCategoryList(categoryId);
  }
}

/**Form Functions */

function onSubmit(e) {
  e.preventDefault();
  const task = createTaskItem();
  if (task) {
    store.addTask(task);
    renderTaskList(store.getTasks());
    closeModal();
  }
}

function resetForm() {
  $form.reset();
  $form.dataset.category = "";
  $form.dataset.sessions = MIN_SESSIONS;
  document.querySelector(".session-count").textContent = MIN_SESSIONS;
}

function createTaskItem() {
  removeErrors();
  let formData = new FormData($form);
  formData = Object.fromEntries(formData);

  const task = {
    id: store.tasks.length + 1,
    name: formData["task-name"],
    description: formData["task-description"],
    category: $form.dataset.category,
    sessions: Number.parseInt($form.dataset.sessions || MIN_SESSIONS),
    completed: false,
    completedSessions: 0,
  };

  const isValid = validateTask(task);
  return isValid ? task : null;
}

function validateTask(task) {
  if (!task.name || task.name.trim() === "") {
    addError("Please enter valid task name", "task-name");
    return false;
  }
  if (!task.category) {
    addError("Please select a category", "task-category");
    return false;
  }
  return true;
}

function addError(errorMessage, field) {
  const $target = document
    .querySelector(`[data-field="${field}"]`)
    .closest(".form__item");

  if ($target.querySelector(".error")) {
    return;
  }

  const $error = document.createElement("div");
  $error.classList.add("error");
  $error.textContent = errorMessage;
  $target.appendChild($error);
}

function removeErrors() {
  const $errors = document.querySelectorAll(".error");
  $errors.forEach((error) => {
    error.remove();
  });
}

/**Session Functions */
function onSessionChange(e) {
  const $target = e.target;
  if ($target.nodeName === "BUTTON") {
    let totalSessions = Number.parseInt(
      $form.getAttribute("data-sessions") || MIN_SESSIONS
    );
    totalSessions =
      $target.id === "session-controls--decrement"
        ? Math.max(MIN_SESSIONS, totalSessions - 1)
        : Math.min(MAX_SESSIONS, totalSessions + 1);

    $form.dataset.sessions = totalSessions;
    document.querySelector(".session-count").textContent = totalSessions;
  }
}
