import React from "react";
import {
  Bar,
  Line,
  Pie,
  Doughnut,
  Bubble,
  Radar,
  Scatter,
} from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const aggregateAndLimitData = (data, key, limit = 20) => {
  const groupedData = data.reduce((acc, item) => {
    const value = item[key] || "Unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  const sortedData = Object.entries(groupedData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);

  return {
    labels: sortedData.map(([label]) => label),
    datasets: [
      {
        label: key.toUpperCase(),
        data: sortedData.map(([, count]) => count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
          "#5AD3D1",
          "#FF6384",
          "#36A2EB",
        ],
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };
};

const prepareCountryGrowthData = (data) => {
  const groupedData = data.reduce((acc, item) => {
    if (item.country && item.end_year) {
      const key = `${item.country} (${item.end_year})`;
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {});

  const sortedData = Object.entries(groupedData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return {
    labels: sortedData.map(([label]) => label),
    datasets: [
      {
        label: "Country Growth Over Time",
        data: sortedData.map(([, count]) => count),
        backgroundColor: "#36A2EB",
        borderColor: "#1E88E5",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };
};

const getChartOptions = (darkMode) => ({
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: darkMode ? "#ffffff" : "#000000",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: darkMode ? "#ffffff" : "#000000",
      },
      grid: {
        color: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
      },
    },
    y: {
      ticks: {
        color: darkMode ? "#ffffff" : "#000000",
      },
      grid: {
        color: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
      },
    },
  },
});

const ChartComponent = ({ data, selectedCategory, darkMode }) => {
  const isCountryGrowth = selectedCategory === "country_growth";
  const chartData = isCountryGrowth
    ? prepareCountryGrowthData(data)
    : aggregateAndLimitData(data, selectedCategory);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        className={`p-4 rounded-lg shadow col-span-2 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-2 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {selectedCategory.replace("_", " ").toUpperCase()} (Bar Chart)
        </h2>
        <Bar data={chartData} options={getChartOptions(darkMode)} />
      </div>

      <div
        className={`p-4 rounded-lg shadow col-span-2 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-2 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {selectedCategory.replace("_", " ").toUpperCase()} (Line Chart)
        </h2>
        <Line data={chartData} options={getChartOptions(darkMode)} />
      </div>

      <div
        className={`p-4 rounded-lg shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-2 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {selectedCategory.replace("_", " ").toUpperCase()} (Pie Chart)
        </h2>
        <Pie data={chartData} options={getChartOptions(darkMode)} />
      </div>

      <div
        className={`p-4 rounded-lg shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-2 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {selectedCategory.replace("_", " ").toUpperCase()} (Doughnut Chart)
        </h2>
        <Doughnut data={chartData} options={getChartOptions(darkMode)} />
      </div>

      <div
        className={`p-4 rounded-lg shadow col-span-2 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-2 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Bubble Chart
        </h2>
        <Bubble data={chartData} options={getChartOptions(darkMode)} />
      </div>

      <div
        className={`p-4 rounded-lg shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-2 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Radar Chart
        </h2>
        <Radar data={chartData} options={getChartOptions(darkMode)} />
      </div>

      <div
        className={`p-4 rounded-lg shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-2 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Scatter Chart
        </h2>
        <Scatter data={chartData} options={getChartOptions(darkMode)} />
      </div>
    </div>
  );
};

export default ChartComponent;
