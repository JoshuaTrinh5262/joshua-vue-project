const kanbanData = [
  {
    title: "To Do",
    tasks: [
      { id: 1, title: "Add discount code to checkout page", created_at: "Sep 14, 2024", code: "DEMO-01", priority: "medium", status: "to_do", assiged_to: "Bob" },
      { id: 2, title: "Provide documentation on integrations", created_at: "Sep 12, 2024", code: "DEMO-02", priority: "critical", status: "to_do", assiged_to: "Bob" },
      { id: 3, title: "high shopping cart dropdown", created_at: "Sep 9, 2024", code: "DEMO-03", priority: "high", status: "to_do", assiged_to: "Bob" },
      { id: 4, title: "Test checkout flow", created_at: "Sep 15, 2024", code: "DEMO-04", priority: "low", status: "to_do", assiged_to: "Bob" },
      { id: 4, title: "Test shopping cart dropdown", created_at: "Sep 15, 2024", code: "DEMO-05", priority: "low", status: "to_do", assiged_to: "Bob" },
    ],
  },
  {
    title: "In Progress",
    tasks: [
      { id: 5, title: "Test checkout flow", created_at: "Sep 15, 2024", code: "DEMO-06", priority: "low", status: "in_progress", assiged_to: "Bob" },
      { id: 6, title: "high shopping cart dropdown", created_at: "Sep 9, 2024", code: "DEMO-07", priority: "high", status: "in_progress", assiged_to: "Bob" },
      { id: 7, title: "Add discount code to checkout page", created_at: "Sep 14, 2024", code: "DEMO-08", priority: "medium", status: "in_progress", assiged_to: "Bob" },
      { id: 8, title: "high shopping cart dropdown", created_at: "Sep 13, 2024", code: "DEMO-09", priority: "high", status: "in_progress", assiged_to: "Bob" },
      { id: 9, title: "Add discount code to checkout page", created_at: "Sep 11, 2024", code: "DEMO-10", priority: "medium", status: "in_progress", assiged_to: "Bob" },
    ],
  },
  {
    title: "Review",
    tasks: [
      { id: 10, title: "Provide documentation on integrations", created_at: "Sep 11, 2024", code: "DEMO-11", priority: "high", status: "review", assiged_to: "Bob" },
      { id: 11, title: "high shopping cart dropdown", created_at: "Sep 11, 2024", code: "DEMO-12", priority: "high", status: "review", assiged_to: "Bob" },
    ],
  },
  {
    title: "Testing",
    tasks: [
      { id: 18, title: "Provide documentation on integrations", created_at: "Sep 12, 2024", code: "DEMO-13", priority: "high", status: "testing", assiged_to: "Bob" },
      { id: 19, title: "high shopping cart dropdown", created_at: "Sep 9, 2024", code: "DEMO-14", priority: "high", status: "testing", assiged_to: "Bob" },
    ],
  },
  {
    title: "Done",
    tasks: [
      { id: 14, title: "Add discount code to checkout page", created_at: "Sep 14, 2024", code: "DEMO-15", priority: "medium", status: "done", assiged_to: "Bob" },
      { id: 20, title: "Add discount code to checkout page 2", created_at: "Sep 11, 2024", code: "DEMO-15", priority: "medium", status: "done", assiged_to: "Bob" },
    ],
  },
];

export default kanbanData;
