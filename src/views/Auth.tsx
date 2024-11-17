import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { BASE_URL } from "../utils/constants";

export function Auth() {
  let serverError = "";
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [loginValidated, setLoginValidated] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showRegister, setShowRegister] = useState(false);
  const [registerValidated, setRegisterValidated] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const switchModal = () => {
    setShowLogin(!showLogin);
    setShowRegister(!showRegister);
  };

  const handleSubmit = async (e: any) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
    }

    setLoginValidated(true);

    if (!loginValidated) return;

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      if (!res.ok) {
        serverError = res.statusText;
      }

      const body: { status: string; token: string; username: string } =
        await res.json();

      if (body.status !== "done")
        throw new Error("response body something else.");

      localStorage.token = body.token;
      localStorage.username = body.username;
      navigate("/");
    } catch (e) {
      alert("some error occured");
      console.log(e);
    }
  };

  const handleRegisterSubmit = async (e: any) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
    }

    setRegisterValidated(true);

    if (!registerValidated) return;

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });

      if (!res.ok) {
        serverError = res.statusText;
      }

      const body: { status: string; token: string; username: string } =
        await res.json();

      if (body.status !== "done")
        throw new Error("response body something else.");

      localStorage.token = body.token;
      localStorage.username = body.username;
      navigate("/");
    } catch (e) {
      alert("some error occured");
      console.log(e);
    }
  };
  return (
    <>
      <Modal show={showLogin} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={loginValidated}
            id="login-form"
            onSubmit={handleSubmit}
          >
            <Form.Label htmlFor="login-email-input">Email:</Form.Label>
            <Form.Control
              inputMode="text"
              type="email"
              id="login-email-input"
              value={loginInfo.email}
              onChange={({ target }) =>
                setLoginInfo({ ...loginInfo, email: target.value })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a valid email.
            </Form.Control.Feedback>
            <Form.Label htmlFor="login-password-input">Password:</Form.Label>
            <Form.Control
              inputMode="text"
              type="password"
              id="login-password-input"
              value={loginInfo.password}
              onChange={({ target }) =>
                setLoginInfo({ ...loginInfo, password: target.value })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a valid Password.
            </Form.Control.Feedback>
            <Form.Text>
              We Steal your data and share your information everywhere
              &gt;&#58;&nbsp;&#41;
            </Form.Text>
            <br />
            {serverError && (
              <Form.Text className="text-danger">{serverError}</Form.Text>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={switchModal}>
            Register?
          </Button>
          <Button variant="primary" form="login-form" type="submit">
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showRegister}
        centered
        onHide={switchModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={registerValidated}
            id="register-form"
            onSubmit={handleRegisterSubmit}
          >
            <Form.Label htmlFor="register-username-input">Username:</Form.Label>
            <Form.Control
              inputMode="text"
              type="text"
              id="register-username-input"
              value={registerInfo.username}
              onChange={({ target }) =>
                setRegisterInfo({ ...registerInfo, username: target.value })
              }
              required
            />
            <Form.Label htmlFor="register-email-input">Email:</Form.Label>
            <Form.Control
              inputMode="text"
              type="email"
              id="register-email-input"
              value={registerInfo.email}
              onChange={({ target }) =>
                setRegisterInfo({ ...registerInfo, email: target.value })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a valid email.
            </Form.Control.Feedback>
            <Form.Label htmlFor="register-password-input">Password:</Form.Label>
            <Form.Control
              inputMode="text"
              type="password"
              id="register-password-input"
              value={registerInfo.password}
              onChange={({ target }) =>
                setRegisterInfo({ ...registerInfo, password: target.value })
              }
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a valid Password.
            </Form.Control.Feedback>
            <Form.Text>
              We Steal your data and share your information everywhere
              &gt;&#58;&nbsp;&#41;
            </Form.Text>
            <br />
            {serverError && (
              <Form.Text className="text-danger">{serverError}</Form.Text>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" form="register-form">
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
