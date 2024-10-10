import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/SignUp";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductForm from "./Pages/ProductForm";  
import ProductList from "./Pages/ProductList";  
import CartView from "./components/Cart";        
import LandingPage from "./Pages/LandingPage";
import ProductDetail from "./components/ProductDetail"; 
import AdminPanel from "./Pages/AdminPanel";
import Navbar from "./Pages/Header";
import CategoryProducts from "./Pages/Categorypg"; 
import { AuthProvider } from "./components/AuthContext";
import Checkout from "./components/Checkout";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/add"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProductForm />
              </ProtectedRoute>
            }
          />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/category/:category" element={<CategoryProducts />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Navbar />
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <CartView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
