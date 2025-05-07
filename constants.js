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

export const MAX_SESSIONS = 6;
export const MIN_SESSIONS = 1;

export const icons = {
  play: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Z"/></svg>`,
  stop: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-240v-480h480v480H240Z"/></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"/></svg>`,
  delete: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>`,
};
