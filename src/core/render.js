import { footerView } from "../components/footer.js"
import { navBarViewManager, navBarLogicManager } from "../components/navBarManager.js";
import { navBarViewEmployees, navBarLogicEmployees } from "../components/navBarEmployees.js";

const main = document.querySelector("#main")

export function render(view) { 
    const hash = window.location.hash || '#/login';
    main.innerHTML = "";

    const user = JSON.parse(localStorage.getItem('user'))

    if (hash === '#/login' || hash == '#/register') {
        main.innerHTML = `<section>${view}</section>`;
    } else {
        main.innerHTML = `
        ${user.role == "Employees" ? navBarViewEmployees() : navBarViewManager()}
        <section>${view}</section>
        ${footerView()}`;
        user.role == "Employees" ? navBarLogicEmployees() : navBarLogicManager()
    }
}