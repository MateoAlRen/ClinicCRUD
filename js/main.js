import { router } from "./router.js";

window.addEventListener("hashchange", () => {
    if (window.location.hash === "") {
        window.location.hash = "#/login"
    }
    let path = window.location.hash;
    router[path]();
});

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash === ``) {
        window.location.hash = "#/login"
    };
    let path = window.location.hash;
    router [path]();
})