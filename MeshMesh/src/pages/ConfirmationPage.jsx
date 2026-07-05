import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ConfirmationPage() {
  const { orderConfirmation } = useCart();

  if (!orderConfirmation) {
    return (
      <div className="empty-cart">
        <h2>No Order Found</h2>
        <p>It looks like you haven't placed an order yet.</p>
        <Link to="/products" className="btn btn-primary">
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const order = orderConfirmation;

  return (
    <div className="confirmation-page">
      <div className="confirmation-header">
        <CheckCircle size={64} />
        <h1>Order Confirmed!</h1>
        <p className="order-number">Order #{order.orderNumber}</p>
        <p>
          Thank you for your purchase, {order.firstName}! We're preparing your
          order and you'll receive a confirmation email at <strong>{order.email}</strong>.
        </p>
      </div>

      <div className="confirmation-details">
        <div className="confirmation-section">
          <h3>
            <Package size={20} /> Order Details
          </h3>
          <div className="confirmation-items">
            {order.items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="confirmation-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p className="item-name">{item.name}</p>
                  <p className="item-meta">
                    Size {item.selectedSize} &times; {item.quantity}
                  </p>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="confirmation-totals">
            <div className="summary-row">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total Charged</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="confirmation-section">
          <h3>Shipping To</h3>
          <p>
            {order.firstName} {order.lastName}<br />
            {order.address}<br />
            {order.city}, {order.province} {order.postalCode}
          </p>
        </div>
      </div>

      <div className="confirmation-actions">
        <Link to="/products" className="btn btn-primary">
          Continue Shopping <ArrowRight size={18} />
        </Link>
        <Link to="/survey" className="btn btn-outline">
          Share Your Feedback
        </Link>
      </div>
    </div>
  );
}
