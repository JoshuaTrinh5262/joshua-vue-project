const kanbanData = [
  {
    title: "To Do",
    tasks: [
      { id: 1, title: "Add discount code to checkout page", date: "Sep 14", task_priority: "medium", assiged_to: "Bob" },
      { id: 2, title: "Provide documentation on integrations", date: "Sep 12", task_priority: "critical", assiged_to: "Bob" },
      { id: 3, title: "high shopping cart dropdown", date: "Sep 9", task_priority: "high", assiged_to: "Bob" },
      { id: 4, title: "Test checkout flow", date: "Sep 15", task_priority: "low", assiged_to: "Bob" },
      { id: 4, title: "Test shopping cart dropdown", date: "Sep 15", task_priority: "low", assiged_to: "Bob" },
    ],
  },
  {
    title: "In Progress",
    tasks: [
      { id: 5, title: "Test checkout flow", date: "Sep 15", task_priority: "low", assiged_to: "Bob" },
      { id: 6, title: "high shopping cart dropdown", date: "Sep 9", task_priority: "high", assiged_to: "Bob" },
      { id: 7, title: "Add discount code to checkout page", date: "Sep 14", task_priority: "medium", assiged_to: "Bob" },
      { id: 8, title: "high shopping cart dropdown", date: "Sep 13", task_priority: "high", assiged_to: "Bob" },
      { id: 9, title: "Add discount code to checkout page", date: "Sep 11", task_priority: "medium", assiged_to: "Bob" },
    ],
  },
  {
    title: "Review",
    tasks: [
      { id: 10, title: "Provide documentation on integrations", date: "Sep 12", task_priority: "high", assiged_to: "Bob" },
      { id: 11, title: "high shopping cart dropdown", date: "Sep 9", task_priority: "high", assiged_to: "Bob" },
    ],
  },
  {
    title: "Testing",
    tasks: [
      { id: 18, title: "Provide documentation on integrations", date: "Sep 12", assiged_to: "Bob" },
      { id: 19, title: "high shopping cart dropdown", date: "Sep 9", task_priority: "high", assiged_to: "Bob" },
    ],
  },
  {
    title: "Done",
    tasks: [
      { id: 14, title: "Add discount code to checkout page", date: "Sep 14", task_priority: "medium", assiged_to: "Bob" },
    ],
  },
];

export default kanbanData;
