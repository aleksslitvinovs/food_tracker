import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./templates/app/App";
import NotFound from "./templates/notFound/NotFound";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./templates/login/Login";

import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
