import React from "react";

import { Calculator } from "../views";

import { useTheme } from "theme";

import { createGlobalStyle } from "styled-components";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export const App = () => {
  const { theme } = useTheme("App", {
    light: { bkc: "white" },
    dark: { bkc: "black" }
  });

  ipcRenderer.on("theme", (e: any, ...args: any) => {
    theme.set(String(args).toLowerCase());
    // Fix the fact that this funcgtion does not guarantee usage of only first argument
    localStorage.setItem("theme", String(args));
  });

  const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;

    @media (prefers-color-scheme: dark) {
      background-color: #CE9143;
      background-image: linear-gradient(90deg, rgba(206,145,67,.07) 50%, transparent 50%), 
      linear-gradient(90deg, rgba(255,224,185,.13) 50%, transparent 50%), 
      linear-gradient(90deg, rgba(135,79,6,.17) 50%, transparent 50%), 
      linear-gradient(90deg, rgba(90,51,3,.19) 50%, transparent 50%);
      background-size: 13px, 29px, 37px, 53px;
    }
    @media (prefers-color-scheme: light) {
      background-image: url('https://images.template.net/wp-content/uploads/2016/04/22084512/Light-Colored-Wooden-Background.jpg');
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
