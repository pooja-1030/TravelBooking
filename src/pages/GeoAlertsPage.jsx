import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const GeoAlertsPage = () => {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [categories, setCategories] = useState({
    Attractions: true,
    Restaurants: true,
    Deals: true,
    Events: false,
    'Historical Sites': true,
  });
  const [radius, setRadius] = useState(2);
  const [toastAlert, setToastAlert] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  const categoryIcons = {
    Attractions: '🏛️',
    Restaurants: '🍽️',
    Deals: '🏷️',
    Events: '🎭',
    'Historical Sites': '🏰',
  };

  const nearbyAlerts = [
    { icon: '🗼', name: 'Eiffel Tower', distance: '0.3 km away', type: 'Attraction', typeColor: '#c9a96e' },
    { icon: '☕', name: 'Le Petit Cafe', distance: '150 m away', type: 'Restaurant', typeColor: '#22c55e' },
    { icon: '🏷️', name: '50% off Seine Cruise', distance: '0.8 km away', type: 'Deal', typeColor: '#f97316' },
    { icon: '🎨', name: 'Musee d\'Orsay', distance: '1.2 km away', type: 'Attraction', typeColor: '#c9a96e' },
    { icon: '🍷', name: 'Chez Laurent Bistro', distance: '0.5 km away', type: 'Restaurant', typeColor: '#22c55e' },
    { icon: '🎭', name: 'Live Jazz at Blue Note', distance: '0.9 km away', type: 'Event', typeColor: '#8b5cf6' },
    { icon: '🏰', name: 'Conciergerie', distance: '1.5 km away', type: 'Historical Site', typeColor: '#eab308' },
    { icon: '🛍️', name: '30% off Galeries Lafayette', distance: '2.1 km away', type: 'Deal', typeColor: '#f97316' },
  ];

  const alertHistory = [
    { name: 'Notre-Dame Cathedral', type: 'Attraction', time: '10 min ago', seen: true },
    { name: 'Cafe de Flore - Happy Hour', type: 'Deal', time: '25 min ago', seen: true },
    { name: 'Pont Alexandre III', type: 'Historical Site', time: '1 hour ago', seen: false },
    { name: 'Street Art Festival', type: 'Event', time: '2 hours ago', seen: false },
    { name: 'Shakespeare & Company', type: 'Attraction', time: '3 hours ago', seen: false },
  ];

  const toastAlerts = [
    { icon: '🎪', name: 'Circus Festival at Tuileries', distance: '0.4 km', type: 'Event' },
    { icon: '🥐', name: 'Boulangerie Paul - Fresh Croissants', distance: '200 m', type: 'Restaurant' },
    { icon: '🏷️', name: '40% off Louvre Night Tour', distance: '1.1 km', type: 'Deal' },
    { icon: '🗿', name: 'Rodin Museum', distance: '0.6 km', type: 'Attraction' },
    { icon: '🍕', name: 'Pizzeria da Marco - Lunch Special', distance: '300 m', type: 'Restaurant' },
  ];

  const toggleCategory = (cat) => {
    setCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  useEffect(() => {
    if (!locationEnabled) return;
    let idx = 0;
    const interval = setInterval(() => {
      const alert = toastAlerts[idx % toastAlerts.length];
      setToastAlert(alert);
      setToastVisible(true);
      idx++;
      setTimeout(() => setToastVisible(false), 4000);
    }, 10000);
    return () => clearInterval(interval);
  }, [locationEnabled]);

  return (
    <>
      <style>{`
        .geo-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #e0e0e0;
          font-family: 'DM Sans', sans-serif;
          padding: 0 0 80px 0;
          position: relative;
          overflow-x: hidden;
        }
        .geo-hero {
          text-align: center;
          padding: 60px 20px 40px;
        }
        .geo-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3rem;
          color: #f5f5f5;
          margin: 0 0 12px 0;
        }
        .geo-hero-title span { color: #c9a96e; }
        .geo-hero-sub {
          color: #a0a0a0;
          font-size: 1.15rem;
          margin: 0;
        }
        .geo-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .geo-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #111116;
          border-radius: 14px;
          padding: 20px 24px;
          margin-bottom: 30px;
          border: 1px solid rgba(201,169,110,0.1);
        }
        .geo-toggle-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: #f5f5f5;
        }
        .geo-toggle-switch {
          width: 52px;
          height: 28px;
          border-radius: 14px;
          background: #333;
          position: relative;
          cursor: pointer;
          transition: background 0.3s;
          border: none;
          padding: 0;
        }
        .geo-toggle-switch.geo-on {
          background: #c9a96e;
        }
        .geo-toggle-knob {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: transform 0.3s;
        }
        .geo-toggle-switch.geo-on .geo-toggle-knob {
          transform: translateX(24px);
        }
        .geo-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          color: #f5f5f5;
          margin: 40px 0 20px 0;
        }
        .geo-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 30px;
        }
        .geo-cat-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 30px;
          border: 1px solid rgba(201,169,110,0.2);
          background: #111116;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #a0a0a0;
        }
        .geo-cat-chip:hover {
          border-color: rgba(201,169,110,0.4);
        }
        .geo-cat-chip.geo-cat-active {
          background: rgba(201,169,110,0.15);
          border-color: #c9a96e;
          color: #c9a96e;
        }
        .geo-cat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #444;
          transition: background 0.3s;
        }
        .geo-cat-chip.geo-cat-active .geo-cat-dot {
          background: #c9a96e;
        }
        .geo-radius-section {
          background: #111116;
          border-radius: 14px;
          padding: 24px;
          border: 1px solid rgba(201,169,110,0.08);
          margin-bottom: 30px;
        }
        .geo-radius-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .geo-radius-label {
          color: #f5f5f5;
          font-weight: 600;
        }
        .geo-radius-value {
          color: #c9a96e;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .geo-radius-slider {
          width: 100%;
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(90deg, #c9a96e 0%, #c9a96e var(--fill), #333 var(--fill), #333 100%);
          outline: none;
        }
        .geo-radius-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #d4af37;
          cursor: pointer;
          border: 3px solid #0a0a0a;
          box-shadow: 0 0 8px rgba(201,169,110,0.4);
        }
        .geo-radius-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #d4af37;
          cursor: pointer;
          border: 3px solid #0a0a0a;
        }
        .geo-radius-marks {
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
          font-size: 0.75rem;
          color: #666;
        }
        .geo-nearby-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .geo-alert-card {
          background: #111116;
          border-radius: 14px;
          padding: 20px;
          border: 1px solid rgba(201,169,110,0.06);
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: all 0.3s;
        }
        .geo-alert-card:hover {
          background: #1a1a22;
          border-color: rgba(201,169,110,0.2);
          transform: translateY(-2px);
        }
        .geo-alert-icon {
          font-size: 1.8rem;
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201,169,110,0.1);
          border-radius: 12px;
        }
        .geo-alert-info {
          flex: 1;
        }
        .geo-alert-name {
          color: #f5f5f5;
          font-weight: 600;
          margin: 0 0 4px 0;
          font-size: 1rem;
        }
        .geo-alert-distance {
          color: #a0a0a0;
          font-size: 0.85rem;
          margin: 0 0 10px 0;
        }
        .geo-alert-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .geo-type-badge {
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          background: rgba(201,169,110,0.12);
        }
        .geo-nav-btn {
          background: transparent;
          border: 1px solid #c9a96e;
          color: #c9a96e;
          padding: 5px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          transition: all 0.3s;
          white-space: nowrap;
        }
        .geo-nav-btn:hover {
          background: rgba(201,169,110,0.15);
        }
        .geo-history-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .geo-history-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #111116;
          border-radius: 10px;
          padding: 14px 20px;
          border: 1px solid rgba(201,169,110,0.05);
          transition: all 0.3s;
        }
        .geo-history-item:hover {
          background: #1a1a22;
        }
        .geo-history-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .geo-history-seen {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .geo-history-name {
          color: #e0e0e0;
          font-size: 0.95rem;
        }
        .geo-history-type {
          color: #a0a0a0;
          font-size: 0.8rem;
          margin-left: 8px;
        }
        .geo-history-time {
          color: #666;
          font-size: 0.8rem;
          flex-shrink: 0;
        }
        .geo-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #1a1a22;
          border: 1px solid rgba(201,169,110,0.3);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          z-index: 1000;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          transform: translateX(120%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          max-width: 360px;
        }
        .geo-toast.geo-toast-visible {
          transform: translateX(0);
        }
        .geo-toast-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        .geo-toast-info {
          flex: 1;
        }
        .geo-toast-name {
          color: #f5f5f5;
          font-weight: 600;
          font-size: 0.95rem;
          margin: 0 0 2px 0;
        }
        .geo-toast-meta {
          color: #a0a0a0;
          font-size: 0.8rem;
          margin: 0;
        }
        .geo-toast-badge {
          background: rgba(201,169,110,0.15);
          color: #c9a96e;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          margin-left: 6px;
        }
        .geo-toast-close {
          background: none;
          border: none;
          color: #666;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }
        .geo-toast-close:hover {
          color: #a0a0a0;
        }
        .geo-disabled-overlay {
          opacity: 0.4;
          pointer-events: none;
          filter: grayscale(0.5);
        }
      `}</style>

      <div className="geo-page">
        {toastAlert && (
          <div className={`geo-toast ${toastVisible ? 'geo-toast-visible' : ''}`}>
            <span className="geo-toast-icon">{toastAlert.icon}</span>
            <div className="geo-toast-info">
              <p className="geo-toast-name">{toastAlert.name}</p>
              <p className="geo-toast-meta">
                {toastAlert.distance} away
                <span className="geo-toast-badge">{toastAlert.type}</span>
              </p>
            </div>
            <button
              className="geo-toast-close"
              onClick={() => setToastVisible(false)}
            >
              &times;
            </button>
          </div>
        )}

        <div className="geo-hero">
          <h1 className="geo-hero-title">
            Geo-Based <span>Alerts</span>
          </h1>
          <p className="geo-hero-sub">Never miss a nearby attraction or deal</p>
        </div>

        <div className="geo-container">
          <div className="geo-toggle-row">
            <span className="geo-toggle-label">Enable Location Alerts</span>
            <button
              className={`geo-toggle-switch ${locationEnabled ? 'geo-on' : ''}`}
              onClick={() => setLocationEnabled(!locationEnabled)}
            >
              <div className="geo-toggle-knob" />
            </button>
          </div>

          <div className={!locationEnabled ? 'geo-disabled-overlay' : ''}>
            <h2 className="geo-section-title">Alert Categories</h2>
            <div className="geo-categories">
              {Object.keys(categories).map((cat) => (
                <button
                  key={cat}
                  className={`geo-cat-chip ${categories[cat] ? 'geo-cat-active' : ''}`}
                  onClick={() => toggleCategory(cat)}
                >
                  <span className="geo-cat-dot" />
                  <span>{categoryIcons[cat]}</span>
                  {cat}
                </button>
              ))}
            </div>

            <div className="geo-radius-section">
              <div className="geo-radius-header">
                <span className="geo-radius-label">Alert Radius</span>
                <span className="geo-radius-value">
                  {radius >= 1 ? `${radius.toFixed(1)} km` : `${(radius * 1000).toFixed(0)} m`}
                </span>
              </div>
              <input
                type="range"
                className="geo-radius-slider"
                min="0.1"
                max="5"
                step="0.1"
                value={radius}
                onChange={(e) => setRadius(parseFloat(e.target.value))}
                style={{ '--fill': `${((radius - 0.1) / 4.9) * 100}%` }}
              />
              <div className="geo-radius-marks">
                <span>100m</span>
                <span>1km</span>
                <span>2.5km</span>
                <span>5km</span>
              </div>
            </div>

            <h2 className="geo-section-title">Nearby Now</h2>
            <div className="geo-nearby-grid">
              {nearbyAlerts.map((alert, i) => (
                <div key={i} className="geo-alert-card">
                  <div className="geo-alert-icon">{alert.icon}</div>
                  <div className="geo-alert-info">
                    <p className="geo-alert-name">{alert.name}</p>
                    <p className="geo-alert-distance">{alert.distance}</p>
                    <div className="geo-alert-bottom">
                      <span
                        className="geo-type-badge"
                        style={{ color: alert.typeColor, background: `${alert.typeColor}18` }}
                      >
                        {alert.type}
                      </span>
                      <button className="geo-nav-btn">Navigate</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="geo-section-title">Alert History</h2>
            <div className="geo-history-list">
              {alertHistory.map((item, i) => (
                <div key={i} className="geo-history-item">
                  <div className="geo-history-left">
                    <span
                      className="geo-history-seen"
                      style={{ background: item.seen ? '#c9a96e' : '#333' }}
                    />
                    <span className="geo-history-name">
                      {item.name}
                      <span className="geo-history-type">{item.type}</span>
                    </span>
                  </div>
                  <span className="geo-history-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeoAlertsPage;
