import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3 className="footer-logo">MeshMesh</h3>
          <p>Step into something extraordinary. Premium footwear engineered for every stride, every trail, every moment.</p>
        </div>
        <div className="footer-links-group">
          <h4>Shop</h4>
          <Link to="/products?category=Running">Running</Link>
          <Link to="/products?category=Casual">Casual</Link>
          <Link to="/products?category=Hiking">Hiking</Link>
          <Link to="/products?category=Training">Training</Link>
        </div>
        <div className="footer-links-group">
          <h4>Company</h4>
          <Link to="/">About Us</Link>
          <Link to="/survey">Share Feedback</Link>
          <Link to="/products">All Products</Link>
        </div>
        <div className="footer-links-group">
          <h4>Support</h4>
          <span>Shipping & Returns</span>
          <span>Size Guide</span>
          <span>Contact Us</span>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MeshMesh. All rights reserved.</p>
      </div>
    </footer>
  );
}
