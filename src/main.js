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

// Zoom levels
const viewModes = ["Hour", "Day", "Week", "Month", "Quarter"];
let currentViewIndex = 1; // default "Day"

// Render Gantt chart
function renderGantt() {
    ganttContainer.innerHTML = "";
    new Gantt(ganttContainer, tasks, {
        view_mode: viewModes[currentViewIndex],
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

// Render task table
function renderTaskTable() {
    taskTableBody.innerHTML = "";

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");
        row.style.height = ROW_HEIGHT + "px";

        row.innerHTML = `
      <td contenteditable="true" data-field="name" style="font-size:12px;">${task.name}</td>
      <td contenteditable="true" data-field="person" style="font-size:12px;">${task.person}</td>
      <td contenteditable="true" data-field="start" style="font-size:12px;">${task.start}</td>
      <td contenteditable="true" data-field="end" style="font-size:12px;">${task.end}</td>
      <td contenteditable="true" data-field="progress" style="font-size:12px;">${task.progress}</td>
      <td><button class="delete-btn" style="font-size:12px;">X</button></td>
    `;

        // Editable cells
        row.querySelectorAll("td[contenteditable='true']").forEach(td => {
            td.addEventListener("blur", () => {
                const field = td.dataset.field;
                let value = td.innerText.trim();

                if (field === "progress") {
                    value = Math.min(Math.max(parseInt(value) || 0, 0), 100);
                }

                tasks[index][field] = value;
                renderGantt();
            });
        });

        // Delete task
        row.querySelector(".delete-btn").addEventListener("click", () => {
            tasks.splice(index, 1);
            renderAll();
        });

        taskTableBody.appendChild(row);
    });
}

// Render both table + Gantt
function renderAll() {
    renderTaskTable();
    renderGantt();
}

// Add Task
document.getElementById("add-task").addEventListener("click", () => {
    const newTaskId = "Task" + (tasks.length + 1);
    tasks.push({
        id: newTaskId,
        name: "New Task",
        start: new Date().toISOString().slice(0, 10),
        end: new Date().toISOString().slice(0, 10),
        progress: 0,
        person: ""
    });
    renderAll();
});

// Zoom controls
document.getElementById("zoom-in").addEventListener("click", () => {
    if (currentViewIndex > 0) {
        currentViewIndex--;
        renderGantt();
    }
});

document.getElementById("zoom-out").addEventListener("click", () => {
    if (currentViewIndex < viewModes.length - 1) {
        currentViewIndex++;
        renderGantt();
    }
});

// Initial render
renderAll();
