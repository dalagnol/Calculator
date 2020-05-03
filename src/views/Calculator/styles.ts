import styled from "styled-components";

const rowMargin = navigator?.userAgent?.toLowerCase().includes("macintosh")
  ? "20px"
  : "13px";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.calculator?.backgroundColor};
  background-image: ${({ theme }) => theme.calculator?.backgroundImage};
  background-size: ${({ theme }) => theme.calculator?.backgroundSize};

  -webkit-app-region: drag;

  width: 100vw;
  height: 100vh;

  margin: 0;

  justify-content: center;
  align-content: center;

  display: grid;

  grid-template-columns: 15px 40px 15px 40px 15px 40px 15px 40px 15px;
  grid-template-rows: 15px 35px ${rowMargin} 40px ${rowMargin} 40px ${rowMargin} 40px ${rowMargin} 40px ${rowMargin} 40px ${rowMargin};
`;

export const Screen = styled.div`
  display: flex;
  justify-content: flex-end;

  grid-column-start: 2;
  grid-column-end: 9;
  grid-row-start: 1;
  grid-row-end: 3;

  overflow: hidden;
`;

export const Result = styled.h1`
  font-family: Roboto;
  font-size: 1.8em;

  color: ${({ theme }) => theme.calculator?.text};

  margin-right: 10px;
  margin-top: 20px;
`;
