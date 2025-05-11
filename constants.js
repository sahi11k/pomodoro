export const taskCategoryIcons = {
  work: "💼",
  play: "🎮",
  learn: "📚",
  others: "🗂️",
  read: "📖",
  fitness: "🏃‍♂️",
};

export const taskCategories = {
  work: { id: "work", name: "Work", icon: taskCategoryIcons.work },
  learn: { id: "learn", name: "Learn", icon: taskCategoryIcons.learn },
  fitness: { id: "fitness", name: "Fitness", icon: taskCategoryIcons.fitness },
  play: { id: "play", name: "Play", icon: taskCategoryIcons.play },
  read: { id: "read", name: "Read", icon: taskCategoryIcons.read },
  others: { id: "others", name: "Others", icon: taskCategoryIcons.others },
};

export const MAX_SESSIONS = 10;
export const MIN_SESSIONS = 1;

export const ICON_PLAY = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Z"/></svg>`;

export const ICON_STOP = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-240v-480h480v480H240Z"/></svg>`;

export const EDIT = "edit";
export const CREATE = "create";
