import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/details/:name" element={<Details></Details>}></Route>
      </Routes>
    </>
  );
}

export default App;
