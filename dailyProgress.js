export function initDailyProgress(store) {
  const tasks = store.getTasks();

  const totalCount = tasks.length;
  const completedCount = getCompletedTasksCount(tasks);

  updateTaskCompletionLabel({ completedCount, totalCount });
  updateProgress({ completedCount, totalCount });
  setCurrentDay();
}

function updateTaskCompletionLabel({ completedCount, totalCount }) {
  const $taskCompletionLabel = document.querySelector(
    ".daily-progress-pending__label"
  );
  $taskCompletionLabel.textContent = `${completedCount}/${totalCount}`;
}

function setCurrentDay() {
  const $currentDayEl = document.querySelector(".current-time");
  const updateCurrentDay = () => {
    $currentDayEl.textContent = getFormattedTime();
  };
  window.setInterval(updateCurrentDay, 1000);
  updateCurrentDay();
}

function updateProgress({ completedCount, totalCount }) {
  const $progressWidget = document.querySelector(".daily-progress__widget");
  const $progressValue = document.querySelector(
    ".daily-progress__widget__value"
  );

  const completedTasksPercentage = (completedCount / totalCount) * 100;

  $progressValue.textContent = `${completedTasksPercentage}%`;

  const angle = (completedTasksPercentage / 100) * 360;
  $progressWidget.style.setProperty("--progress", `${angle}deg`);
}

function getCompletedTasksCount(tasks = []) {
  return tasks.filter((task) => task.completed).length;
}

function getFormattedTime() {
  return new Date().toLocaleString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
