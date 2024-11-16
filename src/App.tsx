import { Outlet } from "react-router-dom";
import { AppNavbar } from "./ui/AppNavbar";

export function App() {
  return (
    <>
      <AppNavbar />
      <div style={{ marginTop: "4rem" }} className="container">
        <Outlet />
      </div>
    </>
  );
}
