import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Ensure this points to your main App component
import "./global.css"; // Global styles

// Create a root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);