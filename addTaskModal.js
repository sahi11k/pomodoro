import { taskCategories } from "./data.js";
import { getTemplate } from "./utils.js";

const taskTemplate = `<div class="form-item__category--item" ><div class="form-item__category--item-icon"></div><div class="form-item__category--item-name"></div></div>`;

const $modal = document.querySelector("#add-task-modal");
const $modalOverlay = document.querySelector(".modal-overlay");
const $taskCategoryList = document.querySelector(".form-item__category--list");
const $taskCategoryTemplate = getTemplate(taskTemplate);
const $form = document.querySelector("#add-task-form");

let formData = {
  name: "",
  description: "",
  category: "",
  sessions: 0,
  completed: false,
};

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
  renderTaskCategoryList();
  attachEventListeners();
}

function attachEventListeners() {
  const $cancelBtn = document.querySelector(".modal-button__cancel");
  const $submitBtn = document.querySelector(".modal-button__primary");

  $taskCategoryList.addEventListener("click", onCategoryChange);
  $cancelBtn.addEventListener("click", closeModal);
  $submitBtn.addEventListener("click", onSubmit);
}

function onCategoryChange(e) {
  const $target = e.target.closest(".form-item__category--item");
  if ($target) {
    const categoryId = $target.dataset.id;

    for (const child of $taskCategoryList.children) {
      child.classList.toggle("active", categoryId === child.dataset.id);
    }

    $form.categoryId = categoryId;
  }
}

function closeModal() {
  $modal.close();
  $modalOverlay.removeChild($modal);
  $modalOverlay.classList.remove("show-modal");
}

function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData($form);
  const task = Object.fromEntries(formData);
  console.info(task);
}

function renderTaskCategoryList() {
  if ($taskCategoryList.children.length) {
    return;
  }

  const $taskCategoryFragment = document.createDocumentFragment();

  Object.entries(taskCategories).forEach(([_, taskCategory]) => {
    const $taskCategoryItem = createTaskCategoryItem(taskCategory);
    $taskCategoryFragment.appendChild($taskCategoryItem);
  });

  $taskCategoryList.appendChild($taskCategoryFragment);
}

function createTaskCategoryItem(taskCategory) {
  const $taskCategoryItem = $taskCategoryTemplate.content.cloneNode(true);

  $taskCategoryItem.querySelector(".form-item__category--item").dataset.id =
    taskCategory.id;

  $taskCategoryItem.querySelector(
    ".form-item__category--item-icon"
  ).textContent = taskCategory.icon;
  $taskCategoryItem.querySelector(
    ".form-item__category--item-name"
  ).textContent = taskCategory.name;

  return $taskCategoryItem;
}
