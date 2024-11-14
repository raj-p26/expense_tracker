import { to, SERVER_URL } from "./app.js";

$(window).on("load", () => {
  $("#login-modal").modal("show");
});

$("#login-form").on("submit", async (event) => {
  event.preventDefault();

  const data = {
    email: $("#login-email-input").val(),
    password: $("#login-password-input").val(),
  };

  try {
    const res = await fetch(`${SERVER_URL}/auth/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const body = await res.json();
      localStorage.setItem("token", body.token);
      localStorage.setItem("username", body.username);

      to("/");
    } else {
      alert("Server error");
      console.log(res.body);
    }
  } catch (error) {
    alert("Some error occured!");
    console.log(error);
  }
});

$("#register-form").on("submit", async (event) => {
  event.preventDefault();
  const data = {
    username: $("#username-input").val(),
    email: $("#register-email-input").val(),
    password: $("#register-password-input").val(),
  };

  try {
    const res = await fetch(`${SERVER_URL}/auth/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();
    localStorage.setItem("token", body.token);
    localStorage.setItem("username", body.username);

    to("/");
  } catch (error) {
    alert("Some error occured!");
    console.log(error);
  }
});

$("#registration-toggler").on("click", (event) => {
  event.preventDefault();
  $("#register-modal").modal("show");
  $("#login-modal").modal("hide");
});

$("#register-modal").on("hide.bs.modal", () => {
  $("#login-modal").modal("show");
});
