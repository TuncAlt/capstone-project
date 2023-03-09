import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function DeviceList({ devices }) {
  return (
    <>
      <h1>Devices</h1>
      <ul>
        {devices?.map((device, index) => (
          <li key={index}>
            {device.name}{" "}
            {device.readings && device.readings.length > 0 ? (
              <>
                {device.readings[1].temperature}°C
                {Number(device.readings[1].temperature) >
                Number(device.maxTemp) ? (
                  <span style={{ color: "red" }}>
                    {" "}
                    <FaExclamationTriangle />
                  </span>
                ) : Number(device.readings[1].temperature) <
                  Number(device.minTemp) ? (
                  <span style={{ color: "red" }}>
                    {" "}
                    <FaExclamationTriangle />
                  </span>
                ) : null}
              </>
            ) : (
              "please log temperature"
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
