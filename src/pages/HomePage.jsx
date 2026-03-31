import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { CITIES, CATEGORIES, FEATURES, TESTIMONIALS, heroImg } from '../data/travelData'

export default function HomePage() {
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [email, setEmail] = useState('')
  const { toggleWishlist, isWishlisted, convertPrice } = useApp()
  const cityList = Object.values(CITIES)
  const popularCities = cityList.slice(0, 4)
  const recommendedCities = cityList.slice(2, 5)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hp-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    const els = document.querySelectorAll('.hp-reveal')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (destination) {
      window.location.href = `/search?q=${encodeURIComponent(destination)}`
    }
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setEmail('')
    }
  }

  const stripEmoji = (str) => str.replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FEFF}]|[\u{1F900}-\u{1F9FF}]|[\u{200D}\u{20E3}\u{FE0F}]/gu, '').trim()

  return (
    <>
      <style>{styles}</style>

      {/* ---- HERO ---- */}
      <section className="hp-hero">
        <div className="hp-hero-bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=85&auto=format')` }} />
        <div className="hp-hero-overlay" />
        <div className="hp-hero-content">
          <span className="hp-hero-label">TRAVEL BOOKING PLATFORM</span>
          <h1 className="hp-hero-heading">
            Discover your next<br />great adventure
          </h1>
          <p className="hp-hero-subtitle">
            Explore curated destinations, hotels, and experiences worldwide.
          </p>
          <form className="hp-search-bar" onSubmit={handleSearch}>
            <select
              className="hp-search-select"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Where to?</option>
              {cityList.map((city) => (
                <option key={city.id} value={city.name}>{city.name}, {city.country}</option>
              ))}
            </select>
            <input
              type="date"
              className="hp-search-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit" className="hp-search-btn">Search</button>
          </form>
        </div>
      </section>

      {/* ---- POPULAR DESTINATIONS ---- */}
      <section className="hp-section hp-bg-white">
        <div className="hp-container hp-reveal">
          <span className="hp-section-label">POPULAR DESTINATIONS</span>
          <h2 className="hp-section-heading">Trending places to visit</h2>
          <div className="hp-grid hp-grid-4">
            {popularCities.map((city) => (
              <Link to={`/city/${city.id}`} key={city.id} className="hp-card hp-card-dest">
                <div className="hp-card-img-wrap">
                  <img src={city.heroImage} alt={city.name} className="hp-card-img" loading="lazy" />
                </div>
                <div className="hp-card-body">
                  <h3 className="hp-card-title">{city.name}</h3>
                  <p className="hp-card-country">{city.country}</p>
                  <div className="hp-card-meta">
                    <span className="hp-card-rating">{city.rating} rating</span>
                    <span className="hp-card-price">From {convertPrice(city.price)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CATEGORIES ---- */}
      <section className="hp-section hp-bg-gray">
        <div className="hp-container hp-reveal">
          <h2 className="hp-section-heading">Browse by category</h2>
          <div className="hp-categories-row">
            {CATEGORIES.map((cat, i) => (
              <Link to={`/search?q=${encodeURIComponent(stripEmoji(cat.name))}`} key={i} className="hp-cat-card">
                <span className="hp-cat-name">{stripEmoji(cat.name)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- RECOMMENDED ---- */}
      <section className="hp-section hp-bg-white">
        <div className="hp-container hp-reveal">
          <h2 className="hp-section-heading">Recommended for you</h2>
          <div className="hp-grid hp-grid-3">
            {recommendedCities.map((city) => (
              <div key={city.id} className="hp-card hp-card-reco">
                <div className="hp-card-img-wrap">
                  <Link to={`/city/${city.id}`}>
                    <img src={city.heroImage} alt={city.name} className="hp-card-img" loading="lazy" />
                  </Link>
                  <button
                    className={`hp-wish-btn ${isWishlisted(city.id, 'city') ? 'hp-wish-active' : ''}`}
                    onClick={() => toggleWishlist({ id: city.id, type: 'city', name: city.name, image: city.heroImage, country: city.country })}
                    aria-label={isWishlisted(city.id, 'city') ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted(city.id, 'city') ? '#ef4444' : 'none'} stroke={isWishlisted(city.id, 'city') ? '#ef4444' : '#ffffff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="hp-card-body">
                  <Link to={`/city/${city.id}`} className="hp-card-link">
                    <h3 className="hp-card-title">{city.name}</h3>
                  </Link>
                  <p className="hp-card-country">{city.country}</p>
                  <div className="hp-card-meta">
                    <span className="hp-card-rating">{city.rating} rating</span>
                    <span className="hp-card-price">From {convertPrice(city.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- WHY CHOOSE US ---- */}
      <section className="hp-section hp-bg-gray">
        <div className="hp-container hp-reveal">
          <h2 className="hp-section-heading">Why travelers choose us</h2>
          <div className="hp-grid hp-grid-4">
            {FEATURES.map((feat, i) => (
              <div key={i} className="hp-feature-card">
                <div className="hp-feature-dot" />
                <h3 className="hp-feature-title">{feat.title}</h3>
                <p className="hp-feature-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- TESTIMONIALS ---- */}
      <section className="hp-section hp-bg-white">
        <div className="hp-container hp-reveal">
          <h2 className="hp-section-heading">What our travelers say</h2>
          <div className="hp-grid hp-grid-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="hp-testimonial-card">
                <p className="hp-testimonial-text">{t.text}</p>
                <div className="hp-testimonial-author">
                  <span className="hp-testimonial-name">{t.name}</span>
                  <span className="hp-testimonial-role">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- NEWSLETTER ---- */}
      <section className="hp-section hp-bg-gray">
        <div className="hp-container hp-reveal">
          <div className="hp-newsletter-card">
            <h2 className="hp-newsletter-heading">Stay updated</h2>
            <p className="hp-newsletter-subtitle">Get the latest deals and travel inspiration.</p>
            <form className="hp-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="hp-newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="hp-newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = `
  /* ===== BASE ===== */
  .hp-section {
    padding: 96px 24px;
    font-family: 'Inter', sans-serif;
  }
  .hp-bg-white { background: #ffffff; }
  .hp-bg-gray { background: #f9fafb; }
  .hp-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .hp-section-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: #6b7280;
    margin-bottom: 8px;
    text-transform: uppercase;
    font-family: 'Inter', sans-serif;
  }
  .hp-section-heading {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 48px 0;
    font-family: 'Inter', sans-serif;
  }

  /* ===== REVEAL ANIMATION ===== */
  .hp-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .hp-reveal.hp-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ===== HERO ===== */
  .hp-hero {
    position: relative;
    height: 100vh;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }
  .hp-hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .hp-hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
  }
  .hp-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 680px;
    padding: 0 24px;
  }
  .hp-hero-label {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: #ffffff;
    margin-bottom: 20px;
    font-family: 'Inter', sans-serif;
  }
  .hp-hero-heading {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.1;
    margin: 0 0 20px 0;
    font-family: 'Inter', sans-serif;
  }
  .hp-hero-subtitle {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 40px 0;
    line-height: 1.6;
    font-family: 'Inter', sans-serif;
  }
  .hp-search-bar {
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
    padding: 6px;
    gap: 4px;
  }
  .hp-search-select,
  .hp-search-date {
    flex: 1;
    border: none;
    outline: none;
    padding: 14px 16px;
    font-size: 0.95rem;
    color: #374151;
    background: transparent;
    font-family: 'Inter', sans-serif;
    min-width: 0;
  }
  .hp-search-select {
    border-right: 1px solid #e5e7eb;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 36px;
  }
  .hp-search-date {
    border-right: 1px solid #e5e7eb;
  }
  .hp-search-btn {
    padding: 14px 32px;
    background: #e04e2a;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
    transition: background 0.2s ease;
  }
  .hp-search-btn:hover {
    background: #0d6359;
  }

  /* ===== GRIDS ===== */
  .hp-grid {
    display: grid;
    gap: 24px;
  }
  .hp-grid-4 { grid-template-columns: repeat(4, 1fr); }
  .hp-grid-3 { grid-template-columns: repeat(3, 1fr); }

  /* ===== DESTINATION CARDS ===== */
  .hp-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    text-decoration: none;
    color: inherit;
    display: block;
  }
  .hp-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
  .hp-card-img-wrap {
    position: relative;
    overflow: hidden;
  }
  .hp-card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
  }
  .hp-card-body {
    padding: 20px;
  }
  .hp-card-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 4px 0;
    font-family: 'Inter', sans-serif;
  }
  .hp-card-country {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0 0 12px 0;
    font-family: 'Inter', sans-serif;
  }
  .hp-card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.875rem;
    font-family: 'Inter', sans-serif;
  }
  .hp-card-rating {
    color: #374151;
    font-weight: 500;
  }
  .hp-card-price {
    color: #e04e2a;
    font-weight: 600;
  }
  .hp-card-link {
    text-decoration: none;
    color: inherit;
  }

  /* ===== WISHLIST BUTTON ===== */
  .hp-wish-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, transform 0.2s ease;
    z-index: 2;
  }
  .hp-wish-btn:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
  }
  .hp-wish-btn.hp-wish-active {
    background: rgba(255, 255, 255, 0.95);
  }

  /* ===== CATEGORIES ===== */
  .hp-categories-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  .hp-cat-card {
    flex: 1 1 0;
    min-width: 140px;
    padding: 24px 20px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background: #ffffff;
    text-align: center;
    text-decoration: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  }
  .hp-cat-card:hover {
    border-color: #e04e2a;
    box-shadow: 0 4px 12px rgba(15, 118, 110, 0.1);
  }
  .hp-cat-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #111827;
    font-family: 'Inter', sans-serif;
  }

  /* ===== FEATURE CARDS ===== */
  .hp-feature-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 32px 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  }
  .hp-feature-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #e04e2a;
    margin-bottom: 20px;
  }
  .hp-feature-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 8px 0;
    font-family: 'Inter', sans-serif;
  }
  .hp-feature-desc {
    font-size: 0.9rem;
    color: #6b7280;
    line-height: 1.6;
    margin: 0;
    font-family: 'Inter', sans-serif;
  }

  /* ===== TESTIMONIAL CARDS ===== */
  .hp-testimonial-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-left: 3px solid #e04e2a;
    border-radius: 12px;
    padding: 32px 28px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  }
  .hp-testimonial-text {
    font-size: 0.95rem;
    color: #374151;
    line-height: 1.7;
    margin: 0 0 24px 0;
    font-family: 'Inter', sans-serif;
  }
  .hp-testimonial-author {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .hp-testimonial-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #111827;
    font-family: 'Inter', sans-serif;
  }
  .hp-testimonial-role {
    font-size: 0.8rem;
    color: #9ca3af;
    font-family: 'Inter', sans-serif;
  }

  /* ===== NEWSLETTER ===== */
  .hp-newsletter-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 56px 48px;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  }
  .hp-newsletter-heading {
    font-size: 1.75rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 8px 0;
    font-family: 'Inter', sans-serif;
  }
  .hp-newsletter-subtitle {
    font-size: 1rem;
    color: #6b7280;
    margin: 0 0 32px 0;
    font-family: 'Inter', sans-serif;
  }
  .hp-newsletter-form {
    display: flex;
    gap: 8px;
    max-width: 440px;
    margin: 0 auto;
  }
  .hp-newsletter-input {
    flex: 1;
    padding: 14px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #374151;
    outline: none;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.2s ease;
  }
  .hp-newsletter-input:focus {
    border-color: #e04e2a;
  }
  .hp-newsletter-btn {
    padding: 14px 28px;
    background: #e04e2a;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
    transition: background 0.2s ease;
  }
  .hp-newsletter-btn:hover {
    background: #0d6359;
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 1024px) {
    .hp-grid-4 { grid-template-columns: repeat(2, 1fr); }
    .hp-grid-3 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .hp-grid-4 { grid-template-columns: 1fr; }
    .hp-grid-3 { grid-template-columns: 1fr; }
    .hp-section { padding: 64px 16px; }
    .hp-section-heading { font-size: 1.5rem; margin-bottom: 32px; }
    .hp-search-bar {
      flex-direction: column;
      padding: 8px;
    }
    .hp-search-select,
    .hp-search-date {
      border-right: none;
      border-bottom: 1px solid #e5e7eb;
      width: 100%;
    }
    .hp-search-btn {
      width: 100%;
    }
    .hp-categories-row {
      flex-direction: column;
    }
    .hp-cat-card {
      min-width: unset;
    }
    .hp-newsletter-card {
      padding: 40px 24px;
    }
    .hp-newsletter-form {
      flex-direction: column;
    }
    .hp-newsletter-btn {
      width: 100%;
    }
  }

  /* ===== DARK THEME ===== */
  [data-theme="dark"] .hp-bg-white { background: #0f1115; }
  [data-theme="dark"] .hp-bg-gray { background: #161920; }
  [data-theme="dark"] .hp-section-heading { color: #f5f6f8; }
  [data-theme="dark"] .hp-section-label { color: #a0a3ab; }

  [data-theme="dark"] .hp-card {
    background: #1a1d24;
    border-color: #2a2d35;
  }
  [data-theme="dark"] .hp-card:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  }
  [data-theme="dark"] .hp-card-title { color: #f5f6f8; }
  [data-theme="dark"] .hp-card-country { color: #a0a3ab; }
  [data-theme="dark"] .hp-card-rating { color: #a0a3ab; }

  [data-theme="dark"] .hp-cat-card {
    background: #1a1d24;
    border-color: #2a2d35;
  }
  [data-theme="dark"] .hp-cat-card:hover {
    border-color: #e04e2a;
    box-shadow: 0 4px 12px rgba(15, 118, 110, 0.15);
  }
  [data-theme="dark"] .hp-cat-name { color: #f5f6f8; }

  [data-theme="dark"] .hp-feature-card {
    background: #1a1d24;
    border-color: #2a2d35;
  }
  [data-theme="dark"] .hp-feature-title { color: #f5f6f8; }
  [data-theme="dark"] .hp-feature-desc { color: #a0a3ab; }

  [data-theme="dark"] .hp-testimonial-card {
    background: #1a1d24;
    border-color: #2a2d35;
    border-left-color: #e04e2a;
  }
  [data-theme="dark"] .hp-testimonial-text { color: #a0a3ab; }
  [data-theme="dark"] .hp-testimonial-name { color: #f5f6f8; }
  [data-theme="dark"] .hp-testimonial-role { color: #6b7280; }

  [data-theme="dark"] .hp-newsletter-card {
    background: #1a1d24;
    border-color: #2a2d35;
  }
  [data-theme="dark"] .hp-newsletter-heading { color: #f5f6f8; }
  [data-theme="dark"] .hp-newsletter-subtitle { color: #a0a3ab; }
  [data-theme="dark"] .hp-newsletter-input {
    background: #0f1115;
    border-color: #2a2d35;
    color: #f5f6f8;
  }
  [data-theme="dark"] .hp-newsletter-input:focus {
    border-color: #e04e2a;
  }

  [data-theme="dark"] .hp-search-bar {
    background: #1a1d24;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  }
  [data-theme="dark"] .hp-search-select,
  [data-theme="dark"] .hp-search-date {
    color: #a0a3ab;
    border-color: #2a2d35;
  }
  [data-theme="dark"] .hp-search-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a0a3ab' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  }

  [data-theme="dark"] .hp-wish-btn {
    background: rgba(255, 255, 255, 0.1);
  }
  [data-theme="dark"] .hp-wish-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  [data-theme="dark"] .hp-wish-btn.hp-wish-active {
    background: rgba(30, 33, 40, 0.95);
  }
`
