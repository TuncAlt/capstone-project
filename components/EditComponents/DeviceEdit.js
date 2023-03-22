import AddDeviceForm from "../Forms/AddDeviceForm/AddDeviceForm";

export default function DeviceEdit({ devices }) {
  // find the device with matching deviceId
  const device = devices?.find((device) => device.id === deviceId);
  // if device not found, render null
  if (!device) {
    return null;
  }

  return (
    <>
      <AddDeviceForm
        generateData={device.generateData}
        id={device.id}
        maxTemp={device.maxTemp}
        minTemp={device.minTemp}
        name={device.name}
        location={device.location}
      />
    </>
  );
}
