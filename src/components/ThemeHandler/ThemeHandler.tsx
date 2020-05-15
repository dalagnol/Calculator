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
    ipcRenderer.send(
      "init",
      String(localStorage.getItem("calculatorThemePreference"))
    );
  }, []);

  ipcRenderer.on("theme", (e: any, ...args: any) => {
    if (args[0] === "automatic") {
      setTheme(args[1] ? "dark" : "light");
    } else {
      setTheme(undefined);
      theme.set(args[0]);
      localStorage.setItem("calculatorThemePreference", args[0]);
    }
  });

  return <Calculator />;
}
