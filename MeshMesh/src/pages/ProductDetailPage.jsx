import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star, ShoppingCart, ArrowLeft, Check, Truck, RotateCcw } from "lucide-react";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/product/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="not-found-page">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </div>

        <div className="product-detail-info">
          <p className="product-detail-category">{product.category}</p>
          <h1>{product.name}</h1>

          <div className="product-detail-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span>{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className="product-detail-price">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                <span className="discount-tag">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-features">
            <h4>Features</h4>
            <ul>
              {product.features.map((f, i) => (
                <li key={i}>
                  <Check size={16} /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="size-selector">
            <h4>
              Select Size
              {sizeError && <span className="size-error">Please select a size</span>}
            </h4>
            <div className="size-options">
              {product.size.map((s) => (
                <button
                  key={s}
                  className={`size-option ${selectedSize === s ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedSize(s);
                    setSizeError(false);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            className={`add-to-cart-btn ${added ? "added" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check size={20} /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart size={20} /> Add to Cart
              </>
            )}
          </button>

          <div className="product-promises">
            <div className="promise">
              <Truck size={18} />
              <span>Free shipping over $100</span>
            </div>
            <div className="promise">
              <RotateCcw size={18} />
              <span>30-day free returns</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2>You Might Also Like</h2>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
