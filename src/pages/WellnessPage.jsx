import { useState } from 'react'
import { Link } from 'react-router-dom'

const CATEGORIES = [
  { id: 'all', icon: '✨', label: 'All Retreats' },
  { id: 'yoga', icon: '🧘', label: 'Yoga Retreats' },
  { id: 'spa', icon: '💆', label: 'Spa & Massage' },
  { id: 'mountain', icon: '🏔️', label: 'Mountain Escapes' },
  { id: 'ocean', icon: '🌊', label: 'Ocean Therapy' },
  { id: 'detox', icon: '🍃', label: 'Detox Programs' },
  { id: 'meditation', icon: '🧠', label: 'Meditation Centers' },
]

const RETREATS = [
  {
    id: 1,
    name: 'Ubud Yoga Sanctuary',
    location: 'Bali, Indonesia',
    duration: '7 nights',
    price: 1450,
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80',
    category: 'yoga',
    tags: ['Beginner Friendly', 'All Inclusive'],
    description: 'Immerse yourself in traditional Balinese yoga amidst lush rice terraces and sacred temples.',
  },
  {
    id: 2,
    name: 'Swiss Alpine Wellness',
    location: 'Interlaken, Switzerland',
    duration: '5 nights',
    price: 3200,
    rating: 4.8,
    reviews: 187,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    category: 'mountain',
    tags: ['Premium', 'Couples'],
    description: 'Rejuvenate with alpine air, thermal baths, and panoramic mountain views.',
  },
  {
    id: 3,
    name: 'Thai Spa Retreat',
    location: 'Chiang Mai, Thailand',
    duration: '6 nights',
    price: 980,
    rating: 4.7,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
    category: 'spa',
    tags: ['Best Value', 'All Inclusive'],
    description: 'Experience ancient Thai healing traditions with world-class spa treatments.',
  },
  {
    id: 4,
    name: 'Maldives Ocean Healing',
    location: 'Baa Atoll, Maldives',
    duration: '8 nights',
    price: 4500,
    rating: 5.0,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80',
    category: 'ocean',
    tags: ['Luxury', 'Private Villa'],
    description: 'Float above crystal waters with thalassotherapy and ocean sound healing.',
  },
  {
    id: 5,
    name: 'Sedona Meditation Center',
    location: 'Sedona, Arizona',
    duration: '4 nights',
    price: 1800,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80',
    category: 'meditation',
    tags: ['Spiritual', 'Beginner Friendly'],
    description: 'Find inner peace among Sedona\'s powerful vortex energy sites and red rock landscapes.',
  },
  {
    id: 6,
    name: 'Japanese Onsen Experience',
    location: 'Hakone, Japan',
    duration: '5 nights',
    price: 2100,
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    category: 'spa',
    tags: ['Cultural', 'Traditional'],
    description: 'Soak in volcanic hot springs with views of Mount Fuji and zen gardens.',
  },
  {
    id: 7,
    name: 'Kerala Ayurveda',
    location: 'Kovalam, India',
    duration: '10 nights',
    price: 1200,
    rating: 4.7,
    reviews: 278,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
    category: 'detox',
    tags: ['Detox', 'All Inclusive'],
    description: 'Authentic Panchakarma cleanse with Ayurvedic doctors in the birthplace of Ayurveda.',
  },
  {
    id: 8,
    name: 'Iceland Hot Springs',
    location: 'Blue Lagoon, Iceland',
    duration: '4 nights',
    price: 2800,
    rating: 4.6,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&q=80',
    category: 'ocean',
    tags: ['Unique', 'Adventure'],
    description: 'Bathe in geothermal waters under the Northern Lights with silica mud treatments.',
  },
]

