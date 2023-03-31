import { useRouter } from "next/router";
import { MdSettings } from "react-icons/md";
import styled from "styled-components";

export default function DevivceEditButton({ device }) {
  const router = useRouter();
  const handleEditClick = () => {
    router.push(`/addDeviceForm?deviceId=${device.id}`);
  };

  return (
    <>
      <StyledEditButton
        aria-label="device settings button"
        onClick={handleEditClick}
      >
        <MdSettings />
      </StyledEditButton>
    </>
  );
}
const StyledEditButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;
