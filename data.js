export const tasks = [
  {
    id: 1,
    name: "Washing Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    description: "Description 1",
    completed: false,
    category: "work",
    sessions: 1,
  },
  {
    id: 2,
    name: "Playing Valorant",
    description: "Description 2",
    completed: true,
    category: "play",
    sessions: 1,
  },
  {
    id: 3,
    name: "Playing  2",
    description: "Description 3",
    completed: false,
    category: "play",
    sessions: 1,
  },
  {
    id: 4,
    name: "Washing Dishes",
    description: "Description 1",
    completed: false,
    category: "work",
    sessions: 1,
  },
  {
    id: 5,
    name: "Playing Valorant",
    description: "Description 2",
    completed: true,
    category: "fitness",
    sessions: 1,
  },
  {
    id: 6,
    name: "Playing  2",
    description: "Description 3",
    completed: false,
    category: "learn",
    sessions: 1,
  },
  {
    id: 1,
    name: "Washing Dishes",
    description: "Description 1",
    completed: false,
    category: "others",
    sessions: 1,
  },
  {
    id: 2,
    name: "Playing Valorant",
    description: "Description 2",
    completed: true,
    category: "read",
    sessions: 1,
  },

  {
    id: 5,
    name: "Playing Valorant",
    description: "Description 2",
    completed: false,
    category: "read",
    sessions: 1,
  },
];

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
