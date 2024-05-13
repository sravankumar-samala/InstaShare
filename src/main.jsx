import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { InstaShareContextProvider } from "./context/instaShareContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <InstaShareContextProvider>
        <App />
      </InstaShareContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
