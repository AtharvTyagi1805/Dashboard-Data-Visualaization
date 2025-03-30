import React, { useState, useEffect } from "react";

const Filter = ({ data, filters, setFilters, darkMode, applyFilters }) => {
  const [uniqueValues, setUniqueValues] = useState({});
  const [selectedFilters, setSelectedFilters] = useState(filters);

  useEffect(() => {
    const getUniqueValues = (key) => {
      const values = [
        ...new Set(data.map((item) => item[key]).filter(Boolean)),
      ];
      return values.length > 0 ? values : [];
    };

    setUniqueValues({
      end_year: getUniqueValues("end_year"),
      topic: getUniqueValues("topic"),
      sector: getUniqueValues("sector"),
      region: getUniqueValues("region"),
      pestle: getUniqueValues("pestle"),
      source: getUniqueValues("source"),
      country: getUniqueValues("country"),
    });
  }, [data]);

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value || null,
    }));
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {Object.keys(uniqueValues).map((key) => (
        <div key={key} className="mb-4">
          <label className="block mb-1 font-medium capitalize">
            {key.replace("_", " ")}
          </label>
          <select
            className={`w-full p-2 rounded-md border ${
              darkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-gray-100 text-black border-gray-300"
            }`}
            value={selectedFilters[key] || ""}
            onChange={(e) => handleFilterChange(key, e.target.value)}
          >
            <option value="">All</option>
            {uniqueValues[key].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button
        className={`w-full mt-4 p-2 rounded-md font-semibold transition-all ${
          darkMode ? "bg-blue-500 text-white" : "bg-blue-600 text-white"
        }`}
        onClick={() => applyFilters(selectedFilters)}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
