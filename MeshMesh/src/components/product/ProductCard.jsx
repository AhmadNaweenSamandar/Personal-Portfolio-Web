import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.size[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-link">
        <div className="product-card-image">
          <img src={product.image} alt={product.name} loading="lazy" />
          {product.badge && <span className="product-badge">{product.badge}</span>}
          {discount && !product.badge && (
            <span className="product-badge sale">Save {discount}%</span>
          )}
        </div>
        <div className="product-card-info">
          <p className="product-card-category">{product.category}</p>
          <h3 className="product-card-name">{product.name}</h3>
          <div className="product-card-rating">
            <Star size={14} fill="currentColor" />
            <span>{product.rating}</span>
            <span className="review-count">({product.reviews})</span>
          </div>
          <div className="product-card-price">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
      <button
        className={`quick-add-btn ${added ? "added" : ""}`}
        onClick={handleQuickAdd}
      >
        <ShoppingCart size={16} />
        {added ? "Added!" : "Quick Add"}
      </button>
    </div>
  );
}
