import { useRouter } from "next/router";
import { MdSettings } from "react-icons/md";
import styled from "styled-components";

const StyledEditButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: #faf5e4;
  cursor: pointer;
`;
export default function DevivceEditButton({ device }) {
  const router = useRouter();
  const handleEditClick = () => {
    router.push(`/addDeviceForm?deviceId=${device.id}`);
  };

  return (
    <>
      <StyledEditButton onClick={handleEditClick}>
        <MdSettings />
      </StyledEditButton>
    </>
  );
}
