import { useForm } from "react-hook-form";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import { useState } from "react";

//STYLING
const StyledFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  font-size: 8px;
  color: white;
  background-color: red;
  padding: 5px;
  border-radius: 16px;
`;

const StyledSuccess = styled.p`
  display: flex;
  align-items: center;
  color: white;
  background-color: green;
  padding: 5px;
  border-radius: 5px;
`;
const StyledSubmit = styled.p`
  display: flex;
  align-items: center;
  color: white;
  background-color: green;
  padding: 5px;
  border-radius: 5px;
`;

//FUNCTIONALITY

export default function AddDeviceForm() {
  const [submitMessage, setSubmitMessage] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [devices, setDevices] = useLocalStorageState("devices", {
    defaultValue: [""],
  });
  //register stores value from each input field in data, has a handleSubmit Function and error handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // toggle Function for Checkbox
  const handleToggle = () => {
    setIsAutomatic(!isAutomatic);
  };
  // on Submit -> submitted data is stored in local storage,
  //submitMessage is getting displayed for 3 sec. after that the form is getting resettet
  const onSubmit = (data, event) => {
    event.target.reset();
    setDevices([...devices, data]);
    setSubmitMessage(true);
    setTimeout(() => setSubmitMessage(false), 3000);
  };

  return (
    <StyledFormContainer onSubmit={handleSubmit(onSubmit)}>
      <input
        type="checkbox"
        value="manual"
        {...register("generateData")}
        onChange={handleToggle}
        checked={isAutomatic}
      />
      <StyledLabel>
        <StyledInput
          {...register("name", {
            required: true,
            maxLength: 20,
          })}
        />
        {errors.name && <StyledError>Please type in a Device Name</StyledError>}
      </StyledLabel>
      <StyledLabel>
        <StyledInput
          {...register("location", { required: true, maxLength: 20 })}
        />
        {errors.location && (
          <StyledError>Pleace type in a Location</StyledError>
        )}
      </StyledLabel>
      <StyledLabel>
        <select {...register("type", { required: true })}>
          <option value="Refrigerator">Refrigerator</option>
          <option value="Freezer">Freezer</option>
          <option value="Prep Table">Prep Table</option>
        </select>
        {errors.type && <StyledError>Please select a Devicetype</StyledError>}
      </StyledLabel>
      <StyledLabel>
        <StyledInput
          type="number"
          placeholder="min Temp"
          {...register("minTemp", { required: true, min: -25, max: 25 })}
        />
        {errors.minTemp && (
          <StyledError>
            Please enter a temperature between -25°C and 25°C
          </StyledError>
        )}
      </StyledLabel>
      <StyledLabel>
        <StyledInput
          type="number"
          placeholder="max Temp"
          {...register("maxTemp", { required: true, min: -25, max: 25 })}
        />
        {errors.maxTemp && (
          <StyledError>
            Please enter a temperature between -25°C and 25°C
          </StyledError>
        )}
      </StyledLabel>
      <button type="submit">Submit</button>
      {submitMessage && <StyledSubmit>Device Succesfully Added!</StyledSubmit>}
    </StyledFormContainer>
  );
}
