import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showCurrency, setShowCurrency] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const featRef = useRef(null)
  const currRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const {
    theme, toggleTheme,
    user, setShowAuth, setAuthTab, logout,
    currency, setCurrency, CURRENCIES,
    showNotifications, setShowNotifications, unreadCount,
  } = useApp()

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    const handler = (e) => {
      if (currRef.current && !currRef.current.contains(e.target)) setShowCurrency(false)
      if (featRef.current && !featRef.current.contains(e.target)) setShowFeatures(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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
    { to: '/quiz', label: 'Travel Quiz' },
    { to: '/chatbot', label: 'AI Assistant' },
    { to: '/customizer', label: 'Trip Customizer' },
    { to: '/expenses', label: 'Expense Tracker' },
    { to: '/timeline', label: 'Travel Timeline' },
    { to: '/tickets', label: 'Ticket Manager' },
    { to: '/packing', label: 'Packing List' },
    { to: '/photo-spots', label: 'Photo Spots' },
    { to: '/wellness', label: 'Wellness' },
    { to: '/marketplace', label: 'Marketplace' },
    { to: '/voice-search', label: 'Voice Search' },
    { to: '/trending', label: 'Trending' },
    { to: '/crowd-density', label: 'Crowd Map' },
    { to: '/geo-alerts', label: 'Geo Alerts' },
    { to: '/leaderboard', label: 'Leaderboard' },
  ]

  return (
    <nav className={`nav-bar${scrolled ? ' nav-bar--scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          Wanderlust
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link${location.pathname === to ? ' nav-link--active' : ''}`}
            >
              {label}
            </Link>
          ))}

          {/* Features Dropdown */}
          <div className="nav-features-wrap" ref={featRef}>
            <button
              className={`nav-link nav-features-trigger${showFeatures ? ' nav-link--active' : ''}`}
              onClick={() => setShowFeatures(f => !f)}
            >
              Features
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4, transition: 'transform 0.2s', transform: showFeatures ? 'rotate(180deg)' : 'rotate(0)' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {showFeatures && (
              <div className="nav-features-dropdown">
                {featureLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="nav-features-item"
                    onClick={() => setShowFeatures(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side actions */}
        <div className="nav-right">
          {/* Currency Selector */}
          <div className="nav-currency-wrap" ref={currRef}>
            <button
              className="nav-icon-btn"
              onClick={() => setShowCurrency(!showCurrency)}
              aria-label="Currency"
              title="Currency"
            >
              {CURRENCIES[currency]?.symbol || '$'}
            </button>
            {showCurrency && (
              <div className="nav-currency-dropdown">
                {Object.entries(CURRENCIES).map(([code, { symbol, name }]) => (
                  <button
                    key={code}
                    className={`nav-currency-opt${currency === code ? ' nav-currency-opt--active' : ''}`}
                    onClick={() => { setCurrency(code); setShowCurrency(false) }}
                  >
                    <span className="nav-currency-symbol">{symbol}</span>
                    <span>{code}</span>
                    <small className="nav-currency-name">{name}</small>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            className="nav-icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {/* Notifications */}
          <button
            className="nav-icon-btn nav-notif-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            title="Notifications"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && <span className="nav-badge">{unreadCount}</span>}
          </button>

          {/* Search */}
          <button
            className="nav-icon-btn"
            aria-label="Search"
            onClick={() => navigate('/search')}
            title="Search"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Auth / User */}
          {user ? (
            <button className="nav-user-btn" onClick={handleAuth} title="Dashboard">
              <span className="nav-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </button>
          ) : (
            <button className="nav-signin-btn" onClick={handleAuth}>
              Sign in
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="nav-mobile-btn" aria-label="Menu" onClick={() => setMenuOpen(m => !m)}>
          <span className={`nav-hamburger-bar${menuOpen ? ' nav-hamburger-bar--top' : ''}`} />
          <span className={`nav-hamburger-bar${menuOpen ? ' nav-hamburger-bar--mid' : ''}`} />
          <span className={`nav-hamburger-bar${menuOpen ? ' nav-hamburger-bar--bot' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="nav-drawer">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`nav-drawer-link${location.pathname === to ? ' nav-drawer-link--active' : ''}`}
            >
              {label}
            </Link>
          ))}

          <div className="nav-drawer-divider" />
          <span className="nav-drawer-section-label">Features</span>
          <div className="nav-drawer-features-grid">
            {featureLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="nav-drawer-feature-item"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="nav-drawer-divider" />

          <div className="nav-drawer-row">
            <span className="nav-drawer-label">Theme</span>
            <button className="nav-drawer-toggle" onClick={toggleTheme}>
              {theme === 'light' ? (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Dark</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/></svg> Light</>
              )}
            </button>
          </div>

          <div className="nav-drawer-row">
            <span className="nav-drawer-label">Currency</span>
            <select
              className="nav-drawer-select"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
            >
              {Object.entries(CURRENCIES).map(([code, { symbol }]) => (
                <option key={code} value={code}>{symbol} {code}</option>
              ))}
            </select>
          </div>

          <div className="nav-drawer-divider" />

          {user ? (
            <div className="nav-drawer-user">
              <div className="nav-drawer-user-info">
                <span className="nav-drawer-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
                <span className="nav-drawer-name">{user.name}</span>
              </div>
              <button className="nav-drawer-logout" onClick={logout}>
                Log out
              </button>
            </div>
          ) : (
            <button className="nav-drawer-signin" onClick={() => { setMenuOpen(false); setShowAuth(true) }}>
              Sign in
            </button>
          )}
        </div>
      )}

      <style>{`
        /* ========== BASE ========== */
        .nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .nav-bar--scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #e5e7eb;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ========== LOGO ========== */
        .nav-logo {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: opacity 0.2s ease;
        }

        .nav-logo:hover {
          opacity: 0.8;
        }

        /* ========== DESKTOP NAV LINKS ========== */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          color: #6b7280;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.2s ease;
          position: relative;
          padding: 4px 0;
          background: none;
          border: none;
          cursor: pointer;
          line-height: 1.5;
        }

        .nav-link:hover {
          color: #111827;
        }

        .nav-link--active {
          color: #e04e2a;
        }

        /* ========== FEATURES DROPDOWN ========== */
        .nav-features-wrap {
          position: relative;
        }

        .nav-features-trigger {
          display: inline-flex;
          align-items: center;
          font-family: 'Inter', sans-serif;
        }

        .nav-features-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          padding: 8px;
          width: 340px;
          max-height: 440px;
          overflow-y: auto;
          z-index: 100;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }

        .nav-features-dropdown::-webkit-scrollbar {
          width: 4px;
        }

        .nav-features-dropdown::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 2px;
        }

        .nav-features-item {
          display: block;
          padding: 10px 12px;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 450;
          color: #374151;
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
          white-space: nowrap;
        }

        .nav-features-item:hover {
          background: #f3f4f6;
          color: #e04e2a;
        }

        /* ========== RIGHT SIDE ========== */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* ========== ICON BUTTONS ========== */
        .nav-icon-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #6b7280;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .nav-icon-btn svg {
          stroke: #6b7280;
          transition: stroke 0.15s ease;
        }

        .nav-icon-btn:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .nav-icon-btn:hover svg {
          stroke: #111827;
        }

        /* ========== NOTIFICATION BADGE ========== */
        .nav-notif-btn {
          position: relative;
        }

        .nav-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          min-width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef4444;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.625rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          padding: 0 4px;
        }

        /* ========== CURRENCY DROPDOWN ========== */
        .nav-currency-wrap {
          position: relative;
        }

        .nav-currency-dropdown {
          position: absolute;
          top: 44px;
          right: 0;
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          padding: 6px;
          min-width: 220px;
          z-index: 100;
        }

        .nav-currency-opt {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 12px;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          color: #374151;
          font-weight: 400;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .nav-currency-opt:hover {
          background: #f3f4f6;
          color: #e04e2a;
        }

        .nav-currency-opt--active {
          background: #f0fdfa;
          color: #e04e2a;
          font-weight: 600;
        }

        .nav-currency-symbol {
          font-weight: 700;
          width: 20px;
          text-align: center;
        }

        .nav-currency-name {
          color: #9ca3af;
          margin-left: auto;
          font-size: 0.75rem;
        }

        .nav-currency-opt:hover .nav-currency-name {
          color: #6b7280;
        }

        /* ========== USER AVATAR ========== */
        .nav-user-btn {
          padding: 2px;
          border: none;
          background: transparent;
          border-radius: 50%;
          cursor: pointer;
          margin-left: 4px;
          transition: box-shadow 0.2s ease;
        }

        .nav-user-btn:hover {
          box-shadow: 0 0 0 2px #d1d5db;
        }

        .nav-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f3f4f6;
          color: #374151;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        /* ========== SIGN IN BUTTON ========== */
        .nav-signin-btn {
          margin-left: 8px;
          padding: 8px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 8px;
          border: none;
          background: #e04e2a;
          color: #ffffff;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .nav-signin-btn:hover {
          background: #c4401f;
        }

        /* ========== MOBILE MENU BUTTON ========== */
        .nav-mobile-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
        }

        .nav-hamburger-bar {
          display: block;
          width: 20px;
          height: 2px;
          background: #6b7280;
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .nav-hamburger-bar--top {
          transform: rotate(45deg) translate(4px, 5px);
          background: #111827;
        }

        .nav-hamburger-bar--mid {
          opacity: 0;
        }

        .nav-hamburger-bar--bot {
          transform: rotate(-45deg) translate(4px, -5px);
          background: #111827;
        }

        /* ========== MOBILE DRAWER ========== */
        .nav-drawer {
          position: absolute;
          top: 64px;
          left: 0;
          right: 0;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          padding: 16px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .nav-drawer-link {
          padding: 12px 8px;
          color: #374151;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 8px;
          transition: color 0.15s ease, background 0.15s ease;
        }

        .nav-drawer-link:hover {
          color: #e04e2a;
          background: #f9fafb;
        }

        .nav-drawer-link--active {
          color: #e04e2a;
        }

        .nav-drawer-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 8px 0;
        }

        .nav-drawer-section-label {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9ca3af;
          padding: 4px 8px 8px;
        }

        .nav-drawer-features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          margin-bottom: 8px;
        }

        .nav-drawer-feature-item {
          display: block;
          padding: 10px 8px;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 450;
          color: #374151;
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .nav-drawer-feature-item:hover {
          background: #f9fafb;
          color: #e04e2a;
        }

        .nav-drawer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px;
        }

        .nav-drawer-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          color: #6b7280;
          font-weight: 500;
        }

        .nav-drawer-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #374151;
          transition: background 0.15s ease;
        }

        .nav-drawer-toggle:hover {
          background: #f3f4f6;
        }

        .nav-drawer-toggle svg {
          stroke: #6b7280;
        }

        .nav-drawer-select {
          padding: 6px 12px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          color: #374151;
          cursor: pointer;
          outline: none;
        }

        .nav-drawer-select option {
          background: #ffffff;
          color: #374151;
        }

        .nav-drawer-user {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nav-drawer-user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
        }

        .nav-drawer-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f3f4f6;
          color: #374151;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .nav-drawer-name {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: #111827;
        }

        .nav-drawer-logout {
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e7eb;
          background: transparent;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .nav-drawer-logout:hover {
          border-color: #d1d5db;
          color: #111827;
        }

        .nav-drawer-signin {
          width: 100%;
          padding: 12px;
          border: none;
          background: #e04e2a;
          color: #ffffff;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          margin-top: 4px;
          transition: background 0.2s ease;
        }

        .nav-drawer-signin:hover {
          background: #c4401f;
        }

        /* ========== RESPONSIVE ========== */
        #navbar .nav-links { display: flex; }
        #navbar .nav-right { display: flex; }
        #navbar .nav-mobile-btn { display: none !important; }
        #navbar .nav-drawer { display: none; }

        @media (max-width: 768px) {
          #navbar .nav-links { display: none !important; }
          #navbar .nav-right { display: none !important; }
          #navbar .nav-mobile-btn { display: flex !important; }
          #navbar .nav-drawer { display: flex !important; }
        }

        /* ========== DARK THEME ========== */
        [data-theme="dark"] .nav-bar--scrolled {
          background: rgba(15, 17, 21, 0.95);
          border-bottom: 1px solid #2a2d35;
        }

        [data-theme="dark"] .nav-logo {
          color: #f5f6f8;
        }

        [data-theme="dark"] .nav-link {
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-link:hover {
          color: #f5f6f8;
        }

        [data-theme="dark"] .nav-link--active {
          color: #f06840;
        }

        [data-theme="dark"] .nav-icon-btn {
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-icon-btn svg {
          stroke: #a0a3ab;
        }

        [data-theme="dark"] .nav-icon-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #f5f6f8;
        }

        [data-theme="dark"] .nav-icon-btn:hover svg {
          stroke: #f5f6f8;
        }

        [data-theme="dark"] .nav-features-dropdown {
          background: #1a1d24;
          border: 1px solid #2a2d35;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        [data-theme="dark"] .nav-features-item {
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-features-item:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #f06840;
        }

        [data-theme="dark"] .nav-features-dropdown::-webkit-scrollbar-thumb {
          background: #2a2d35;
        }

        [data-theme="dark"] .nav-currency-dropdown {
          background: #1a1d24;
          border: 1px solid #2a2d35;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        [data-theme="dark"] .nav-currency-opt {
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-currency-opt:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #f06840;
        }

        [data-theme="dark"] .nav-currency-opt--active {
          background: rgba(20, 184, 166, 0.08);
          color: #f06840;
        }

        [data-theme="dark"] .nav-currency-name {
          color: #555862;
        }

        [data-theme="dark"] .nav-avatar {
          background: #22252d;
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-user-btn:hover {
          box-shadow: 0 0 0 2px #2a2d35;
        }

        [data-theme="dark"] .nav-signin-btn {
          background: #e04e2a;
          color: #ffffff;
        }

        [data-theme="dark"] .nav-signin-btn:hover {
          background: #f06840;
        }

        [data-theme="dark"] .nav-hamburger-bar {
          background: #a0a3ab;
        }

        [data-theme="dark"] .nav-hamburger-bar--top,
        [data-theme="dark"] .nav-hamburger-bar--bot {
          background: #f5f6f8;
        }

        [data-theme="dark"] .nav-drawer {
          background: #1a1d24;
          border-bottom: 1px solid #2a2d35;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        [data-theme="dark"] .nav-drawer-link {
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-drawer-link:hover {
          color: #f06840;
          background: rgba(255, 255, 255, 0.03);
        }

        [data-theme="dark"] .nav-drawer-link--active {
          color: #f06840;
        }

        [data-theme="dark"] .nav-drawer-divider {
          background: #2a2d35;
        }

        [data-theme="dark"] .nav-drawer-section-label {
          color: #555862;
        }

        [data-theme="dark"] .nav-drawer-feature-item {
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-drawer-feature-item:hover {
          background: rgba(255, 255, 255, 0.03);
          color: #f06840;
        }

        [data-theme="dark"] .nav-drawer-label {
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-drawer-toggle {
          border-color: #2a2d35;
          background: rgba(255, 255, 255, 0.03);
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-drawer-toggle:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        [data-theme="dark"] .nav-drawer-toggle svg {
          stroke: #a0a3ab;
        }

        [data-theme="dark"] .nav-drawer-select {
          border-color: #2a2d35;
          background: rgba(255, 255, 255, 0.03);
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-drawer-select option {
          background: #1a1d24;
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-drawer-avatar {
          background: #22252d;
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-drawer-name {
          color: #f5f6f8;
        }

        [data-theme="dark"] .nav-drawer-logout {
          border-color: #2a2d35;
          color: #a0a3ab;
        }

        [data-theme="dark"] .nav-drawer-logout:hover {
          border-color: #3a3d45;
          color: #f5f6f8;
        }

        [data-theme="dark"] .nav-drawer-signin {
          background: #e04e2a;
        }

        [data-theme="dark"] .nav-drawer-signin:hover {
          background: #f06840;
        }
      `}</style>
    </nav>
  )
}
