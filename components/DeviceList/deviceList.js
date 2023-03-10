import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import Link from "next/link";
import styled from "styled-components";

//Styling
const StyledWrapper = styled.div`
  background: rgb(91, 105, 124);
  background: linear-gradient(
    0deg,
    rgba(91, 105, 124, 1) 0%,
    rgba(34, 90, 195, 1) 92%
  );
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  margin: 4px;
  width: 80%;
  height: 5%;
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
  color: white;
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
  border: solid 1px white;
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
  color: red;
  font-size: 24px;
  order: 3;
  color: white;
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
                  {device.readings && device.readings.length > 0 ? <StyledTempReading>
                  {device.readings[1].temperature + "°C"}
                  </StyledTempReading>
                    : ""}
                <StyledLink href={`/`}>
                  <StyledDeviceName>{device.name}</StyledDeviceName>
                </StyledLink>
              </StyledTempLinkWrapper>
              {device.readings && device.readings.length > 0 ? (
                <>
                  {Number(device.readings[1].temperature) >
                  Number(device.maxTemp) ? (
                    <StyledIconWrapper style={{ color: "red" }}>
                      {" "}
                      <FaExclamationTriangle />
                    </StyledIconWrapper>
                  ) : Number(device.readings[1].temperature) <
                    Number(device.minTemp) ? (
                    <StyledIconWrapper style={{ color: "red" }}>
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
            Oh it seems there is no Device added
            <br />
            Click to add a new device
          </StyledAddLink>
        )}
      </StyledWrapper>
    </>
  );
}
