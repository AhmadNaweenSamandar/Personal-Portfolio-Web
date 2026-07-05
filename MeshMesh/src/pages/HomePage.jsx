import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw, Star } from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/product/ProductCard";

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.badge).slice(0, 4);
  const saleProducts = products.filter((p) => p.originalPrice);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tagline">New Season Collection</p>
          <h1>Walk Your Way.</h1>
          <p className="hero-description">
            Premium footwear crafted for runners, explorers, and everyday
            adventurers. Discover shoes that move the way you do.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/products?category=Running" className="btn btn-outline">
              Running Collection
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=700&h=500&fit=crop"
            alt="MeshMesh featured sneaker"
          />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-badges">
        <div className="badge-item">
          <Truck size={28} />
          <div>
            <strong>Free Shipping</strong>
            <p>On orders over $100</p>
          </div>
        </div>
        <div className="badge-item">
          <RotateCcw size={28} />
          <div>
            <strong>30-Day Returns</strong>
            <p>No questions asked</p>
          </div>
        </div>
        <div className="badge-item">
          <Shield size={28} />
          <div>
            <strong>Secure Checkout</strong>
            <p>100% encrypted payments</p>
          </div>
        </div>
      </section>

      {/* Promotional Banner — Incite to Action */}
      <section className="promo-banner">
        <div className="promo-content">
          <span className="promo-label">Limited Time</span>
          <h2>Up to 25% Off Select Styles</h2>
          <p>
            Don't miss out — our biggest sale of the season ends soon.
            Grab your favourites before they're gone!
          </p>
          <Link to="/products" className="btn btn-primary">
            Shop the Sale <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-top">
          <div>
            <h2>Trending Right Now</h2>
            <p>Our most popular picks, loved by thousands of happy customers.</p>
          </div>
          <Link to="/products" className="view-all-link">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Cards */}
      <section className="category-section">
        <h2>Shop by Activity</h2>
        <p>Find the perfect shoe for how you move.</p>
        <div className="category-grid">
          {[
            { name: "Running", img: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop", desc: "Built for speed and distance" },
            { name: "Casual", img: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop", desc: "Everyday comfort & style" },
            { name: "Hiking", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop", desc: "Conquer any terrain" },
            { name: "Training", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop", desc: "Perform at your best" },
          ].map((cat) => (
            <Link key={cat.name} to={`/products?category=${cat.name}`} className="category-card">
              <img src={cat.img} alt={cat.name} loading="lazy" />
              <div className="category-card-overlay">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Engagement CTA — Engage in Connection */}
      <section className="feedback-cta">
        <div className="feedback-cta-content">
          <Star size={32} />
          <h2>Your Opinion Shapes Our Future</h2>
          <p>
            We're building MeshMesh together with our community. Take 2 minutes
            to share your experience — your voice truly matters to us, and it
            helps us create better products for you.
          </p>
          <Link to="/survey" className="btn btn-primary">
            Share Your Feedback <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
