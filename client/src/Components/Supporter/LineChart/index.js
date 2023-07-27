import React from "react";
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

function LineChart({ labels, repDLArr, newDLArr }) {
  // useEffect(() => {
  //   setLabels(genLabels(period));
  // }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "New Downloads",
        data: newDLArr,
        borderColor: "#4EFFB5",
        backgroundColor: "#4EFFB5",
      },
      {
        label: "Repeat Downloads",
        data: repDLArr,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default LineChart;
