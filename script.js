import { tasks } from "./data.js";
import { renderTasks } from "./taskList.js";

const $taskList = document.querySelector("#task-list");

function init() {
  renderTasks($taskList, tasks);
}

init();
