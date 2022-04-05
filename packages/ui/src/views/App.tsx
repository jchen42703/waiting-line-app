import "../styles/styles.scss";
import "focus-visible/dist/focus-visible";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./home/Home";
import Login from "./auth/Login";
import Dashboard from "./dashboard/dashboard";
import QueueDashboard from "./dashboard/queueDashboard";
import SettingsPage from "./settings/settings";
import UserSignupPage from "./users/UserSignupPage";
import UserWaitingPage from "./users/UserWaitingPage";
import AuthGuard from "../components/auth/AuthGuard";

export default function App() {
  return (
    <ChakraProvider resetCSS={true}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="dashboard"
            element={<AuthGuard protectedElement={<Dashboard />} />}
          />
          <Route
            path="dashboard/:queueId"
            element={<AuthGuard protectedElement={<QueueDashboard />} />}
          />
          <Route path="login" element={<Login />} />
          <Route
            path="settings"
            element={<AuthGuard protectedElement={<SettingsPage />} />}
          />
          <Route path="users/:queueId" element={<UserSignupPage />} />
          <Route path="users/:queueId/:userId" element={<UserWaitingPage />} />
        </Routes>{" "}
      </BrowserRouter>
    </ChakraProvider>
  );
}
