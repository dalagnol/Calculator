import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.calculator?.backgroundColor};
  @media (prefers-color-scheme: dark) {

  }
  
  width: 235px;
  height: 335px;

  display: grid;

  grid-template-columns: 15px 40px 15px 40px 15px 40px 15px 40px 15px;
  grid-template-rows: 15px 35px 15px 40px 15px 40px 15px 40px 15px 40px 15px 40px 15px;
`;

export const Screen = styled.div`
  display: flex;
  justify-content: flex-end;

  background-color: ${({ theme }) => theme.calculator?.backgroundColor};

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
