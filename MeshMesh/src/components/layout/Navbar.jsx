import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/survey", label: "Feedback" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MeshMesh
        </Link>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar-link ${location.pathname === link.to ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart">
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button
            className="navbar-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
