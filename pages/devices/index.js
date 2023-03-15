import DeviceList from "@/components/DeviceList/deviceList";

export default function deviceOverview({ devices }) {
  return (
    <main>
      <DeviceList devices={devices} />;
    </main>
  );
}
