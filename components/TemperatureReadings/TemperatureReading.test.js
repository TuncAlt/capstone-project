import { render, screen } from "@testing-library/react";
import TemperatureReadings from "./TemperatureReadings";
import { RouterContext } from "next/dist/shared/lib/router-context";
import "@testing-library/jest-dom";

describe("TemperatureReadings", () => {
  jest.mock("next/router", () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
  }));
  const devices = [
    {
      generateData: false,
      id: "1fa0e97dbe8",
      location: "TEST",
      maxTemp: "2",
      minTemp: "-1",
      name: "TEST",
      type: "Refrigerator",
      readings: [
        { id: 1, date: "2023-01-01", temperature: 1 },
        { id: 2, date: "2023-01-02", temperature: 2 },
        { id: 3, date: "2023-01-03", temperature: 3 },
      ],
    },
  ];

  test("renders table with reading", () => {
    const router = {
      query: {
        deviceId: "1fa0e97dbe8",
      },
    };
    render(
      <RouterContext.Provider value={router}>
        <TemperatureReadings devices={devices} />
      </RouterContext.Provider>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(devices[0].readings[1].temperature + "°C"))
    ).toBeInTheDocument();
  });
});
