// import React from "react";
// import { useRoutes } from "react-router-dom";
// import Start from "./start/index";
// import Login from "./login/index";

// const Router = () => {
//   const routes = useRoutes([
//     { path: "/", element: <Start /> },
//     { path: "login", element: <Login /> },
//   ]);

//   return routes;
// };

// export default Router;

import { Routes, Route } from "react-router-dom";
import { Start } from "./start/index";
import { Login } from "./login/index";

export function RoutesApp() {
  return (
    <Routes>
      <Route element={<Start />} path="/" exact />
      <Route element={<Login />} path="/login" />
    </Routes>
  );
}
