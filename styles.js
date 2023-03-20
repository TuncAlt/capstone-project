import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
  }
  body{
    box-sizing: border-box;
    margin: 10px;
    font-family: system-ui;
    background: #142d4c;
    }`;
