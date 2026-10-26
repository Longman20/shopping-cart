import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Layout() {
  const [cart, setCart] = useState([]);

  // calculated, not state
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(product, quantity) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <>
      <Navbar itemCount={itemCount} />
      <main>
        <Outlet context={{ cart, addToCart, updateQuantity, removeFromCart }} />
      </main>
    </>
  );
}
