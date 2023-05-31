import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/productsPages/ProductPage";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
