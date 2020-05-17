import styled from "styled-components";

export const OSPreferenceBasedDiv = styled.div`
  @media (prefers-color-scheme: dark) {
    background-color: black;
  }
  @media (prefers-color-scheme: light) {
    background-color: white;
  }
`;
