import { useForm } from "react-hook-form";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { uid } from "uid";
import { MdCheck } from "react-icons/md";
import { StyledWrapper, StyledHeader } from "@/styles";
import HeaderNavigation from "@/components/Navigation/HeaderNavigation";

// FUNCTIONALITY
export default function LogTemperatureForm() {
  const router = useRouter();
  const { deviceId } = router.query;
  const [submitMessage, setSubmitMessage] = useState(false);
  const [devices, setDevices] = useLocalStorageState("devices", {
    defaultValue: [],
  });
  useEffect(() => {}, [deviceId]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().substr(0, 10),
    },
  });

  // On submit, add the temperature reading to the device's readings array
  const onSubmit = (data, event) => {
    event.target.reset();
    // find the index of the selected device
    const deviceIndex = devices.findIndex(
      (device) => device.id === data.device
    );

    // selecting device and updating readings array with date and temp
    if (!Array.isArray(devices[deviceIndex].readings)) {
      devices[deviceIndex].readings = [];
    }

    const updatedDevice = {
      ...devices[deviceIndex],

      readings: [
        ...devices[deviceIndex].readings,
        { date: data.date, temperature: data.temperature, id: uid() },
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
          <StyledLabel>
            <StyledSelectField
              {...register("device", { required: true })}
              defaultValue={deviceId}
            >
              <option value="" disabled selected>
                Select a device
              </option>
              {devices?.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name}
                </option>
              ))}
            </StyledSelectField>
            {errors.device && <StyledError>Please select a device</StyledError>}
          </StyledLabel>

          <StyledLabel>
            <StyledInput
              type="date"
              {...register("date", {
                required: true,
                max: new Date().toISOString().substr(0, 10),
              })}
            />
            {errors.date && (
              <StyledError>Please select a valid date</StyledError>
            )}
          </StyledLabel>

          <StyledLabel>
            <StyledInput
              type="number"
              placeholder="Temperature"
              {...register("temperature", {
                required: true,
                min: -25,
                max: 25,
              })}
            />
            {errors.temperature && (
              <StyledError>Please enter a temperature</StyledError>
            )}
          </StyledLabel>

          <StyledSubmitButton type="submit">Submit</StyledSubmitButton>

          {submitMessage && (
            <StyledSubmitMessage>
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

// STYLING

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
  text-align: center;
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
