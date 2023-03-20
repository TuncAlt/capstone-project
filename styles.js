import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
  }
  body{
    box-sizing: border-box;
    margin: 0;
    font-family: system-ui;
    background: #142d4c;
    }`;
