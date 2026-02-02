import { store } from "../state/store.js"

export function navBarViewEmployees() {
  return `
    <nav>
        <ul>
            <li><a href="#/myTask">My Task</a></li>
            <li><a href="#/profile">Profile</a></li>
            <button id="btnLogOut">LogOut</button>
        </ul>
    </nav>
    `
}

export function navBarLogicEmployees() {
  const btnLogOut = document.querySelector("#btnLogOut")

  if (btnLogOut) {
    btnLogOut.addEventListener('click', () => {
      store.user = null
      localStorage.removeItem('user')
      window.location.hash = "#/login";
    })
  }
}



