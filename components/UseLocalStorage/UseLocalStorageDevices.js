import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function useLocalStorageDevices() {
  const [devices, setDevices] = useLocalStorageState("devices", []);

  const addDevice = (device) => {
    setDevices([...devices, device]);
  };

  return [devices, addDevice];
}
