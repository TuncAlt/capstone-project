import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
  }
  body{
    box-sizing: border-box;
    margin: 10px;
    font-family: system-ui;
    background: #004445;
    }`;

export const StyledWrapper = styled.div`
  background: #2c786c;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 75vh;
  margin-left: 7.5%;
  border-radius: 36px;
  flex-wrap: wrap;
  position: absolute;
  overflow: scroll;
  top: 13%;
`;

export const StyledHeader = styled.h1`
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8b400;
  color: white;
  margin-left: 10%;
  border-radius: 16px;
  font-size: 24px;
`;
