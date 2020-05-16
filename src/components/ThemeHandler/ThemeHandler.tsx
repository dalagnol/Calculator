import React, { useEffect } from "react";

import { useTheme } from "theme";

import { Calculator } from "../../views";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

interface Props {
  setTheme: Function;
}

export default function ThemeHandler({ setTheme }: Props) {
  const { theme } = useTheme("ThemeHandler");

  useEffect(() => {
    let LSTheme = localStorage.getItem("calculatorThemePreference");
    ipcRenderer.send("init", String(LSTheme || ""));
  }, []);

  ipcRenderer.on("theme", (e: any, ...args: any) => {
    if (args[0].toLowerCase() === "automatic") {
      setTheme(args[1] ? "dark" : "light");
      localStorage.setItem("calculatorThemePreference", "");
    } else {
      setTheme(undefined);
      theme.set(args[0]);
      localStorage.setItem("calculatorThemePreference", args[0].toLowerCase());
    }
  });

  return <Calculator />;
}
