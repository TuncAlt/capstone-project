import AddDeviceForm from "@/components/Forms/AddDeviceForm/AddDeviceForm";

export default function addDeviceForm({
  addDevice,
  device,
  deviceId,
  devices,
  updateDevice,
}) {
  return (
    <>
      <AddDeviceForm
        addDevice={addDevice}
        device={device}
        deviceId={deviceId}
        devices={devices}
        updateDevice={updateDevice}
      />
    </>
  );
}
