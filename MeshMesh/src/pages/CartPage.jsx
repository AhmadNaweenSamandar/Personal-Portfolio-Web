import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, cartTotal, updateQuantity, removeItem } = useCart();

  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const tax = cartTotal * 0.13;
  const total = cartTotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={64} strokeWidth={1} />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet. Let's change that!</p>
        <Link to="/products" className="btn btn-primary">
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <p className="cart-subtitle">
        Review your items below. Free shipping on orders over $100!
      </p>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-meta">
                  Size: {item.selectedSize} &middot; {item.color}
                </p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.selectedSize, item.quantity - 1)
                    }
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.selectedSize, item.quantity + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id, item.selectedSize)}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row">
            <span>Tax (13%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary checkout-btn">
            Proceed to Checkout <ArrowRight size={18} />
          </Link>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
