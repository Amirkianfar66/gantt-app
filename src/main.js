import Gantt from "frappe-gantt";
import "./frappe-gantt.css";

const ROW_HEIGHT = 35;

// Initial tasks
let tasks = [
    { id: "Task1", name: "Redesign Website", start: "2025-08-01", end: "2025-08-10", progress: 30, person: "Alice" },
    { id: "Task2", name: "Develop Backend", start: "2025-08-11", end: "2025-08-20", progress: 50, dependencies: "Task1", person: "Bob" }
];

const ganttContainer = document.getElementById("gantt");
const taskTableBody = document.querySelector("#task-table-inner tbody");

// Render the left-hand task table
function renderTaskTable() {
    taskTableBody.innerHTML = "";
    tasks.forEach(task => {
        const row = document.createElement("tr");
        row.style.height = ROW_HEIGHT + "px";
        row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.person}</td>
      <td>${task.start}</td>
      <td>${task.end}</td>
      <td>${task.progress}%</td>
    `;
        taskTableBody.appendChild(row);
    });
}

// Render the Gantt chart
function renderGantt() {
    ganttContainer.innerHTML = "";
    new Gantt(ganttContainer, tasks, {
        view_mode: "Day",
        date_format: "YYYY-MM-DD",
        row_height: ROW_HEIGHT,
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

// Render both table and Gantt
function renderAll() {
    renderTaskTable();
    renderGantt();
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    renderAll();
});

// Handle Add Task form
document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("task-name").value;
    const person = document.getElementById("task-person").value;
    const start = document.getElementById("task-start").value;
    const end = document.getElementById("task-end").value;
    const progressInput = document.getElementById("task-progress").value;
    const progress = progressInput ? Math.min(Math.max(parseInt(progressInput), 0), 100) : 0;
    const id = "Task" + (tasks.length + 1);

    tasks.push({ id, name, start, end, progress, person });
    renderAll();
    this.reset();
});
