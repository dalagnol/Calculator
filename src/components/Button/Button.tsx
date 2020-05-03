import React from "react";
import { useTheme } from "theme";

import { Button as Element } from "./styles";
import { themejson } from "./json";

interface Props {
  children: string;
  color: string;
  position: { row: number; column: number; zero?: boolean };
  pressed: boolean;
  onClick: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

export default function Button({
  children,
  color,
  position,
  pressed,
  onClick,
  onKeyDown,
  onKeyUp
}: Props) {
  useTheme("Button", themejson);

  return (
    <Element
      color={color}
      position={position}
      pressed={pressed}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onClick={onClick}
    >
      {children}
    </Element>
  );
}
