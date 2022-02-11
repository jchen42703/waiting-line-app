import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./views/App";
import Login from "./views/auth/Login";
import Dashboard from "./views/dashboard/dashboard";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
    </Routes>{" "}
  </BrowserRouter>,
  rootElement
);
