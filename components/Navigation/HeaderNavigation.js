import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80%;
  margin: 0 auto;
`;

const StyledAddDeviceLink = styled(Link)`
  border: solid 1px;
  border-radius: 16px 0 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  width: 40%;
  height: 40px;
  background-color: ${({ isactive }) => (isactive ? "#072A5E" : "#536580")};
`;

const StyledLogTempLink = styled(Link)`
  border: solid 1px;
  border-radius: 0 16px 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  width: 40%;
  height: 40px;
  background-color: ${({ isactive }) => (isactive ? "#072A5E" : "#536580")};
`;

export default function HeaderNavigation() {
  const router = useRouter();
  return (
    <StyledLinkContainer>
      <StyledAddDeviceLink
        href="/addDeviceForm"
        isactive={router.pathname === "/addDeviceForm"}
      >
        Add Device
      </StyledAddDeviceLink>
      <StyledLogTempLink
        href="/logTempForm"
        isactive={router.pathname === "/logTempForm"}
      >
        Log Temp
      </StyledLogTempLink>
    </StyledLinkContainer>
  );
}
