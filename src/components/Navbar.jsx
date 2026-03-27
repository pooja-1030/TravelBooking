import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showCurrency, setShowCurrency] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const featRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const currRef = useRef(null)

  const {
    theme, toggleTheme,
    user, setShowAuth, setAuthTab, logout,
    currency, setCurrency, CURRENCIES,
    showNotifications, setShowNotifications, unreadCount,
  } = useApp()

  useEffect(() => { setMenuOpen(false) }, [location])

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (currRef.current && !currRef.current.contains(e.target)) setShowCurrency(false)
      if (featRef.current && !featRef.current.contains(e.target)) setShowFeatures(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Scroll listener for transparent-to-solid transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAuth = () => {
    if (user) navigate('/dashboard')
    else { setAuthTab('login'); setShowAuth(true) }
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Explore' },
    { to: '/planner', label: 'Plan' },
    { to: '/dashboard', label: 'Dashboard' },
  ]

  const featureLinks = [
    { to: '/quiz', label: 'Travel Quiz', icon: '\ud83e\udde0' },
    { to: '/chatbot', label: 'AI Assistant', icon: '\ud83e\udd16' },
    { to: '/customizer', label: 'Trip Customizer', icon: '\ud83c\udfda\ufe0f' },
    { to: '/expenses', label: 'Expense Tracker', icon: '\ud83d\udcb0' },
    { to: '/timeline', label: 'Travel Timeline', icon: '\ud83d\uddd3\ufe0f' },
    { to: '/tickets', label: 'Ticket Manager', icon: '\ud83c\udfab' },
    { to: '/packing', label: 'Packing List', icon: '\ud83e\uddf3' },
    { to: '/photo-spots', label: 'Photo Spots', icon: '\ud83d\udcf8' },
    { to: '/wellness', label: 'Wellness', icon: '\ud83e\uddd8' },
    { to: '/marketplace', label: 'Marketplace', icon: '\ud83d\udecd\ufe0f' },
    { to: '/voice-search', label: 'Voice Search', icon: '\ud83c\udf99\ufe0f' },
    { to: '/trending', label: 'Trending', icon: '\ud83d\udcc8' },
    { to: '/crowd-density', label: 'Crowd Map', icon: '\ud83d\uddfa\ufe0f' },
    { to: '/geo-alerts', label: 'Geo Alerts', icon: '\ud83d\udccd' },
    { to: '/leaderboard', label: 'Leaderboard', icon: '\ud83c\udfc6' },
  ]

  return (
    <nav className={`lux-navbar${scrolled ? ' lux-navbar--scrolled' : ''}`} id="navbar">
      <div className="lux-navbar__container">
        {/* Logo */}
        <Link to="/" className="lux-navbar__logo" onClick={() => setMenuOpen(false)}>
          <span className="lux-navbar__logo-icon">&#9992;</span>
          Wanderlust
        </Link>

        {/* Desktop Nav Links */}
        <ul className="lux-navbar__links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`lux-navbar__link${location.pathname === to ? ' lux-navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="lux-navbar__features-wrap" ref={featRef}>
            <button
              className={`lux-navbar__link lux-navbar__features-trigger${showFeatures ? ' lux-navbar__link--active' : ''}`}
              onClick={() => setShowFeatures(f => !f)}
            >
              Features
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 4, transition: 'transform 0.2s', transform: showFeatures ? 'rotate(180deg)' : 'rotate(0)' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {showFeatures && (
              <div className="lux-navbar__features-dropdown">
                {featureLinks.map(({ to, label, icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="lux-navbar__features-item"
                    onClick={() => setShowFeatures(false)}
                  >
                    <span className="lux-navbar__features-icon">{icon}</span>
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Right side actions */}
        <div className="lux-navbar__right">
          {/* Currency Selector */}
          <div className="lux-navbar__currency-wrap" ref={currRef}>
            <button
              className="lux-navbar__icon-btn"
              onClick={() => setShowCurrency(!showCurrency)}
              aria-label="Currency"
              title="Currency"
            >
              {CURRENCIES[currency]?.symbol || '$'}
            </button>
            {showCurrency && (
              <div className="lux-navbar__currency-dropdown">
                {Object.entries(CURRENCIES).map(([code, { symbol, name }]) => (
                  <button
                    key={code}
                    className={`lux-navbar__currency-opt${currency === code ? ' lux-navbar__currency-opt--active' : ''}`}
                    onClick={() => { setCurrency(code); setShowCurrency(false) }}
                  >
                    <span className="lux-navbar__currency-symbol">{symbol}</span>
                    <span>{code}</span>
                    <small className="lux-navbar__currency-name">{name}</small>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            className="lux-navbar__icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>

          {/* Notifications */}
          <button
            className="lux-navbar__icon-btn lux-navbar__notif-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            title="Notifications"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unreadCount > 0 && <span className="lux-navbar__badge">{unreadCount}</span>}
          </button>

          {/* Search */}
          <button
            className="lux-navbar__icon-btn"
            aria-label="Search"
            onClick={() => navigate('/search')}
            title="Search"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          {/* Auth / User */}
          {user ? (
            <button className="lux-navbar__user-btn" onClick={handleAuth} title="Dashboard">
              <span className="lux-navbar__avatar">{user.avatar}</span>
            </button>
          ) : (
            <button className="lux-navbar__login-btn" onClick={handleAuth}>
              Login
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="lux-navbar__mobile-btn" aria-label="Menu" onClick={() => setMenuOpen(m => !m)}>
          <span className={`lux-navbar__hamburger-bar${menuOpen ? ' lux-navbar__hamburger-bar--top' : ''}`} />
          <span className={`lux-navbar__hamburger-bar${menuOpen ? ' lux-navbar__hamburger-bar--mid' : ''}`} />
          <span className={`lux-navbar__hamburger-bar${menuOpen ? ' lux-navbar__hamburger-bar--bot' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lux-navbar__drawer">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`lux-navbar__drawer-link${location.pathname === to ? ' lux-navbar__drawer-link--active' : ''}`}
            >
              {label}
            </Link>
          ))}

          <div className="lux-navbar__drawer-divider" />
          <span className="lux-navbar__drawer-section-label">Features</span>
          <div className="lux-navbar__drawer-features-grid">
            {featureLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="lux-navbar__drawer-feature-item"
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="lux-navbar__drawer-divider" />

          <div className="lux-navbar__drawer-row">
            <span className="lux-navbar__drawer-label">Theme</span>
            <button className="lux-navbar__drawer-toggle" onClick={toggleTheme}>
              {theme === 'light' ? (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Dark</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/></svg> Light</>
              )}
            </button>
          </div>

          <div className="lux-navbar__drawer-row">
            <span className="lux-navbar__drawer-label">Currency</span>
            <select
              className="lux-navbar__drawer-select"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
            >
              {Object.entries(CURRENCIES).map(([code, { symbol }]) => (
                <option key={code} value={code}>{symbol} {code}</option>
              ))}
            </select>
          </div>

          <div className="lux-navbar__drawer-divider" />

          {user ? (
            <div className="lux-navbar__drawer-user">
              <div className="lux-navbar__drawer-user-info">
                <span className="lux-navbar__drawer-avatar">{user.avatar}</span>
                <span className="lux-navbar__drawer-name">{user.name}</span>
              </div>
              <button className="lux-navbar__drawer-logout" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="lux-navbar__drawer-login" onClick={() => { setMenuOpen(false); setShowAuth(true) }}>
              Login / Sign Up
            </button>
          )}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');

        /* ========== NAVBAR BASE ========== */
        .lux-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: transparent;
          backdrop-filter: blur(0);
          -webkit-backdrop-filter: blur(0);
          border-bottom: 1px solid transparent;
          transition: background 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease, border-color 0.4s ease;
        }

        .lux-navbar--scrolled {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: rgba(201, 169, 110, 0.15);
        }

        .lux-navbar__container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ========== LOGO ========== */
        .lux-navbar__logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #c9a96e;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: opacity 0.3s ease;
        }

        .lux-navbar__logo:hover {
          opacity: 0.85;
        }

        .lux-navbar__logo-icon {
          font-size: 1.1rem;
          display: inline-flex;
          filter: grayscale(1) brightness(1.5);
        }

        /* ========== DESKTOP NAV LINKS ========== */
        .lux-navbar__links {
          display: flex;
          list-style: none;
          gap: 36px;
          margin: 0;
          padding: 0;
        }

        .lux-navbar__link {
          color: #a0a0a0;
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: color 0.3s ease;
          position: relative;
          padding: 4px 0;
        }

        .lux-navbar__link:hover {
          color: #c9a96e;
        }

        .lux-navbar__link--active {
          color: #c9a96e;
        }

        .lux-navbar__link--active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: #c9a96e;
          opacity: 0.6;
        }

        /* ========== RIGHT SIDE ========== */
        .lux-navbar__right {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* ========== ICON BUTTONS ========== */
        .lux-navbar__icon-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          color: #a0a0a0;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .lux-navbar__icon-btn svg {
          stroke: #a0a0a0;
          transition: stroke 0.3s ease;
        }

        .lux-navbar__icon-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #c9a96e;
        }

        .lux-navbar__icon-btn:hover svg {
          stroke: #c9a96e;
        }

        /* ========== NOTIFICATION BADGE ========== */
        .lux-navbar__notif-btn {
          position: relative;
        }

        .lux-navbar__badge {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #c9a96e;
          color: #0a0a0a;
          font-size: 0.65rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        /* ========== CURRENCY DROPDOWN ========== */
        .lux-navbar__currency-wrap {
          position: relative;
        }

        .lux-navbar__currency-dropdown {
          position: absolute;
          top: 46px;
          right: 0;
          background: #111116;
          border-radius: 12px;
          border: 1px solid rgba(201, 169, 110, 0.15);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          padding: 6px;
          min-width: 210px;
          z-index: 100;
        }

        .lux-navbar__currency-opt {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 9px 12px;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.85rem;
          color: #a0a0a0;
          font-weight: 400;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .lux-navbar__currency-opt:hover {
          background: rgba(201, 169, 110, 0.08);
          color: #c9a96e;
        }

        .lux-navbar__currency-opt--active {
          background: rgba(201, 169, 110, 0.1);
          color: #c9a96e;
          font-weight: 600;
        }

        .lux-navbar__currency-symbol {
          font-weight: 700;
          width: 20px;
          text-align: center;
        }

        .lux-navbar__currency-name {
          color: #555;
          margin-left: auto;
          font-size: 0.75rem;
        }

        .lux-navbar__currency-opt:hover .lux-navbar__currency-name {
          color: rgba(201, 169, 110, 0.5);
        }

        /* ========== FEATURES DROPDOWN ========== */
        .lux-navbar__features-wrap {
          position: relative;
        }

        .lux-navbar__features-trigger {
          display: inline-flex;
          align-items: center;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #a0a0a0;
          padding: 6px 0;
          font-family: 'DM Sans', sans-serif;
        }

        .lux-navbar__features-dropdown {
          position: absolute;
          top: 38px;
          left: 50%;
          transform: translateX(-50%);
          background: #111116;
          border-radius: 12px;
          border: 1px solid rgba(201, 169, 110, 0.15);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          padding: 8px;
          width: 280px;
          max-height: 420px;
          overflow-y: auto;
          z-index: 100;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }
        .lux-navbar__features-dropdown::-webkit-scrollbar { width: 4px; }
        .lux-navbar__features-dropdown::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); border-radius: 2px; }

        .lux-navbar__features-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 0.8rem;
          color: #a0a0a0;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .lux-navbar__features-item:hover {
          background: rgba(201, 169, 110, 0.08);
          color: #c9a96e;
        }
        .lux-navbar__features-icon {
          font-size: 1rem;
          width: 20px;
          text-align: center;
        }

        /* ========== MOBILE DRAWER FEATURES ========== */
        .lux-navbar__drawer-section-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #c9a96e;
          padding: 4px 0 8px;
        }
        .lux-navbar__drawer-features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          margin-bottom: 8px;
        }
        .lux-navbar__drawer-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 0.82rem;
          color: #a0a0a0;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .lux-navbar__drawer-feature-item:hover {
          background: rgba(201, 169, 110, 0.08);
          color: #c9a96e;
        }

        /* ========== USER AVATAR BUTTON ========== */
        .lux-navbar__user-btn {
          padding: 2px;
          border: none;
          background: transparent;
          border-radius: 50%;
          cursor: pointer;
          margin-left: 4px;
          transition: box-shadow 0.3s ease;
        }

        .lux-navbar__user-btn:hover {
          box-shadow: 0 0 0 2px rgba(201, 169, 110, 0.5);
        }

        .lux-navbar__avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(201, 169, 110, 0.1);
          font-size: 0.95rem;
          border: 2px solid #c9a96e;
        }

        /* ========== LOGIN BUTTON ========== */
        .lux-navbar__login-btn {
          margin-left: 8px;
          padding: 7px 22px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 24px;
          border: 1px solid #c9a96e;
          background: transparent;
          color: #c9a96e;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .lux-navbar__login-btn:hover {
          background: #c9a96e;
          color: #0a0a0a;
        }

        /* ========== MOBILE MENU BUTTON ========== */
        .lux-navbar__mobile-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
        }

        .lux-navbar__hamburger-bar {
          display: block;
          width: 20px;
          height: 1.5px;
          background: #a0a0a0;
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .lux-navbar__hamburger-bar--top {
          transform: rotate(45deg) translate(4px, 4px);
          background: #c9a96e;
        }

        .lux-navbar__hamburger-bar--mid {
          opacity: 0;
        }

        .lux-navbar__hamburger-bar--bot {
          transform: rotate(-45deg) translate(4px, -4px);
          background: #c9a96e;
        }

        /* ========== MOBILE DRAWER ========== */
        .lux-navbar__drawer {
          position: absolute;
          top: 64px;
          left: 0;
          right: 0;
          background: #0d0d0d;
          border-bottom: 1px solid rgba(201, 169, 110, 0.15);
          padding: 16px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
        }

        .lux-navbar__drawer-link {
          padding: 12px 8px;
          color: #a0a0a0;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .lux-navbar__drawer-link:hover {
          color: #c9a96e;
          background: rgba(201, 169, 110, 0.05);
        }

        .lux-navbar__drawer-link--active {
          color: #c9a96e;
        }

        .lux-navbar__drawer-divider {
          height: 1px;
          background: rgba(201, 169, 110, 0.1);
          margin: 8px 0;
        }

        .lux-navbar__drawer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
        }

        .lux-navbar__drawer-label {
          font-size: 0.8rem;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .lux-navbar__drawer-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border: 1px solid rgba(201, 169, 110, 0.2);
          background: rgba(201, 169, 110, 0.05);
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.8rem;
          color: #c9a96e;
          transition: background 0.2s ease;
        }

        .lux-navbar__drawer-toggle:hover {
          background: rgba(201, 169, 110, 0.12);
        }

        .lux-navbar__drawer-select {
          padding: 6px 12px;
          border: 1px solid rgba(201, 169, 110, 0.2);
          background: #111116;
          border-radius: 20px;
          font-size: 0.8rem;
          color: #c9a96e;
          cursor: pointer;
          outline: none;
        }

        .lux-navbar__drawer-select option {
          background: #111116;
          color: #a0a0a0;
        }

        .lux-navbar__drawer-user {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .lux-navbar__drawer-user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
        }

        .lux-navbar__drawer-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(201, 169, 110, 0.1);
          font-size: 1.1rem;
          border: 2px solid #c9a96e;
        }

        .lux-navbar__drawer-name {
          font-size: 0.95rem;
          font-weight: 500;
          color: #e0e0e0;
        }

        .lux-navbar__drawer-logout {
          width: 100%;
          padding: 10px;
          border: 1px solid rgba(201, 169, 110, 0.2);
          background: transparent;
          border-radius: 10px;
          font-size: 0.8rem;
          color: #a0a0a0;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: all 0.2s ease;
        }

        .lux-navbar__drawer-logout:hover {
          border-color: #c9a96e;
          color: #c9a96e;
        }

        .lux-navbar__drawer-login {
          width: 100%;
          padding: 12px;
          border: 1px solid #c9a96e;
          background: transparent;
          color: #c9a96e;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          margin-top: 4px;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .lux-navbar__drawer-login:hover {
          background: #c9a96e;
          color: #0a0a0a;
        }

        /* ========== LIGHT THEME ========== */
        [data-theme="light"] .lux-navbar--scrolled {
          background: rgba(255, 255, 255, 0.95);
          border-bottom-color: rgba(139, 105, 20, 0.12);
        }
        [data-theme="light"] .lux-navbar__logo { color: #8b6914; }
        [data-theme="light"] .lux-navbar__link { color: #525252; }
        [data-theme="light"] .lux-navbar__link:hover { color: #8b6914; }
        [data-theme="light"] .lux-navbar__link--active { color: #8b6914; }
        [data-theme="light"] .lux-navbar__icon-btn { color: #525252; }
        [data-theme="light"] .lux-navbar__icon-btn:hover { color: #8b6914; }
        [data-theme="light"] .lux-navbar__login-btn {
          border-color: #8b6914;
          color: #8b6914;
        }
        [data-theme="light"] .lux-navbar__login-btn:hover {
          background: #8b6914;
          color: #fff;
        }
        [data-theme="light"] .lux-navbar__features-dropdown {
          background: #ffffff;
          border-color: rgba(139, 105, 20, 0.12);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        [data-theme="light"] .lux-navbar__features-item { color: #525252; }
        [data-theme="light"] .lux-navbar__features-item:hover { color: #8b6914; background: rgba(139,105,20,0.05); }
        [data-theme="light"] .lux-navbar__currency-dropdown {
          background: #ffffff;
          border-color: rgba(139, 105, 20, 0.12);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        [data-theme="light"] .lux-navbar__currency-opt { color: #525252; }
        [data-theme="light"] .lux-navbar__currency-opt:hover { color: #8b6914; }
        [data-theme="light"] .lux-navbar__currency-opt--active { color: #8b6914; }
        [data-theme="light"] .lux-navbar__drawer {
          background: #ffffff;
          border-color: rgba(139, 105, 20, 0.12);
        }
        [data-theme="light"] .lux-navbar__drawer-link { color: #525252; }
        [data-theme="light"] .lux-navbar__drawer-link--active { color: #8b6914; }
        [data-theme="light"] .lux-navbar__drawer-feature-item { color: #525252; }
        [data-theme="light"] .lux-navbar__drawer-feature-item:hover { color: #8b6914; }
        [data-theme="light"] .lux-navbar__hamburger-bar { background: #262626; }
        [data-theme="light"] .lux-navbar__badge { background: #8b6914; }
        [data-theme="light"] .lux-navbar__avatar { background: rgba(139,105,20,0.1); color: #8b6914; }

        /* ========== RESPONSIVE ========== */
        #navbar .lux-navbar__links { display: flex; }
        #navbar .lux-navbar__right { display: flex; }
        #navbar .lux-navbar__mobile-btn { display: none !important; }
        #navbar .lux-navbar__drawer { display: none; }

        @media (max-width: 768px) {
          #navbar .lux-navbar__links { display: none !important; }
          #navbar .lux-navbar__right { display: none !important; }
          #navbar .lux-navbar__mobile-btn { display: flex !important; }
          #navbar .lux-navbar__drawer { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
