import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import ChartComponent from "./ChartComponent";
import MapComponent from "./MapComponent";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("sector");
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/data/")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);

    const filtered = data.filter((item) =>
      Object.entries(newFilters).every(
        ([key, value]) => !value || item[key] === value
      )
    );

    setFilteredData(filtered);
  };

  const findMostFrequent = (arr) => {
    if (!arr || arr.length === 0) return "N/A";
    const frequency = arr.reduce((acc, item) => {
      if (item) acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(frequency).reduce(
      (a, b) => (frequency[a] > frequency[b] ? a : b),
      "N/A"
    );
  };

  const totalInsights = filteredData.length;
  const mostFrequentSector =
    totalInsights > 0
      ? findMostFrequent(filteredData.map((d) => d.sector))
      : "N/A";
  const mostCoveredTopic =
    totalInsights > 0
      ? findMostFrequent(filteredData.map((d) => d.topic))
      : "N/A";
  const topRegion =
    totalInsights > 0
      ? findMostFrequent(filteredData.map((d) => d.region))
      : "N/A";
  const topCountry =
    totalInsights > 0
      ? findMostFrequent(filteredData.map((d) => d.country))
      : "N/A";
  const avgRelevance =
    totalInsights > 0
      ? (
          filteredData.reduce((sum, d) => sum + (d.relevance || 0), 0) /
          totalInsights
        ).toFixed(2)
      : "N/A";

  return (
    <div
      className={`flex min-h-screen transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        darkMode={darkMode}
        data={data}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
      />
      <div className="ml-64 p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-md transition-all ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>
        </div>

        {loading && <p className="text-blue-500">Loading data...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {[
                { title: "Total Insights", value: totalInsights },
                { title: "Most Frequent Sector", value: mostFrequentSector },
                { title: "Top Covered Topic", value: mostCoveredTopic },
                { title: "Top Region", value: topRegion },
                { title: "Most Active Country", value: topCountry },
                { title: "Average Relevance Score", value: avgRelevance },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
                >
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-3xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            <ChartComponent
              data={filteredData}
              selectedCategory={selectedCategory}
              darkMode={darkMode}
            />

            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Geographical Data</h2>
              <MapComponent data={filteredData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
