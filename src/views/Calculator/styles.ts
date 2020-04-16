import styled from "styled-components";

const rowMargin = navigator?.userAgent?.toLowerCase().includes("macintosh")
  ? "20px"
  : "13px";

export const Container = styled.div`
  @media (prefers-color-scheme: dark) {
    body {
      background-color: black;
    }
  }

  background: ${({ theme }) => theme.calculator?.background};

  -webkit-app-region: drag;

  width: 100vw;
  height: 100vh;

  margin: 0;

  display: grid;

  grid-template-columns: 15px 40px 15px 40px 15px 40px 15px 40px 15px;
  grid-template-rows: 15px 35px ${rowMargin} 40px ${rowMargin} 40px ${rowMargin} 40px ${rowMargin} 40px ${rowMargin} 40px ${rowMargin};
`;

export const Screen = styled.div`
  display: flex;
  justify-content: flex-end;

  grid-column-start: 2;
  grid-column-end: 9;
  grid-row-start: 2;
  grid-row-end: 3;

  overflow: hidden;
`;

export const Result = styled.h1`
  font-family: Roboto;
  font-size: 1.3em;

  color: ${({ theme }) => theme.calculator?.text};

  margin-right: 10px;
`;
