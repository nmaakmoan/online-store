// AI-GENERATED: ChatGPT
import { Link } from "react-router-dom";
import type { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      {product.image ? (
        <img src={`http://localhost:8000${product.image}`} alt={product.name} />
      ) : (
        <div className="image-placeholder">Нет фото</div>
      )}
      <p className="muted">{product.category_name}</p>
      <h3>{product.name}</h3>
      <strong>{product.price} ₸</strong>
      <p>{product.stock > 0 ? `В наличии: ${product.stock}` : "Нет в наличии"}</p>
      <Link className="button" to={`/products/${product.id}`}>Подробнее</Link>
    </article>
  );
}
