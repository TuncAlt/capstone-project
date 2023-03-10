import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    
  }
  body {
    margin: 0;
    font-family: system-ui;
    box-sizing: border-box;
    background: linear-gradient(
      0deg,
      rgba(91, 105, 124, 1) 0%,
      rgba(34, 90, 195, 1) 92%
    );
   
  }
`;
