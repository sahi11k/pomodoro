(() => {
  const taskList = document.getElementById("task-list");
  let tasks = [
    {
      id: 1,
      name: "Task 1",
      description: "Description 1",
      completed: false,
      category: "Work",
      sessions: 1,
    },
    {
      id: 2,
      name: "Task 2",
      description: "Description 2",
      completed: false,
      category: "Work",
      sessions: 1,
    },
    {
      id: 3,
      name: "Task 3",
      description: "Description 3",
      completed: false,
      category: "Work",
      sessions: 1,
    },
  ];

  function init() {
    renderTasks();
  }

  function renderTasks() {
    const tempWrapper = document.createDocumentFragment();
    tasks.forEach((task) => {
      const taskItem = createTaskItem(task);
      tempWrapper.appendChild(taskItem);
    });
    taskList.appendChild(tempWrapper);
  }

  function createTaskItem(task) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
  }
})();
