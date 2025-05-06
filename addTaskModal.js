import { MAX_SESSIONS, MIN_SESSIONS, taskCategories } from "./constants.js";
import store from "./store.js";
import { getTemplate } from "./utils.js";
import { renderTaskList } from "./tasks.js";
const taskTemplate = `<div class="form-item__category--item" ><div class="form-item__category--item-icon"></div><div class="form-item__category--item-name"></div></div>`;

const $modal = document.querySelector("#add-task-modal");
const $modalOverlay = document.querySelector(".modal-overlay");
const $taskCategoryList = document.querySelector(".form-item__category--list");
const $taskCategoryTemplate = getTemplate(taskTemplate);
const $form = document.querySelector("#add-task-form");
let listenersAttached = false;

export function initTaskModal() {
  const $addTaskModalHandler = document.querySelector(
    "#add-task-modal-handler"
  );

  $addTaskModalHandler.addEventListener("click", () => {
    $modalOverlay.appendChild($modal);
    $modalOverlay.classList.add("show-modal");
    $modal.showModal();
    renderTaskModal();
  });
}

export function renderTaskModal() {
  removeErrors();
  renderTaskCategoryList();
  attachEventListeners();
}

function removeErrors() {
  const $errors = document.querySelectorAll(".error");
  $errors.forEach((error) => {
    error.remove();
  });
}

function attachEventListeners() {
  document.querySelector("input").focus();

  if (!listenersAttached) {
    const $cancelBtn = document.querySelector(".modal-button__cancel");
    const $submitBtn = document.querySelector(".modal-button__primary");
    const $sessionControls = document.querySelector(
      ".form-item__sessions--controls"
    );

    $taskCategoryList.addEventListener("click", onCategoryChange);
    $cancelBtn.addEventListener("click", closeModal);
    $submitBtn.addEventListener("click", onSubmit);
    $sessionControls.addEventListener("click", onSessionChange);
    listenersAttached = true;
  }
}

function onSessionChange(e) {
  const $target = e.target;
  if ($target.nodeName === "BUTTON") {
    let totalSessions = Number.parseInt(
      $form.getAttribute("data-sessions") || MIN_SESSIONS
    );
    totalSessions =
      $target.id === "decrement-session"
        ? Math.max(MIN_SESSIONS, totalSessions - 1)
        : Math.min(MAX_SESSIONS, totalSessions + 1);

    $form.dataset.sessions = totalSessions;
    document.querySelector(".session-count").textContent = totalSessions;
  }
}

function onCategoryChange(e) {
  const $target = e.target.closest(".form-item__category--item");
  if ($target) {
    const categoryId = $target.dataset.id;
    $form.dataset.category = categoryId;
    renderTaskCategoryList(categoryId);
  }
}

function closeModal() {
  resetForm();
  $modal.close();
  $modalOverlay.removeChild($modal);
  $modalOverlay.classList.remove("show-modal");
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
  };

  const isValid = validateTask(task);
  return isValid ? task : null;
}

function validateTask(task) {
  if (!task.name || task.name.trim() === "") {
    addError("Please enter valid task name", "name");
    return false;
  }
  if (!task.category) {
    addError("Please select a category", "category");
    return false;
  }
  return true;
}

function addError(errorMessage, field) {
  const $target = document.querySelector(`.form-item__${field}`);

  if ($target.querySelector(".error")) {
    return;
  }

  const $error = document.createElement("div");
  $error.classList.add("error");
  $error.textContent = errorMessage;
  $target.appendChild($error);
}

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
    ".form-item__category--item"
  );
  $taskCategoryItemElement.dataset.id = taskCategory.id;

  $taskCategoryItemElement.classList.toggle(
    "form-item__category--item--active",
    taskCategory.id === activeCategory
  );

  $taskCategoryItem.querySelector(
    ".form-item__category--item-icon"
  ).textContent = taskCategory.icon;
  $taskCategoryItem.querySelector(
    ".form-item__category--item-name"
  ).textContent = taskCategory.name;

  return $taskCategoryItem;
}
