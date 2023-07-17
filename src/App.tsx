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
import { ProductEditPage } from "./pages/productEditPage/ProductEditPage";
import { ProductCreatePage } from "./pages/productCreatePage/ProductCreatePage";
import EmailPage from "./pages/emailPage/EmailPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import PasswordPage from "./pages/passwordPage/PasswordPage";
import { AuthProvider } from "./context/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import { LoginPage } from "./pages/loginPage/LoginPage";

function App() {
  return (
    <ShoppingCartProvider>
      <ToastContainer />
      <AuthProvider>
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
                <Route path="signin" element={<LoginPage />}></Route>
                <Route path="signup" element={<EmailPage />}></Route>
                <Route
                  path="signup/password"
                  element={<PasswordPage />}
                ></Route>
                <Route path="profile" element={<ProfilePage />}></Route>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </ShoppingCartProvider>
  );
}

export default App;
