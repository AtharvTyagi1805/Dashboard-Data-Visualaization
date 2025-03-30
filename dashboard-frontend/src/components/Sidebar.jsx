import React, { useState } from "react";
import {
  FiBarChart,
  FiGlobe,
  FiLayers,
  FiActivity,
  FiMenu,
  FiTarget,
  FiTrendingUp,
  FiBarChart2,
  FiBookOpen,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { MdLightbulbOutline } from "react-icons/md";
import Filter from "./Filter";

const Sidebar = ({
  selectedCategory,
  setSelectedCategory,
  darkMode,
  data,
  filters,
  setFilters,
  applyFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { key: "sector", label: "Sector", icon: <FiBarChart /> },
    { key: "topic", label: "Topic", icon: <FiLayers /> },
    { key: "region", label: "Region", icon: <FiGlobe /> },
    { key: "country", label: "Country", icon: <FiActivity /> },
    { key: "relevance", label: "Relevance", icon: <FiTarget /> },
    { key: "likelihood", label: "Likelihood", icon: <FiTrendingUp /> },
    { key: "pestle", label: "Pestle", icon: <FiBarChart2 /> },
    { key: "source", label: "Source", icon: <FiBookOpen /> },
    { key: "insight", label: "Insight", icon: <MdLightbulbOutline /> },
    { key: "country_growth", label: "Country Growth", icon: <FiMenu /> },
  ];

  return (
    <div
      className={`w-64 h-screen p-6 fixed overflow-y-auto transition-all duration-300 ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-300 text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mt-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`w-full flex items-center justify-between p-3 rounded-md transition-all ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <span className="flex items-center gap-2">
            <FiFilter /> Filters
          </span>
          {showFilters ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {showFilters && (
          <div className="mt-4">
            <Filter
              data={data}
              filters={filters}
              setFilters={setFilters}
              darkMode={darkMode}
              applyFilters={applyFilters}
            />
          </div>
        )}
      </div>
      <ul>
        {categories.map(({ key, label, icon }) => (
          <li
            key={key}
            className={`p-3 rounded flex items-center cursor-pointer gap-2 transition-all ${
              selectedCategory === key
                ? "bg-blue-500 text-white"
                : darkMode
                ? "hover:bg-gray-700"
                : "hover:bg-gray-500 hover:text-white"
            }`}
            onClick={() => setSelectedCategory(key)}
          >
            {icon} {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
