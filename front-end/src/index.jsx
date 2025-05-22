import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

document.documentElement.setAttribute(
  "data-theme",
  localStorage.getItem("theme") || "defaut"
);
try {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} catch (error) {
  console.error("Render failed:", error);
}
