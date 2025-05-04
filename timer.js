let activeTab = "ongoing";
let TASK_TIME = 25 * 60;
let BREAK_TIME = 1 * 10;
let duration = TASK_TIME;
let intervalId;
const $tabHeader = document.querySelector(".activity-header-tabs");

export function initTimer() {
  const $timerStartBtn = document.querySelector(".timer-button--start");

  $timerStartBtn.addEventListener("click", startTimer);

  changeActiveTab(activeTab);
  updateTimer(duration);

  $tabHeader.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      clearInterval(intervalId);
      activeTab = e.target.dataset.tab;
      duration = activeTab === "ongoing" ? TASK_TIME : BREAK_TIME;
      changeActiveTab(activeTab);
      updateTimer(duration);
    }
  });
}

function startTimer(e) {
  let remainingTime = duration;

  intervalId = setInterval(() => {
    remainingTime--;
    updateTimer(remainingTime);
  }, 1000);
}

function changeActiveTab(activeTab) {
  for (const $tab of $tabHeader.children) {
    $tab.classList.toggle("active", $tab.dataset.tab === activeTab);
  }
}

function updateTimer(remainingTime) {
  if (remainingTime < 0) {
    clearInterval(intervalId);
    return;
  }

  const $timerDisplayTime = document.querySelector(".timer-display-time");
  const $timerDisplayProgress = document.querySelector(
    ".timer-display-progress-bar"
  );

  const formattedTime = getFormattedTime(remainingTime);
  $timerDisplayTime.textContent = formattedTime;
  $timerDisplayProgress.style.setProperty(
    "--progress",
    getProgressPercentage(remainingTime)
  );
}

function getFormattedTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function getProgressPercentage(remainingTime) {
  return ((duration - remainingTime) / duration) * 100;
}
