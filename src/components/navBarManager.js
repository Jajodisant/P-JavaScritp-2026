import { store } from "../state/store.js"

export function navBarViewManager() {
  return `
    <nav>
        <ul>
            <li><a href="#/dashboard">Dashboard</a></li>
            <li><a href="#/createTask">Create Task</a></li>
            <li><a href="#/profile">Profile</a></li>
            <button id="btnLogOut">LogOut</button>
        </ul>
    </nav>
    `
}

export function navBarLogicManager() {
  const btnLogOut = document.querySelector("#btnLogOut")

  if (btnLogOut) {
    btnLogOut.addEventListener('click', () => {
      store.user = null
      localStorage.removeItem('user')
      window.location.hash = "#/login";
    })
  }
}