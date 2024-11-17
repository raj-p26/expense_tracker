import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

export function AppNavbar() {
  const THEME: "light" | "dark" = localStorage.theme || "light";
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(THEME);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  useEffect(() => {
    document.querySelector("html")!.setAttribute("data-bs-theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    const updateTheme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(updateTheme);
    localStorage.theme = updateTheme;
  };

  return (
    <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>ExpenseTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link
                to={"/"}
                className={"nav-link " + (path === "/" ? "active" : "")}
              >
                Incomes
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to={"/expenses"}
                className={"nav-link " + (path === "/expenses" ? "active" : "")}
              >
                Expenses
              </Link>
            </Nav.Item>
          </Nav>
          <Navbar.Text className="me-3">
            Hello: {localStorage.username}
          </Navbar.Text>
          <Nav.Item className="me-3">
            <Button onClick={toggleTheme}>
              <i
                className={
                  currentTheme === "dark"
                    ? "bi bi-brightness-high-fill"
                    : "bi bi-moon-fill"
                }
              ></i>
            </Button>
          </Nav.Item>
          <Nav.Item>
            <Button
              variant="outline-danger"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                navigate("/auth");
              }}
            >
              Logout
            </Button>
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
