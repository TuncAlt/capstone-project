import { FaExclamationTriangle } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import Link from "next/link";
import styled from "styled-components";
import { StyledHeader } from "../../styles";
import { useRouter } from "next/router";

//Styling

//Function

export default function DeviceList({ devices }) {
  const router = useRouter();
  const handleAddClick = (deviceId) => {
    router.push(`/logTempForm?deviceId=${deviceId}`);
  };
  return (
    <>
      <StyledHeader>Prevento</StyledHeader>
      <StyledListWrapper>
        {devices?.length > 0 ? (
          devices.map((device) => (
            <StyledLinkContainer key={device.id}>
              <StyledTempLinkWrapper>
                {device?.readings &&
                device?.readings[device?.readings?.length - 1]?.temperature !=
                  null ? (
                  <StyledTempReading>
                    {device.readings[device?.readings?.length - 1].temperature}
                    °C
                  </StyledTempReading>
                ) : (
                  <StyledTempReading />
                )}
                <StyledLink href={`/devices/${device.id}`}>
                  <StyledDeviceName>{device.name}</StyledDeviceName>
                </StyledLink>
              </StyledTempLinkWrapper>
              {device?.readings &&
              device?.readings[device?.readings?.length - 1]?.temperature !=
                null ? (
                <>
                  {Number(
                    device?.readings[device?.readings?.length - 1]?.temperature
                  ) > Number(device.maxTemp) ||
                  Number(
                    device?.readings[device?.readings?.length - 1]?.temperature
                  ) < Number(device.minTemp) ? (
                    <StyledIconWrapper>
                      <FaExclamationTriangle />
                    </StyledIconWrapper>
                  ) : null}
                </>
              ) : !device?.readings ? (
                <StyledTempButton
                  aria-label="add temperature to device"
                  onClick={() => handleAddClick(device.id)}
                >
                  <MdAdd />
                </StyledTempButton>
              ) : null}
            </StyledLinkContainer>
          ))
        ) : (
          <>
            <StyledWelcomeHeader>Welcome to Prevento</StyledWelcomeHeader>
            <StyledUlContainer>
              <StyledListItem>Easy device management</StyledListItem>
              <StyledListItem>Real-time temperature monitoring</StyledListItem>
              <StyledListItem>
                Customizable temperature thresholds
              </StyledListItem>
              <StyledListItem>Alert notifications</StyledListItem>
              <StyledAddLink href={"/addDeviceForm"}>
                Let&apos;s get started!
              </StyledAddLink>
            </StyledUlContainer>
          </>
        )}
      </StyledListWrapper>
    </>
  );
}

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
  top: 20px;
`;
const StyledWelcomeHeader = styled.h1`
  font-size: 36px;
  margin: 0;
  text-align: center;
  color: white;
  top: 20px;
  position: relative;
`;
const StyledLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: rgba(255, 255, 255, 0.6);
  padding: 12px;
  margin: 8px;
  border-radius: 16px;
  border: solid white 1px;
  width: 80%;
  height: 10%;
  position: relative;
`;

const StyledDeviceName = styled.h2`
  font-size: 24px;
  margin: 0;
  text-align: center;
`;

const StyledTempReading = styled.span`
  font-size: 24px;
  order: 1;
  color: white;
`;

const StyledIconWrapper = styled.span`
  color: red;
  font-size: 24px;
  order: 3;
`;

const StyledLink = styled(Link)`
  width: 100%;
  border-radius: 16px;
  order: 2;
  text-decoration: none;
  color: white;
`;
const StyledAddLink = styled(Link)`
  width: 220px;
  position: relative;
  border-radius: 16px;
  top: 20px;
  border: solid white 1px;
  text-decoration: none;
  list-style: none;
  color: white;
  text-align: center;
  font-size: 16px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: #f8b400;
`;

const StyledTempLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
const StyledTempButton = styled.button`
  color: ${({ color }) => color};
  font-size: 24px;
  order: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const StyledPTag = styled.p`
  font-size: 18px;
  color: white;
  margin: 10px 0;
  text-align: center;
`;

export const StyledListWrapper = styled.div`
  background: #2c786c;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80vw;
  height: 75vh;
  margin-left: 7.5%;
  border-radius: 36px;
  flex-direction: column;
  flex-wrap: wrap;
  position: absolute;
  overflow-y: scroll;
  top: 13%;
`;
