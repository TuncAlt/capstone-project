import DeviceChart from "@/components/Chart/chart";
import DeviceDeleteButton from "@/components/EditComponents/DeviceDeleteButton";
import DevivceEditButton from "@/components/EditComponents/DeviceEditButton";
import TemperatureEdit from "@/components/EditComponents/TemperatureEdit";
import { StyledHeader, StyledWrapper } from "@/styles";
import moment from "moment";
import { useRouter } from "next/router";
import { MdAdd, MdSync } from "react-icons/md";
import styled from "styled-components";
import { uid } from "uid";

export default function Device({
  devices,
  deleteDevice,
  handleTemperatureUpdate,
}) {
  const router = useRouter();
  const { id } = router.query;

  const device = devices?.find((device) => device.id === id);

  const readings = device?.readings || [];
  const lastFiveReadings = readings
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(-5)
    .reverse();
  const lastFiveReadingsTable = readings
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(-5);
  const handleAddClick = () => {
    router.push(`/logTempForm?deviceId=${device.id}`);
  };
  const handleSyncClick = () => {
    handleTemperatureUpdate(device);
  };
  const isSyncBoxDisplayed = device?.generateData;
  if (!device) {
    return null;
  }

  return (
    <>
      <StyledHeader>{device.name}</StyledHeader>
      <StyledEditBox>
        <TemperatureEdit device={device} />
      </StyledEditBox>
      <StyledSettingsBox>
        <DevivceEditButton device={device} />
      </StyledSettingsBox>
      <StyledDeleteBox isSyncBoxDisplayed={isSyncBoxDisplayed}>
        <DeviceDeleteButton deleteDevice={deleteDevice} device={device} />
      </StyledDeleteBox>

      {device.generateData && (
        <StyledSyncBox>
          <MdSync onClick={handleSyncClick} />
        </StyledSyncBox>
      )}

      <StyledWrapper>
        {device?.readings?.length > 0 ? (
          <>
            <ChartContainer>
              <DeviceChart
                key={device.id}
                device={device}
                readings={readings}
                lastFiveReadings={lastFiveReadings}
              />
            </ChartContainer>

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
                  {lastFiveReadingsTable.map((reading) => (
                    <tr key={`${device.id}-${reading?.id}`}>
                      <td>{reading?.date}</td>
                      <td>{reading?.temperature} °C</td>
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
      </StyledWrapper>
    </>
  );
}

const StyledDeviceTemperatureBox = styled.button`
  position: absolute;
  top: 26px;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 20px;
`;

const StyledTableBox = styled.div`
  position: fixed;
  top: 55%;
`;
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
const StyledSettingsBox = styled.div`
  position: absolute;
  margin-left: 24vw;
  margin-top: 8.5vh;
  z-index: 1;
`;
const StyledEditBox = styled.div`
  position: absolute;
  margin-left: 62.5vw;
  margin-top: 8vh;
  z-index: 1;
`;
const StyledDeleteBox = styled.div`
  position: absolute;
  margin-left: ${({ isSyncBoxDisplayed }) =>
    isSyncBoxDisplayed ? "62vw" : "42vw"};
  margin-top: ${({ isSyncBoxDisplayed }) =>
    isSyncBoxDisplayed ? "15vh" : "19.5vh"};
  z-index: 1;
`;

const ChartContainer = styled.div`
  position: absolute;
  top: 32.5%;
  width: 70%;
  height: 20%;
`;

const StyledSyncBox = styled.button`
  position: absolute;
  margin-left: 24vw;
  margin-top: 15vh;
  z-index: 1;
  font-size: 1.5rem;
  color: white;
  background-color: transparent;
  border: none;
`;
