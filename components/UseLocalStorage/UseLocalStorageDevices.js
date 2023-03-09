import { useState, useEffect } from "react";

export default function useLocalStorageDevices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const storedDevices = JSON.parse(localStorage.getItem("devices"));
    if (storedDevices) {
      setDevices(storedDevices);
    }
  }, []);

  const addDevice = (device) => {
    setDevices([...devices, device]);
    localStorage.setItem("devices", JSON.stringify([...devices, device]));
  };

  return [devices, addDevice];
}
