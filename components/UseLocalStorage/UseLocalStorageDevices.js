import moment from "moment";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

export default function useLocalStorageDevices() {
  const [devices, setDevices] = useLocalStorageState("devices", []);

  // ad a new added device to the devices array
  const addDevice = (device) => {
    let newDevice;

    if (device.generateData) {
      const newDate = moment().format("YYYY-MM-DD");
      const sensorReading = Math.floor(Math.random() * 50) - 25;
      newDevice = {
        ...device,
        id: uid(),
        readings: [{ date: newDate, temperature: sensorReading, id: uid() }],
      };
    } else {
      newDevice = {
        ...device,
        id: uid(),
      };
    }
    setDevices(devices ? [...devices, newDevice] : [newDevice]);
  };

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
        const updatedReadings = device?.readings?.map((reading) => {
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

  const deleteDevice = (id) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  const updateDevice = (id, updatedDevice) => {
    const updatedDevices = devices.map((device) => {
      if (device.id === id) {
        return { ...device, ...updatedDevice };
      }
      return device;
    });
    setDevices(updatedDevices);
  };
  const handleTemperatureUpdate = (device) => {
    const newDate = moment().format("YYYY-MM-DD");
    const newTemperature = Math.floor(Math.random() * 18) - 7.5;
    const newReading = {
      date: newDate,
      temperature: newTemperature,
      id: uid(),
    };
    const updatedSensorReading = {
      ...device,
      readings: [...device.readings, newReading],
    };
    updateDevice(device.id, updatedSensorReading);
  };

  return [
    devices,
    addDevice,
    deleteReading,
    editReading,
    deleteDevice,
    updateDevice,
    handleTemperatureUpdate,
  ];
}
