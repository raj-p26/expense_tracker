import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppNavbar } from "./components/AppNavbar";

export function App() {
  const token = localStorage["token"];
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, []);
  return (
    <>
      <AppNavbar />
      <div style={{ marginTop: "4rem" }} className="container">
        <Outlet />
      </div>
    </>
  );
}
