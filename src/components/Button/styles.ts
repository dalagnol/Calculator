import styled from "styled-components";

interface Props {
  color: string;
  position: any;
  column: number;
  row: number;
}

export const Button = styled.button<Props>`
  cursor: pointer;

  width: 100%;
  height: auto;

  border: none;

  border-radius: 50px;

  font-family: Roboto;
  font-size: 20px;

  transition: all 0.2s ease-in-out

  &:active {
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
  `)}
  }

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
      `)}

  ${({ position }) =>
    `
        grid-column-start: ${position.column * 2};
        grid-column-end: ${
          !position.zero ? position.column * 2 + 1 : position.column + 4
        };
        grid-row-start: ${position.row * 2};
        grid-row-end: ${position.row * 2 + 1};
      `}
`;
