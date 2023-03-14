import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import Link from "next/link";
import styled from "styled-components";

//Styling
const StyledWrapper = styled.div`
  background: rgb(7, 42, 95);
  background: radial-gradient(
    circle,
    rgba(7, 42, 95, 1) 0%,
    rgba(227, 227, 227, 0) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 75vh;
  margin-left: 10%;
  border-radius: 36px;
  flex-wrap: wrap;
`;

const StyledLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: glass-effect;
  padding: 20px;
  border-radius: 10px;
  border: solid white 1px;
  width: 80%;
  height: 5%;
  box-sizing: border-box;
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
  width: 60%;
  height: 40%;
  border-radius: 16px;
  order: 2;
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  display: flex;
  align-conten: center;
  align-items: center;
  text-align: center;
`;

const StyledTempLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
const StyledTempLink = styled(Link)`
  color: ${({ color }) => color};
  font-size: 24px;
  order: 3;
`;

const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  top: 20px;
  color: white;
`;

//Function

export default function DeviceList({ devices }) {
  return (
    <>
      <StyledHeader>Welcome</StyledHeader>
      <StyledWrapper>
        {devices?.length > 0 ? (
          devices.map((device) => (
            <StyledLinkContainer key={device.id}>
              <StyledTempLinkWrapper>
                {device?.readings &&
                device.readings[device.readings.length - 1].temperature > 0 ? (
                  <StyledTempReading>
                    {device.readings[device.readings.length - 1].temperature}°C
                  </StyledTempReading>
                ) : (
                  <StyledTempReading />
                )}
                <StyledLink href={`/devices/${device.id}`}>
                  <StyledDeviceName>{device.name}</StyledDeviceName>
                </StyledLink>
              </StyledTempLinkWrapper>
              {device?.readings &&
              device.readings[device.readings.length - 1].temperature > 0 ? (
                <>
                  {Number(device?.readings?.temperature) >
                  Number(device.maxTemp) ? (
                    <StyledIconWrapper>
                      {" "}
                      <FaExclamationTriangle />
                    </StyledIconWrapper>
                  ) : Number(device?.readings?.temperature) <
                    Number(device.minTemp) ? (
                    <StyledIconWrapper>
                      {" "}
                      <FaExclamationTriangle />
                    </StyledIconWrapper>
                  ) : null}
                </>
              ) : (
                <StyledTempLink href="/logTempForm">
                  <StyledTempReading>
                    <MdAdd />
                  </StyledTempReading>
                </StyledTempLink>
              )}
            </StyledLinkContainer>
          ))
        ) : (
          <StyledAddLink href="/addDeviceForm">
            Hello there!
            <br />
            Click to add a new device
          </StyledAddLink>
        )}
      </StyledWrapper>
    </>
  );
}
