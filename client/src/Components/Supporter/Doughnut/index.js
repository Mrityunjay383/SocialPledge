import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ type, total, used }) {
  const data = {
    labels: [`Used`, "Available"],
    datasets: [
      {
        label: `${type} Downloads`,
        data: [used, total - used],
        backgroundColor:
          type === "New" ? ["#97A4FC", "#73FFC5"] : ["#FF5A60", "#498ffc"],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}

export default DoughnutChart;
