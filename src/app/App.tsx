import React from "react";

import { Calculator } from "../views";

import { Themed } from "../themes";

import { createGlobalStyle } from "styled-components";

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

export const App = () => {
  return (
    <Themed>
      <GlobalStyle />
      <Calculator />
    </Themed>
  );
};
