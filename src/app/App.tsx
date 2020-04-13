import React, { useState } from "react";

import { Calculator } from "../views";

import { Themed } from "../themes";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    @media (prefers-color-scheme: dark) {
      background-color: black;
    }
  }
`;

export const App = () => {
  const [bodyColor, setBodyColor] = useState("");
  return (
    <Themed bodyColor={bodyColor}>
      <GlobalStyle />
      <Calculator setBodyColor={setBodyColor} />
    </Themed>
  );
};
