import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, CreditCard, User, MapPin } from "lucide-react";
import { useCart } from "../context/CartContext";

const STEPS = [
  { id: 1, label: "Information", icon: User },
  { id: 2, label: "Shipping", icon: MapPin },
  { id: 3, label: "Payment", icon: CreditCard },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, cartTotal, setCheckoutData, completeOrder, checkoutData } = useCart();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const tax = cartTotal * 0.13;
  const total = cartTotal + shipping + tax;

  const [form, setForm] = useState({
    firstName: checkoutData.firstName || "",
    lastName: checkoutData.lastName || "",
    email: checkoutData.email || "",
    phone: checkoutData.phone || "",
    address: checkoutData.address || "",
    city: checkoutData.city || "",
    province: checkoutData.province || "",
    postalCode: checkoutData.postalCode || "",
    shippingMethod: checkoutData.shippingMethod || "standard",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Nothing to Checkout</h2>
        <p>Add some items to your cart first.</p>
        <Link to="/products" className="btn btn-primary">
          Shop Now <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!form.firstName.trim()) newErrors.firstName = "First name is required";
      if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
        newErrors.email = "Valid email is required";
    }

    if (step === 2) {
      if (!form.address.trim()) newErrors.address = "Address is required";
      if (!form.city.trim()) newErrors.city = "City is required";
      if (!form.province.trim()) newErrors.province = "Province is required";
      if (!form.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    }

    if (step === 3) {
      if (!form.cardName.trim()) newErrors.cardName = "Cardholder name is required";
      if (!form.cardNumber.trim() || form.cardNumber.replace(/\s/g, "").length < 16)
        newErrors.cardNumber = "Valid card number is required";
      if (!form.expiry.trim() || !/^\d{2}\/\d{2}$/.test(form.expiry))
        newErrors.expiry = "Expiry (MM/YY) is required";
      if (!form.cvv.trim() || form.cvv.length < 3)
        newErrors.cvv = "Valid CVV is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setCheckoutData(form);
    if (step < 3) {
      setStep(step + 1);
    } else {
      const orderNumber = `MM-${Date.now().toString(36).toUpperCase()}`;
      completeOrder({
        orderNumber,
        items: [...items],
        total,
        shipping,
        tax,
        ...form,
        date: new Date().toLocaleDateString(),
      });
      navigate("/confirmation");
    }
  };

  const renderField = (name, label, type = "text", placeholder = "") => (
    <div className={`form-field ${errors[name] ? "has-error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {errors[name] && <span className="field-error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {/* Stepper */}
      <div className="checkout-stepper">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={`step ${step === s.id ? "active" : ""} ${step > s.id ? "completed" : ""}`}
          >
            <div className="step-circle">
              {step > s.id ? <Check size={16} /> : <s.icon size={16} />}
            </div>
            <span className="step-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-form">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="checkout-step">
              <h2>Your Information</h2>
              <p>Let us know who this order is for.</p>
              <div className="form-row">
                {renderField("firstName", "First Name", "text", "John")}
                {renderField("lastName", "Last Name", "text", "Doe")}
              </div>
              {renderField("email", "Email Address", "email", "john@example.com")}
              {renderField("phone", "Phone (optional)", "tel", "(555) 123-4567")}
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div className="checkout-step">
              <h2>Shipping Address</h2>
              <p>Where should we send your order?</p>
              {renderField("address", "Street Address", "text", "123 Main St")}
              <div className="form-row">
                {renderField("city", "City", "text", "Ottawa")}
                {renderField("province", "Province", "text", "Ontario")}
              </div>
              {renderField("postalCode", "Postal Code", "text", "K1A 0A6")}
              <div className="shipping-methods">
                <h4>Shipping Method</h4>
                <label className={`shipping-option ${form.shippingMethod === "standard" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={form.shippingMethod === "standard"}
                    onChange={handleChange}
                  />
                  <div>
                    <strong>Standard Shipping</strong>
                    <p>5-7 business days</p>
                  </div>
                  <span>{cartTotal >= 100 ? "Free" : "$9.99"}</span>
                </label>
                <label className={`shipping-option ${form.shippingMethod === "express" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={form.shippingMethod === "express"}
                    onChange={handleChange}
                  />
                  <div>
                    <strong>Express Shipping</strong>
                    <p>2-3 business days</p>
                  </div>
                  <span>$19.99</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="checkout-step">
              <h2>Payment Details</h2>
              <p>All transactions are secure and encrypted.</p>
              {renderField("cardName", "Cardholder Name", "text", "John Doe")}
              {renderField("cardNumber", "Card Number", "text", "1234 5678 9012 3456")}
              <div className="form-row">
                {renderField("expiry", "Expiry Date", "text", "MM/YY")}
                {renderField("cvv", "CVV", "text", "123")}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="checkout-nav">
            {step > 1 && (
              <button className="btn btn-outline" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={18} /> Back
              </button>
            )}
            <button className="btn btn-primary" onClick={nextStep}>
              {step === 3 ? "Place Order" : "Continue"} <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-items">
            {items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <p className="checkout-item-name">{item.name}</p>
                  <p className="checkout-item-meta">Size {item.selectedSize} &times; {item.quantity}</p>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
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
        </div>
      </div>
    </div>
  );
}
