import { render } from "@testing-library/react";
import DeviceList from "./DeviceList";
import "@testing-library/jest-dom/extend-expect";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("DeviceList", () => {
  test("renders device list", () => {
    const devices = [
      {
        generateData: false,
        id: "1fa0e97dbe8",
        location: "TEST",
        maxTemp: "2",
        minTemp: "-1",
        name: "TEST",
        type: "Refrigerator",
      },
      {
        generateData: false,
        id: "1fa0e97dbe9",
        location: "TEST",
        maxTemp: "2",
        minTemp: "-1",
        name: "TEST2",
        type: "Refrigerator",
      },
    ];
    const { getByText } = render(<DeviceList devices={devices} />);
    expect(getByText(devices[0].name)).toHaveTextContent("TEST");
    expect(getByText(devices[1].name)).toHaveTextContent("TEST2");
  });
});
