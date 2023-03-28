import TemperatureReadings from "@/components/TemperatureReadings/TemperatureReadings";

export default function temperatureReadingPage({
  devices,
  deleteReading,
  editReading,
}) {
  return (
    <TemperatureReadings
      devices={devices}
      deleteReading={deleteReading}
      editReading={editReading}
    />
  );
}
