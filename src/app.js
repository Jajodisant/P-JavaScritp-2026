import {router} from "./router/router.js"

// Escuchadores de eventos para detectar cambios en la URL
window.addEventListener("hashchange", router);
window.addEventListener("load", router);