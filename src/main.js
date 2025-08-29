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

// Render left-hand task table (editable)
function renderTaskTable() {
    taskTableBody.innerHTML = "";

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.style.height = ROW_HEIGHT + "px";

        row.innerHTML = `
      <td contenteditable="true" data-field="name">${task.name}</td>
      <td contenteditable="true" data-field="person">${task.person}</td>
      <td contenteditable="true" data-field="start">${task.start}</td>
      <td contenteditable="true" data-field="end">${task.end}</td>
      <td contenteditable="true" data-field="progress">${task.progress}</td>
    `;

        // Update task when cell is edited
        row.querySelectorAll("td").forEach(td => {
            td.addEventListener("blur", () => {
                const field = td.dataset.field;
                let value = td.innerText.trim();

                // Progress validation
                if (field === "progress") {
                    value = Math.min(Math.max(parseInt(value) || 0, 0), 100);
                }

                tasks[index][field] = value;

                renderGantt(); // update chart
            });
        });

        taskTableBody.appendChild(row);
    });
}

// Render Gantt chart
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

// Render both table and chart
function renderAll() {
    renderTaskTable();
    renderGantt();
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    renderAll();
});

// Add new task via form
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
