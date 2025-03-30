import React from "react";

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="fixed top-0 left-0 w-full px-6 py-4 bg-opacity-50 backdrop-blur-md flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
