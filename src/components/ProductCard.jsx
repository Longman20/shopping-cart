import { useState } from "react";

export default function ProductCard({ product, onAdd }) {
  const [quantity, setQuantity] = useState(1);

  function handleChange(e) {
    setQuantity(e.target.value);
  }

  function increment() {
    setQuantity(Math.floor(Number(quantity) || 0) + 1);
  }

  function decrement() {
    setQuantity(Math.max(1, Math.floor(Number(quantity) || 0) - 1));
  }

  function handleAdd() {
    const amount = Math.max(1, Math.floor(Number(quantity)) || 1);
    onAdd(product, amount);
    setQuantity(1);
  }

  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p className="price">${product.price.toFixed(2)}</p>

      <div className="quantity">
        <button
          type="button"
          onClick={decrement}
          aria-label={`Decrease quantity of ${product.title}`}
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleChange}
          aria-label={`Quantity of ${product.title}`}
        />
        <button
          type="button"
          onClick={increment}
          aria-label={`Increase quantity of ${product.title}`}
        >
          +
        </button>
      </div>

      <button type="button" className="add-btn" onClick={handleAdd}>
        Add to cart
      </button>
    </article>
  );
}
