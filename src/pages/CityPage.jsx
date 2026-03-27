import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { CITIES } from '../data/travelData'

/* ——— Section Navigation Tabs ——— */
const SECTIONS = [
  { id: 'about', label: 'About', icon: '📖' },
  { id: 'gallery', label: 'Gallery', icon: '📸' },
  { id: 'hotels', label: 'Hotels', icon: '🏨' },
  { id: 'food', label: 'Food', icon: '🍽️' },
  { id: 'attractions', label: 'Attractions', icon: '🗺️' },
  { id: 'transport', label: 'Transport', icon: '✈️' },
  { id: 'packages', label: 'Packages', icon: '📅' },
  { id: 'reviews', label: 'Reviews', icon: '💬' },
  { id: 'budget', label: 'Budget', icon: '📊' },
]

export default function CityPage() {
  const { cityId } = useParams()
  const navigate = useNavigate()
  const city = CITIES[cityId]
  const { convertPrice, toggleWishlist, isWishlisted, addRecentlyViewed, saveTrip, user, setShowAuth } = useApp()

  const [loading, setLoading] = useState(true)
  const [lightboxIdx, setLightboxIdx] = useState(-1)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [activeSection, setActiveSection] = useState('about')
  const [showStickyNav, setShowStickyNav] = useState(false)
  const [hotelFilter, setHotelFilter] = useState('all') // all, budget, mid, luxury
  const [itinerary, setItinerary] = useState([])
  const [bookingToast, setBookingToast] = useState(null)
  const sectionRefs = useRef({})

  useEffect(() => {
    setLoading(true)
    setSelectedHotel(null)
    setItinerary([])
    setHotelFilter('all')
    if (city) addRecentlyViewed({ id: city.id, name: city.name, image: city.heroImage, country: city.country })
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [cityId])

  // Intersection observer for section nav highlighting + reveal animations
  useEffect(() => {
    if (loading) return
    const revealEls = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    revealEls.forEach(el => revealObserver.observe(el))

    // Section tracking
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.2, rootMargin: '-100px 0px -40% 0px' }
    )
    Object.values(sectionRefs.current).forEach(el => { if (el) sectionObserver.observe(el) })

    return () => { revealObserver.disconnect(); sectionObserver.disconnect() }
  }, [loading])

  // Sticky nav visibility
  useEffect(() => {
    const handleScroll = () => setShowStickyNav(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lightbox + modal keyboard nav
  useEffect(() => {
    if (lightboxIdx < 0 && !selectedHotel) return
    const handler = (e) => {
      if (e.key === 'Escape') { setLightboxIdx(-1); setSelectedHotel(null) }
      if (lightboxIdx >= 0 && city) {
        if (e.key === 'ArrowRight') setLightboxIdx(i => (i + 1) % city.images.length)
        if (e.key === 'ArrowLeft') setLightboxIdx(i => (i - 1 + city.images.length) % city.images.length)
      }
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
  }, [lightboxIdx, selectedHotel, city])

  // Toast auto-dismiss
  useEffect(() => {
    if (!bookingToast) return
    const t = setTimeout(() => setBookingToast(null), 3000)
    return () => clearTimeout(t)
  }, [bookingToast])

  const scrollToSection = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleItinerary = (name) => {
    setItinerary(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  const showToast = (msg) => setBookingToast(msg)

  // Filter hotels by price
  const filteredHotels = useMemo(() => {
    if (!city) return []
    return city.hotels.filter(h => {
      const price = typeof h.price === 'number' ? h.price : parseInt(h.price)
      if (hotelFilter === 'budget') return price < 150
      if (hotelFilter === 'mid') return price >= 150 && price < 500
      if (hotelFilter === 'luxury') return price >= 500
      return true
    })
  }, [city, hotelFilter])

  // Calculate overall review rating
  const overallRating = useMemo(() => {
    if (!city?.reviews) return 0
    return (city.reviews.reduce((sum, r) => sum + r.rating, 0) / city.reviews.length).toFixed(1)
  }, [city])

  if (!city) {
    return (
      <div className="city-not-found">
        <div className="container" style={{ textAlign: 'center', padding: '200px 24px 100px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: 16 }}>🗺️</h1>
          <h2 className="section-title">Destination Not Found</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 32px' }}>We couldn't find that destination. Try searching for something else.</p>
          <Link to="/search" className="btn btn-primary">Browse All Destinations</Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="city-loading">
        <div className="skeleton-hero shimmer" />
        <div className="container" style={{ padding: '40px 24px' }}>
          <div className="skeleton-line wide shimmer" style={{ height: 32, marginBottom: 16 }} />
          <div className="skeleton-line medium shimmer" style={{ height: 18, marginBottom: 32 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[1, 2, 3].map(i => <div key={i} className="skeleton-img shimmer" style={{ height: 200, borderRadius: 12 }} />)}
          </div>
        </div>
      </div>
    )
  }

  const getBudgetPct = (val) => city.budget ? Math.round((val / city.budget.total) * 100) : 0

  return (
    <div className="city-page">
      {/* ===== Toast Notification ===== */}
      {bookingToast && (
        <div className="booking-toast">
          <span className="toast-icon">✓</span>
          {bookingToast}
        </div>
      )}

      {/* ===== Lightbox ===== */}
      {lightboxIdx >= 0 && (
        <div className="lightbox" onClick={() => setLightboxIdx(-1)}>
          <button className="lightbox-close" onClick={() => setLightboxIdx(-1)}>✕</button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + city.images.length) % city.images.length) }}>‹</button>
          <img src={city.images[lightboxIdx]} alt={`${city.name} ${lightboxIdx + 1}`} onClick={e => e.stopPropagation()} onError={(e) => { e.target.onerror = null; e.target.src = city.heroImage }} />
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % city.images.length) }}>›</button>
          <div className="lightbox-counter">{lightboxIdx + 1} / {city.images.length}</div>
        </div>
      )}

      {/* ===== Hotel Modal ===== */}
      {selectedHotel && (
        <div className="modal-overlay" onClick={() => setSelectedHotel(null)}>
          <div className="modal-content hotel-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedHotel(null)}>✕</button>
            <div className="hotel-modal-header">
              <img
                src={selectedHotel.image || city.images[1]}
                alt={selectedHotel.name}
                className="hotel-modal-img"
                onError={(e) => { e.target.onerror = null; e.target.src = city.heroImage }}
              />
              <div className="hotel-modal-overlay" />
              <div className="hotel-modal-header-info">
                <div className="hotel-modal-stars">{'⭐'.repeat(selectedHotel.stars)}</div>
                <h2>{selectedHotel.name}</h2>
                <p className="hotel-modal-location">📍 {selectedHotel.location || city.name}</p>
                <div className="hotel-modal-rating-badge">⭐ {selectedHotel.rating} <span>Excellent</span></div>
              </div>
            </div>

            <div className="hotel-modal-body">
              <h3>Available Rooms</h3>
              <div className="room-list">
                {selectedHotel.rooms ? selectedHotel.rooms.map(room => (
                  <div className="room-card" key={room.id}>
                    <img src={room.img} alt={room.name} className="room-img" onError={(e) => { e.target.onerror = null; e.target.src = selectedHotel.image || city.heroImage }} />
                    <div className="room-info">
                      <h4>{room.name}</h4>
                      <div className={`room-availability ${room.available <= 2 ? 'low' : ''}`}>
                        {room.available <= 2 ? '🔥' : '✓'} {room.available} {room.available === 1 ? 'room' : 'rooms'} left
                      </div>
                      <ul className="room-amenities">
                        {room.amenities.map(am => <li key={am}><span className="amenity-check">✓</span> {am}</li>)}
                      </ul>
                    </div>
                    <div className="room-action">
                      <div className="room-price">{convertPrice(room.price)}<span>/night</span></div>
                      <button className="btn btn-primary btn-sm" onClick={() => {
                        if (!user) { setShowAuth(true); return }
                        saveTrip({ destination: city.name, cityId: city.id, hotel: selectedHotel.name, room: room.name, totalCost: room.price * 3, status: 'upcoming' })
                        showToast(`Booked ${room.name} at ${selectedHotel.name}!`)
                      }}>Book Room</button>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray">No detailed room information available for this hotel yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== 1. HERO SECTION ===== */}
      <section className="city-hero">
        <div className="city-hero-bg">
          <img src={city.heroImage} alt={city.name} />
          <div className="city-hero-overlay" />
        </div>
        <div className="city-hero-content">
          <button className="btn btn-glass city-back-btn" onClick={() => navigate(-1)}>← Back</button>
          <div className="city-hero-text">
            <span className="city-badge">{city.badge}</span>
            <h1>{city.name}</h1>
            <p className="city-country">{'\ud83d\udccd'} {city.country}</p>
            <p className="city-tagline">"{city.shortDesc}"</p>
            <div className="hero-quick-badges">
              <div className="quick-badge glass-badge">{'\u2b50'} {city.rating}</div>
              <div className="quick-badge glass-badge">{'\ud83d\udcb0'} From {convertPrice(city.price)}</div>
              <div className="quick-badge glass-badge">{'\ud83c\udf26'} {city.bestTimeToVisit.split('(')[0].trim()}</div>
            </div>
          </div>
          <div className="city-hero-bottom-actions">
            <button className="btn btn-accent btn-lg shadow-glow" onClick={() => scrollToSection('packages')}>Book Now</button>
            <button className="btn btn-glass btn-lg" onClick={() => scrollToSection('gallery')}>View Gallery</button>
            <button
              className={`btn btn-glass btn-lg city-hero-wishlist${isWishlisted(city.id, 'destination') ? ' wishlisted' : ''}`}
              onClick={() => toggleWishlist({ id: city.id, type: 'destination', name: city.name, image: city.heroImage, price: city.price, country: city.country })}
            >
              {isWishlisted(city.id, 'destination') ? '\u2764\ufe0f Saved' : '\ud83e\udd0d Save'}
            </button>
          </div>
        </div>
      </section>

      {/* ===== Section Navigation ===== */}
      <nav className={`city-section-nav ${showStickyNav ? 'sticky-visible' : ''}`}>
        <div className="container">
          <div className="section-nav-inner">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                className={`section-nav-btn ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => scrollToSection(s.id)}
              >
                <span className="section-nav-icon">{s.icon}</span>
                <span className="section-nav-label">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container city-content">

        {/* ===== 3. ABOUT THE CITY ===== */}
        <section className="city-about-grid reveal" id="about" ref={el => sectionRefs.current.about = el}>
          <div className="about-main">
            <h2 className="section-title">About {city.name}</h2>
            <p className="city-description">{city.description}</p>

            <div className="about-highlights">
              {city.culture && (
                <div className="about-highlight-card">
                  <span className="about-highlight-icon">🎭</span>
                  <div>
                    <strong>Culture</strong>
                    <p>{city.culture}</p>
                  </div>
                </div>
              )}
              {city.weather && (
                <div className="about-highlight-card">
                  <span className="about-highlight-icon">🌤️</span>
                  <div>
                    <strong>Weather</strong>
                    <p>{city.weather}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="city-tags" style={{ marginTop: 20 }}>
              {city.travelType.map(t => (
                <span key={t} className="city-tag">{t.charAt(0).toUpperCase() + t.slice(1)}</span>
              ))}
            </div>
          </div>

          <div className="city-highlights-card">
            <h3>Key Information</h3>
            <div className="highlight-item">
              <span className="highlight-icon">🗓️</span>
              <div><strong>Best Time to Visit</strong><p>{city.bestTimeToVisit}</p></div>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🏷️</span>
              <div><strong>Price Range</strong><p>{city.priceRange}</p></div>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">⭐</span>
              <div><strong>Overall Rating</strong><p>{city.rating} / 5.0 ({city.reviewCount.toLocaleString()} reviews)</p></div>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">💰</span>
              <div><strong>Daily Budget</strong><p>{city.avgCost}</p></div>
            </div>
          </div>
        </section>

        {/* ===== 2. IMAGE GALLERY ===== */}
        <section className="city-gallery reveal" id="gallery" ref={el => sectionRefs.current.gallery = el}>
          <h2 className="section-title">📸 City Gallery</h2>
          <div className="gallery-grid">
            {city.images.slice(0, 6).map((img, i) => (
              <div
                className={`gallery-item${i === 0 ? ' featured' : ''}`}
                key={i}
                onClick={() => setLightboxIdx(i)}
              >
                <img src={img} alt={`${city.name} ${i + 1}`} loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = city.heroImage }} />
                <div className="gallery-item-overlay">
                  <span>🔍 View Fullscreen</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 4. HOTELS & ROOMS ===== */}
        <section className="city-section reveal" id="hotels" ref={el => sectionRefs.current.hotels = el}>
          <div className="section-header-row">
            <div>
              <h2 className="section-title">🏨 Premium Stays</h2>
              <p className="section-subtitle">Click a hotel to view rooms and availability</p>
            </div>
            <div className="hotel-filters">
              {['all', 'budget', 'mid', 'luxury'].map(f => (
                <button
                  key={f}
                  className={`filter-chip ${hotelFilter === f ? 'active' : ''}`}
                  onClick={() => setHotelFilter(f)}
                >
                  {f === 'all' ? 'All' : f === 'budget' ? '💰 Budget' : f === 'mid' ? '✨ Mid-Range' : '👑 Luxury'}
                </button>
              ))}
            </div>
          </div>
          <div className="hotels-grid">
            {filteredHotels.length > 0 ? filteredHotels.map((h, i) => (
              <div className="hotel-card editable-card" key={h.id || i} onClick={() => setSelectedHotel(h)} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="hotel-card-img">
                  <img src={h.image || city.images[2]} alt={h.name} loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = city.heroImage }} />
                  <div className="hotel-rating-badge">⭐ {h.rating}</div>
                  {h.rooms && h.rooms.some(r => r.available <= 2) && (
                    <div className="hotel-low-avail">Few rooms left!</div>
                  )}
                </div>
                <div className="hotel-card-content">
                  <div className="hotel-stars">{'⭐'.repeat(h.stars)}</div>
                  <h4>{h.name}</h4>
                  <p className="text-gray text-sm">📍 {h.location || city.name}</p>
                  <div className="hotel-meta">
                    <span className="hotel-price">{convertPrice(h.price)}<span>/night</span></span>
                    <Link to={`/hotel/${city.id}?hotel=${h.id}`} className="link-text" onClick={e => e.stopPropagation()}>View Details {'\u2192'}</Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="no-results-inline">
                <p>No hotels match this filter. <button className="link-btn" onClick={() => setHotelFilter('all')}>Show all</button></p>
              </div>
            )}
          </div>
        </section>

        {/* ===== 5. FOOD & RESTAURANTS ===== */}
        {city.restaurants && (
          <section className="city-section reveal" id="food" ref={el => sectionRefs.current.food = el}>
            <h2 className="section-title">🍽️ Food & Restaurants</h2>
            <p className="section-subtitle">Discover the best culinary experiences in {city.name}</p>
            <div className="restaurants-grid">
              {city.restaurants.map((r, i) => (
                <div className="restaurant-card" key={i} style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="restaurant-img-wrapper">
                    <img src={r.img} alt={r.name} className="restaurant-img" loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = city.heroImage }} />
                    <div className="restaurant-price-badge">{r.priceRange}</div>
                  </div>
                  <div className="restaurant-info">
                    <div className="restaurant-header">
                      <h4>{r.name}</h4>
                      <span className="restaurant-rating">⭐ {r.rating}</span>
                    </div>
                    <p className="restaurant-cuisine">{r.cuisine}</p>
                    <div className="restaurant-dishes">
                      <strong>Must try:</strong>
                      <div className="dish-tags">
                        {r.dishes.map(d => <span key={d} className="dish-tag">{d}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== 7. TOP ATTRACTIONS ===== */}
        <section className="city-section reveal" id="attractions" ref={el => sectionRefs.current.attractions = el}>
          <h2 className="section-title">🗺️ Top Attractions</h2>
          <p className="section-subtitle">Must-visit places in {city.name}</p>
          <div className="attractions-grid">
            {city.attractions.map((a, i) => (
              <div className="attraction-card" key={i} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="attraction-img">
                  <img src={a.img} alt={a.name} loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = city.heroImage }} />
                </div>
                <div className="attraction-body">
                  <h4>{a.name}</h4>
                  <p>{a.desc}</p>
                  <button
                    className={`btn btn-sm ${itinerary.includes(a.name) ? 'btn-primary' : 'outline-btn'}`}
                    style={{ alignSelf: 'flex-start', marginTop: 12 }}
                    onClick={() => toggleItinerary(a.name)}
                  >
                    {itinerary.includes(a.name) ? '✓ Added to Itinerary' : '+ Add to Itinerary'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {itinerary.length > 0 && (
            <div className="itinerary-summary">
              <span className="itinerary-icon">📋</span>
              <span>Your itinerary: <strong>{itinerary.length} {itinerary.length === 1 ? 'place' : 'places'}</strong> added</span>
              <button className="link-btn" onClick={() => setItinerary([])}>Clear all</button>
            </div>
          )}
        </section>

        {/* ===== 6. TRAVEL & TRANSPORT ===== */}
        {city.transport && (
          <section className="city-section reveal" id="transport" ref={el => sectionRefs.current.transport = el}>
            <h2 className="section-title">✈️ Travel & Transport</h2>
            <div className="transport-grid">
              <div className="transport-card">
                <div className="transport-icon">🛫</div>
                <h4>How to Reach</h4>
                <p>{city.transport.flights}</p>
                {city.transport.trains && <p className="transport-sub">{city.transport.trains}</p>}
              </div>
              <div className="transport-card">
                <div className="transport-icon">🚇</div>
                <h4>Local Transport</h4>
                <ul className="transport-list">
                  {city.transport.local.map(l => <li key={l}>{l}</li>)}
                </ul>
              </div>
              <div className="transport-card">
                <div className="transport-icon">💵</div>
                <h4>Estimated Costs</h4>
                <p>{city.transport.cost}</p>
              </div>
            </div>
          </section>
        )}

        {/* ===== 11. INTERACTIVE MAP ===== */}
        {city.mapImage && (
          <section className="city-section reveal map-section">
            <h2 className="section-title">📍 Interactive Map</h2>
            <p className="section-subtitle">Hotels, attractions, and restaurants in {city.name}</p>
            <div className="map-container">
              <img src={city.mapImage} alt={`Map of ${city.name}`} className="map-img" loading="lazy" />
              <div className="map-overlay">
                <div className="map-legend">
                  <span className="map-legend-item"><span className="legend-dot hotel-dot" /> Hotels ({city.hotels.length})</span>
                  <span className="map-legend-item"><span className="legend-dot attraction-dot" /> Attractions ({city.attractions.length})</span>
                  {city.restaurants && <span className="map-legend-item"><span className="legend-dot restaurant-dot" /> Restaurants ({city.restaurants.length})</span>}
                </div>
                <button className="btn btn-primary shadow-glow">Open Full Map</button>
              </div>
            </div>
          </section>
        )}

        {/* ===== 8. TRAVEL PACKAGES ===== */}
        {city.packages && (
          <section className="city-section reveal" id="packages" ref={el => sectionRefs.current.packages = el}>
            <h2 className="section-title">📅 Travel Packages</h2>
            <p className="section-subtitle">Pre-built packages for a hassle-free trip</p>
            <div className="packages-grid">
              {city.packages.map((p, i) => (
                <div className={`package-card ${i === 1 ? 'featured-package' : ''}`} key={p.id}>
                  {i === 1 && <div className="package-popular-badge">Most Popular</div>}
                  <div className="package-header">
                    <h4>{p.name}</h4>
                    <div className="package-duration">{p.duration}</div>
                  </div>
                  <div className="package-body">
                    <div className="package-detail"><span className="package-detail-icon">🏨</span> <strong>Stay:</strong> {p.hotel}</div>
                    {p.meals && <div className="package-detail"><span className="package-detail-icon">🍽️</span> <strong>Meals:</strong> {p.meals}</div>}
                    <div className="package-activities">
                      <div className="package-detail"><span className="package-detail-icon">🎯</span> <strong>Includes:</strong></div>
                      <div className="activity-tags">
                        {p.activities.map(a => <span key={a} className="activity-tag">{a}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="package-footer">
                    <div className="package-price">{convertPrice(p.price)}<span>/person</span></div>
                    <button className="btn btn-primary" onClick={() => {
                      if (!user) { setShowAuth(true); return }
                      saveTrip({ destination: city.name, cityId: city.id, hotel: p.hotel, totalCost: p.price, status: 'upcoming', dates: p.duration })
                      showToast(`${p.name} package booked! Check your dashboard.`)
                    }}>Book Package</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== 9 & 10. BUDGET PLANNER + REVIEWS ===== */}
        <div className="budget-reviews-layout reveal" id="reviews" ref={el => sectionRefs.current.reviews = el}>
          {/* Reviews */}
          {city.reviews && (
            <div className="city-reviews" id="reviews-content">
              <h2 className="section-title">💬 Traveler Reviews</h2>

              {/* Overall rating summary */}
              <div className="rating-summary">
                <div className="rating-big-number">{overallRating}</div>
                <div className="rating-summary-info">
                  <div className="rating-stars-row">{'⭐'.repeat(Math.round(overallRating))}</div>
                  <p>Based on {city.reviewCount.toLocaleString()} reviews</p>
                </div>
                <div className="rating-bars">
                  {[5, 4, 3, 2, 1].map(star => {
                    const count = city.reviews.filter(r => Math.round(r.rating) === star).length
                    const pct = Math.round((count / city.reviews.length) * 100)
                    return (
                      <div className="rating-bar-row" key={star}>
                        <span className="rating-bar-label">{star}★</span>
                        <div className="rating-bar-track"><div className="rating-bar-fill" style={{ width: `${pct}%` }} /></div>
                        <span className="rating-bar-count">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="reviews-list">
                {city.reviews.map((r, i) => (
                  <div className="city-review-card" key={i}>
                    <div className="review-header">
                      <div className="review-avatar">{r.avatar}</div>
                      <div className="review-author">
                        <strong>{r.name}</strong>
                        <div className="review-stars">{'⭐'.repeat(Math.floor(r.rating))}</div>
                      </div>
                    </div>
                    <p className="review-comment">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Budget Planner */}
          {city.budget && (
            <div className="budget-planner" id="budget" ref={el => sectionRefs.current.budget = el}>
              <h2 className="section-title">📊 Budget Planner</h2>
              <p className="text-gray">Estimated average cost breakdown per person</p>

              <div className="budget-total">
                <span className="budget-label">Total Estimated</span>
                <span className="budget-amount">{convertPrice(city.budget.total)}</span>
              </div>

              <div className="budget-bars">
                {[
                  { key: 'stay', label: '🏨 Stay', color: 'stay' },
                  { key: 'food', label: '🍽️ Food', color: 'food' },
                  { key: 'travel', label: '🚇 Travel', color: 'travel' },
                  { key: 'activities', label: '🎯 Activities', color: 'activities' },
                ].map(item => (
                  <div className="budget-bar-row" key={item.key}>
                    <div className="budget-bar-label">
                      <span>{item.label}</span>
                      <span>{convertPrice(city.budget[item.key])}/day</span>
                    </div>
                    <div className="budget-progress">
                      <div className={`budget-fill ${item.color}`} style={{ width: `${getBudgetPct(city.budget[item.key])}%` }} />
                    </div>
                    <div className="budget-pct">{getBudgetPct(city.budget[item.key])}%</div>
                  </div>
                ))}
              </div>

              <div className="budget-breakdown-grid">
                <div className="budget-card">
                  <span className="budget-card-icon">🏨</span>
                  <div className="budget-card-value">{convertPrice(city.budget.stay)}/day</div>
                  <div className="budget-card-label">Accommodation</div>
                </div>
                <div className="budget-card">
                  <span className="budget-card-icon">🍽️</span>
                  <div className="budget-card-value">{convertPrice(city.budget.food)}/day</div>
                  <div className="budget-card-label">Food & Dining</div>
                </div>
                <div className="budget-card">
                  <span className="budget-card-icon">🚇</span>
                  <div className="budget-card-value">{convertPrice(city.budget.travel)}/day</div>
                  <div className="budget-card-label">Transport</div>
                </div>
                <div className="budget-card">
                  <span className="budget-card-icon">🎯</span>
                  <div className="budget-card-value">{convertPrice(city.budget.activities)}/day</div>
                  <div className="budget-card-label">Activities</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== SMART TRAVEL INSIGHTS ===== */}
        <section className="city-section reveal city-insights-section">
          <h2 className="section-title">{'\ud83c\udf1f'} Smart Travel Insights</h2>
          <div className="city-insights-grid">
            <div className="city-insight-card">
              <span className="city-insight-icon">{'\ud83c\udf24\ufe0f'}</span>
              <h4>Weather</h4>
              <p>{city.weather || 'Check local forecast for latest conditions'}</p>
            </div>
            <div className="city-insight-card">
              <span className="city-insight-icon">{'\ud83d\udc65'}</span>
              <h4>Crowd Level</h4>
              <div className="crowd-indicator">
                <div className="crowd-bar"><div className="crowd-fill" style={{ width: '55%' }} /></div>
                <span>Moderate</span>
              </div>
            </div>
            <div className="city-insight-card">
              <span className="city-insight-icon">{'\ud83d\udee1\ufe0f'}</span>
              <h4>Safety Score</h4>
              <div className="safety-score">
                <span className="safety-num">{(4.2 + Math.random() * 0.6).toFixed(1)}</span>
                <span>/5 — Very Safe</span>
              </div>
            </div>
            <div className="city-insight-card">
              <span className="city-insight-icon">{'\ud83d\udcc5'}</span>
              <h4>Best Time to Visit</h4>
              <p>{city.bestTimeToVisit}</p>
            </div>
          </div>
        </section>

        {/* ===== LOCAL EXPERIENCES ===== */}
        <section className="city-section reveal city-experiences-section">
          <h2 className="section-title">{'\ud83e\uddd1\u200d\ud83c\udf73'} Local Experiences</h2>
          <p className="section-subtitle">Authentic activities and hidden gems in {city.name}</p>
          <div className="experiences-grid">
            <div className="experience-card">
              <div className="experience-icon">{'\ud83c\udf73'}</div>
              <h4>Cooking Class</h4>
              <p>Learn to cook authentic local cuisine with a master chef</p>
              <div className="experience-footer">
                <span>{convertPrice(45)}/person</span>
                <button className="btn btn-primary btn-sm" onClick={() => showToast('Experience added to your plan!')}>Book</button>
              </div>
            </div>
            <div className="experience-card">
              <div className="experience-icon">{'\ud83d\udeb6'}</div>
              <h4>Guided Walking Tour</h4>
              <p>Explore hidden alleys, local markets, and cultural landmarks</p>
              <div className="experience-footer">
                <span>{convertPrice(25)}/person</span>
                <button className="btn btn-primary btn-sm" onClick={() => showToast('Experience added to your plan!')}>Book</button>
              </div>
            </div>
            <div className="experience-card">
              <div className="experience-icon">{'\ud83c\udfbf'}</div>
              <h4>Adventure Activity</h4>
              <p>Thrilling outdoor adventures tailored to {city.name}</p>
              <div className="experience-footer">
                <span>{convertPrice(80)}/person</span>
                <button className="btn btn-primary btn-sm" onClick={() => showToast('Experience added to your plan!')}>Book</button>
              </div>
            </div>
            <div className="experience-card">
              <div className="experience-icon">{'\ud83c\udfad'}</div>
              <h4>Cultural Workshop</h4>
              <p>Immerse in traditional arts, crafts, and performances</p>
              <div className="experience-footer">
                <span>{convertPrice(35)}/person</span>
                <button className="btn btn-primary btn-sm" onClick={() => showToast('Experience added to your plan!')}>Book</button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== EMERGENCY & SAFETY ===== */}
        <section className="city-section reveal city-emergency-section">
          <h2 className="section-title">{'\ud83c\udd98'} Emergency & Safety</h2>
          <div className="emergency-grid">
            <div className="emergency-card"><span>{'\ud83c\udfe5'}</span><h4>Hospitals</h4><p>International SOS Clinic, {city.name} General Hospital</p></div>
            <div className="emergency-card"><span>{'\ud83d\udcde'}</span><h4>Emergency Numbers</h4><p>Police: 911 | Ambulance: 112 | Fire: 101</p></div>
            <div className="emergency-card"><span>{'\ud83d\udee1\ufe0f'}</span><h4>Safety Tips</h4><p>Keep copies of passport, use hotel safes, stay aware in crowds</p></div>
            <div className="emergency-card"><span>{'\ud83d\udcb3'}</span><h4>Travel Insurance</h4><p>Comprehensive coverage recommended for international travel</p></div>
          </div>
        </section>

        {/* ===== 12. CTA SECTION ===== */}
        <section className="city-cta reveal">
          <div className="cta-glow" />
          <div className="cta-content">
            <h2>Ready to explore {city.name}?</h2>
            <p>Plan your entire trip, book hotels, and create the perfect itinerary — all in one place.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg shadow-glow" onClick={() => scrollToSection('hotels')}>Book Hotel</button>
              <button className="btn btn-glass btn-lg" onClick={() => scrollToSection('packages')}>Explore Packages</button>
            </div>
          </div>
        </section>

      </div>

      {/* ===== Sticky Book Now Bar ===== */}
      <div className="city-sticky-bar">
        <div className="container city-sticky-inner">
          <div className="city-sticky-info">
            <h3>{city.name}, {city.country}</h3>
            <p>Packages from <strong>{convertPrice(city.price)}</strong>/person</p>
          </div>
          <button className="btn btn-accent city-sticky-btn" onClick={() => scrollToSection('packages')}>Book Your Trip {'\u2192'}</button>
        </div>
      </div>
    </div>
  )
}
