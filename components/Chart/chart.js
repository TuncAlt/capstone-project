import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";

const StyledChartBox = styled.div`
  border-radius: 10px;
  border: 1px solid white;
  width: 100%;
  height: 100%;
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DeviceChart({ device, readings, lastFiveReadings }) {
  // Map the readings array to create arrays of temperature values and formatted date strings
  const temperatures = lastFiveReadings.map((reading) => reading.temperature);
  const dates = lastFiveReadings.map((reading) =>
    moment(reading.date).format("MM/D")
  );

  const data = {
    datasets: [
      {
        label: null,
        data: temperatures,
        borderColor: "white",
        fill: false,
      },
    ],
    labels: dates,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },

    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "white",
        },
      },
      y: {
        grid: {
          display: false,
        },

        ticks: {
          beginAtZero: true,
          stepSize: 2,
          font: {
            size: 12,
          },
          color: "white",
        },
      },
    },
  };
  return (
    <>
      {lastFiveReadings.length > 0 && (
        <StyledChartBox>
          <Line data={data} options={options} />
        </StyledChartBox>
      )}
    </>
  );
}
