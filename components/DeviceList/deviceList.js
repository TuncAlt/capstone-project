import React from "react";

export default function DeviceList({ devices }) {
  return (
    <>
      <h1>Devices</h1>
      <ul>
        {devices?.map((device, index) => (
          <li key={index}>{device.name}</li>
        ))}
      </ul>
    </>
  );
}
