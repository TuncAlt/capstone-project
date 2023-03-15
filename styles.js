import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    
  }
  body {
    margin: 0;
    font-family: system-ui;
    background: rgb(227,227,227);
background: radial-gradient(circle, rgba(227,227,227,0) 0%, rgba(7,42,95,1) 100%);
  }`;
