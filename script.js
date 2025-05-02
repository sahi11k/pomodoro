import { initTaskModal } from "./addTaskModal.js";
import store from "./store.js";
import { renderTaskList } from "./taskList.js";

function init() {
  renderTaskList(store.getTasks());
  initTaskModal();
}

init();
