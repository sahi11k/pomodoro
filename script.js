import { initTaskModal } from "./addTaskModal.js";
import { initDailyProgress } from "./dailyProgress.js";
import store from "./store.js";
import { renderTaskList } from "./taskList.js";

function init() {
  renderTaskList(store.getTasks());
  initTaskModal();
  initDailyProgress(store.getTasks());
}

init();
