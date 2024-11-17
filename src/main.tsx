// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.tsx";
import { Auth } from "./views/Auth.tsx";
import { Expenses } from "./views/Expenses.tsx";
import { Incomes } from "./views/Incomes.tsx";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Incomes /> },
        { path: "expenses", element: <Expenses /> },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RouterProvider router={router} future={{ v7_startTransition: true }} />
  // </StrictMode>
);
