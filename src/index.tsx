import React from "react";
import ReactDOM from "react-dom";

import { App } from "./app/App";

import { Themed } from "theme";

import "./styles/standard.css";
import "./styles/fonts.css";

import * as serviceWorker from "./serviceWorker";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on("theme", (e: any, ...args: any) => {
  let automatic = false;
  if (args[0] === "automatic") {
    automatic = true;
  }

  ReactDOM.render(
    <Themed
      themes={["light", "dark"]}
      forgetful={true}
      OSPreference={automatic ? (args[1] ? "dark" : "light") : ""}
    >
      <App />
    </Themed>,
    document.getElementById("root")
  );
});

serviceWorker.unregister();
