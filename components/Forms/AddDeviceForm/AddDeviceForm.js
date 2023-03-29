import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdCheck } from "react-icons/md";
import { StyledHeader, StyledWrapper } from "@/styles";
import HeaderNavigation from "@/components/Navigation/HeaderNavigation";

//FUNCTIONALITY

export default function AddDeviceForm({ addDevice, devices, updateDevice }) {
  const router = useRouter();
  const { deviceId } = router.query;
  // find the device with matching deviceId
  const device = devices?.find((device) => device.id === deviceId);
  const [submitMessage, setSubmitMessage] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(device?.generateData || false);
  // if device not found, render null
  console.log(device);
  //register stores value from each input field in data, has a handleSubmit Function and error handling
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (device) {
      setValue("name", device.name);
      setValue("location", device.location);
      setValue("type", device.type);
      setValue("minTemp", device.minTemp);
      setValue("maxTemp", device.maxTemp);
      setValue("generateData", device.generateData);
    }
  }, [device, setValue]);
  // toggle Function for Checkbox
  const handleToggle = () => {
    setIsAutomatic(!isAutomatic);
  };
  // on Submit -> submitted data is stored in local storage,
  //submitMessage is getting displayed for 3 sec. after that the form is getting resetet
  const onSubmit = (data, event) => {
    event.target.reset();
    if (device) {
      updateDevice(device.id, data);
      setSubmitMessage(true);
    } else {
      addDevice(data);
      setSubmitMessage(true);
    }
    setSubmitMessage(true);
    setTimeout(() => {
      setSubmitMessage(false);
      router.back();
    }, 500);
  };

  return (
    <>
      <StyledHeader>
        <HeaderNavigation />
      </StyledHeader>
      <StyledWrapper>
        <StyledFormContainer onSubmit={handleSubmit(onSubmit)}>
          <CheckBoxWrapper>
            <CheckBoxLabel htmlFor="checkbox" aria-label="generate data" />
            <CheckBox
              id="checkbox"
              type="checkbox"
              value="true"
              {...register("generateData")}
              onToggle={handleToggle}
            />
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
            <StyledSubmitMessage aria-live="assertive">
              <StyledSubmit>
                <MdCheck />
              </StyledSubmit>
            </StyledSubmitMessage>
          )}
        </StyledFormContainer>
      </StyledWrapper>
    </>
  );
}
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
const StyledSubmit = styled.div`
  align-items: center;
  display: flex;
  color: white;
  background-color: green;
  padding: 5px;
  border-radius: 5px;
  justify-content: center;
  position: relative;
  animation: jump 1s ease-in-out 3;

  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-20px);
    }
    50% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const StyledSubmitButton = styled.button`
  margin: 10px;
  padding: 10px;
  width: 240px;
  border-radius: 16px;
  position: relative;
`;

const StyledSelectField = styled.select`
  margin: 10px;
  padding: 10px;
  width: 240px;
  border-radius: 16px;
  position: relative;
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
const StyledSubmitMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: green;
`;
