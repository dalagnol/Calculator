import React from "react";
import ReactDOM from "react-dom";

import { App } from "./app/App";

import "./styles/standard.css";
import "./styles/fonts.css";

import { Themed } from "./themes";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Themed>
    <App />
  </Themed>,
  document.getElementById("root")
);

serviceWorker.unregister();
