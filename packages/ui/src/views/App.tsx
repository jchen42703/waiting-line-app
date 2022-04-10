import "../styles/styles.scss";
import "focus-visible/dist/focus-visible";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Home from "./home/Home";
import Login from "./auth/Login";
import Dashboard from "./dashboard/dashboard";
import QueueDashboard from "./dashboard/queueDashboard";
import SettingsPage from "./settings/settings";
import UserSignupPage from "./users/UserSignupPage";
import UserWaitingPage from "./users/UserWaitingPage";
import AuthGuard from "../components/auth/AuthGuard";
import AnalyticsDashboard from "./dashboard/analyticsDashboard";

const theme = extendTheme({
  colors: {
    brand: {
      // light: "#F4F1DE",
      // red: "#E07A5F",
      // navy: "#3D405B",
      // blue: "#81B29A",
      // peach: "#F2CC8F",
      "primary-light": "#F7F5F2",
      navy: "#8D8DAA",
      grey: "#DFDFDE",
      secondary: "#F56D91",
    },
  },
});

export default function App() {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="users/:queueId" element={<UserSignupPage />} />
          <Route path="users/:queueId/:userId" element={<UserWaitingPage />} />
          <Route
            path="dashboard"
            element={<AuthGuard protectedElement={<Dashboard />} />}
          />
          <Route
            path="dashboard/:queueId"
            element={<AuthGuard protectedElement={<QueueDashboard />} />}
          />
          <Route
            path="dashboard/queue/:queueId"
            element={<AuthGuard protectedElement={<AnalyticsDashboard />} />}
          />
          <Route
            path="settings"
            element={<AuthGuard protectedElement={<SettingsPage />} />}
          />
        </Routes>{" "}
      </BrowserRouter>
    </ChakraProvider>
  );
}
