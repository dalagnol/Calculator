import React, { useState, useEffect } from "react";

import { Calculator } from "../views";

import { Themed, useTheme } from "theme";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export const App = () => {
  const [theme, setTheme] = useState<string | undefined>("light");

  return (
    <Themed themes={["light", "dark"]} forgetful={true} OSPreference={theme}>
      {(function Application() {
        const { theme } = useTheme("App");

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
            localStorage.setItem("theme", args[0]);
          }
        });

        return <Calculator />;
      })()}
    </Themed>
  );
};
