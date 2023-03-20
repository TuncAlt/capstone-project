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
    background: rgb(7, 42, 95);
    background: radial-gradient(
      circle,
      rgba(7, 42, 95, 1) 0%,
      rgba(227, 227, 227, 0) 100%
    );
    }`;
