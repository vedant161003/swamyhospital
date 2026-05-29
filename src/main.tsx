import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app";
import "./styles.css";

import { BookingProvider } from "./components/BookingProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BookingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BookingProvider>
  </React.StrictMode>
);