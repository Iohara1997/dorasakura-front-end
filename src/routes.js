import { Routes, Route } from "react-router-dom";
import { Start } from "./components/start/index";
import { Login } from "./components/login/index";
import { Home } from "./components/home/index";
import { Register } from "./components/register";

export function RoutesApp() {
  return (
    <Routes>
      <Route element={<Start />} path="/" exact />
      <Route element={<Login />} path="/login" exact />
      <Route element={<Register />} path="/register" exact />
      <Route element={<Home />} path="/home" exact />
    </Routes>
  );
}
