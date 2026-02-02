import { projectService } from "../../services/services.js";

export async function getTasksView(tasks) {
    const users = await projectService.getUsers();

    let view = `
        <div class="container">
            <h1>Task Control</h1>
            <table class="manager-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Assigned to</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
    `;

    tasks.forEach(task => {
        const assignedUser = users.find(u => u.id == task.userId);
        view += `
            <tr>
                <td>${task.title}</td>
                <td><strong>${assignedUser ? assignedUser.name : "unassigned"}</strong></td>
                <td>${task.status}</td>
                <td>${task.priority}</td>
                <td>${task.date}</td>
            </tr>
        `;
    });

    return view + `</tbody></table></div>`;
}

export function getTasksLogic() {
    const table = document.querySelector(".manager-table");
    if (!table) return;

    table.addEventListener("click", async (e) => {

        if (e.target.classList.contains("btn-delete")) {
            const id = e.target.getAttribute("data-id");

            if (e.target.classList.contains("btn-delete")) {
                const id = e.target.getAttribute("data-id");

                if (confirm("Are you sure you want to delete this task?")) {
                    try {
                        await projectService.deleteTask(id);
                        alert("Task deleted successfully.");
                        window.location.reload();

                    } catch (error) {
                        console.error("Error deleting:", error);
                        alert("Could not delete the task.");

                    }
                }
            }

            
        }
    });
}