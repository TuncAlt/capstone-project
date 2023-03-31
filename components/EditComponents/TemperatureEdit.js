import { useRouter } from "next/router";
import { MdEdit } from "react-icons/md";
import styled from "styled-components";

export default function TemperatureEdit({ device }) {
  const router = useRouter();
  const handleEditClick = () => {
    router.push(`/temperatureReadings?deviceId=${device.id}`);
  };

  return (
    <>
      <StyledEditButton
        aria-label="temperature edit button"
        onClick={handleEditClick}
      >
        <MdEdit />
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
