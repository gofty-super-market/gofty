import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LogedinProvider } from "./context/Logedin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LogedinProvider>

    <App />

  </LogedinProvider>
);
