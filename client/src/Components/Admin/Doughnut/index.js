import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutAdminChart({ dashData }) {
  const data = {
    labels: [`User`, "Supports", "Pledges", "Certificates"],
    datasets: [
      {
        label: `Data`,
        data: [
          dashData.userCount,
          dashData.supportCount,
          dashData.pledgeCount,
          dashData.certificateCount,
        ],
        backgroundColor: ["#97A4FC", "#73FFC5", "#498ffc", "#FF5A60"],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}

export default DoughnutAdminChart;
