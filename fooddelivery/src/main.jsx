import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./Context/StateProvider";
import { initialState } from "./Context/initialState";
import  reducer  from "./Context/reducer.js"; 


ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StateProvider>
  </Router>
);
