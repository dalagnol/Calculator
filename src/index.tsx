import React from "react";
import ReactDOM from "react-dom";

import { App } from "./app/App";

import { Themed } from "theme";

import "./styles/standard.css";
import "./styles/fonts.css";

import * as serviceWorker from "./serviceWorker";

let automatic = false;
let bodyBackground = "";

ReactDOM.render(
  <Themed
    themes={["light", "dark"]}
    forgetful={true}
    OSPreference={
      automatic ? (bodyBackground === "#CE9143" ? "dark" : "light") : ""
    }
  >
    <App automatic={automatic} bodyBackground={bodyBackground} />
  </Themed>,
  document.getElementById("root")
);

serviceWorker.unregister();
