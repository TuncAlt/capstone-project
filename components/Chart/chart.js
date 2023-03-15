import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function LineChart({ devices }) {
  const readings = devices.readings;

  const chartRef = useRef();

  useEffect(() => {
    // Sort the readings array by date in descending order
    readings.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Take the first 5 readings from the sorted array
    const last5Readings = readings.slice(0, 5);

    // Map the readings array to create arrays of temperature values and formatted date strings
    const temperatures = last5Readings.map((reading) => reading.temperature);
    const dates = last5Readings.map((reading) =>
      moment(reading.date).format("MMM D")
    );

    // Create a new Chart.js chart object
    const chart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatures,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Last 5 temperature readings",
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Temperature (°C)",
            },
            suggestedMin: 0,
            suggestedMax: 10,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [readings]);

  return <canvas ref={chartRef} />;
}
