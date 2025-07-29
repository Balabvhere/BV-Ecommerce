import React from 'react';
import './landingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate=useNavigate()
  function shop()
  {
    navigate('/products')
  }
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover the Best Deals</h1>
          <p>Your one-stop shop for everything trendy and essential!</p>
          <button className="shop-now-btnn" onClick={shop}>Shop Now</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <i className="fas fa-truck"></i>
          <h3>Fast Delivery</h3>
          <p>Get your orders delivered at lightning speed!</p>
        </div>
        <div className="feature">
          <i className="fas fa-lock"></i>
          <h3>Secure Payment</h3>
          <p>Your transactions are protected with top-grade security.</p>
        </div>
        <div className="feature">
          <i className="fas fa-headset"></i>
          <h3>24/7 Support</h3>
          <p>We're here for you, anytime and anywhere.</p>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="products-preview">
        <h2>Popular Products</h2>
        <div className="product-cards">
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product" />
            <h4>Trendy Watch</h4>
            <p>₹2,999</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product" />
            <h4>Wireless Earbuds</h4>
            <p>₹1,499</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product" />
            <h4>Smartphone</h4>
            <p>₹14,999</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Bala's eStore. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
