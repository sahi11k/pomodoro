import { initTaskModal } from "./addTaskModal.js";
import { initDailyProgress } from "./dailyProgress.js";
import store from "./store.js";
import { initTasks, renderTaskList } from "./tasks.js";
import { initTimer } from "./timer.js";

function init() {
  initTasks(store);
  initDailyProgress(store);

  // initTaskModal();

  // initTaskModal();

  // initTimer();
}

init();
