export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <li className="cart-item">
      <img src={item.image} alt={item.title} />

      <div className="cart-info">
        <h2>{item.title}</h2>
        <p>${item.price.toFixed(2)} each</p>
      </div>

      <div className="quantity">
        <button
          type="button"
          onClick={() => onUpdate(item.id, item.quantity - 1)}
          aria-label={`Decrease quantity of ${item.title}`}
        >
          -
        </button>
        <span aria-label={`Quantity of ${item.title}`}>{item.quantity}</span>
        <button
          type="button"
          onClick={() => onUpdate(item.id, item.quantity + 1)}
          aria-label={`Increase quantity of ${item.title}`}
        >
          +
        </button>
      </div>

      <p className="line-total">${(item.price * item.quantity).toFixed(2)}</p>

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.title} from cart`}
      >
        Remove
      </button>
    </li>
  );
}
