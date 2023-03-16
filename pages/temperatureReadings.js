import { useState } from "react";
import { useRouter } from "next/router";
import { MdEdit, MdDelete } from "react-icons/md";
import styled from "styled-components";

const StyledButtonContainer = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  color: white;
`;

const StyledWrapper = styled.div`
  background: rgb(7, 42, 95);
  background: radial-gradient(
    circle,
    rgba(7, 42, 95, 1) 0%,
    rgba(227, 227, 227, 0) 100%
  );
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80vw;
  height: 75vh;
  margin-left: 10%;
  border-radius: 36px;
  flex-direction: column;
  position: relative;
`;

const StyledHeader = styled.h1`
  font-size: 24px;
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

const StyledSearchBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledSearchInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
`;

export default function TemperatureReadings({ devices, deleteReading }) {
  const router = useRouter();
  const { deviceId } = router.query;
  const [searchTerm, setSearchTerm] = useState("");

  // find the device with matching deviceId
  const device = devices?.find((device) => device.id === deviceId);
  console.log(device);
  // if device not found, render null
  if (!device) {
    return null;
  }

  // filter the readings based on deviceId
  const readings = device.readings.filter((reading) =>
    reading.date.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDeleteReading = (deviceId, readingIndex) => {
    deleteReading(deviceId, readingIndex);
  };
  // render the list of readings with edit and delete functionality
  return (
    <>
      <StyledHeader>Temperature Readings</StyledHeader>
      <StyledWrapper>
        <StyledSearchBox>
          <StyledSearchInput
            type="date"
            placeholder="Search by date"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </StyledSearchBox>
        <StyledTableBox>
          <StyledTable>
            <thead>
              <tr>
                <th>Date</th>
                <th>Temperature</th>
              </tr>
            </thead>
            <tbody>
              {readings?.map((reading, index) => (
                <tr key={device.id}>
                  <td>{reading?.date} </td>
                  <td>{reading?.temperature}°C</td>
                  <StyledButtonContainer>
                    <MdEdit />
                  </StyledButtonContainer>
                  <StyledButtonContainer>
                    <MdDelete
                      onClick={() => handleDeleteReading(device.id, index)}
                    />
                  </StyledButtonContainer>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </StyledTableBox>
      </StyledWrapper>
    </>
  );
}
