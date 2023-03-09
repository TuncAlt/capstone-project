import { useForm } from "react-hook-form";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import { useState } from "react";
import HeaderNavigation from "@/components/Navigation/HeaderNavigation";

//STYLING
const StyledFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: glass-effect;
  padding: 20px;
  border-radius: 10px;
  border: solid white 1px;
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

const StyledWrapper = styled.div`
  position: relative;
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
`;

const StyledToggleSpan = styled.span`
  color: white;
  margin-right: 40px;
`;

// The ToggleSwitch(Checkbox) is copied by this example "https://codesandbox.io/s/6v7n1vr8yn?file=/src/index.js"
const CheckBoxWrapper = styled.div`
  position: relative;
  display: flex;
  justify-conent: flex-end;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;
//FUNCTIONALITY

export default function AddDeviceForm() {
  const [submitMessage, setSubmitMessage] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [devices, setDevices] = useLocalStorageState("devices", {
    defaultValue: [],
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
    <>
      <HeaderNavigation />
      <StyledWrapper>
        <StyledFormContainer onSubmit={handleSubmit(onSubmit)}>
          <CheckBoxWrapper>
            <CheckBox
              id="checkbox"
              type="checkbox"
              value="true"
              {...register("generateData")}
              onChange={handleToggle}
              checked={isAutomatic}
            />
            <CheckBoxLabel htmlFor="checkbox" />
          </CheckBoxWrapper>

          <StyledLabel htmlFor="DeviceName">
            <StyledInput
              {...register("name", {
                required: true,
                maxLength: 20,
              })}
              id="DeviceName"
              placeholder="Device Name"
            />
            {errors.name && (
              <StyledError>Please type in a Device Name</StyledError>
            )}
          </StyledLabel>
          <StyledLabel htmlFor="DeviceLocation">
            <StyledInput
              {...register("location", { required: true, maxLength: 20 })}
              id="DeviceLocation"
              placeholder="Device Location"
            />
            {errors.location && (
              <StyledError>Pleace type in a Location</StyledError>
            )}
          </StyledLabel>
          <StyledLabel>
            <StyledSelectField {...register("type", { required: true })}>
              <option value="Please Select Device" disabled selected>
                Please Select Device
              </option>
              <option value="Refrigerator">Refrigerator</option>
              <option value="Freezer">Freezer</option>
              <option value="Prep Table">Prep Table</option>
            </StyledSelectField>
            {errors.type && (
              <StyledError>Please select a Devicetype</StyledError>
            )}
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
          <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
          {submitMessage && (
            <StyledSubmit>Device Succesfully Added!</StyledSubmit>
          )}
        </StyledFormContainer>
      </StyledWrapper>
    </>
  );
}
