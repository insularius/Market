import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/productPage/ProductPage";
import Home from "./pages/homePage/HomePage";
import About from "./pages/aboutPage/AboutPage";
import Navbar from "./components/navbar/Navbar";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import { Layout } from "./components/layout/Layout";
import ProductPageInfo from "./pages/productPageInfo/ProductPageInfo";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Footer from "./components/footer/Footer";
import styles from "./App.module.scss";
import ProductListPage from "./pages/productListPage/ProductListPage";
import EditProduct from "./components/editProduct/EditProduct";
import CreateProductForm from "./components/createProduct/CreateProductFrom";
import { ProductEditPage } from "./pages/productEditPage/ProductEditPage";
import { ProductCreatePage } from "./pages/productCreatePage/ProductCreatePage";

function App() {
  // return (
  //   <ShoppingCartProvider>
  //     <Navbar />
  //     <Routes>
  //       <Route path="/" element={<Layout />}>
  //         <Route index path="/" element={<Home />} />
  //         <Route path="store" element={<ProductPage />} />
  //         <Route path="store/details/:id" element={<ProductPageInfo />} />
  //         <Route path="about" element={<About />} />
  //         <Route path="*" element={<NotFoundPage />} />
  //       </Route>
  //     </Routes>
  //     <Footer />
  //   </ShoppingCartProvider>
  // );
  return (
    <ShoppingCartProvider>
      <div className={styles.appContainer}>
        <Navbar />
        <div className={styles.appContent}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="/" element={<Home />} />
              <Route path="store" element={<ProductPage />} />
              <Route path="store/details/:id" element={<ProductPageInfo />} />
              <Route path="about" element={<About />} />
              <Route
                path="admin/products"
                element={<ProductListPage />}
              ></Route>
              <Route
                path="admin/products/edit/:id"
                element={<ProductEditPage />}
              ></Route>
              <Route
                path="admin/products/create/"
                element={<ProductCreatePage />}
              ></Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </ShoppingCartProvider>
  );
}

export default App;
