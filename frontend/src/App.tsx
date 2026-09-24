// AI-GENERATED: ChatGPT
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import type { CartItem } from "./types";

function Protected({ children }: { children: React.ReactNode }) {
  return localStorage.getItem("access") ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };
    update();
    window.addEventListener("storage", update);
    const timer = setInterval(update, 300);
    return () => {
      window.removeEventListener("storage", update);
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Header cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout" element={<Protected><CheckoutPage /></Protected>} />
          <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
        </Routes>
      </main>
    </>
  );
}
