import { StyledHeader, StyledWrapper } from "@/styles";
import { MdAlarm } from "react-icons/md";
import styled from "styled-components";

const StyledListItem = styled.li`
  margin-bottom: 14px;
  padding-bottom: 5px;
  width: 220px;
  border-radius: 16px;
  border: solid white 1px;
  text-decoration: none;
  list-style: none;
  color: white;
  text-align: center;
  font-size: 16px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: rgba(255, 255, 255, 0.6);
`;
const StyledUlContainer = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: relative;
  bottom: 8%;
`;
const StyledWelcomeHeader = styled.h1`
  font-size: 36px;
  margin: 0;
  text-align: center;
  color: white;
`;

export default function descriptPage() {
  return (
    <>
      <StyledHeader>Information</StyledHeader>
      <StyledWrapper>
        <StyledWelcomeHeader>Welcome to Prevento</StyledWelcomeHeader>
        <StyledUlContainer>
          <StyledListItem>Easy device management</StyledListItem>
          <StyledListItem>Real-time temperature monitoring</StyledListItem>
          <StyledListItem>Customizable temperature thresholds</StyledListItem>
          <StyledListItem>Alert notifications</StyledListItem>
          <StyledListItem>Let&apos;s get started!</StyledListItem>
        </StyledUlContainer>
      </StyledWrapper>
    </>
  );
}
