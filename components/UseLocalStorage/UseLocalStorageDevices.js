import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

export default function useLocalStorageDevices() {
  const [devices, setDevices] = useLocalStorageState("devices", []);

  const addDevice = (device) => {
    const newDevice = { ...device, id: uid() };
    setDevices(devices ? [...devices, newDevice] : [newDevice]);
  };

  return [devices, addDevice];
}
