// AI-GENERATED: ChatGPT
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { CartItem } from "../types";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!localStorage.getItem("access")) {
      navigate("/login");
      return;
    }
    try {
      await api.post("/orders/", {
        name,
        phone,
        address,
        items: cart.map((x) => ({ product: x.product.id, quantity: x.quantity })),
      });
      localStorage.removeItem("cart");
      navigate("/profile");
    } catch (err: any) {
      setError(JSON.stringify(err.response?.data || "Не удалось оформить заказ"));
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h1>Оформление заказа</h1>
      <input placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <textarea placeholder="Адрес доставки" value={address} onChange={(e) => setAddress(e.target.value)} required />
      {error && <p className="error">{error}</p>}
      <button className="button" disabled={!cart.length}>Оформить заказ</button>
    </form>
  );
}
