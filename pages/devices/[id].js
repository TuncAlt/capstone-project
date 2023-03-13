import Link from "next/link";
import { useRouter } from "next/router";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";

const StyledDeviceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledDeviceTemperatureBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

export default function Device({ devices }) {
  const router = useRouter();
  const { id } = router.query;

  const device = devices.find((device) => device.id === id);
  if (!device) {
    return null;
  }

  return (
    <StyledDeviceContainer>
      <h1>{device.name}</h1>
      {device?.readings?.length > 0 ? (
        <StyledDeviceTemperatureBox>
          {device.readings[device.readings.length - 1].temperature}°C
        </StyledDeviceTemperatureBox>
      ) : (
        <StyledDeviceTemperatureBox>
          <Link href="/logTempForm">
            {" "}
            <MdAdd />{" "}
          </Link>
        </StyledDeviceTemperatureBox>
      )}
    </StyledDeviceContainer>
  );
}
