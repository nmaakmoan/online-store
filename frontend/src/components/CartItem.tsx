// AI-GENERATED: ChatGPT
import type { CartItem } from "../types";

type Props = {
  item: CartItem;
  onChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
};

export default function CartItem({ item, onChange, onRemove }: Props) {
  return (
    <div className="cart-item">
      <div>
        <h3>{item.product.name}</h3>
        <p>{item.product.price} ₸ × {item.quantity}</p>
      </div>
      <div className="quantity">
        <button onClick={() => onChange(item.product.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onChange(item.product.id, item.quantity + 1)}>+</button>
      </div>
      <button onClick={() => onRemove(item.product.id)}>Удалить</button>
    </div>
  );
}
