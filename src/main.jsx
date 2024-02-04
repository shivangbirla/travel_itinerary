import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";
const PUBLISHABLE_KEY = "pk_test_YWN0dWFsLWhlbi01My5jbGVyay5hY2NvdW50cy5kZXYk";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "sonner";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Router>
      <NextUIProvider>
        <Toaster />
        <App />
      </NextUIProvider>
    </Router>
  </ClerkProvider>
);
