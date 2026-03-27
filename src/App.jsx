import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ——— IMAGE IMPORTS ——— */
import heroImg from './assets/images/hero.png'
import baliImg from './assets/images/bali.png'
import parisImg from './assets/images/paris.png'
import dubaiImg from './assets/images/dubai.png'
import tokyoImg from './assets/images/tokyo.png'
import adventureImg from './assets/images/adventure.png'

/* ——— DATA ——— */
const DESTINATIONS = [
  { name: 'Bali', country: 'Indonesia', price: '$899', badge: 'Popular', rating: 4.8, img: baliImg },
  { name: 'Paris', country: 'France', price: '$1,249', badge: 'Romantic', rating: 4.9, img: parisImg },
  { name: 'Dubai', country: 'UAE', price: '$1,099', badge: 'Luxury', rating: 4.7, img: dubaiImg },
  { name: 'Tokyo', country: 'Japan', price: '$1,189', badge: 'Trending', rating: 4.85, img: tokyoImg },
]

const RECOMMENDATIONS = [
  {
    title: 'Santorini Sunset Villa',
    location: 'Santorini, Greece',
    rating: 4.9,
    reviews: 312,
    price: '$245',
    per: '/night',
    tag: 'Top Rated',
    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80',
    initials: '🏛️',
  },
  {
    title: 'Swiss Alpine Retreat',
    location: 'Interlaken, Switzerland',
    rating: 4.8,
    reviews: 187,
    price: '$320',
    per: '/night',
    tag: 'New',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    initials: '🏔️',
  },
  {
    title: 'Maldives Water Bungalow',
    location: 'Malé, Maldives',
    rating: 4.95,
    reviews: 524,
    price: '$489',
    per: '/night',
    tag: 'Exclusive',
    img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80',
    initials: '🌊',
  },
]

const FEATURES = [
  { icon: '✈️', title: 'Flights', desc: 'Compare & book flights from 500+ airlines worldwide with best prices guaranteed.' },
  { icon: '🏨', title: 'Hotels', desc: 'Over 1M+ hotels from boutique stays to luxury resorts at exclusive member rates.' },
  { icon: '🚗', title: 'Car Rentals', desc: 'Rent from top providers — economy to luxury vehicles at every destination.' },
  { icon: '🎒', title: 'Packages', desc: 'Curated all-inclusive travel packages for hassle-free perfect vacations.' },
]

const DEAL_CARDS = [
  {
    title: 'Tropical Bali Escape',
    desc: '5 nights all inclusive',
    original: '$1,499',
    current: '$999',
    badge: '-33%',
    img: baliImg,
  },
  {
    title: 'Paris City Break',
    desc: '4 nights + flight',
    original: '$1,899',
    current: '$1,329',
    badge: '-30%',
    img: parisImg,
  },
  {
    title: 'Dubai Luxury Getaway',
    desc: '6 nights at 5★ resort',
    original: '$2,499',
    current: '$1,749',
    badge: '-30%',
    img: dubaiImg,
  },
  {
    title: 'Tokyo Adventure',
    desc: '7 nights + rail pass',
    original: '$2,199',
    current: '$1,539',
    badge: '-30%',
    img: tokyoImg,
  },
  {
    title: 'Swiss Alps Tour',
    desc: '5 nights with excursions',
    original: '$2,799',
    current: '$1,959',
    badge: '-30%',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
  },
]

