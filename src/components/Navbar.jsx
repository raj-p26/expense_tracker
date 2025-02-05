import { useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import Bars from "@assets/Bars";
import Home from "@assets/Home";
import Logout from "@assets/Logout";
import TrendDown from "@assets/TrendDown";
import TrendUp from "@assets/TrendUp";
import { Button } from "@components/Button";
import Confirm from "@components/Confirm";
import "@styles/Navbar.css";

export function Navbar() {
  const [userToken, setUserToken] = useState(localStorage["token"]);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (!userToken) navigate("/auth");
    if (pathname === "/") navigate("/dashboard");
  }, [userToken, navigate, pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
  };

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            "h-full w-full block md:px-4 md:py-2 px-6 py-3 rounded-full md:my-0 my-4 transition duration-200 " +
            (isActive
              ? "bg-secondary-container text-on-secondary-container"
              : "")
          }
          to={"/dashboard"}
        >
          <div className="flex items-center gap-3">
            <Home /> Dashboard
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            "h-full w-full block md:px-4 md:py-2 px-6 py-3 rounded-full md:my-0 my-4 transition duration-200 " +
            (isActive
              ? "bg-secondary-container text-on-secondary-container"
              : "")
          }
          to={"/incomes"}
        >
          <div className="flex items-center gap-3">
            <TrendUp /> Incomes
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            "h-full w-full block md:px-4 md:py-2 px-6 py-3 rounded-full md:my-0 my-4 transition duration-200 " +
            (isActive
              ? "bg-secondary-container text-on-secondary-container"
              : "")
          }
          to={"/expenses"}
        >
          <div className="flex items-center gap-3">
            <TrendDown /> Expenses
          </div>
        </NavLink>
      </li>
      <li>
        <button
          onClick={() => setShowConfirm(true)}
          className="h-full w-full block md:px-4 md:py-2 px-6 py-3 rounded-full md:my-0 my-4 text-left"
        >
          <div className="flex items-center gap-3">
            <Logout /> Logout
          </div>
        </button>
      </li>
    </>
  );

  return (
    <>
      <nav className="bg-surface text-on-surface fixed top-0 left-0 right-0 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center w-full">
            <div className="lg:hidden">
              <Button type="text" onClick={() => setShowMenu(true)}>
                <span className="text-on-surface">
                  <Bars />
                </span>
              </Button>
            </div>
            <NavLink
              to="/dashboard"
              className="text-xl text-center lg:text-left w-full"
            >
              ExpenseTracker
            </NavLink>
          </div>
          {showMenu && (
            <div
              className="fixed inset-0 bg-scrim/70 z-50"
              onClick={() => setShowMenu(false)}
            />
          )}
          <div
            className={`fixed lg:static bg-surface-container-low text-on-surface z-[1000] top-0 left-0 bottom-0 w-[75%] lg:w-fit lg:bg-[transparent] transition lg:translate-x-[0%] rounded-r-3xl ${showMenu ? "translate-x-[0%]" : "translate-x-[-100%]"}`}
          >
            <ul className="lg:flex lg:gap-4 h-full lg:h-fit mt-8 lg:mt-0 lg:items-center lg:justify-evenly lg:static lg:px-0 px-4">
              {links}
            </ul>
          </div>
        </div>
      </nav>
      <Confirm
        show={showConfirm}
        title="Logout?"
        subtitle="Are you sure you want to logout?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          logout();
          setShowConfirm(false);
        }}
      />
    </>
  );
}
