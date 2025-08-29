import Gantt from "frappe-gantt";
import "./frappe-gantt.css";

let tasks = [
    { id: "Task1", name: "Redesign Website", start: "2025-08-01", end: "2025-08-10", progress: 30, person: "Alice" },
    { id: "Task2", name: "Develop Backend", start: "2025-08-11", end: "2025-08-20", progress: 50, dependencies: "Task1", person: "Bob" }
];

const ganttContainer = document.getElementById("gantt");
const taskTableBody = document.querySelector("#task-table-inner tbody");

function renderTaskTable() {
    taskTableBody.innerHTML = "";
    tasks.forEach(task => {
        const row = document.createElement("tr");
        row.style.height = "35px"; // match Gantt row height
        row.innerHTML = `<td>${task.name}</td><td>${task.person}</td>`;
        taskTableBody.appendChild(row);
    });
}

function renderGanttAndTasks() {
    ganttContainer.innerHTML = "";
    const gantt = new Gantt(ganttContainer, tasks, {
        view_mode: "Day",
        date_format: "YYYY-MM-DD",
        row_height: 35, // same as table row height
        on_render: () => renderTaskTable(),
        custom_popup_html: task => `
      <div style="padding:10px;">
        <h5>${task.name}</h5>
        <p><strong>Assigned to:</strong> ${task.person}</p>
        <p><strong>Start:</strong> ${task.start}</p>
        <p><strong>End:</strong> ${task.end}</p>
        <p><strong>Progress:</strong> ${task.progress}%</p>
      </div>
    `
    });
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(renderGanttAndTasks, 50);
});

// Add task
document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("task-name").value;
    const person = document.getElementById("task-person").value;
    const start = document.getElementById("task-start").value;
    const end = document.getElementById("task-end").value;
    const id = "Task" + (tasks.length + 1);

    tasks.push({ id, name, start, end, progress: 0, person });
    renderGanttAndTasks();
    this.reset();
});
