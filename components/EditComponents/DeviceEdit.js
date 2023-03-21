import AddDeviceForm from "../Forms/AddDeviceForm/AddDeviceForm";

export default function DeviceEdit(deleteDevice) {
  // find the device with matching deviceId
  const device = devices?.find((device) => device.id === deviceId);
  // if device not found, render null
  if (!device) {
    return null;
  }
  const handleDeleteDevice = (deviceId) => {
    deleteDevice(deviceId);
  };
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
