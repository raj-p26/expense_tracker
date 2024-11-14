import "./jquery.js";

export const SERVER_URL = "http://localhost:8000";
const USERNAME = localStorage.getItem("username");

/**
 * Returns the absolute project path
 * @returns {string}
 */
export let getProjectPath = () => window.location.pathname;

/**
 * @param {string} expected expected path
 * @returns true if the path ends with `expected` false otherwise
 */
export let isPath = (expected) => getProjectPath().endsWith(expected);

/**
 * @param {string} path path you want to go
 * @returns URL of the current Location object
 */
export let to = (path) => (window.location.href = `/expense-tracker${path}`);

export const USER_TOKEN = localStorage.getItem("token");

/**
 * @returns {[string, string]} theme mode and icon
 */
const getTheme = () => {
  const THEME = localStorage.getItem("theme") || "light";
  const icon = THEME === "light" ? "dark" : "light";

  return [THEME, icon];
};

const setupTheme = (theme, icon) => {
  $("html").attr("data-bs-theme", theme);
  $("img#theme-icon").attr("src", `./images/${icon}_mode.svg`);
};

if (!USER_TOKEN && !isPath("/auth")) to("/auth");

$(window).on("load", () => {
  const [mode, icon] = getTheme();
  setupTheme(mode, icon);
  localStorage.setItem("theme", mode);

  if (!USER_TOKEN) {
    $("#auth-in-btn").show();
    $("#auth-out-btn").hide();
  } else {
    $("#auth-out-btn").show();
    $("#auth-in-btn").hide();
  }

  $("#nav-username").text(`Hello, ${USERNAME || "User"}`);
});

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

const $themeToggler = $("#theme-toggler");

$themeToggler.on("click", () => {
  const [mode, icon] = getTheme();
  const currentThemeMode = mode === "light" ? "dark" : "light";
  const currentIcon = icon === "light" ? "dark" : "light";

  setupTheme(currentThemeMode, currentIcon);
  localStorage.setItem("theme", currentThemeMode);
});

$("#auth-out-btn").on("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("theme");
  window.location.reload();
});
