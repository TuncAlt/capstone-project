import { useRouter } from "next/router";
import { useState } from "react";
import { MdCheck, MdDelete } from "react-icons/md";
import styled from "styled-components";

const StyledButtonContainer = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: #faf5e4;
  cursor: pointer;
`;

const StyledProgressBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20%;
  width: 100%;
  background-color: #faf5e4;
  z-index: 9999;
`;

const StyledProgressBar = styled.div`
  background-color: #ddd;
  border-radius: 8px;
  height: 20px;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 16px;
  position: relative;

  &:after {
    content: "";
    display: block;
    background-color: #00bfff;
    border-radius: 8px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    animation: progress 0.66s ease-in-out;
  }

  span {
    position: absolute;
    top: -32px;
    left: 0;
    font-size: 24px;
    font-weight: bold;
    color: #00bfff;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  }

  @keyframes progress {
    0% {
      width: 100%;
    }
    50% {
      width: 50%;
    }
    100% {
      width: 0%;
    }
  }
`;
const StyledDeleteIconContainer = styled.div`
  height: 50%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #faf5e4;
  display: flex;
  animation: jump 0.5s ease-in-out 1;
  transform-origin: center;

  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export default function DeviceDeleteButton({ deleteDevice, device }) {
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteDevice = (device) => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setDeleteMessage(true);
      console.log("device is getting deleted");
      setTimeout(() => {
        console.log("device is deleted");
        deleteDevice(device.id);
        router.push("/");
      }, 1000); // wait for 1 second before navigating back to home
    }, 1000); // simulate the delete process taking 2 seconds
  };
  return (
    <>
      <StyledButtonContainer disabled={isDeleting}>
        <MdDelete onClick={() => handleDeleteDevice(device)} />
      </StyledButtonContainer>
      {isDeleting && (
        <StyledProgressBarContainer>
          <span>
            <StyledProgressBar></StyledProgressBar>
            device is getting deleted
          </span>
        </StyledProgressBarContainer>
      )}
      {deleteMessage && (
        <StyledDeleteIconContainer>
          <MdCheck size={100} />
        </StyledDeleteIconContainer>
      )}
    </>
  );
}
