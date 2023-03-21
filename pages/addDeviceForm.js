import AddDeviceForm from "@/components/Forms/AddDeviceForm/AddDeviceForm";
import HeaderNavigation from "@/components/Navigation/HeaderNavigation";

export default function addDeviceForm({
  addDevice,
  device,
  deviceId,
  devices,
  updateDevice,
}) {
  return (
    <div>
      <HeaderNavigation />
      <AddDeviceForm
        addDevice={addDevice}
        device={device}
        deviceId={deviceId}
        devices={devices}
        updateDevice={updateDevice}
      />
    </div>
  );
}
