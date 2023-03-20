import { useState } from "react";
import { useRouter } from "next/router";
import { MdEdit, MdDelete, MdCancel, MdSave } from "react-icons/md";
import styled from "styled-components";

const StyledButtonContainer = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  color: white;
  text-decoration: none;
`;

const StyledWrapper = styled.div`
  background: #385170;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 75vh;
  margin-left: 10%;
  border-radius: 36px;
  flex-direction: column;
  position: relative;
`;

const StyledHeader = styled.h1`
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #385170;
  color: white;
  margin-left: 10%;
  border-radius: 16px;
  font-size: 24px;
  top: 20px;
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
const StyledContentWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgb(7, 42, 95);
  background: radial-gradient(
    circle,
    rgba(7, 42, 95, 1) 0%,
    rgba(227, 227, 227, 0) 100%
  );
`;
const StyledInputField = styled.input`
  width: 20px;
  margin: 0;
`;

export default function TemperatureReadings({
  devices,
  deleteReading,
  editReading,
}) {
  const router = useRouter();
  const { deviceId } = router.query;
  const [searchTerm, setSearchTerm] = useState("");
  const [editingReadingId, setEditingReadingId] = useState(null);
  const [editedTemperature, setEditedTemperature] = useState("");

  // find the device with matching deviceId
  const device = devices?.find((device) => device.id === deviceId);
  // if device not found, render null
  if (!device) {
    return null;
  }

  // filter the readings based on deviceId
  const readings = device?.readings?.filter((reading) =>
    reading.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteReading = (deviceId, readingId) => {
    deleteReading(deviceId, readingId);
  };

  const handleEdit = (readingId, currentTemperature) => {
    setEditingReadingId(readingId);
    setEditedTemperature(currentTemperature);
  };

  const handleSave = (deviceId, readingId) => {
    editReading(deviceId, readingId, editedTemperature);
    setEditingReadingId(null);
    setEditedTemperature("");
  };

  const handleCancel = () => {
    setEditingReadingId(null);
    setEditedTemperature("");
  };

  // render the list of readings with edit and delete functionality
  return (
    <StyledContentWrapper>
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
              {readings?.map((reading) => (
                <tr key={`${device.id}-${reading.id}`}>
                  <td>{reading?.date} </td>
                  <td>
                    {editingReadingId === reading.id ? (
                      <StyledInputField
                        type="number"
                        value={editedTemperature}
                        onChange={(event) =>
                          setEditedTemperature(event.target.value)
                        }
                      />
                    ) : (
                      `${reading?.temperature}°C`
                    )}
                  </td>

                  <StyledButtonContainer>
                    {editingReadingId === reading.id ? (
                      <StyledButtonContainer
                        onClick={() => handleSave(device.id, reading.id)}
                      >
                        <MdSave />
                      </StyledButtonContainer>
                    ) : (
                      <MdEdit
                        onClick={() =>
                          handleEdit(reading.id, reading.temperature)
                        }
                      />
                    )}
                  </StyledButtonContainer>
                  <StyledButtonContainer>
                    {editingReadingId === reading.id ? (
                      <StyledButtonContainer>
                        <MdCancel onClick={handleCancel} />
                      </StyledButtonContainer>
                    ) : (
                      <MdDelete
                        onClick={() =>
                          handleDeleteReading(device.id, reading.id)
                        }
                      />
                    )}
                  </StyledButtonContainer>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </StyledTableBox>
      </StyledWrapper>
    </StyledContentWrapper>
  );
}
