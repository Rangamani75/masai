import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FollowProvider } from "./state/FollowContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FollowProvider>
      <App />
    </FollowProvider>
  </BrowserRouter>
);
