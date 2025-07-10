import React from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";

import { ThemeContext } from "../App";
export default function Header() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <header className={theme === "dark" ? "bg-bg-dark text-lime-50" : ""}>
      <div className="flex justify-between  font-medium px-3 py-5  shadow-sm">
        <h1>Where in the world ?</h1>
        <button onClick={toggleTheme}>
          {theme === "" ? (
            <IoSunnyOutline size={26} />
          ) : (
            <FaRegMoon size={26} />
          )}
        </button>
      </div>
    </header>
  );
}
