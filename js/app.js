import "./jquery.js";

const USER_TOKEN = localStorage.getItem("token");
const TOKEN = localStorage.getItem("token");

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

/**
 * @returns {string}
 */
export let getProjectPath = () => window.location.pathname;

if (!USER_TOKEN && !getProjectPath().endsWith("/auth"))
  location.href = "./auth";

$(window).on("load", () => {
  const [mode, icon] = getTheme();
  setupTheme(mode, icon);
  localStorage.setItem("theme", mode);

  if (!TOKEN) {
    $("#auth-in-btn").show();
    $("#auth-out-btn").hide();
  } else {
    $("#auth-out-btn").show();
    $("#auth-in-btn").hide();
  }
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
  window.location.reload();
});
