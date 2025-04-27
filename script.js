import { initTaskModal } from "./addTaskModal.js";
import { tasks } from "./data.js";
import { renderTaskList } from "./taskList.js";

const $taskList = document.querySelector("#task-list");

function init() {
  renderTaskList($taskList, tasks);
  initTaskModal();
}

init();
