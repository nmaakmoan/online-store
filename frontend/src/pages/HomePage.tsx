// AI-GENERATED: ChatGPT
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { api } from "../services/api";
import type { Category, Product } from "../types";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [ordering, setOrdering] = useState("");

  useEffect(() => {
    api.get("/categories/").then((r) => setCategories(r.data.results));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (ordering) params.set("ordering", ordering);

    api.get(`/products/?${params.toString()}`).then((r) => setProducts(r.data.results));
  }, [search, category, ordering]);

  return (
    <section>
      <h1>Каталог товаров</h1>
      <div className="filters">
        <input
          placeholder="Поиск товара..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Все категории</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
          <option value="">Новые</option>
          <option value="price">Цена: по возрастанию</option>
          <option value="-price">Цена: по убыванию</option>
        </select>
      </div>

      <div className="grid">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      {!products.length && <p>Товары не найдены.</p>}
    </section>
  );
}
