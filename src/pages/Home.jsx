import { Link } from "react-router";

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to the Shop</h1>
        <p>
          Great products at fair prices. Browse, pick what you like, and fill
          your cart.
        </p>
        <Link to="/shop" className="cta">
          Start shopping
        </Link>
      </section>

      <section className="info">
        <div>
          <h2>Wide selection</h2>
          <p>Clothing, jewelry, electronics and more.</p>
        </div>
        <div>
          <h2>Easy to use</h2>
          <p>Pick a quantity, add to cart, and adjust it any time.</p>
        </div>
        <div>
          <h2>Mock store</h2>
          <p>This is a practice project, so there's no real checkout.</p>
        </div>
      </section>
    </div>
  );
}