const WELLNESS_TIPS = [
  {
    icon: '🌅',
    title: 'Morning Mindfulness',
    text: 'Start each day with 10 minutes of guided breathing. It reduces cortisol levels and sets a calm tone for the hours ahead.',
  },
  {
    icon: '🥗',
    title: 'Nourish Intentionally',
    text: 'Choose whole, plant-rich foods during your retreat. Hydrate often and eat mindfully to amplify your body\'s healing response.',
  },
  {
    icon: '🚶',
    title: 'Walk in Nature',
    text: 'Spend at least 30 minutes walking barefoot on natural ground. Earthing has been shown to reduce inflammation and improve sleep.',
  },
  {
    icon: '📵',
    title: 'Digital Detox',
    text: 'Disconnect from screens for at least 4 hours daily. Replace scrolling with journaling, reading, or simply being present.',
  },
]

function WellnessScoreGauge({ score = 72 }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const dashOffset = circumference - progress

  return (
    <div className="wellness-score-card">
      <h3 className="wellness-score-title">Your Wellness Score</h3>
      <div className="wellness-score-gauge">
        <svg viewBox="0 0 180 180" className="wellness-score-svg">
          <defs>
            <linearGradient id="wellnessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9a96e" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
          </defs>
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#1e1e24"
            strokeWidth="10"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="url(#wellnessGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 90 90)"
            className="wellness-score-progress"
          />
          <text x="90" y="82" textAnchor="middle" className="wellness-score-number">
            {score}
          </text>
          <text x="90" y="104" textAnchor="middle" className="wellness-score-label">
            out of 100
          </text>
        </svg>
      </div>
      <div className="wellness-score-tips">
        <p className="wellness-score-status">Good — Room to grow</p>
        <ul className="wellness-score-list">
          <li>Try a 7-day yoga retreat to boost flexibility</li>
          <li>Consider a digital detox weekend</li>
          <li>Add meditation to your daily routine</li>
        </ul>
      </div>
    </div>
  )
}

