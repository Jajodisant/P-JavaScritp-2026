import { store } from "../state/store.js";
import { render } from "../core/render.js";
import { projectService } from "../services/services.js";
import { loginView, loginLogic } from "../views/login.js";
import { registerView, registerLogic } from "../views/register.js";
import { getTasksView, getTasksLogic } from "../views/manager/dashboard.js";
import { createTasksView, createTasksLogic } from "../views/manager/createTask.js";
import { profileLogic, profileView } from "../views/manager/profile.js";
import { createEmployeeTasksView, createEmployeeTasksLogic } from "../views/employees/myTask.js";


export async function router() {
  let hash = window.location.hash;

  const user = store.user;

  // Route protection: If there is no user and they are not in login/register, send them to login
  if (!user && hash !== "#/login" && hash !== "#/register") {
    window.location.hash = "#/login";
    return;
  }
  // If there is already a user and they try to log in, send them to the main page.
  if (user && hash === "#/login") {
    window.location.hash = user.role === "Employees" ? "#/myTask" : "#/dashboard";
    return;
  }

  switch (hash) {
    case "#/login":
      render(loginView());
      await loginLogic();
      break;

    case "#/register":
      render(registerView());
      await registerLogic();
      break;

    case "#/dashboard":
      const tasks = await projectService.getTasks();
      if (user.role == "Manager") {
        render(await getTasksView(tasks));
        getTasksLogic();
      }
      break;

    case "#/createTask":
      const task = await projectService.getTasks();
      if (user.role == "Manager") {
        render(await createTasksView(task));
        createTasksLogic();
      }
      break;

    case "#/profile":
      const userSession = JSON.parse(localStorage.getItem("user"));
      const datos = await projectService.getUserById(userSession.id);
      if (userSession) {
        render(profileView(datos));
        profileLogic();
      }
      break;

    case "#/myTask":
      const sessionUser = JSON.parse(localStorage.getItem("user"));
      const allTasks = await projectService.getTasks();
      // Only tasks where userId matches the ID of the logged-in employee
      const employeeTasks = allTasks.filter(t => t.userId == sessionUser.id);
      if (sessionUser.role === "Employees") {
        // We only show your tasks
        render(createEmployeeTasksView(employeeTasks));
        createEmployeeTasksLogic();
      }
      break;

    default:
      render(loginView());
      loginLogic();
      break;
  }
}