const CATEGORIES = [
  { name: 'Adventure', icon: '🧗', img: adventureImg },
  { name: 'Relax', icon: '🏖️', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80' },
  { name: 'Food', icon: '🍜', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80' },
  { name: 'Culture', icon: '🏛️', img: 'https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?w=400&q=80' },
  { name: 'Luxury', icon: '💎', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80' },
]

const TESTIMONIALS = [
  {
    text: '"Best trip I\'ve ever booked! The whole experience was seamless from start to finish. Will definitely be using Wanderlust for every future trip."',
    name: 'Sarah Mitchell',
    role: 'Adventure Traveler',
    initials: 'SM',
  },
  {
    text: '"Super easy booking process and the deals were unbeatable. Our family vacation to Bali was planned in under 10 minutes!"',
    name: 'David Chen',
    role: 'Family Traveler',
    initials: 'DC',
  },
  {
    text: '"The curated recommendations were spot-on. Found a hidden gem in Greece that became the highlight of our honeymoon."',
    name: 'Emily Rodriguez',
    role: 'Honeymooner',
    initials: 'ER',
  },
]

/* ——— MAIN APP ——— */
/* ——— Skeleton Loader ——— */
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer" />
      <div className="skeleton-body">
        <div className="skeleton-line wide shimmer" />
        <div className="skeleton-line medium shimmer" />
        <div className="skeleton-line short shimmer" />
      </div>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const trendingRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Simulate loading */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  /* Scroll-reveal via IntersectionObserver */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const toggleWishlist = (title) =>
    setWishlist((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="container">
          <a href="#" className="nav-logo">
            <span className="logo-icon">✈</span>
            Wanderlust
          </a>

          <ul className="nav-links">
            <li><a href="#trending">Explore</a></li>
            <li><a href="#features">Trips</a></li>
            <li><a href="#deals">Deals</a></li>
            <li><a href="#testimonials">Reviews</a></li>
          </ul>

          <div className="nav-right">
            <button className="nav-search-btn" aria-label="Search">🔍</button>
            <button className="btn btn-primary nav-login-btn">Login</button>
          </div>

          <button className="mobile-menu-btn" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src={heroImg} alt="Travel destination" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">🌍 Explore 150+ destinations worldwide</div>
          <h1>
            Find Your Next<br />
            <span className="highlight">Adventure</span>
          </h1>
          <p className="hero-subtitle">
            Discover breathtaking destinations, exclusive deals, and personalized travel experiences — all in one place.
          </p>

          <div className="search-bar" id="search-bar">
            <div className="search-field">
              <span className="icon">📍</span>
              <input type="text" placeholder="Where from?" />
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <span className="icon">🔎</span>
              <input type="text" placeholder="Where to?" />
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <span className="icon">📅</span>
              <input type="date" placeholder="Dates" />
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <span className="icon">👤</span>
              <select defaultValue="2">
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3">3 Travelers</option>
                <option value="4">4+ Travelers</option>
              </select>
            </div>
            <button className="btn btn-accent search-btn">Search</button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="number">150+</div>
              <div className="label">Destinations</div>
            </div>
            <div className="hero-stat">
              <div className="number">50K+</div>
              <div className="label">Happy Travelers</div>
            </div>
            <div className="hero-stat">
              <div className="number">4.9★</div>
              <div className="label">User Rating</div>
            </div>
            <div className="hero-stat">
              <div className="number">24/7</div>
              <div className="label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRENDING DESTINATIONS ===== */}
      <section className="trending" id="trending">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label"><span className="emoji">🔥</span> Trending Now</span>
            <h2 className="section-title">Trending Destinations</h2>
            <p className="section-subtitle">The most popular destinations our travelers can't stop talking about this season.</p>
          </div>

          {loading ? (
            <div className="trending-scroll">
              <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
            </div>
          ) : (
            <div className="trending-scroll" ref={trendingRef}>
              {DESTINATIONS.map((d, i) => (
                <div className="destination-card reveal" key={d.name} style={{ transitionDelay: `${i * 100}ms` }}>
                  <img src={d.img} alt={d.name} loading="lazy" />
                  <div className="destination-overlay" />
                  <div className="destination-badge">{d.badge}</div>
                  <div className="destination-rating">⭐ {d.rating}</div>
                  <div className="destination-info">
                    <h3>{d.name}</h3>
                    <div className="location">{d.country}</div>
                    <div className="destination-price">💰 From {d.price}</div>
                    <button className="btn btn-accent destination-view-btn">View Deals →</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== SMART RECOMMENDATIONS ===== */}
      <section className="recommendations" id="recommendations">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label"><span className="emoji">💡</span> Smart Picks</span>
            <h2 className="section-title">Recommended for You</h2>
            <p className="section-subtitle">Handpicked stays based on trending interests and top ratings.</p>
          </div>

          <div className="reco-grid">
            {RECOMMENDATIONS.map((r, i) => (
              <div className="reco-card reveal" key={r.title} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="reco-card-img">
                  <img src={r.img} alt={r.title} loading="lazy" />
                  <button
                    className="reco-card-wishlist"
                    onClick={() => toggleWishlist(r.title)}
                    aria-label="Add to wishlist"
                  >
                    {wishlist.includes(r.title) ? '❤️' : '🤍'}
                  </button>
                  <span className="reco-card-tag">{r.tag}</span>
                  <span className="reco-card-ai-badge">🤖 AI Suggested</span>
                </div>

                <div className="reco-card-body">
                  <h3>{r.title}</h3>
                  <div className="reco-card-meta">
                    <span className="reco-card-rating">⭐ {r.rating} ({r.reviews})</span>
                    <span className="reco-card-location">📍 {r.location}</span>
                  </div>
                  <div className="reco-card-footer">
                    <div className="reco-card-price">
                      {r.price} <span>{r.per}</span>
                    </div>
                    <button className="btn btn-primary reco-card-book">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLAN YOUR TRIP ===== */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header center reveal">
            <span className="section-label" style={{ color: 'var(--primary-light)' }}>
              <span className="emoji">🧳</span> Plan Your Trip
            </span>
            <h2 className="section-title">Everything You Need in One Place</h2>
            <p className="section-subtitle">From flights to full packages — plan, compare, and book your perfect trip effortlessly.</p>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div className="feature-card reveal" key={f.title} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEALS & OFFERS ===== */}
      <section className="deals" id="deals">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label"><span className="emoji">💸</span> Hot Deals</span>
            <h2 className="section-title">Deals & Offers</h2>
            <p className="section-subtitle">Grab these limited-time offers before they're gone.</p>
          </div>

          {/* Big banner */}
          <div className="deal-banner reveal">
            <div className="deal-banner-bg">
              <img
                src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80"
                alt="Maldives deal"
                loading="lazy"
              />
              <div className="deal-banner-overlay" />
            </div>
            <div className="deal-banner-content">
              <div className="deal-discount">🔥 30% OFF</div>
              <h2>Summer Paradise Awaits</h2>
              <p>Exclusive summer packages to the Maldives, Bali, and more. Book now and save big on your dream getaway.</p>
              <button className="btn btn-accent">Explore Offers →</button>
            </div>
          </div>

          {/* Scrollable deal cards */}
          <div className="deals-scroll">
            {DEAL_CARDS.map((d) => (
              <div className="deal-card" key={d.title}>
                <div className="deal-card-img">
                  <img src={d.img} alt={d.title} loading="lazy" />
                  <span className="deal-card-badge">{d.badge}</span>
                </div>
                <div className="deal-card-body">
                  <h4>{d.title}</h4>
                  <p>{d.desc}</p>
                  <div className="deal-card-prices">
                    <span className="original">{d.original}</span>
                    <span className="current">{d.current}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPLORE BY CATEGORY ===== */}
      <section className="categories" id="categories">
        <div className="container">
          <div className="section-header center reveal">
            <span className="section-label"><span className="emoji">🌐</span> Categories</span>
            <h2 className="section-title">Explore by Category</h2>
            <p className="section-subtitle">Find experiences that match your travel style.</p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((c, i) => (
              <div className="category-card reveal" key={c.name} style={{ transitionDelay: `${i * 80}ms` }}>
                <img src={c.img} alt={c.name} loading="lazy" />
                <div className="category-overlay" />
                <div className="category-label">
                  <span className="icon">{c.icon}</span>
                  <span>{c.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header center reveal">
            <span className="section-label"><span className="emoji">⭐</span> Reviews</span>
            <h2 className="section-title">What Travelers Say</h2>
            <p className="section-subtitle">Real stories from real travelers who explored the world with Wanderlust.</p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="testimonial-card reveal" key={t.name} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="testimonial-quote">"</div>
                <div className="testimonial-stars">{'⭐'.repeat(5)}</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div className="testimonial-author-info">
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APP PROMOTION ===== */}
      <section className="app-promo" id="app-promo">
        <div className="container">
          <div className="app-promo-content">
            <div className="app-promo-text reveal">
              <span className="section-label" style={{ color: 'var(--primary-light)' }}>
                <span className="emoji">📱</span> Mobile App
              </span>
              <h2>Your Next Trip,<br />Right in Your Pocket</h2>
              <p>Download the Wanderlust app for exclusive mobile-only deals, real-time trip updates, and offline access to your bookings.</p>
              <div className="app-store-btns">
                <a href="#" className="store-btn">
                  <span className="store-icon">🍎</span>
                  <span className="store-text">
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </span>
                </a>
                <a href="#" className="store-btn">
                  <span className="store-icon">▶️</span>
                  <span className="store-text">
                    <small>Get it on</small>
                    <strong>Google Play</strong>
                  </span>
                </a>
              </div>
            </div>

            <div className="app-promo-visual reveal">
              <div className="phone-mockup">
                <div className="phone-notch" />
                <div className="phone-screen">
                  <div className="logo-text">✈ Wanderlust</div>
                  <div className="tagline">Plan · Book · Travel</div>
                  <div className="mini-search">🔍 Where do you want to go?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="newsletter" id="newsletter">
        <div className="container">
          <div className="newsletter-inner reveal">
            <span className="section-label"><span className="emoji">📩</span> Newsletter</span>
            <h2>Get Travel Deals in Your Inbox</h2>
            <p>Subscribe for exclusive offers, inspiration, and travel tips. No spam, we promise ✌️</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required />
              <button className="btn btn-primary" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer" id="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="nav-logo">
                <span className="logo-icon">✈</span>
                Wanderlust
              </a>
              <p>Making travel accessible, affordable, and unforgettable since 2020. Your trusted partner for adventures around the globe.</p>
              <div className="footer-social">
                <a href="#" className="social-icon" aria-label="Facebook">𝕗</a>
                <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
                <a href="#" className="social-icon" aria-label="Instagram">📷</a>
                <a href="#" className="social-icon" aria-label="YouTube">▶</a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Safety</a></li>
                <li><a href="#">Cancellation</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#">Destinations</a></li>
                <li><a href="#">Top Deals</a></li>
                <li><a href="#">Travel Guides</a></li>
                <li><a href="#">Gift Cards</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Wanderlust Travel. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
