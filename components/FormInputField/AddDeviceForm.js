import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "react-use";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

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
`;

export default function AddDeviceForm() {
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [storedDeviceData, setStoredDeviceData] =
    useLocalStorage("Device Data");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleToggle = () => {
    setIsAutomatic(!isAutomatic);
  };

  const onSubmit = (data, event) => {
    event.target.reset();
    const id = uuidv4();
    const newData = { ...data, id };
    setStoredDeviceData(storedDeviceData, newData);
  };

  return (
    <StyledFormContainer onSubmit={handleSubmit(onSubmit)}>
      <input
        type="radio"
        value="manual"
        {...register("generateData")}
        onChange={handleToggle}
        checked={isAutomatic}
      />
      <StyledLabel>
        <StyledInput {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
      </StyledLabel>
      <StyledLabel>
        <StyledInput {...register("location", { required: true })} />
        {errors.location && <span>This field is required</span>}
      </StyledLabel>
      <StyledLabel>
        <select {...register("type", { required: true })}>
          <option value="">Select a type</option>
          <option value="Refrigerator">Refrigerator</option>
          <option value="Freezer">Freezer</option>
          <option value="Prep Table">Prep Table</option>
        </select>
        {errors.type && <span>This field is required</span>}
      </StyledLabel>
      <StyledLabel>
        <StyledInput
          type="number"
          placeholder="min Temp"
          {...register("minTemp", { required: true })}
        />
        {errors.minTemp && <span>This field is required</span>}
      </StyledLabel>
      <StyledLabel>
        <StyledInput
          type="number"
          placeholder="max Temp"
          {...register("maxTemp", { required: true })}
        />
        {errors.maxTemp && <span>This field is required</span>}
      </StyledLabel>
      <button type="submit">Submit</button>
    </StyledFormContainer>
  );
}
