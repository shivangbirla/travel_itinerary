import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <Router>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </Router>
  </React.StrictMode>
);
