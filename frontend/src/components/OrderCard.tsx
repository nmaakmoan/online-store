// AI-GENERATED: ChatGPT
import type { Order } from "../types";

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="order-card">
      <h3>Заказ #{order.id}</h3>
      <p>Статус: {order.status}</p>
      <p>Дата: {new Date(order.created_at).toLocaleString("ru-RU")}</p>
      <p>Сумма: <strong>{order.total_price} ₸</strong></p>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>{item.product_name} × {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
}
