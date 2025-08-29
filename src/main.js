import Gantt from "frappe-gantt";
import "frappe-gantt/dist/frappe-gantt.css";

let tasks = [
    { id: "Task1", name: "Redesign Website", start: "2025-08-01", end: "2025-08-10", progress: 30, person: "Alice" },
    { id: "Task2", name: "Develop Backend", start: "2025-08-11", end: "2025-08-20", progress: 50, dependencies: "Task1", person: "Bob" }
];

const ganttContainer = document.getElementById("gantt");
const tableBody = document.querySelector("#task-table tbody");

function renderGantt() {
    ganttContainer.innerHTML = "";
    new Gantt(ganttContainer, tasks, {
        view_mode: "Day",
        date_format: "YYYY-MM-DD",
        custom_popup_html: task => `
      <div style="padding:10px;">
        <h5>${task.name}</h5>
        <p><strong>Assigned to:</strong> ${task.person || "Unassigned"}</p>
        <p><strong>Start:</strong> ${task.start}</p>
        <p><strong>End:</strong> ${task.end}</p>
        <p><strong>Progress:</strong> ${task.progress}%</p>
      </div>
    `
    });
}

function renderTable() {
    tableBody.innerHTML = "";
    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.person}</td>
      <td>${task.start}</td>
      <td>${task.end}</td>
      <td>${task.progress}%</td>
      <td><button class="delete-btn" data-index="${index}">×</button></td>
    `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const i = e.target.dataset.index;
            tasks.splice(i, 1);
            renderAll();
        });
    });
}

function renderAll() {
    renderGantt();
    renderTable();
}

// Initial render
document.addEventListener("DOMContentLoaded", renderAll);

// Form submission
document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("task-name").value;
    const person = document.getElementById("task-person").value;
    const start = document.getElementById("task-start").value;
    const end = document.getElementById("task-end").value;
    const id = "Task" + (tasks.length + 1);

    tasks.push({ id, name, start, end, progress: 0, person });
    renderAll();
    this.reset();
});
