import "./App.css";
import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
export const ThemeContext = React.createContext();
function App() {
  const [theme, setTheme] = React.useState("");
  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "" ? "dark" : ""));
  }

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/details/:name" element={<Details></Details>}></Route>
        </Routes>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
