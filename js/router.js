import { loginCRUD } from "./forms/login.js";
import { homeCRUD } from "./views/home_crud.js";

export let router = {
    "#/login" : loginCRUD,
    "#/home/crud": homeCRUD
}