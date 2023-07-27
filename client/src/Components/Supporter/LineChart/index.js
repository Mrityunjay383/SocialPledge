import React, { useEffect, useState } from "react";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
};

function LineChart({ labels }) {
  // useEffect(() => {
  //   setLabels(genLabels(period));
  // }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "New Downloads",
        data: [],
        borderColor: "#4EFFB5",
        backgroundColor: "#4EFFB5",
      },
      {
        label: "Repeat Downloads",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default LineChart;
