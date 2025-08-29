import Gantt from "frappe-gantt";
import "./frappe-gantt.css";

let tasks = [
    { id: "Task1", name: "Redesign Website", start: "2025-08-01", end: "2025-08-10", progress: 30, person: "Alice" },
    { id: "Task2", name: "Develop Backend", start: "2025-08-11", end: "2025-08-20", progress: 50, dependencies: "Task1", person: "Bob" }
];

const ganttContainer = document.getElementById("gantt");
const taskListContainer = document.getElementById("task-list");

function renderTaskList(gantt) {
    taskListContainer.innerHTML = "";
    tasks.forEach(task => {
        const bar = ganttContainer.querySelector(`.bar[task_id="${task.id}"]`);
        if (bar) {
            const y = bar.getBoundingClientRect().top - ganttContainer.getBoundingClientRect().top;
            const div = document.createElement("div");
            div.className = "task-item";
            div.style.top = y + "px";
            div.textContent = task.name + " (" + task.person + ")";
            taskListContainer.appendChild(div);
        }
    });
}

function renderGanttAndTasks() {
    ganttContainer.innerHTML = "";
    const gantt = new Gantt(ganttContainer, tasks, {
        view_mode: "Day",
        date_format: "YYYY-MM-DD",
        on_render: () => renderTaskList(gantt),
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
document.addEventListener("DOMContentLoaded", renderGanttAndTasks);

// Task creation
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
