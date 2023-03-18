import TemperatureEdit from "@/components/EditComponents/TemperatureEdit";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdAdd, MdEdit, MdSettings } from "react-icons/md";
import styled from "styled-components";

const StyledDeviceContainer = styled.div`
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
  flex-direction: column;
  position: relative;
  flex: wrap;
  overflow: auto;
`;
const StyledHeader = styled.h1`
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #072a5e;
  color: white;
  margin-left: 10%;
  border-radius: 16px;
`;
const StyledDeviceTemperatureBox = styled.button`
  position: absolute;
  top: 26px;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 20px;
`;

const StyledTableBox = styled.div``;
const StyledTable = styled.table`
  width: 100%;
  height: 60%;
  th {
    border-bottom: solid 1px white;
    color: white;
    text-align: start;
  }
  td {
    text-align: end;
    padding: 2px;
    color: white;
  }
`;
const StyledComponentBox = styled.div`
  position: absolute;
  margin-left: 95px;
  margin-top: 65px;
  z-index: 1;
`;

export default function Device({ devices }) {
  const router = useRouter();
  const { id } = router.query;

  const device = devices?.find((device) => device.id === id);
  const readings = device?.readings || [];

  const lastFiveReadings = readings.slice(-5).reverse();

  const handleAddClick = () => {
    router.push(`/logTempForm?deviceId=${device.id}`);
  };

  if (!device) {
    return null;
  }

  return (
    <>
      <StyledHeader>{device.name}</StyledHeader>
      <StyledComponentBox>
        <TemperatureEdit device={device} />
      </StyledComponentBox>

      <StyledDeviceContainer>
        {device?.readings?.length > 0 ? (
          <>
            <StyledDeviceTemperatureBox onClick={handleAddClick}>
              {device.readings[device.readings.length - 1].temperature}°
            </StyledDeviceTemperatureBox>
            <StyledTableBox>
              <StyledTable>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  {lastFiveReadings.map((reading) => (
                    <tr key={`${device.id}-${reading.id}`}>
                      <td>{reading.date}</td>
                      <td>{reading.temperature} °C</td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            </StyledTableBox>
          </>
        ) : (
          <StyledDeviceTemperatureBox onClick={handleAddClick}>
            <MdAdd />
          </StyledDeviceTemperatureBox>
        )}
        {!device?.readings?.length && <div>No readings yet.</div>}
      </StyledDeviceContainer>
    </>
  );
}
