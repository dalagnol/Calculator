import React from "react";

import { Calculator } from "../views";

import { useTheme } from "theme";

import { createGlobalStyle } from "styled-components";

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

  const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    margin: 0;
  }
`;

  return (
    <>
      <GlobalStyle />
      <Calculator />
    </>
  );
};
