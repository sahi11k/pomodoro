import { icons } from "./constants.js";

let TASK_TIME = 25 * 60;
let BREAK_TIME = 1 * 60;

let activeTab = "ongoing";
let duration = TASK_TIME;
let intervalId;
const $tabNav = document.querySelector(".tab-nav");

export function initTimer(store) {
  const tasks = store.getTasks();
  const currentTask = tasks.find((task) => !task.completed);
  const $timerControls = document.querySelector(".timer-controls");

  updateCurrentTask(currentTask);
  $tabNav.addEventListener("click", onTabChange);
  $timerControls.addEventListener("click", onTimerControlsClick);
}

function onTimerControlsClick(e) {
  const $target = e.target.closest(".timer-controls__item");
  if (!$target) return;
  const action = $target.dataset.action;

  switch (action) {
    case "reset":
      resetTimer();
      break;
    case "start":
      startTimer($target);
      break;
    case "stop":
      stopTimer($target);
      break;
    case "next":
      skipTimer();
      break;
    default:
      break;
  }
}

function startTimer($target) {
  let remainingTime = duration;

  intervalId = setInterval(() => {
    remainingTime--;
    updateTimer(remainingTime);
  }, 1000);

  $target.querySelector(".btn__icon").innerHTML = icons.stop;
  $target.querySelector(".btn__label").textContent = "Stop";
  $target.dataset.action = "stop";
}

function stopTimer($target) {
  clearInterval(intervalId);
  $target.querySelector(".btn__icon").innerHTML = icons.play;
  $target.querySelector(".btn__label").textContent = "Start";
  $target.dataset.action = "start";
}

function resetTimer() {
  clearInterval(intervalId);
  duration = activeTab === "ongoing" ? TASK_TIME : BREAK_TIME;
  updateTimer(duration);
}

function skipTimer() {
  clearInterval(intervalId);
  activeTab = activeTab === "ongoing" ? "break" : "ongoing";
  duration = activeTab === "ongoing" ? TASK_TIME : BREAK_TIME;
  updateTimer(duration);
  changeActiveTab(activeTab);
}

function onTabChange(e) {
  const $target = e.target.closest(".tab-nav__item");
  if ($target) {
    clearInterval(intervalId);
    activeTab = $target.dataset.tab;
    duration = activeTab === "ongoing" ? TASK_TIME : BREAK_TIME;
    changeActiveTab(activeTab);
    updateTimer(duration);
  }
}

function changeActiveTab(activeTab) {
  for (const $tab of $tabNav.children) {
    $tab.classList.toggle("active", $tab.dataset.tab === activeTab);
  }
}

function updateTimer(remainingTime) {
  if (remainingTime < 0) {
    clearInterval(intervalId);
    return;
  }

  const $timerValue = document.querySelector(".timer__value");
  const $timerProgressBar = document.querySelector(".timer__progress-bar");

  const formattedTime = getFormattedTime(remainingTime);
  $timerValue.textContent = formattedTime;
  $timerProgressBar.style.setProperty(
    "--progress",
    getProgressPercentage(remainingTime)
  );
}

function getProgressPercentage(remainingTime) {
  return ((duration - remainingTime) / duration) * 100;
}

function getFormattedTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function updateCurrentTask(task) {
  const $currentTask = document.querySelector(".current-task");
  $currentTask.textContent = task.name;
}
