import "./jquery.js";

const THEME = localStorage.getItem("theme") || "light";
const icon = THEME === "dark" ? "light_mode" : "dark_mode";
const TOKEN = localStorage.getItem("token");

$(window).on("load", () => {
  $("html").attr("data-bs-theme", THEME);
  $("img#theme-icon").attr("src", `./images/${icon}.svg`);

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
  let theme = THEME === "dark" ? "light" : "dark";

  localStorage.setItem("theme", theme);
  window.location.reload();
});

/**
 * @returns {string}
 */
export let getProjectPath = () => window.location.pathname;
