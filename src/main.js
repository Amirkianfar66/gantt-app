import Gantt from "frappe-gantt";

const tasks = [
    {
        id: "Task1",
        name: "Redesign website",
        start: "2025-08-01",
        end: "2025-08-10",
        progress: 30,
        dependencies: ""
    },
    {
        id: "Task2",
        name: "Develop backend",
        start: "2025-08-11",
        end: "2025-08-20",
        progress: 50,
        dependencies: "Task1"
    }
];

new Gantt("#gantt", tasks, {
    view_mode: "Day",
    date_format: "YYYY-MM-DD",
    custom_popup_html: (task) => `
    <div class="details-container" style="padding:10px;">
      <h5>${task.name}</h5>
      <p>Ends: ${task.end}</p>
      <p>Progress: ${task.progress}%</p>
    </div>
  `
});
