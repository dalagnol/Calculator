import React from "react";
import { useTheme } from "../../themes";

import { Button as Element } from "./styles";
import { theme } from "./json";

export default function Button({
  children,
  color,
  position,
  ...props
}: any) {
  useTheme("button", theme);

  return (
    <Element color={color} position={position} {...props}>
      {children}
    </Element>
  );
}
