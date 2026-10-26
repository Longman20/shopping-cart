import { NavLink } from "react-router";

export default function Navbar({ itemCount }) {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/cart">Cart{itemCount > 0 && ` (${itemCount})`}</NavLink>
    </nav>
  );
}
