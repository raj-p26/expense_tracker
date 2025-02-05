import { Navbar } from "@components/Navbar";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-16 pt-4">
        <Outlet />
      </div>
    </>
  );
}
