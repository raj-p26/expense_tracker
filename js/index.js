import { getProjectPath } from "./app.js";

const USER_TOKEN = localStorage.getItem("token");

if (!USER_TOKEN) location.href = "auth.html";

console.log(getProjectPath());
