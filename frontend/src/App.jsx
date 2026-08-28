import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import UserLayout from "./Components/Layout/UserLayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import MensSection from "./Pages/MensSection";
import WomensSection from "./Pages/WomensSection";
import AllCollection from "./Pages/AllCollection";
import TopItems from "./Pages/TopItems";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";
import Profile from "./Pages/Profile";
import Privacypolicy from "./Pages/Privacypolicy";
import ProductDetail from "./Components/Products/ProductDetail";

import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./redux/store";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";

import ProtectedRoute from "./Components/ProtectedRoute";

// Admin imports
import AdminRoute from "./Admin/AdminRoute";
import AdminPage from "./Admin/AdminPage";
import AdminDashboard from "./Admin/AdminDashboard";
import UserManagement from "./Admin/UserManagement";
import ProductManagement from "./Admin/ProductManagement";
import OrderManagement from "./Admin/OrderManagement";
import ShopManagement from "./Admin/ShopManagement";

import { useLanguageDirection } from "./hooks/useLanguageDirection";

function App() {
  useLanguageDirection();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>
          {/* Auth Routes - public, no layout */}
          <Route path="/SigninPage" element={<SigninPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />

          {/* User Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="MensSection" element={<MensSection />} />
            <Route path="WomensSection" element={<WomensSection />} />
            <Route path="collection" element={<AllCollection />} />
            <Route path="top-items" element={<TopItems />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route
              path="CheckoutPage"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="order-confirmation/:orderId"
              element={
                <ProtectedRoute>
                  <OrderConfirmationPage />
                </ProtectedRoute>
              }
            />
            <Route path="profile" element={<Profile />} />
            <Route path="privacy-policy" element={<Privacypolicy />} />
            <Route path="Privacypolicy" element={<Privacypolicy />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="shops" element={<ShopManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;