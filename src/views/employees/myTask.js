import { projectService } from "../../services/services.js";


export function createEmployeeTasksView(tasks) {
    let view = `
        <div class="container">
            <h1>My Assigned Tasks</h1>
            <table class="manager-table">
                <thead>
                    <tr>
                       <th>Task</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
    `;

    if (tasks.length === 0) {
        view += `<tr><td colspan="5" style="text-align:center;">You have no pending tasks. Good job!</td></tr>`;
    } else {
        tasks.forEach(task => {
            view += `
                <tr>
                    <td>${task.title}</td>
                    <td>${task.priority}</td>
                    <td>${task.date}</td>
                    <td><span class="status-${task.status.toLowerCase()}">${task.status}</span></td>
                    <td>
                        <button class="btn-done" data-id="${task.id}">Finish</button>
                    </td>
                </tr>
            `;
        });
    }

    return view + `</tbody></table></div>`;
}

export function createEmployeeTasksLogic() {
    const table = document.querySelector(".manager-table");
    if (!table) return;

    table.addEventListener("click", async (e) => {
        if (e.target.classList.contains("btn-done")) {
            const id = e.target.getAttribute("data-id");

            // We obtain the current data so as not to lose the description, date, etc.
            const task = await projectService.getTaskById(id);

            const taskUpdated = {
                ...task, // creates a shallow copy of the task object.
                status: "Completed"
            };

            await projectService.putTask(id, taskUpdated);
            alert("Task completed successfully.");
            window.location.reload();
        }
    });
}

