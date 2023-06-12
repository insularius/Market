import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/productPage/ProductPage";
import Home from "./pages/homePage/HomePage";
import About from "./pages/aboutPage/AboutPage";
import Navbar from "./components/navbar/Navbar";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import { Layout } from "./components/layout/Layout";
import ProductPageInfo from "./pages/productPageInfo/ProductPageInfo";

import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <ShoppingCartProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="store" element={<ProductPage />} />
            <Route path="store/details/:id" element={<ProductPageInfo />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </ShoppingCartProvider>
  );
}

export default App;
