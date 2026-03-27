import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { CITY_LIST, CATEGORIES, FEATURES, TESTIMONIALS, heroImg } from '../data/travelData'

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [destination, setDestination] = useState('')
  const navigate = useNavigate()
  const { toggleWishlist, isWishlisted, convertPrice, addRecentlyViewed } = useApp()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [loading])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(destination)}`)
  }

  const popularCities = CITY_LIST.slice(0, 4)
  const recommendedCities = CITY_LIST.slice(0, 3)

  if (loading) {
    return (
      <>
        <div className="lux-loading-screen">
          <span className="lux-loading-text">WANDERLUST</span>
        </div>
        <style>{`
          .lux-loading-screen {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #0a0a0a;
          }
          .lux-loading-text {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 700;
            letter-spacing: 0.15em;
            background: linear-gradient(
              90deg,
              #c9a96e 0%,
              #f0dca0 25%,
              #c9a96e 50%,
              #f0dca0 75%,
              #c9a96e 100%
            );
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer 2s ease-in-out infinite;
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </>
    )
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="lux-hero">
        <div className="lux-hero-img-wrap">
          <img src={heroImg} alt="Luxury travel destination" className="lux-hero-img" />
        </div>
        <div className="lux-hero-overlay" />
        <div className="lux-hero-content">
          <span className="lux-hero-label">LUXURY TRAVEL EXPERIENCES</span>
          <h1 className="lux-hero-heading">Discover Extraordinary Destinations</h1>
          <p className="lux-hero-subtitle">
            Curated journeys to the world's most captivating places, designed for the discerning traveler who seeks beauty, comfort, and wonder.
          </p>
          <form onSubmit={handleSearch} className="lux-hero-search">
            <input
              type="text"
              placeholder="Where shall we take you?"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="lux-hero-input"
            />
            <button type="submit" className="lux-hero-btn">Search</button>
          </form>
        </div>
        <div className="lux-scroll-indicator">
          <div className="lux-scroll-line" />
        </div>
      </section>

      {/* ===== POPULAR DESTINATIONS ===== */}
      <section className="lux-section">
        <div className="lux-section-inner">
          <div className="reveal lux-section-header">
            <div className="lux-gold-line" />
            <h2 className="lux-section-title">Popular Destinations</h2>
            <p className="lux-section-subtitle">Trending places our travelers love this season.</p>
          </div>
          <div className="lux-grid-4">
            {popularCities.map((city, i) => (
              <Link
                to={`/city/${city.id}`}
                key={city.id}
                className="reveal lux-dest-card"
                onClick={() => addRecentlyViewed({ id: city.id, name: city.name, image: city.heroImage, country: city.country })}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="lux-dest-card-img-wrap">
                  <img src={city.heroImage} alt={city.name} loading="lazy" className="lux-dest-card-img" />
                  <div className="lux-dest-card-img-overlay" />
                </div>
                <div className="lux-dest-card-body">
                  <h3 className="lux-dest-card-name">{city.name}</h3>
                  <p className="lux-dest-card-country">{city.country}</p>
                  <div className="lux-dest-card-meta">
                    <span className="lux-dest-card-rating">{'\u2605'} {city.rating}</span>
                    <span className="lux-dest-card-price">From {convertPrice(city.price)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRAVEL CATEGORIES ===== */}
      <section className="lux-section lux-section--categories">
        <div className="lux-section-inner">
          <div className="reveal lux-section-header">
            <div className="lux-gold-line" />
            <h2 className="lux-section-title">Explore by Category</h2>
            <p className="lux-section-subtitle">Find experiences that match your travel style.</p>
          </div>
          <div className="lux-categories-grid">
            {CATEGORIES.map((cat, i) => (
              <Link
                to={`/search?type=${cat.name.toLowerCase()}`}
                key={cat.name}
                className="reveal lux-category-card"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="lux-category-icon">{cat.icon}</span>
                <span className="lux-category-name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RECOMMENDED ===== */}
      <section className="lux-section">
        <div className="lux-section-inner">
          <div className="reveal lux-section-header">
            <div className="lux-gold-line" />
            <h2 className="lux-section-title">Recommended for You</h2>
            <p className="lux-section-subtitle">Handpicked stays based on top ratings and trending interest.</p>
          </div>
          <div className="lux-grid-3">
            {recommendedCities.map((city, i) => {
              const wishlisted = isWishlisted(city.id, 'destination')
              return (
                <div
                  key={city.id}
                  className="reveal lux-rec-card"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="lux-rec-card-img-wrap">
                    <img
                      src={city.images?.[1] || city.heroImage}
                      alt={city.name}
                      loading="lazy"
                      className="lux-rec-card-img"
                    />
                    <button
                      onClick={() => toggleWishlist({
                        id: city.id,
                        type: 'destination',
                        name: city.name,
                        image: city.heroImage,
                        price: city.price,
                        country: city.country,
                      })}
                      aria-label="Toggle wishlist"
                      className={`lux-wishlist-btn ${wishlisted ? 'lux-wishlist-btn--active' : ''}`}
                    >
                      {wishlisted ? '\u2764\ufe0f' : '\u2661'}
                    </button>
                  </div>
                  <div className="lux-rec-card-body">
                    <h3 className="lux-rec-card-name">{city.name}</h3>
                    <p className="lux-rec-card-country">{city.country}</p>
                    <div className="lux-rec-card-rating-row">
                      <span className="lux-rec-card-rating">{'\u2605'} {city.rating}</span>
                      <span className="lux-rec-card-reviews">({city.reviewCount} reviews)</span>
                    </div>
                    <div className="lux-rec-card-footer">
                      <span className="lux-rec-card-price">
                        {convertPrice(city.price)} <span className="lux-rec-card-price-unit">/trip</span>
                      </span>
                      <Link
                        to={`/city/${city.id}`}
                        onClick={() => addRecentlyViewed({ id: city.id, name: city.name, image: city.heroImage, country: city.country })}
                        className="lux-rec-card-link"
                      >
                        View Details &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="lux-section">
        <div className="lux-section-inner">
          <div className="reveal lux-section-header">
            <div className="lux-gold-line" />
            <h2 className="lux-section-title">Everything You Need</h2>
            <p className="lux-section-subtitle">Plan, compare, and book your perfect trip in one place.</p>
          </div>
          <div className="lux-grid-4">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="reveal lux-feature-card"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="lux-feature-icon">{f.icon}</div>
                <h3 className="lux-feature-title">{f.title}</h3>
                <p className="lux-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="lux-section">
        <div className="lux-section-inner">
          <div className="reveal lux-section-header">
            <div className="lux-gold-line" />
            <h2 className="lux-section-title">What Travelers Say</h2>
            <p className="lux-section-subtitle">Real stories from people who explored the world with us.</p>
          </div>
          <div className="lux-grid-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="reveal lux-testimonial-card"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="lux-testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <div className="lux-testimonial-author">
                  <div className="lux-testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="lux-testimonial-name">{t.name}</div>
                    <div className="lux-testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="lux-section">
        <div className="lux-section-inner">
          <div className="reveal lux-newsletter">
            <h2 className="lux-newsletter-title">Stay in the Loop</h2>
            <p className="lux-newsletter-desc">
              Get the best travel deals and inspiration delivered to your inbox.
            </p>
            <form onSubmit={e => e.preventDefault()} className="lux-newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="lux-newsletter-input"
              />
              <button type="submit" className="lux-newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== STYLES ===== */}
      <style>{`
        /* ---------- BASE / FONTS ---------- */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');

        /* ---------- REVEAL ANIMATION ---------- */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ---------- HERO ---------- */
        .lux-hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0a0a0a;
        }
        .lux-hero-img-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .lux-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: kenBurns 20s ease-in-out infinite alternate;
        }
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .lux-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
          z-index: 1;
        }
        .lux-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 720px;
          padding: 0 24px;
        }
        .lux-hero-label {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #c9a96e;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .lux-hero-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 20px;
        }
        .lux-hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin: 0 0 44px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }
        .lux-hero-search {
          display: flex;
          max-width: 520px;
          margin: 0 auto;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        .lux-hero-search:focus-within {
          border-color: #c9a96e;
        }
        .lux-hero-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 18px 26px;
          font-size: 1rem;
          color: #fff;
          background: transparent;
          font-family: inherit;
        }
        .lux-hero-input::placeholder {
          color: rgba(255,255,255,0.4);
        }
        .lux-hero-btn {
          border: none;
          background: #c9a96e;
          color: #0a0a0a;
          padding: 18px 32px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.02em;
          white-space: nowrap;
          font-family: inherit;
          transition: background 0.3s ease;
        }
        .lux-hero-btn:hover {
          background: #d4b87a;
        }

        /* Scroll Indicator */
        .lux-scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          width: 1px;
          height: 48px;
          overflow: hidden;
        }
        .lux-scroll-line {
          width: 1px;
          height: 100%;
          background: #c9a96e;
          animation: scrollDown 2s ease-in-out infinite;
        }
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }

        /* ---------- SECTIONS ---------- */
        .lux-section {
          background: #0a0a0a;
          padding: 120px 24px;
        }
        .lux-section--categories {
          background: linear-gradient(180deg, #0d0d10 0%, #0a0a0a 100%);
        }
        .lux-section-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .lux-section-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .lux-gold-line {
          width: 48px;
          height: 2px;
          background: #c9a96e;
          margin: 0 auto 24px;
        }
        .lux-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.01em;
          margin: 0 0 14px;
        }
        .lux-section-subtitle {
          font-size: 1.05rem;
          color: #8a8a8a;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ---------- GRID LAYOUTS ---------- */
        .lux-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .lux-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        /* ---------- POPULAR DESTINATION CARDS ---------- */
        .lux-dest-card {
          text-decoration: none;
          color: inherit;
          background: #111116;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid transparent;
          transition: border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
        }
        .lux-dest-card:hover {
          border-color: rgba(201,169,110,0.25);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
        }
        .lux-dest-card-img-wrap {
          position: relative;
          padding-top: 70%;
          overflow: hidden;
        }
        .lux-dest-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .lux-dest-card:hover .lux-dest-card-img {
          transform: scale(1.08);
        }
        .lux-dest-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(201,169,110,0.15) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .lux-dest-card:hover .lux-dest-card-img-overlay {
          opacity: 1;
        }
        .lux-dest-card-body {
          padding: 22px 22px 26px;
        }
        .lux-dest-card-name {
          font-size: 1.15rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 4px;
        }
        .lux-dest-card-country {
          font-size: 0.9rem;
          color: #8a8a8a;
          margin: 0 0 14px;
        }
        .lux-dest-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .lux-dest-card-rating {
          font-size: 0.85rem;
          color: #c9a96e;
          font-weight: 500;
        }
        .lux-dest-card-price {
          font-size: 0.95rem;
          font-weight: 600;
          color: #c9a96e;
        }

        /* ---------- CATEGORIES ---------- */
        .lux-categories-grid {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .lux-category-card {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 32px 28px;
          border-radius: 16px;
          background: #111116;
          width: 150px;
          border: 1px solid transparent;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .lux-category-card:hover {
          border-color: rgba(201,169,110,0.4);
          background: #16161c;
        }
        .lux-category-icon {
          font-size: 2.2rem;
          transition: filter 0.3s ease;
        }
        .lux-category-card:hover .lux-category-icon {
          filter: drop-shadow(0 0 8px rgba(201,169,110,0.5));
        }
        .lux-category-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.01em;
        }

        /* ---------- RECOMMENDED CARDS ---------- */
        .lux-rec-card {
          background: #111116;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid transparent;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .lux-rec-card:hover {
          border-color: rgba(201,169,110,0.25);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
        }
        .lux-rec-card-img-wrap {
          position: relative;
          padding-top: 60%;
          overflow: hidden;
        }
        .lux-rec-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .lux-rec-card:hover .lux-rec-card-img {
          transform: scale(1.06);
        }
        .lux-wishlist-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          color: rgba(255,255,255,0.7);
          transition: transform 0.2s ease, background 0.3s ease;
          z-index: 2;
        }
        .lux-wishlist-btn:hover {
          transform: scale(1.1);
          background: rgba(0,0,0,0.7);
        }
        .lux-wishlist-btn--active {
          color: #c9a96e;
        }
        .lux-rec-card-body {
          padding: 22px 24px 28px;
        }
        .lux-rec-card-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 6px;
        }
        .lux-rec-card-country {
          font-size: 0.9rem;
          color: #8a8a8a;
          margin: 0 0 14px;
        }
        .lux-rec-card-rating-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .lux-rec-card-rating {
          font-size: 0.85rem;
          color: #c9a96e;
          font-weight: 500;
        }
        .lux-rec-card-reviews {
          font-size: 0.85rem;
          color: #8a8a8a;
        }
        .lux-rec-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .lux-rec-card-price {
          font-size: 1.1rem;
          font-weight: 600;
          color: #c9a96e;
        }
        .lux-rec-card-price-unit {
          font-size: 0.85rem;
          font-weight: 400;
          color: #8a8a8a;
        }
        .lux-rec-card-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: #c9a96e;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .lux-rec-card-link:hover {
          opacity: 0.7;
        }

        /* ---------- FEATURE CARDS ---------- */
        .lux-feature-card {
          text-align: center;
          padding: 44px 28px;
          border-radius: 16px;
          background: #111116;
          border: 1px solid transparent;
          transition: border-color 0.3s ease;
        }
        .lux-feature-card:hover {
          border-color: rgba(201,169,110,0.2);
        }
        .lux-feature-icon {
          font-size: 2.2rem;
          margin-bottom: 18px;
          color: #c9a96e;
        }
        .lux-feature-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 10px;
        }
        .lux-feature-desc {
          font-size: 0.9rem;
          color: #8a8a8a;
          line-height: 1.55;
          margin: 0;
        }

        /* ---------- TESTIMONIALS ---------- */
        .lux-testimonial-card {
          padding: 40px 34px;
          border-radius: 16px;
          background: #111116;
          border-left: 3px solid #c9a96e;
        }
        .lux-testimonial-text {
          font-size: 1rem;
          color: #fff;
          line-height: 1.7;
          margin: 0 0 28px;
          font-style: italic;
          opacity: 0.9;
        }
        .lux-testimonial-author {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .lux-testimonial-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a96e 0%, #a07d3f 100%);
          color: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          flex-shrink: 0;
        }
        .lux-testimonial-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
        }
        .lux-testimonial-role {
          font-size: 0.85rem;
          color: #c9a96e;
          margin-top: 3px;
        }

        /* ---------- NEWSLETTER ---------- */
        .lux-newsletter {
          text-align: center;
          max-width: 560px;
          margin: 0 auto;
          padding: 64px 48px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .lux-newsletter-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700;
          color: #c9a96e;
          letter-spacing: -0.01em;
          margin: 0 0 14px;
        }
        .lux-newsletter-desc {
          font-size: 1rem;
          color: #8a8a8a;
          line-height: 1.6;
          margin: 0 0 36px;
        }
        .lux-newsletter-form {
          display: flex;
          max-width: 440px;
          margin: 0 auto;
          border-radius: 100px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          transition: border-color 0.3s ease;
        }
        .lux-newsletter-form:focus-within {
          border-color: #c9a96e;
        }
        .lux-newsletter-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 16px 24px;
          font-size: 0.95rem;
          color: #fff;
          background: rgba(255,255,255,0.05);
          font-family: inherit;
        }
        .lux-newsletter-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .lux-newsletter-btn {
          border: none;
          background: #c9a96e;
          color: #0a0a0a;
          padding: 16px 28px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          font-family: inherit;
          transition: background 0.3s ease;
        }
        .lux-newsletter-btn:hover {
          background: #d4b87a;
        }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 1024px) {
          .lux-grid-4 {
            grid-template-columns: repeat(2, 1fr);
          }
          .lux-grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .lux-grid-4,
          .lux-grid-3 {
            grid-template-columns: 1fr;
          }
          .lux-section {
            padding: 80px 16px;
          }
          .lux-hero-content {
            padding: 0 16px;
          }
          .lux-newsletter {
            padding: 48px 24px;
          }
          .lux-newsletter-form {
            flex-direction: column;
            border-radius: 16px;
          }
          .lux-newsletter-input {
            border-radius: 0;
          }
          .lux-newsletter-btn {
            padding: 16px;
          }
          .lux-hero-search {
            flex-direction: column;
            border-radius: 16px;
          }
          .lux-hero-btn {
            border-radius: 0;
          }
          .lux-category-card {
            width: 120px;
            padding: 24px 18px;
          }
        }

        /* ========== LIGHT THEME ========== */
        [data-theme="light"] .lux-loading {
          background: #ffffff;
        }
        [data-theme="light"] .lux-section {
          background: #ffffff;
        }
        [data-theme="light"] .lux-section:nth-child(even) {
          background: #f8f6f1;
        }
        [data-theme="light"] .lux-section-label { color: #8b6914; }
        [data-theme="light"] .lux-gold-line { background: #8b6914; }
        [data-theme="light"] .lux-section-title { color: #171717; }
        [data-theme="light"] .lux-section-subtitle { color: #737373; }
        [data-theme="light"] .lux-dest-name { color: #171717; }
        [data-theme="light"] .lux-dest-meta { color: #737373; }
        [data-theme="light"] .lux-category-card {
          background: #ffffff;
          border-color: #e5e5e5;
        }
        [data-theme="light"] .lux-category-card:hover {
          border-color: rgba(139, 105, 20, 0.3);
        }
        [data-theme="light"] .lux-category-label { color: #262626; }
        [data-theme="light"] .lux-reco-card {
          background: #ffffff;
          border-color: #e5e5e5;
        }
        [data-theme="light"] .lux-reco-name { color: #171717; }
        [data-theme="light"] .lux-reco-loc { color: #737373; }
        [data-theme="light"] .lux-reco-price { color: #8b6914; }
        [data-theme="light"] .lux-feature-card {
          background: #ffffff;
          border-color: #e5e5e5;
        }
        [data-theme="light"] .lux-feature-title { color: #171717; }
        [data-theme="light"] .lux-feature-desc { color: #737373; }
        [data-theme="light"] .lux-testi-card {
          background: #ffffff;
          border-color: #e5e5e5;
          border-left-color: #8b6914;
        }
        [data-theme="light"] .lux-testi-text { color: #404040; }
        [data-theme="light"] .lux-testi-name { color: #171717; }
        [data-theme="light"] .lux-testi-role { color: #737373; }
        [data-theme="light"] .lux-newsletter-card {
          background: rgba(248, 246, 241, 0.9);
          border-color: #e5e5e5;
        }
        [data-theme="light"] .lux-newsletter-title { color: #8b6914; }
        [data-theme="light"] .lux-newsletter-desc { color: #525252; }
        [data-theme="light"] .lux-newsletter-input {
          background: #ffffff;
          border-color: #e5e5e5;
          color: #262626;
        }
        [data-theme="light"] .lux-hero-search {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(139, 105, 20, 0.15);
        }
        [data-theme="light"] .lux-hero-select,
        [data-theme="light"] .lux-hero-input {
          color: #262626;
        }
      `}</style>
    </>
  )
}
