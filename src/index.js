import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import Store from "./store";
import App from "./App";
import "./style.css";

ReactDOM.render(
  <Provider {...Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
