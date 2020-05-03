import React from "react";

import { Calculator } from "../views";

import { useTheme } from "theme";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

interface Props {
  setAutomatic: Function;
  setDark: Function;
  automatic: boolean;
}

export const App = () => {
  const { theme } = useTheme("App");

  ipcRenderer.on("theme", (e: any, ...args: any) => {
    if (args[0] !== "automatic") {
      theme.set(args[0]);
      localStorage.setItem("theme", args[0]);
    }
  });

  return (
    <>
      <Calculator />
    </>
  );
};
