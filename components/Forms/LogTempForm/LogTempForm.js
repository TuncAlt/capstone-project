import { useForm } from "react-hook-form";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import { useState } from "react";

// STYLING
const StyledWrapper = styled.div`
  position: relative;
  background-image: url("your-background-image-here");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: lightgrey;
  padding: 20px;
  border-radius: 10px;
`;

const StyledLabel = styled.label`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  margin: 10px;
  padding: 10px;
  width: 220px;
  border-radius: 16px;
  border: ${({ error }) => (error ? "2px solid red" : "white")};
  position: relative;
  padding-bottom: ${({ error }) => (error ? "5px" : "10px")};
`;

const StyledError = styled.p`
  text-align: center;
  font-size: 8px;
  color: white;
  background-color: red;
  padding: 5px;
  border-radius: 16px;
`;

const StyledSubmit = styled.p`
  display: flex;
  align-items: center;
  color: white;
  background-color: green;
  padding: 5px;
  border-radius: 5px;
`;

const StyledSubmitButton = styled.button`
  margin: 10px;
  padding: 10px;
  width: 220px;
  border-radius: 16px;
  position: relative;
`;

const StyledSelectField = styled.select`
  margin: 10px;
  padding: 10px;
  width: 220px;
  border-radius: 16px;
  position: relative;
`;

// FUNCTIONALITY
export default function LogTemperatureForm() {
  const [submitMessage, setSubmitMessage] = useState(false);
  const [devices, setDevices] = useLocalStorageState("devices", {
    defaultValue: [""],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // On submit, add the temperature reading to the device's readings array
  const onSubmit = (data, event) => {
    event.target.reset();
    // find the index of the selected device
    const deviceIndex = devices.findIndex(
      (device) => device.name === data.device
    );

    // selecting device and updating readings array with date and temp
    const updatedDevice = {
      ...devices[deviceIndex],
      readings: [
        devices[deviceIndex].readings,
        { date: data.date, temperature: data.temperature },
      ],
    };
    //slice is used to create a new array that includes all devices
    //up to index of the device that is getting updated
    //after that it getting passed to setDevices and updates the state devices
    setDevices([
      ...devices.slice(0, deviceIndex),
      updatedDevice,
      ...devices.slice(deviceIndex + 1),
    ]);
    setSubmitMessage(true);
    setTimeout(() => setSubmitMessage(false), 3000);
  };

  return (
    <StyledWrapper>
      <StyledFormContainer onSubmit={handleSubmit(onSubmit)}>
        <StyledLabel>
          <StyledSelectField {...register("device", { required: true })}>
            <option value="" disabled selected>
              Select a device
            </option>
            {devices.map((device, index) => (
              <option key={index} value={device.name}>
                {device.name}
              </option>
            ))}
          </StyledSelectField>
          {errors.device && <StyledError>Please select a device</StyledError>}
        </StyledLabel>

        <StyledLabel>
          <StyledInput type="date" {...register("date", { required: true })} />
          {errors.date && <StyledError>Please select a date</StyledError>}
        </StyledLabel>

        <StyledLabel>
          <StyledInput
            type="number"
            placeholder="Temperature"
            {...register("temperature", { required: true, min: -25, max: 25 })}
          />
          {errors.temperature && (
            <StyledError>Please enter a temperature</StyledError>
          )}
        </StyledLabel>

        <StyledSubmitButton type="submit">Submit</StyledSubmitButton>

        {submitMessage && (
          <StyledSubmit>Temperature reading successfully added!</StyledSubmit>
        )}
      </StyledFormContainer>
    </StyledWrapper>
  );
}