export default function WellnessPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredRetreats =
    selectedCategory === 'all'
      ? RETREATS
      : RETREATS.filter((r) => r.category === selectedCategory)

  return (
    <>
      <style>{`
        .wellness-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #e0e0e0;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Hero ── */
        .wellness-hero {
          position: relative;
          padding: 100px 24px 80px;
          text-align: center;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(30, 60, 80, 0.35) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 30%, rgba(20, 60, 50, 0.25) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 100%, rgba(15, 15, 30, 0.9) 0%, #0a0a0a 70%);
          overflow: hidden;
        }
        .wellness-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 40%, rgba(201,169,110,0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .wellness-hero-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 16px;
        }
        .wellness-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 600;
          color: #f5f5f5;
          line-height: 1.15;
          margin: 0 0 20px;
        }
        .wellness-hero-accent {
          display: block;
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #c9a96e, #d4af37);
          margin: 0 auto 24px;
          border-radius: 1px;
        }
        .wellness-hero-desc {
          max-width: 560px;
          margin: 0 auto;
          font-size: 1.05rem;
          color: #a0a0a0;
          line-height: 1.7;
        }

        /* ── Section common ── */
        .wellness-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 24px;
        }
        .wellness-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: #f5f5f5;
          text-align: center;
          margin-bottom: 12px;
        }
        .wellness-section-sub {
          text-align: center;
          color: #a0a0a0;
          font-size: 0.95rem;
          margin-bottom: 40px;
        }

        /* ── Category filters ── */
        .wellness-categories {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 48px;
        }
        .wellness-cat-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 40px;
          border: 1px solid #1e1e24;
          background: #111116;
          color: #a0a0a0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .wellness-cat-btn:hover {
          border-color: rgba(201,169,110,0.4);
          color: #e0e0e0;
        }
        .wellness-cat-btn.wellness-cat-active {
          background: rgba(201,169,110,0.15);
          border-color: rgba(201,169,110,0.5);
          color: #c9a96e;
        }
        .wellness-cat-icon {
          font-size: 1.15rem;
        }

        /* ── Retreat grid ── */
        .wellness-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 28px;
        }
        .wellness-card {
          background: #111116;
          border-radius: 16px;
          border: 1px solid #1e1e24;
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          position: relative;
        }
        .wellness-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.2);
        }
        .wellness-card-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .wellness-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .wellness-card:hover .wellness-card-img {
          transform: scale(1.08);
        }
        .wellness-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10,10,10,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .wellness-card:hover .wellness-card-overlay {
          opacity: 1;
        }
        .wellness-card-book-btn {
          padding: 12px 32px;
          background: linear-gradient(135deg, #c9a96e, #d4af37);
          color: #0a0a0a;
          border: none;
          border-radius: 30px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transform: translateY(10px);
          transition: transform 0.35s ease;
          letter-spacing: 0.5px;
        }
        .wellness-card:hover .wellness-card-book-btn {
          transform: translateY(0);
        }
        .wellness-card-body {
          padding: 20px;
        }
        .wellness-card-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        .wellness-tag {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 4px 10px;
          border-radius: 20px;
          background: rgba(201,169,110,0.1);
          color: #c9a96e;
          border: 1px solid rgba(201,169,110,0.15);
        }
        .wellness-card-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 6px;
        }
        .wellness-card-location {
          font-size: 0.85rem;
          color: #a0a0a0;
          margin-bottom: 10px;
        }
        .wellness-card-desc {
          font-size: 0.85rem;
          color: #888;
          line-height: 1.55;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .wellness-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid #1e1e24;
        }
        .wellness-card-price {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #d4af37;
        }
        .wellness-card-price span {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: #a0a0a0;
        }
        .wellness-card-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.8rem;
          color: #a0a0a0;
        }
        .wellness-card-rating {
          color: #d4af37;
          font-weight: 600;
        }

        /* ── Wellness Score ── */
        .wellness-score-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .wellness-score-card {
          background: #111116;
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 20px;
          padding: 36px;
          text-align: center;
        }
        .wellness-score-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 24px;
        }
        .wellness-score-gauge {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }
        .wellness-score-svg {
          width: 180px;
          height: 180px;
        }
        .wellness-score-progress {
          transition: stroke-dashoffset 1.2s ease;
        }
        .wellness-score-number {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.8rem;
          font-weight: 700;
          fill: #f5f5f5;
        }
        .wellness-score-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          fill: #a0a0a0;
        }
        .wellness-score-status {
          font-size: 1rem;
          color: #c9a96e;
          font-weight: 600;
          margin-bottom: 14px;
        }
        .wellness-score-list {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }
        .wellness-score-list li {
          padding: 8px 0;
          font-size: 0.88rem;
          color: #a0a0a0;
          border-bottom: 1px solid #1e1e24;
          padding-left: 16px;
          position: relative;
        }
        .wellness-score-list li::before {
          content: '\\2022';
          position: absolute;
          left: 0;
          color: #c9a96e;
        }
        .wellness-score-list li:last-child {
          border-bottom: none;
        }
        .wellness-score-tips {
          text-align: left;
        }

        /* ── Tips grid ── */
        .wellness-tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        .wellness-tip-card {
          background: linear-gradient(145deg, #111116, #1a1a22);
          border: 1px solid #1e1e24;
          border-radius: 16px;
          padding: 28px 24px;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .wellness-tip-card:hover {
          border-color: rgba(201,169,110,0.3);
          transform: translateY(-3px);
        }
        .wellness-tip-icon {
          font-size: 2rem;
          margin-bottom: 14px;
          display: block;
        }
        .wellness-tip-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #f5f5f5;
          margin-bottom: 10px;
        }
        .wellness-tip-text {
          font-size: 0.88rem;
          color: #a0a0a0;
          line-height: 1.65;
        }

        /* ── CTA ── */
        .wellness-cta {
          text-align: center;
          padding: 80px 24px;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 60%),
            #0a0a0a;
        }
        .wellness-cta-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 600;
          color: #f5f5f5;
          margin-bottom: 16px;
        }
        .wellness-cta-desc {
          color: #a0a0a0;
          font-size: 1rem;
          max-width: 480px;
          margin: 0 auto 32px;
          line-height: 1.7;
        }
        .wellness-cta-btn {
          display: inline-block;
          padding: 16px 48px;
          background: linear-gradient(135deg, #c9a96e, #d4af37);
          color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.8px;
          border-radius: 40px;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .wellness-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(201,169,110,0.25);
        }

        /* ── Empty state ── */
        .wellness-empty {
          text-align: center;
          padding: 60px 20px;
          color: #a0a0a0;
        }
        .wellness-empty-icon {
          font-size: 3rem;
          margin-bottom: 16px;
          display: block;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .wellness-score-section {
            grid-template-columns: 1fr;
          }
          .wellness-hero {
            padding: 72px 20px 56px;
          }
          .wellness-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="wellness-page">
        {/* Hero */}
        <section className="wellness-hero">
          <p className="wellness-hero-subtitle">Find Your Balance</p>
          <h1 className="wellness-hero-title">Wellness &amp; Retreat Travel</h1>
          <span className="wellness-hero-accent" />
          <p className="wellness-hero-desc">
            Escape the noise. Reconnect with yourself through curated wellness retreats
            in the world's most serene destinations — from Balinese yoga sanctuaries
            to Icelandic geothermal springs.
          </p>
        </section>

        {/* Category Filters */}
        <section className="wellness-section">
          <div className="wellness-categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`wellness-cat-btn${selectedCategory === cat.id ? ' wellness-cat-active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="wellness-cat-icon">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Retreat Grid */}
          <h2 className="wellness-section-title">Featured Retreats</h2>
          <p className="wellness-section-sub">
            Hand-picked sanctuaries vetted by our wellness curators
          </p>

          {filteredRetreats.length > 0 ? (
            <div className="wellness-grid">
              {filteredRetreats.map((retreat) => (
                <div key={retreat.id} className="wellness-card">
                  <div className="wellness-card-img-wrap">
                    <img
                      src={retreat.image}
                      alt={retreat.name}
                      className="wellness-card-img"
                      loading="lazy"
                    />
                    <div className="wellness-card-overlay">
                      <button className="wellness-card-book-btn">Book Now</button>
                    </div>
                  </div>
                  <div className="wellness-card-body">
                    <div className="wellness-card-tags">
                      {retreat.tags.map((tag) => (
                        <span key={tag} className="wellness-tag">{tag}</span>
                      ))}
                    </div>
                    <h3 className="wellness-card-name">{retreat.name}</h3>
                    <p className="wellness-card-location">{retreat.location}</p>
                    <p className="wellness-card-desc">{retreat.description}</p>
                    <div className="wellness-card-footer">
                      <div className="wellness-card-price">
                        ${retreat.price.toLocaleString()} <span>/ {retreat.duration}</span>
                      </div>
                      <div className="wellness-card-meta">
                        <span className="wellness-card-rating">★ {retreat.rating}</span>
                        <span>({retreat.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="wellness-empty">
              <span className="wellness-empty-icon">🔍</span>
              <p>No retreats found in this category. Try selecting a different one.</p>
            </div>
          )}
        </section>

        {/* Wellness Score + Tips */}
        <section className="wellness-section">
          <h2 className="wellness-section-title">Your Wellness Insights</h2>
          <p className="wellness-section-sub">
            Track your well-being and discover personalized recommendations
          </p>
          <div className="wellness-score-section">
            <WellnessScoreGauge score={72} />

            {/* Daily Wellness Tips */}
            <div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: '#f5f5f5',
                  marginBottom: '20px',
                }}
              >
                Daily Wellness Tips
              </h3>
              <div className="wellness-tips-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {WELLNESS_TIPS.map((tip) => (
                  <div key={tip.title} className="wellness-tip-card">
                    <span className="wellness-tip-icon">{tip.icon}</span>
                    <h4 className="wellness-tip-title">{tip.title}</h4>
                    <p className="wellness-tip-text">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="wellness-cta">
          <h2 className="wellness-cta-title">Start Your Wellness Journey</h2>
          <p className="wellness-cta-desc">
            Let us craft a personalized retreat itinerary that nurtures your mind,
            body, and soul. Your transformation begins with a single step.
          </p>
          <Link to="/planner" className="wellness-cta-btn">
            Plan My Retreat
          </Link>
        </section>
      </div>
    </>
  )
}
