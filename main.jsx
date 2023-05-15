import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ImmutableProvider } from "./context/context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ImmutableProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ImmutableProvider>
);
