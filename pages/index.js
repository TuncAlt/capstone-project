import DeviceList from "@/components/DeviceList/deviceList";

export default function Home({ devices }) {
  return (
    <div>
      <DeviceList devices={devices} />;
    </div>
  );
}
