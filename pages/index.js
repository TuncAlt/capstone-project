import DeviceList from "@/components/DeviceList/deviceList";
import styled from "styled-components";

const StyledButton = styled.button`
  border: solid 1px;
  padding: 10px;
  background-color: #072a5e;
  color: white;
  border-radius: 16px;
  cursor: pointer;
  width: 80%;
`;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export default function Home({ devices }) {
  return (
    <main>
      <DeviceList devices={devices} />;
    </main>
  );
}
