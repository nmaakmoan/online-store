// AI-GENERATED: ChatGPT
import { useEffect, useState } from "react";
import { api } from "../services/api";
import OrderCard from "../components/OrderCard";
import type { Order, User } from "../types";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    Promise.all([
      api.get("/auth/me/"),
      api.get("/orders/"),
    ]).then(([userResponse, ordersResponse]) => {
      setUser(userResponse.data);
      setOrders(ordersResponse.data.results);
    });
  }, []);

  return (
    <section>
      <h1>Личный кабинет</h1>
      {user && (
        <div className="profile">
          <p>Имя: <strong>{user.username}</strong></p>
          <p>Email: <strong>{user.email || "не указан"}</strong></p>
        </div>
      )}
      <h2>История заказов</h2>
      {orders.length ? orders.map((order) => <OrderCard key={order.id} order={order} />) : <p>Заказов пока нет.</p>}
    </section>
  );
}
