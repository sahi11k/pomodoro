const $taskItemTemplate = document.querySelector("#task-item-template");

export function renderTasks($taskContainer, tasks) {
  const tempWrapper = document.createDocumentFragment();
  tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    tempWrapper.appendChild(taskItem);
  });
  $taskContainer.appendChild(tempWrapper);
}

function createTaskItem(task) {
  const clone = $taskItemTemplate.content.cloneNode(true);
  // more config here
  clone.querySelector(".task-name").textContent = task.name;
  return clone;
}
