import { projectService } from "../../services/services.js";

export async function createTasksView(tasks) {
    // We retrieve the users to filter employees and display their names in the table
    const users = await projectService.getUsers();
    const employees = users.filter(u => u.role === "Employees");

    let view = `
        <div class="container">
            <h1>Task Management</h1>
            <section class="manager-card">
                <h3 id="form-title-text">Create / Edit task</h3>
                <form id="manager-task-form">
                    <input type="hidden" id="event-id" name="id">
                    <input type="text" name="title" id="form-title" placeholder="Name" required>
                    
                    <select name="userId" id="form-userId" required>
                        <option value="">Select Employee</option>
                        ${employees.map(emp => `<option value="${emp.id}">${emp.name}</option>`).join('')}
                    </select>

                    <input type="text" name="category" id="form-category" placeholder="Category" required>
                    <input type="text" name="priority" id="form-priority" placeholder="Priority" required>
                    <input type="text" name="status" id="form-status" placeholder="Status" required>
                    <input type="date" name="date" id="form-date" required>
                    <textarea name="description" id="form-description" placeholder="Description"></textarea>
                    
                    <div class="form-buttons">
                        <button type=" submit" id="btn-save">Save Task</button>
                        <button type="reset" id="btn-reset">Clear</button>
                    </div>
                </form>
            </section>

            <table class="manager-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Assigned to</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;

    tasks.forEach(task => {
        // We search for the employee name based on the task userId
        const assignedUser = users.find(u => u.id === task.userId);
        
        view += `
            <tr>
                <td>${task.title}</td>
                <td><strong>${assignedUser ? assignedUser.name : "Unassigned"}</strong></td>
                <td>${task.category}</td>
                <td>${task.priority}</td>
                <td>${task.status}</td>
                <td>${task.date}</td>
                <td>
                    <button class="btn-edit" data-id="${task.id}">✏️</button>
                    <button class="btn-delete" data-id="${task.id}">🗑️</button>
                </td>
            </tr>
        `;
    });

    return view + `</tbody></table></div>`;
}

export function createTasksLogic() {
    const form = document.getElementById("manager-task-form");
    const table = document.querySelector(".manager-table");

    table.addEventListener("click", async (e) => {
        const id = e.target.getAttribute("data-id");
        if (!id) return;

        if (e.target.classList.contains("btn-delete") && confirm("¿Eliminar tarea?")) {
            await projectService.deleteTask(id);
            window.location.reload();
        }

        if (e.target.classList.contains("btn-edit")) {
            const task = await projectService.getTaskById(id);
            document.getElementById("event-id").value = task.id;
            document.getElementById("form-title").value = task.title;
            document.getElementById("form-userId").value = task.userId || ""; // Load assigned employee
            document.getElementById("form-category").value = task.category;
            document.getElementById("form-priority").value = task.priority;
            document.getElementById("form-status").value = task.status;
            document.getElementById("form-description").value = task.description;
            document.getElementById("btn-save").textContent = "Update task";
            window.scrollTo(0, 0);
        }
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("event-id").value;
        const formData = new FormData(form);

        // We create the object with the userId relationship
        const data = {
            title: formData.get("title"),
            userId: formData.get("userId"), // Capture the ID of the selected employee
            category: formData.get("category"),
            priority: formData.get("priority"),
            status: formData.get("status"),
            date: formData.get("date"),
            description: formData.get("description"),
        };

        try {
            if (id) {
                await projectService.putTask(id, data);
            } else {
                // Make sure the method in services.js is called postTask or createTasks
                await projectService.createTasks(data); 
            }
            window.location.reload();
        } catch (error) {
            console.error("Error saving:", error);
        }
    });
}