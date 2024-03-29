import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledLinkContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #385170;
  color: white;
  border-radius: 16px;
`;

const StyledAddDeviceLink = styled(Link)`
  font-size: 24px;
  position: relative;
  border: solid 1px;
  border-radius: 16px 0 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? "#faf5e4" : "black")};
  width: 50%;
  height: 50px;
  background-color: ${({ isActive }) => (isActive ? "#f8b400" : "#ececec")};
`;

const StyledLogTempLink = styled(Link)`
  font-size: 24px;
  position: relative;
  border: solid 1px;
  border-radius: 0 16px 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? "#faf5e4" : "black")};
  width: 50%;
  height: 50px;
  background-color: ${({ isActive }) => (isActive ? "#f8b400" : "#ececec")};
`;

export default function HeaderNavigation() {
  const router = useRouter();
  return (
    <StyledLinkContainer>
      <StyledAddDeviceLink
        href="/addDeviceForm"
        isActive={router.pathname === "/addDeviceForm"}
      >
        Add Device
      </StyledAddDeviceLink>
      <StyledLogTempLink
        href="/logTempForm"
        isActive={router.pathname === "/logTempForm"}
      >
        Log Temp
      </StyledLogTempLink>
    </StyledLinkContainer>
  );
}
