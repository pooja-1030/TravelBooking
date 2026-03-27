import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Luggage', 'Electronics', 'Accessories', 'Clothing', 'Safety', 'Comfort'];

const PRODUCTS = [
  { id: 1, name: 'Travel Backpack', brand: 'Nomatic', price: 149.99, rating: 4.8, reviews: 1243, category: 'Luggage', emoji: '\uD83C\uDF92', gradient: 'linear-gradient(135deg, #2c3e50, #4a6741)' },
  { id: 2, name: 'Noise-Cancelling Headphones', brand: 'SoundElite', price: 179.99, rating: 4.9, reviews: 3872, category: 'Electronics', emoji: '\uD83C\uDFA7', gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
  { id: 3, name: 'Packing Cubes', brand: 'PackSmart', price: 34.99, rating: 4.7, reviews: 2156, category: 'Luggage', emoji: '\uD83E\uDDF3', gradient: 'linear-gradient(135deg, #4a2c2a, #6b3a3a)' },
  { id: 4, name: 'Universal Adapter', brand: 'VoltWise', price: 29.99, rating: 4.6, reviews: 1890, category: 'Electronics', emoji: '\uD83D\uDD0C', gradient: 'linear-gradient(135deg, #2d3436, #636e72)' },
  { id: 5, name: 'Neck Pillow', brand: 'CloudRest', price: 39.99, rating: 4.5, reviews: 984, category: 'Comfort', emoji: '\uD83D\uDCA4', gradient: 'linear-gradient(135deg, #3d3d6b, #5a5a8a)' },
  { id: 6, name: 'Portable Charger', brand: 'JuicePack', price: 49.99, rating: 4.7, reviews: 2764, category: 'Electronics', emoji: '\uD83D\uDD0B', gradient: 'linear-gradient(135deg, #1e3a5f, #2d5a87)' },
  { id: 7, name: 'Luggage Tag Set', brand: 'TagCraft', price: 14.99, rating: 4.3, reviews: 672, category: 'Accessories', emoji: '\uD83C\uDFF7\uFE0F', gradient: 'linear-gradient(135deg, #5a3e2b, #8b6914)' },
  { id: 8, name: 'Travel Wallet', brand: 'SecureHold', price: 44.99, rating: 4.6, reviews: 1345, category: 'Accessories', emoji: '\uD83D\uDC5B', gradient: 'linear-gradient(135deg, #3e2723, #5d4037)' },
  { id: 9, name: 'Compression Socks', brand: 'FlyFit', price: 24.99, rating: 4.4, reviews: 1102, category: 'Clothing', emoji: '\uD83E\uDDE6', gradient: 'linear-gradient(135deg, #1b5e20, #2e7d32)' },
  { id: 10, name: 'Water Bottle', brand: 'HydroTrail', price: 32.99, rating: 4.8, reviews: 3201, category: 'Accessories', emoji: '\uD83E\uDDCA', gradient: 'linear-gradient(135deg, #0d47a1, #1565c0)' },
  { id: 11, name: 'Camera Strap', brand: 'LensLink', price: 27.99, rating: 4.5, reviews: 543, category: 'Accessories', emoji: '\uD83D\uDCF7', gradient: 'linear-gradient(135deg, #4a148c, #6a1b9a)' },
  { id: 12, name: 'First Aid Kit', brand: 'SafeTravel', price: 22.99, rating: 4.7, reviews: 876, category: 'Safety', emoji: '\uD83E\uDE7A', gradient: 'linear-gradient(135deg, #b71c1c, #c62828)' },
  { id: 13, name: 'Eye Mask', brand: 'DreamShade', price: 18.99, rating: 4.4, reviews: 1567, category: 'Comfort', emoji: '\uD83D\uDE34', gradient: 'linear-gradient(135deg, #1a237e, #283593)' },
  { id: 14, name: 'Travel Journal', brand: 'WanderNote', price: 19.99, rating: 4.6, reviews: 734, category: 'Accessories', emoji: '\uD83D\uDCD3', gradient: 'linear-gradient(135deg, #33691e, #558b2f)' },
  { id: 15, name: 'Luggage Scale', brand: 'WeighRight', price: 16.99, rating: 4.3, reviews: 921, category: 'Luggage', emoji: '\u2696\uFE0F', gradient: 'linear-gradient(135deg, #37474f, #546e7a)' },
  { id: 16, name: 'Rain Jacket', brand: 'StormShield', price: 89.99, rating: 4.8, reviews: 2087, category: 'Clothing', emoji: '\uD83E\UDDE5', gradient: 'linear-gradient(135deg, #004d40, #00695c)' },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-asc', label: 'Price: Low-High' },
  { value: 'price-desc', label: 'Price: High-Low' },
  { value: 'rating', label: 'Rating' },
];

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<span key={i} className="market-star market-star-filled">{'\u2605'}</span>);
    } else if (i - rating < 1 && i - rating > 0) {
      stars.push(<span key={i} className="market-star market-star-half">{'\u2605'}</span>);
    } else {
      stars.push(<span key={i} className="market-star">{'\u2606'}</span>);
    }
  }
  return <span className="market-stars">{stars}</span>;
}

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState(200);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => p.price <= priceRange);
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [selectedCategory, sortBy, priceRange]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((wId) => wId !== id) : [...prev, id]
    );
  };

  return (
    <>
      <style>{`
        .market-page {
          min-height: 100vh;
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          color: #e0e0e0;
        }

        /* Hero */
        .market-hero {
          position: relative;
          padding: 72px 48px 48px;
          background: linear-gradient(180deg, #111116 0%, #0a0a0a 100%);
          border-bottom: 1px solid rgba(201,169,110,0.25);
          text-align: center;
        }
        .market-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3.2rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 12px;
          letter-spacing: 1px;
        }
        .market-hero-title span {
          color: #c9a96e;
        }
        .market-hero-subtitle {
          font-size: 1.1rem;
          color: #a0a0a0;
          margin: 0;
          letter-spacing: 0.5px;
        }
        .market-cart-icon {
          position: absolute;
          top: 40px;
          right: 48px;
          background: #1a1a22;
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 12px;
          padding: 12px 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.1rem;
          color: #c9a96e;
          transition: all 0.25s ease;
        }
        .market-cart-icon:hover {
          background: rgba(201,169,110,0.15);
          border-color: #c9a96e;
        }
        .market-cart-badge {
          background: #c9a96e;
          color: #0a0a0a;
          font-size: 0.75rem;
          font-weight: 700;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 6px;
        }
        .market-back-link {
          position: absolute;
          top: 40px;
          left: 48px;
          color: #a0a0a0;
          text-decoration: none;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .market-back-link:hover {
          color: #c9a96e;
        }

        /* Controls Bar */
        .market-controls {
          padding: 32px 48px 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .market-categories {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .market-pill {
          padding: 8px 22px;
          border-radius: 100px;
          border: 1px solid #1e1e24;
          background: #111116;
          color: #a0a0a0;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .market-pill:hover {
          border-color: rgba(201,169,110,0.25);
          color: #e0e0e0;
        }
        .market-pill-active {
          background: rgba(201,169,110,0.15);
          border-color: #c9a96e;
          color: #c9a96e;
        }
        .market-filters-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .market-price-filter {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .market-price-label {
          font-size: 0.88rem;
          color: #a0a0a0;
          white-space: nowrap;
        }
        .market-price-value {
          color: #c9a96e;
          font-weight: 600;
          min-width: 48px;
        }
        .market-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 200px;
          height: 4px;
          border-radius: 2px;
          background: #1e1e24;
          outline: none;
          cursor: pointer;
        }
        .market-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #c9a96e;
          border: 2px solid #0a0a0a;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(201,169,110,0.4);
        }
        .market-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #c9a96e;
          border: 2px solid #0a0a0a;
          cursor: pointer;
        }
        .market-sort-select {
          padding: 10px 16px;
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 10px;
          color: #e0e0e0;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }
        .market-sort-select:hover,
        .market-sort-select:focus {
          border-color: rgba(201,169,110,0.25);
        }
        .market-results-count {
          font-size: 0.88rem;
          color: #a0a0a0;
        }

        /* Product Grid */
        .market-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          padding: 32px 48px 64px;
        }

        /* Product Card */
        .market-card {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .market-card:hover {
          transform: translateY(-6px);
          border-color: rgba(201,169,110,0.25);
          box-shadow: 0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.1);
        }
        .market-card-image {
          width: 100%;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          position: relative;
        }
        .market-card-image::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: linear-gradient(transparent, #111116);
        }
        .market-wishlist-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(10,10,10,0.7);
          backdrop-filter: blur(8px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.2s;
          z-index: 2;
          color: #a0a0a0;
        }
        .market-wishlist-btn:hover {
          background: rgba(201,169,110,0.2);
          transform: scale(1.1);
        }
        .market-wishlist-btn-active {
          color: #e74c3c;
        }
        .market-card-body {
          padding: 20px;
        }
        .market-card-brand {
          font-size: 0.78rem;
          color: #a0a0a0;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 6px;
        }
        .market-card-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #f5f5f5;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .market-card-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .market-stars {
          display: inline-flex;
          gap: 1px;
        }
        .market-star {
          color: #333;
          font-size: 0.9rem;
        }
        .market-star-filled {
          color: #d4af37;
        }
        .market-star-half {
          color: #d4af37;
          opacity: 0.6;
        }
        .market-rating-text {
          font-size: 0.82rem;
          color: #a0a0a0;
        }
        .market-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid #1e1e24;
        }
        .market-price {
          font-size: 1.3rem;
          font-weight: 700;
          color: #e0e0e0;
        }
        .market-price-dollar {
          font-size: 0.9rem;
          color: #a0a0a0;
          font-weight: 400;
        }
        .market-add-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #c9a96e, #d4af37);
          border: none;
          border-radius: 10px;
          color: #0a0a0a;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.25s ease;
          letter-spacing: 0.3px;
        }
        .market-add-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(201,169,110,0.35);
        }
        .market-add-btn:active {
          transform: scale(0.97);
        }

        /* Cart Overlay */
        .market-cart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .market-cart-overlay-visible {
          opacity: 1;
          pointer-events: auto;
        }

        /* Cart Sidebar */
        .market-cart-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 420px;
          max-width: 90vw;
          height: 100vh;
          background: #111116;
          border-left: 1px solid rgba(201,169,110,0.25);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -20px 0 60px rgba(0,0,0,0.5);
        }
        .market-cart-sidebar-open {
          transform: translateX(0);
        }
        .market-cart-header {
          padding: 28px 28px 20px;
          border-bottom: 1px solid #1e1e24;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .market-cart-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #f5f5f5;
        }
        .market-cart-close {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #1e1e24;
          background: transparent;
          color: #a0a0a0;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .market-cart-close:hover {
          border-color: rgba(201,169,110,0.25);
          color: #e0e0e0;
        }
        .market-cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 20px 28px;
        }
        .market-cart-items::-webkit-scrollbar {
          width: 4px;
        }
        .market-cart-items::-webkit-scrollbar-thumb {
          background: #1e1e24;
          border-radius: 2px;
        }
        .market-cart-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #1e1e24;
          align-items: center;
        }
        .market-cart-item-image {
          width: 56px;
          height: 56px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          flex-shrink: 0;
        }
        .market-cart-item-info {
          flex: 1;
          min-width: 0;
        }
        .market-cart-item-name {
          font-size: 0.95rem;
          color: #e0e0e0;
          font-weight: 500;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .market-cart-item-price {
          font-size: 0.88rem;
          color: #c9a96e;
          font-weight: 600;
        }
        .market-cart-qty {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .market-qty-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid #1e1e24;
          background: #1a1a22;
          color: #e0e0e0;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .market-qty-btn:hover {
          border-color: rgba(201,169,110,0.25);
          background: rgba(201,169,110,0.15);
        }
        .market-qty-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: #e0e0e0;
          min-width: 20px;
          text-align: center;
        }
        .market-cart-remove {
          background: none;
          border: none;
          color: #a0a0a0;
          font-size: 0.8rem;
          cursor: pointer;
          padding: 4px;
          transition: color 0.15s;
        }
        .market-cart-remove:hover {
          color: #e74c3c;
        }
        .market-cart-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #a0a0a0;
          gap: 12px;
        }
        .market-cart-empty-icon {
          font-size: 3rem;
          opacity: 0.4;
        }
        .market-cart-footer {
          padding: 24px 28px;
          border-top: 1px solid rgba(201,169,110,0.25);
          background: #1a1a22;
        }
        .market-cart-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .market-cart-total-label {
          font-size: 1rem;
          color: #a0a0a0;
        }
        .market-cart-total-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #f5f5f5;
        }
        .market-checkout-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #c9a96e, #d4af37);
          border: none;
          border-radius: 12px;
          color: #0a0a0a;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.5px;
          transition: all 0.25s ease;
        }
        .market-checkout-btn:hover {
          box-shadow: 0 8px 32px rgba(201,169,110,0.35);
          transform: translateY(-1px);
        }
        .market-checkout-btn:active {
          transform: translateY(0);
        }

        /* Empty State */
        .market-empty-grid {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 20px;
          color: #a0a0a0;
        }
        .market-empty-grid-icon {
          font-size: 3.5rem;
          margin-bottom: 16px;
          opacity: 0.3;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .market-grid {
            grid-template-columns: repeat(3, 1fr);
            padding: 24px 32px 48px;
          }
          .market-controls {
            padding: 24px 32px 0;
          }
          .market-hero {
            padding: 56px 32px 40px;
          }
        }
        @media (max-width: 768px) {
          .market-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            padding: 20px 20px 48px;
          }
          .market-controls {
            padding: 20px 20px 0;
          }
          .market-hero {
            padding: 48px 20px 36px;
          }
          .market-hero-title {
            font-size: 2.2rem;
          }
          .market-cart-icon {
            top: 20px;
            right: 20px;
            padding: 10px 14px;
          }
          .market-back-link {
            top: 20px;
            left: 20px;
          }
          .market-filters-row {
            gap: 16px;
          }
          .market-slider {
            width: 140px;
          }
          .market-card-image {
            height: 160px;
            font-size: 3rem;
          }
          .market-card-body {
            padding: 14px;
          }
          .market-card-name {
            font-size: 1.05rem;
          }
          .market-add-btn {
            padding: 8px 14px;
            font-size: 0.8rem;
          }
        }
        @media (max-width: 480px) {
          .market-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            padding: 16px 12px 40px;
          }
          .market-hero-title {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <div className="market-page">
        {/* Hero */}
        <div className="market-hero">
          <Link to="/" className="market-back-link">
            {'\u2190'} Back
          </Link>

          <h1 className="market-hero-title">
            Travel <span>Marketplace</span>
          </h1>
          <p className="market-hero-subtitle">Premium travel gear &amp; essentials</p>

          <div className="market-cart-icon" onClick={() => setShowCart(true)}>
            {'\uD83D\uDED2'}
            {cartCount > 0 && <span className="market-cart-badge">{cartCount}</span>}
          </div>
        </div>

        {/* Controls */}
        <div className="market-controls">
          <div className="market-categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`market-pill ${selectedCategory === cat ? 'market-pill-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="market-filters-row">
            <div className="market-price-filter">
              <span className="market-price-label">Price up to</span>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="market-slider"
              />
              <span className="market-price-value">${priceRange}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="market-results-count">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </span>
              <select
                className="market-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="market-grid">
          {filteredProducts.length === 0 && (
            <div className="market-empty-grid">
              <div className="market-empty-grid-icon">{'\uD83D\uDD0D'}</div>
              <p>No products match your filters.</p>
            </div>
          )}

          {filteredProducts.map((product) => (
            <div className="market-card" key={product.id}>
              <div className="market-card-image" style={{ background: product.gradient }}>
                {product.emoji}
                <button
                  className={`market-wishlist-btn ${wishlist.includes(product.id) ? 'market-wishlist-btn-active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                  title={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {wishlist.includes(product.id) ? '\u2764' : '\u2661'}
                </button>
              </div>
              <div className="market-card-body">
                <div className="market-card-brand">{product.brand}</div>
                <div className="market-card-name">{product.name}</div>
                <div className="market-card-rating">
                  <StarRating rating={product.rating} />
                  <span className="market-rating-text">
                    {product.rating} ({product.reviews.toLocaleString()})
                  </span>
                </div>
                <div className="market-card-footer">
                  <span className="market-price">
                    <span className="market-price-dollar">$</span>
                    {product.price.toFixed(2)}
                  </span>
                  <button className="market-add-btn" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Overlay */}
        <div
          className={`market-cart-overlay ${showCart ? 'market-cart-overlay-visible' : ''}`}
          onClick={() => setShowCart(false)}
        />

        {/* Cart Sidebar */}
        <div className={`market-cart-sidebar ${showCart ? 'market-cart-sidebar-open' : ''}`}>
          <div className="market-cart-header">
            <span className="market-cart-title">Your Cart</span>
            <button className="market-cart-close" onClick={() => setShowCart(false)}>
              {'\u2715'}
            </button>
          </div>

          <div className="market-cart-items">
            {cartItems.length === 0 ? (
              <div className="market-cart-empty">
                <div className="market-cart-empty-icon">{'\uD83D\uDED2'}</div>
                <span>Your cart is empty</span>
              </div>
            ) : (
              cartItems.map((item) => (
                <div className="market-cart-item" key={item.id}>
                  <div
                    className="market-cart-item-image"
                    style={{ background: item.gradient }}
                  >
                    {item.emoji}
                  </div>
                  <div className="market-cart-item-info">
                    <div className="market-cart-item-name">{item.name}</div>
                    <div className="market-cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <div className="market-cart-qty">
                    <button className="market-qty-btn" onClick={() => updateQuantity(item.id, -1)}>
                      {'\u2212'}
                    </button>
                    <span className="market-qty-value">{item.quantity}</span>
                    <button className="market-qty-btn" onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                  <button className="market-cart-remove" onClick={() => removeFromCart(item.id)}>
                    {'\u2715'}
                  </button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="market-cart-footer">
              <div className="market-cart-total-row">
                <span className="market-cart-total-label">Total</span>
                <span className="market-cart-total-value">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="market-checkout-btn">Checkout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
