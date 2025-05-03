export function initDailyProgress(tasks = []) {
  const $dailyProgressWidget = document.querySelector(".daily-progress-widget");
  const $taskCompletionLabel = document.querySelector(
    ".daily-progress-pending--label"
  );
  const $taskCompletionPercentageEl = document.querySelector(
    ".daily-progress-percent"
  );

  const $currentDayEl = document.querySelector(".current-time");

  window.setInterval(() => {
    $currentDayEl.textContent = getFormattedTime();
  }, 1000);

  const totalTasks = tasks.length;
  const completedTasks = getCompletedTasksCount(tasks);
  const completedTasksPercentage = (completedTasks / totalTasks) * 100;

  $taskCompletionLabel.textContent = `${completedTasks}/${totalTasks}`;
  $taskCompletionPercentageEl.textContent = `${completedTasksPercentage}%`;
  $currentDayEl.textContent = getFormattedTime();

  const angle = (completedTasksPercentage / 100) * 360;
  $dailyProgressWidget.style.setProperty("--progress", `${angle}deg`);
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
