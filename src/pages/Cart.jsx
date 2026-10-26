import { Link, useOutletContext } from "react-router";
import CartItem from "../components/CartItems";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useOutletContext();

  // calculated, not state
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your cart is empty</h1>
        <Link to="/shop">Go to the shop</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Your cart</h1>
      <ul>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdate={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </ul>
      <p className="total">Total: ${total.toFixed(2)}</p>
    </div>
  );
}
