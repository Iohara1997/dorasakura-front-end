import { Routes, Route } from "react-router-dom";
import { Start } from "./components/start/index";
import { Login } from "./components/login/index";
import { Home } from "./components/home/index";

export function RoutesApp() {
  return (
    <Routes>
      <Route element={<Start />} path="/" exact />
      <Route element={<Login />} path="/login" />
      <Route element={<Home />} path="/home" />
    </Routes>
  );
}
