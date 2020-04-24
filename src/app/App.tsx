import React, { useContext } from "react";

import { Calculator } from "../views";

import { ThemeContext } from "styled-components";

import { createGlobalStyle } from "styled-components";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export const App = () => {
  const { For } = useContext(ThemeContext);
  const { Use } = For("app");

  ipcRenderer.on("theme", (e: any, ...args: any) => {
    Use(String(args).toLowerCase());
    localStorage.setItem("theme", String(args));
  });

  const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;

    @media (prefers-color-scheme: dark) {
      background: linear-gradient(#402400, #573100);
    }
    @media (prefers-color-scheme: light) {
      background: linear-gradient(#CE9143, #CB9D62);
    }
  }
`;

  return (
    <>
      <GlobalStyle />
      <Calculator />
    </>
  );
};
