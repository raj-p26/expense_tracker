import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import { App } from "@views/App";
import { Auth } from "@views/Auth";
import Dashboard from "@views/Dashboard";
import { Incomes } from "@views/Incomes";
import Income from "@views/Income";
import Expense from "@views/Expense";
import { Expenses } from "@views/Expenses";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="" element={<App />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incomes">
            <Route path="" element={<Incomes />} />
            <Route path=":id" element={<Income />} />
          </Route>
          <Route path="/expenses">
            <Route path="" element={<Expenses />} />
            <Route path=":id" element={<Expense />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
