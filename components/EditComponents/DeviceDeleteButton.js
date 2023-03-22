import { useRouter } from "next/router";
import { useState } from "react";
import { MdCheck, MdDelete } from "react-icons/md";
import styled from "styled-components";

const StyledButtonContainer = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

const StyledCheckMark = styled.div`
  z-index: 1;
  color: white;
`;

export default function DeviceDeleteButton({ deleteDevice, device }) {
  const [deleteMessage, setDeleteMessage] = useState(false);
  const router = useRouter();

  const handleDeleteDevice = (device) => {
    deleteDevice(device.id);
    setDeleteMessage(true);
    console.log("device is getting deleted");
    setTimeout(() => {
      console.log("device is deleted");
      setDeleteMessage(false);
      router.push("/");
    }, 1000); // wait for 1 second before navigating back to home
  };

  return (
    <>
      {deleteMessage ? (
        <MdCheck size={60} />
      ) : (
        <StyledButtonContainer>
          <MdDelete onClick={() => handleDeleteDevice(device)} />
        </StyledButtonContainer>
      )}
    </>
  );
}
