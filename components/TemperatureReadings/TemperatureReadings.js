import { useState } from "react";
import { useRouter } from "next/router";
import {
  MdEdit,
  MdDelete,
  MdCancel,
  MdSave,
  MdArrowBack,
} from "react-icons/md";
import styled from "styled-components";
import { StyledWrapper, StyledHeader } from "../../styles";

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
    <>
      <StyledHeader font-size={24}>Temperature Readings</StyledHeader>
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
        <StyledIconContainer>
          <MdArrowBack onClick={() => router.back()} />
        </StyledIconContainer>
      </StyledWrapper>
    </>
  );
}
const StyledButtonContainer = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  color: white;
  text-decoration: none;
`;

const StyledTableBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 12%;
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

const StyledSearchBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  position: absolute;
  top: 0;
`;

const StyledSearchInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
  background-color: white;
`;

const StyledInputField = styled.input`
  width: 20px;
  margin: 0;
`;

const StyledIconContainer = styled.button`
  position: absolute;
  top: 4%;
  left: 6%;
  color: white;
  font-size: 30px;
  background-color: Transparent;
  border: none;
`;
