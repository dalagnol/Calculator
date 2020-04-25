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
      background: radial-gradient(circle, ${theme.button?.lightnumber}, ${theme.button?.darknumber});
      color: ${theme.button?.text};
      `) ||
    (color === "main" &&
      `
      background: radial-gradient(circle, ${theme.button?.lightmain}, ${theme.button?.darkmain});
      color: ${theme.button?.text};
      `) ||
    (color === "secondary" &&
      `
      background: radial-gradient(circle, ${theme.button?.lightsecondary}, ${theme.button?.darksecondary});
      color: ${theme.button?.text};
      `) ||
    (color === "selected" &&
      `
      background: radial-gradient(circle, ${theme.button?.lightselected}, ${theme.button?.darkselected});
      color: ${theme.button?.selectedtext};
      `)}

      &:active {
        ${({ color, theme }) =>
          (color === "number" &&
            `
            background: radial-gradient(circle, ${theme.button?.darknumber}, ${theme.button?.lightsecondary});
            `) ||
          (color === "main" &&
            `
            background: radial-gradient(circle, ${theme.button?.darkmain}, ${theme.button?.lightmain});
            `) ||
          (color === "secondary" &&
            `
            background: radial-gradient(circle, ${theme.button?.darksecondary}, ${theme.button?.darknumber});
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
