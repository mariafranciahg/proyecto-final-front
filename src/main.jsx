import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserProvider from "./context/UserContext";
import ServicesProvider from "./context/ServicesContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ServicesProvider>
          <App />
        </ServicesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
