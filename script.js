import { initTaskModal } from "./addTaskModal.js";
import { initDailyProgress } from "./dailyProgress.js";
import store from "./store.js";
import { renderTaskList } from "./taskList.js";
import { initTimer } from "./timer.js";

function init() {
  renderTaskList(store.getTasks());
  initTaskModal();
  initDailyProgress(store.getTasks());
  initTimer();
}

init();
