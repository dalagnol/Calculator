import styled from "styled-components";

interface Props {
  color: string;
  position: { row: number; column: number; zero?: boolean };
  pressed: boolean;
}

export const Button = styled.button<Props>`
  cursor: pointer;

  width: 100%;
  height: auto;

  border: none;

  border-radius: 50px;

  font-family: Roboto;
  font-size: 20px;

  transition: all 0.2s ease-in-out;

  ${({ color, theme }) =>
    (color === "number" &&
      `
      background-color: ${theme.button?.number};
      color: ${theme.button?.maintext};
      `) ||
    (color === "main" &&
      `
      background-color: ${theme.button?.main};
      color: ${theme.button?.maintext};
      `) ||
    (color === "secondary" &&
      `
      background-color: ${theme.button?.secondary};
      color: ${theme.button?.secondarytext};
      `) ||
    (color === "selected" &&
      `
      background-color: ${theme.button?.selected};
      color: ${theme.button?.selectedtext};
      `)}

  &:active {
    ${({ color, theme }) =>
      (color === "number" &&
        `
          background-color: ${theme.button?.maintext};
          color: ${theme.button?.number};
        `) ||
      (color === "main" &&
        `
          background-color: ${theme.button?.maintext};
          color: ${theme.button?.secondarytext};
        `) ||
      (color === "secondary" &&
        `
          background-color: ${theme.button?.secondarytext};
          color: ${theme.button?.secondary};
        `)}
  }

  ${({ position }) =>
    `
        grid-column-start: ${position.column * 2};
        grid-column-end: ${
          !position.zero ? position.column * 2 + 1 : position.column + 4
        };
        grid-row-start: ${position.row * 2};
        grid-row-end: ${position.row * 2 + 1};
      `}

  ${({ theme, pressed }) =>
    pressed &&
    `
    transition: all 0.1s ease-in-out;
    background-color: ${theme.button?.maintext};
        color: ${theme.button?.secondarytext};
  `}
`;
