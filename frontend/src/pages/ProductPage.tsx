// AI-GENERATED: ChatGPT
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import type { Product, CartItem } from "../types";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}/`).then((r) => setProduct(r.data));
  }, [id]);

  if (!product) return <p>Загрузка...</p>;

  const addToCart = () => {
    const saved: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = saved.find((x) => x.product.id === product.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, product.stock);
    } else {
      saved.push({ product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(saved));
    navigate("/cart");
  };

  return (
    <section className="product-page">
      {product.image ? (
        <img src={`http://localhost:8000${product.image}`} alt={product.name} />
      ) : (
        <div className="image-placeholder big">Нет фото</div>
      )}
      <div>
        <p className="muted">{product.category_name}</p>
        <h1>{product.name}</h1>
        <h2>{product.price} ₸</h2>
        <p>{product.description}</p>
        <p>На складе: {product.stock}</p>
        {product.stock > 0 ? (
          <>
            <input
              className="small-input"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
            />
            <button className="button" onClick={addToCart}>Добавить в корзину</button>
          </>
        ) : <strong>Нет в наличии</strong>}
      </div>
    </section>
  );
}
