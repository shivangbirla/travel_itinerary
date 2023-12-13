import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-gk0hpu0oz2poqc8r.us.auth0.com"
      clientId="EqMTnG2islGuO9sDsW0a3q2oZZfVuj53"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </Router>
    </Auth0Provider>
  </React.StrictMode>
);
