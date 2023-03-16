import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

export default function useLocalStorageDevices() {
  const [devices, setDevices] = useLocalStorageState("devices", []);

  const addDevice = (device) => {
    const newDevice = { ...device, id: uid() };
    setDevices(devices ? [...devices, newDevice] : [newDevice]);
  };
  const deleteReading = (deviceId, readingIndex) => {
    const updatedDevices = devices.map((device) => {
      if (device.id === deviceId) {
        const updatedReadings = device?.readings?.filter(
          (_, index) => index !== readingIndex
        );
        return { ...device, readings: updatedReadings };
      }
      return device;
    });
    setDevices(updatedDevices);
  };

  return [devices, addDevice, deleteReading];
}
