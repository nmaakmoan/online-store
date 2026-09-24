// AI-GENERATED: ChatGPT
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import type { CartItem as CartItemType } from "../types";

export default function CartPage() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const save = (next: CartItemType[]) => {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const change = (id: number, quantity: number) => {
    const item = cart.find((x) => x.product.id === id);
    if (!item) return;
    if (quantity <= 0) return remove(id);
    save(cart.map((x) => x.product.id === id
      ? { ...x, quantity: Math.min(quantity, x.product.stock) }
      : x));
  };

  const remove = (id: number) => save(cart.filter((x) => x.product.id !== id));

  const clear = () => save([]);
  const total = cart.reduce((sum, x) => sum + Number(x.product.price) * x.quantity, 0);

  return (
    <section>
      <h1>Корзина</h1>
      {!cart.length ? (
        <p>Корзина пуста. <Link to="/">Перейти в каталог</Link></p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.product.id} item={item} onChange={change} onRemove={remove} />
          ))}
          <div className="cart-summary">
            <h2>Итого: {total.toFixed(2)} ₸</h2>
            <button onClick={clear}>Очистить</button>
            <button className="button" onClick={() => navigate("/checkout")}>Оформить заказ</button>
          </div>
        </>
      )}
    </section>
  );
}
