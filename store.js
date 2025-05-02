export default {
  tasks: [
    {
      id: 1,
      name: "Task 1",
      description: "Description 1",
      category: "work",
      sessions: 1,
      completed: false,
    },
    {
      id: 2,
      name: "Task 2",
      description: "Description 2",
      category: "learn",
      sessions: 2,
      completed: false,
    },
  ],
  elements: {
    $taskListContainer: document.querySelector("#task-list"),
  },
  getTasks() {
    return this.tasks;
  },
  addTask(task) {
    this.tasks.push(task);
  },
  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  },
};
