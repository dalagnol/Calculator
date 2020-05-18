import React, { useState } from "react";

import { Themed } from "theme";

import ThemeHandler from "../components/ThemeHandler/ThemeHandler";

export const App = () => {
  const [theme, setTheme] = useState<string | undefined>("light");

  return (
    <Themed themes={["light", "dark"]} forgetful={true} OSPreference={theme}>
      <ThemeHandler setTheme={setTheme} />
    </Themed>
  );
};
