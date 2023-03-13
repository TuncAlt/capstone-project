import DeviceList from "@/components/DeviceList/deviceList";

export default function Home({ devices }) {
  return (
    <main>
      <DeviceList devices={devices} />;
    </main>
  );
}
