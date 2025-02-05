import { Input } from "@components/Input.jsx";
import { Button } from "@components/Button.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../constants";

export function Auth() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    register_username_error: "",
    register_email_error: "",
    register_password_error: "",
    login_email_error: "",
    login_password_error: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleRegisterChange = ({ target }) => {
    setUserData((oldData) => ({
      ...oldData,
      [target.name]: target.value,
    }));
  };

  const handleLoginChange = ({ target }) => {
    setLoginData((oldData) => ({
      ...oldData,
      [target.name]: target.value,
    }));
  };

  const isValid = (target) => {
    let valid = true;

    if (target === "login") {
      Object.entries(loginData).forEach(([key, value]) => {
        if (value.trim() === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [`login_${key}_error`]: `${key} cannot be blank`,
          }));
          valid = false;
        }
      });
    } else if (target === "register") {
      Object.entries(userData).forEach(([key, value]) => {
        if (value.trim() === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [`register_${key}_error`]: `${key} cannot be blank`,
          }));
          valid = false;
        }
      });
    } else {
      throw new Error(`Unknown target state: ${target}`);
    }

    return valid;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    let valid = isValid("register");

    if (valid) {
      setSubmitting(valid);
      const res = await fetch(`${SERVER_URL}/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      });
      const body = await res.json();

      if (body.status !== "done") {
        alert("Some error occured");
        console.log(body);
        throw new Error();
      }

      localStorage.setItem("token", body.token);
      localStorage.setItem("username", body.username);
      setSubmitting(false);
      navigate("/dashboard");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let valid = isValid("login");

    if (valid) {
      setSubmitting(valid);
      const res = await fetch(`${SERVER_URL}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(loginData),
      });
      const body = await res.json();

      if (body.status !== "done") {
        alert("Some error occured");
        console.log(body);
        throw new Error();
      }

      localStorage.setItem("token", body.token);
      localStorage.setItem("username", body.username);
      setSubmitting(false);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="bg-surface text-on-surface h-[100vh] pt-14">
        <div className="container mx-auto lg:flex lg:gap-10">
          <form className="mx-auto w-[90%] max-w-[768px]" method="post">
            <h1 className="text-4xl text-center font-medium mb-4">
              Get Started!
            </h1>
            <hr className="opacity-70 mb-6" />
            <Input
              label="Username:"
              name="username"
              onChange={handleRegisterChange}
              value={userData.username}
              errorMessage={errors.register_username_error}
            />
            <Input
              label="Email:"
              name="email"
              type="email"
              onChange={handleRegisterChange}
              value={userData.email}
              errorMessage={errors.register_email_error}
            />
            <Input
              label="Password:"
              name="password"
              type="password"
              onChange={handleRegisterChange}
              value={userData.password}
              errorMessage={errors.register_password_error}
            />
            <Button
              disableWith="Loading..."
              onClick={handleRegistration}
              disabled={submitting}
            >
              Register
            </Button>
          </form>
          <form
            method="post"
            name="login-form"
            className="mx-auto w-[90%] max-w-[768px]"
          >
            <h1 className="text-4xl text-center font-medium mb-4">Login!</h1>
            <hr className="opacity-70 mb-6" />
            <Input
              label="Email:"
              name="email"
              type="email"
              onChange={handleLoginChange}
              value={loginData.email}
              errorMessage={errors.login_email_error}
            />
            <Input
              label="Password:"
              name="password"
              type="password"
              onChange={handleLoginChange}
              value={loginData.password}
              errorMessage={errors.login_password_error}
            />
            <Button
              disableWith="Loading..."
              onClick={handleLogin}
              disabled={submitting}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
