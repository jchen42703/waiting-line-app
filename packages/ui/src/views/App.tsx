import "../styles/styles.scss";
import "focus-visible/dist/focus-visible";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./home/Home";
import Login from "./auth/Login";
import Dashboard from "./dashboard/dashboard";
import QueueDashboard from "./dashboard/queueDashboard";
import SettingsPage from "./settings/settings";
import AdminNavBar from "../components/AdminNavBar";
import UserSignupPage from "./users/UserSignupPage";
import { useEffect, useState } from "react";
import UserWaitingPage from "./users/UserWaitingPage";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/api/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <ChakraProvider resetCSS={true}>
      <BrowserRouter>
        <AdminNavBar></AdminNavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="dashboard/:queueId"
            element={user ? <QueueDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="settings"
            element={user ? <SettingsPage /> : <Navigate to="/login" />}
          />
          <Route path="users/:queueId" element={<UserSignupPage />} />
          <Route path="users/:queueId/:userId" element={<UserWaitingPage />} />
        </Routes>{" "}
      </BrowserRouter>
    </ChakraProvider>
  );
}