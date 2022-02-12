import "../styles/styles.scss";
import "focus-visible/dist/focus-visible";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Dashboard from "./dashboard/dashboard";
import Home from "./home/Home";
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  return (
    <ChakraProvider resetCSS={true}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
        </Routes>{" "}
      </BrowserRouter>
    </ChakraProvider>
  );
}
