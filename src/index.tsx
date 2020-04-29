import React from "react";
import ReactDOM from "react-dom";

import { App } from "./app/App";

import "./styles/standard.css";
import "./styles/fonts.css";

import { Themed } from "theme";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Themed themes={["light", "dark"]} forgetful={true}>
    <App />
  </Themed>,
  document.getElementById("root")
);

serviceWorker.unregister();
