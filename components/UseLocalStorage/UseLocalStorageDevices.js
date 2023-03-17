import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

export default function useLocalStorageDevices() {
  const [devices, setDevices] = useLocalStorageState("devices", []);

  // ad a new added device to the devices array
  const addDevice = (device) => {
    const newDevice = { ...device, id: uid() };
    setDevices(devices ? [...devices, newDevice] : [newDevice]);
  };

  //
  const deleteReading = (deviceId, readingId) => {
    const updatedDevices = devices.map((device) => {
      if (device.id === deviceId) {
        const updatedReadings = device?.readings?.filter((reading) => {
          return reading.id !== readingId;
        });
        return { ...device, readings: updatedReadings };
      }
      return device;
    });
    setDevices(updatedDevices);
  };

  const editReading = (deviceId, readingId, updatedTemperature) => {
    const updatedDevices = devices.map((device) => {
      if (device.id === deviceId) {
        const updatedReadings = device?.readings?.map((reading, index) => {
          if (reading.id === readingId) {
            return { ...reading, temperature: updatedTemperature };
          }
          return reading;
        });
        return { ...device, readings: updatedReadings };
      }
      return device;
    });
    setDevices(updatedDevices);
  };

  return [devices, addDevice, deleteReading, editReading];
}
