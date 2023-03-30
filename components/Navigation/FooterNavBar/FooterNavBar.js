import Link from "next/link";
import { MdHome, MdAdd } from "react-icons/md";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  wrap: wrap;
  align-items: center;
  width: 33.33%;
  height: 50px;
  color: white;
  font-size: 40px;
`;

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

export default function FooterNavBar() {
  return (
    <FooterContainer>
      <StyledLink href="/" aria-label="link to homepage">
        <MdHome />
      </StyledLink>
      <StyledLink href="/addDeviceForm" aria-label="link to add Device Form">
        <MdAdd />
      </StyledLink>
    </FooterContainer>
  );
}
