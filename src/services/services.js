// services/services.js
export const projectService = {
  URL: "http://localhost:3000",

  // --- User ---
  async getUsers() {
    const response = await fetch(`${this.URL}/users`);
    return await response.json();
  },

  async postUser(user) {
    const response = await fetch(`${this.URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await response.json();
  },

  async getTasks() {
    try {
      const response = await fetch(`${this.URL}/tasks`);
      return await response.json();
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      return [];
    }
  },

  async createTasks(task) {
    const response = await fetch(`${this.URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return await response.json();
  },

   // Get a single event per ID
  async getTaskById(id) {
    const response = await fetch(`${this.URL}/tasks/${id}`);
    return await response.json();
  },

  // update an entire event (when you edit it)
  async putTask(id, taskData) {
    const response = await fetch(`${this.URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  },

  // remove an event from the catalog
  async deleteTask(id) {
    await fetch(`${this.URL}/tasks/${id}`, {
      method: "DELETE",
    });
  },

  async getUserById(id) {
    try {
      const response = await fetch(`${this.URL}/users/${id}`);
      if (!response.ok) throw new Error("Usuario no encontrado");
      return await response.json();
    } catch(err) {
      console.error("Error al obtener el usuario", err);
      
    }
  },
}
