import Gantt from "frappe-gantt";
import "./frappe-gantt.css";

document.addEventListener("DOMContentLoaded", () => {

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
        <td contenteditable="true" data-field="name">${task.name}</td>
        <td contenteditable="true" data-field="person">${task.person}</td>
        <td contenteditable="true" data-field="start">${task.start}</td>
        <td contenteditable="true" data-field="end">${task.end}</td>
        <td contenteditable="true" data-field="progress">${task.progress}</td>
        <td><button class="delete-btn">X</button></td>
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

    // Add Task via form
    const taskForm = document.getElementById("task-form");
    taskForm.addEventListener("submit", e => {
        e.preventDefault();

        const name = document.getElementById("task-name").value.trim();
        const person = document.getElementById("task-person").value.trim();
        const start = document.getElementById("task-start").value;
        const end = document.getElementById("task-end").value;
        const progress = parseInt(document.getElementById("task-progress").value) || 0;

        const newTaskId = "Task" + (tasks.length + 1);

        tasks.push({ id: newTaskId, name, person, start, end, progress });

        renderAll();

        taskForm.reset();
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
});
