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
    let currentViewIndex = 1;

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
        <td contenteditable="true" data-field="end">${task
