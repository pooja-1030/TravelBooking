import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

const DESTINATIONS = [
  { name: 'Bali, Indonesia', icon: '', tags: ['beach', 'budget', 'warm'] },
  { name: 'Bangkok, Thailand', icon: '', tags: ['budget', 'city', 'warm'] },
  { name: 'Maldives', icon: '', tags: ['beach', 'luxury', 'warm'] },
  { name: 'Paris, France', icon: '', tags: ['luxury', 'city', 'mild'] },
  { name: 'Switzerland', icon: '', tags: ['cold', 'luxury', 'nature'] },
  { name: 'Iceland', icon: '', tags: ['cold', 'nature', 'adventure'] },
  { name: 'Tokyo, Japan', icon: '', tags: ['city', 'mild', 'culture'] },
  { name: 'Dubai, UAE', icon: '', tags: ['luxury', 'warm', 'city'] },
  { name: 'New York, USA', icon: '', tags: ['city', 'mild', 'culture'] },
  { name: 'Santorini, Greece', icon: '', tags: ['beach', 'warm', 'luxury'] },
  { name: 'Goa, India', icon: '', tags: ['beach', 'budget', 'warm'] },
  { name: 'Barcelona, Spain', icon: '', tags: ['city', 'beach', 'warm'] },
  { name: 'Cape Town, South Africa', icon: '', tags: ['nature', 'mild', 'adventure'] },
  { name: 'Kyoto, Japan', icon: '', tags: ['culture', 'mild', 'nature'] },
  { name: 'Patagonia, Argentina', icon: '', tags: ['cold', 'nature', 'adventure'] },
]

const HOTEL_TIERS = ['Budget', 'Standard', 'Premium', 'Luxury', 'Ultra Luxury']

function getRecommendedDestination(budget, luxury, temp, toggles) {
  const tags = []

  if (budget <= 2000) tags.push('budget')
  if (luxury >= 4) tags.push('luxury')
  if (temp <= 30) tags.push('cold')
  else if (temp >= 70) tags.push('warm')
  else tags.push('mild')
  if (toggles.beach) tags.push('beach')
  if (toggles.city) tags.push('city')

  let best = DESTINATIONS[0]
  let bestScore = -1

  for (const dest of DESTINATIONS) {
    let score = 0
    for (const tag of tags) {
      if (dest.tags.includes(tag)) score++
    }
    if (score > bestScore) {
      bestScore = score
      best = dest
    }
  }
  return best
}

export default function TripCustomizerPage() {
  const [budget, setBudget] = useState(3000)
  const [luxury, setLuxury] = useState(3)
  const [duration, setDuration] = useState(7)
  const [groupSize, setGroupSize] = useState(2)
  const [temperature, setTemperature] = useState(50)

  const [toggles, setToggles] = useState({
    beach: false,
    city: true,
    wifi: false,
    pet: false,
    allInclusive: false,
  })

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const luxuryMultiplier = [0.6, 0.8, 1, 1.4, 2.0][luxury - 1]
  const durationFactor = duration <= 3 ? 1.2 : duration <= 7 ? 1 : duration <= 14 ? 0.9 : 0.8
  const inclusiveExtra = toggles.allInclusive ? 1.3 : 1

  const estimatedCost = useMemo(() => {
    const base = budget * durationFactor * luxuryMultiplier * inclusiveExtra
    return Math.round(base / 100) * 100
  }, [budget, durationFactor, luxuryMultiplier, inclusiveExtra])

  const perPersonCost = Math.round(estimatedCost / groupSize)

  const recommended = useMemo(
    () => getRecommendedDestination(budget, luxury, temperature, toggles),
    [budget, luxury, temperature, toggles]
  )

  const hotelTier = HOTEL_TIERS[luxury - 1]

  const tempLabel =
    temperature <= 20 ? 'Freezing' : temperature <= 40 ? 'Cold' : temperature <= 60 ? 'Mild' : temperature <= 80 ? 'Warm' : 'Hot'

  const tempGradient = `linear-gradient(90deg, #4fc3f7 0%, #81d4fa 25%, #fff176 50%, #ffb74d 75%, #ef5350 100%)`

  const starDisplay = Array.from({ length: 5 }, (_, i) => (i < luxury ? '★' : '☆')).join('')

  return (
    <>
      <div className="customizer-page">
        {/* Hero */}
        <section className="customizer-hero">
          <div className="customizer-hero-glow" />
          <p className="customizer-hero-label">PERSONALIZED TRAVEL</p>
          <h1 className="customizer-hero-title">
            Customize Your <span className="customizer-gold">Dream Trip</span>
          </h1>
          <p className="customizer-hero-sub">
            Adjust the sliders and toggles below to craft your perfect getaway. Watch your trip come to life in real time.
          </p>
        </section>

        {/* Main two-column layout */}
        <section className="customizer-main">
          {/* LEFT — Controls */}
          <div className="customizer-controls">
            {/* Budget */}
            <div className="customizer-slider-group">
              <div className="customizer-slider-header">
                <span className="customizer-slider-icon"></span>
                <span className="customizer-slider-label">Budget</span>
                <span className="customizer-slider-value">${budget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                className="customizer-range"
                min={500}
                max={10000}
                step={100}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
              <div className="customizer-range-labels">
                <span>$500</span>
                <span>$10,000</span>
              </div>
            </div>

            {/* Luxury Level */}
            <div className="customizer-slider-group">
              <div className="customizer-slider-header">
                <span className="customizer-slider-icon"></span>
                <span className="customizer-slider-label">Luxury Level</span>
                <span className="customizer-slider-value customizer-stars">{starDisplay}</span>
              </div>
              <input
                type="range"
                className="customizer-range"
                min={1}
                max={5}
                step={1}
                value={luxury}
                onChange={(e) => setLuxury(Number(e.target.value))}
              />
              <div className="customizer-range-labels">
                <span>Budget</span>
                <span>Ultra Luxury</span>
              </div>
            </div>

            {/* Duration */}
            <div className="customizer-slider-group">
              <div className="customizer-slider-header">
                <span className="customizer-slider-icon"></span>
                <span className="customizer-slider-label">Duration</span>
                <span className="customizer-slider-value">
                  {duration} {duration === 1 ? 'day' : 'days'}
                </span>
              </div>
              <input
                type="range"
                className="customizer-range"
                min={1}
                max={30}
                step={1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
              <div className="customizer-range-labels">
                <span>1 day</span>
                <span>30 days</span>
              </div>
            </div>

            {/* Group Size */}
            <div className="customizer-slider-group">
              <div className="customizer-slider-header">
                <span className="customizer-slider-icon"></span>
                <span className="customizer-slider-label">Group Size</span>
                <span className="customizer-slider-value">
                  {groupSize} {groupSize === 1 ? 'person' : 'people'}
                </span>
              </div>
              <input
                type="range"
                className="customizer-range"
                min={1}
                max={12}
                step={1}
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
              />
              <div className="customizer-range-labels">
                <span>Solo</span>
                <span>12 people</span>
              </div>
            </div>

            {/* Temperature */}
            <div className="customizer-slider-group">
              <div className="customizer-slider-header">
                <span className="customizer-slider-icon"></span>
                <span className="customizer-slider-label">Temperature Preference</span>
                <span className="customizer-slider-value">{tempLabel}</span>
              </div>
              <div className="customizer-temp-track-wrapper">
                <div className="customizer-temp-gradient" style={{ background: tempGradient }} />
                <input
                  type="range"
                  className="customizer-range customizer-range-temp"
                  min={0}
                  max={100}
                  step={1}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                />
              </div>
              <div className="customizer-range-labels">
                <span>Cold</span>
                <span>Hot</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="customizer-toggles-section">
              <h3 className="customizer-toggles-title">Preferences</h3>
              <div className="customizer-toggles-grid">
                {[
                  { key: 'beach', label: 'Beach Access', icon: '' },
                  { key: 'city', label: 'City Center', icon: '' },
                  { key: 'wifi', label: 'WiFi Essential', icon: '' },
                  { key: 'pet', label: 'Pet Friendly', icon: '' },
                  { key: 'allInclusive', label: 'All Inclusive', icon: '' },
                ].map((item) => (
                  <button
                    key={item.key}
                    className={`customizer-toggle-btn ${toggles[item.key] ? 'customizer-toggle-active' : ''}`}
                    onClick={() => handleToggle(item.key)}
                    type="button"
                  >
                    <span className="customizer-toggle-icon">{item.icon}</span>
                    <span className="customizer-toggle-label">{item.label}</span>
                    <span className="customizer-toggle-switch">
                      <span className="customizer-toggle-dot" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Live Preview */}
          <div className="customizer-preview">
            <div className="customizer-preview-card">
              <div className="customizer-preview-header">
                <span className="customizer-preview-badge">LIVE PREVIEW</span>
                <div className="customizer-preview-pulse" />
              </div>

              {/* Destination */}
              <div className="customizer-preview-destination">
                <span className="customizer-preview-dest-icon">{recommended.icon}</span>
                <div>
                  <p className="customizer-preview-dest-label">Recommended Destination</p>
                  <h2 className="customizer-preview-dest-name">{recommended.name}</h2>
                </div>
              </div>

              {/* Hotel Tier */}
              <div className="customizer-preview-tier">
                <div className="customizer-preview-tier-bar">
                  <div
                    className="customizer-preview-tier-fill"
                    style={{ width: `${(luxury / 5) * 100}%` }}
                  />
                </div>
                <div className="customizer-preview-tier-info">
                  <span className="customizer-preview-tier-label">{hotelTier}</span>
                  <span className="customizer-preview-tier-stars">{starDisplay}</span>
                </div>
              </div>

              {/* Summary Grid */}
              <div className="customizer-preview-grid">
                <div className="customizer-preview-stat">
                  <span className="customizer-preview-stat-icon"></span>
                  <span className="customizer-preview-stat-value">{duration} {duration === 1 ? 'Day' : 'Days'}</span>
                  <span className="customizer-preview-stat-label">Duration</span>
                </div>
                <div className="customizer-preview-stat">
                  <span className="customizer-preview-stat-icon"></span>
                  <span className="customizer-preview-stat-value">{groupSize}</span>
                  <span className="customizer-preview-stat-label">{groupSize === 1 ? 'Traveler' : 'Travelers'}</span>
                </div>
                <div className="customizer-preview-stat">
                  <span className="customizer-preview-stat-icon"></span>
                  <span className="customizer-preview-stat-value">{tempLabel}</span>
                  <span className="customizer-preview-stat-label">Climate</span>
                </div>
                <div className="customizer-preview-stat">
                  <span className="customizer-preview-stat-icon"></span>
                  <span className="customizer-preview-stat-value">{hotelTier}</span>
                  <span className="customizer-preview-stat-label">Hotel Tier</span>
                </div>
              </div>

              {/* Active Preferences */}
              <div className="customizer-preview-prefs">
                <p className="customizer-preview-prefs-label">Active Preferences</p>
                <div className="customizer-preview-prefs-tags">
                  {toggles.beach && <span className="customizer-tag">Beach</span>}
                  {toggles.city && <span className="customizer-tag">City</span>}
                  {toggles.wifi && <span className="customizer-tag">WiFi</span>}
                  {toggles.pet && <span className="customizer-tag">Pets</span>}
                  {toggles.allInclusive && <span className="customizer-tag">All Inclusive</span>}
                  {!Object.values(toggles).some(Boolean) && (
                    <span className="customizer-tag customizer-tag-dim">No preferences selected</span>
                  )}
                </div>
              </div>

              {/* Cost */}
              <div className="customizer-preview-cost">
                <div className="customizer-preview-cost-row">
                  <span className="customizer-preview-cost-label">Estimated Total</span>
                  <span className="customizer-preview-cost-amount">${estimatedCost.toLocaleString()}</span>
                </div>
                <div className="customizer-preview-cost-row customizer-preview-cost-secondary">
                  <span className="customizer-preview-cost-label">Per Person</span>
                  <span className="customizer-preview-cost-amount">${perPersonCost.toLocaleString()}</span>
                </div>
                <div className="customizer-preview-cost-row customizer-preview-cost-secondary">
                  <span className="customizer-preview-cost-label">Per Night</span>
                  <span className="customizer-preview-cost-amount">
                    ${Math.round(estimatedCost / Math.max(duration, 1)).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Link to="/planner" className="customizer-cta-btn">
                Generate Itinerary
                <span className="customizer-cta-arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        /* ===== PAGE ===== */
        .customizer-page {
          min-height: 100vh;
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          color: #e0e0e0;
          padding-bottom: 80px;
        }

        /* ===== HERO ===== */
        .customizer-hero {
          position: relative;
          text-align: center;
          padding: 80px 24px 48px;
          overflow: hidden;
        }
        .customizer-hero-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse at center, rgba(201,169,110,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        .customizer-hero-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: #c9a96e;
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .customizer-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        .customizer-gold {
          color: #c9a96e;
        }
        .customizer-hero-sub {
          font-size: 1.05rem;
          color: #a0a0a0;
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ===== MAIN LAYOUT ===== */
        .customizer-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .customizer-main {
            grid-template-columns: 1fr;
          }
        }

        /* ===== CONTROLS ===== */
        .customizer-controls {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* ===== SLIDER GROUP ===== */
        .customizer-slider-group {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 16px;
          padding: 24px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .customizer-slider-group:hover {
          border-color: rgba(201,169,110,0.25);
          box-shadow: 0 0 24px rgba(201,169,110,0.06);
        }
        .customizer-slider-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .customizer-slider-icon {
          font-size: 1.3rem;
        }
        .customizer-slider-label {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #f5f5f5;
          flex: 1;
        }
        .customizer-slider-value {
          font-weight: 600;
          font-size: 1rem;
          color: #c9a96e;
          min-width: 80px;
          text-align: right;
        }
        .customizer-stars {
          color: #d4af37;
          font-size: 1.15rem;
          letter-spacing: 2px;
        }
        .customizer-range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #a0a0a0;
          margin-top: 8px;
        }

        /* ===== RANGE INPUT ===== */
        .customizer-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #1a1a22;
          outline: none;
          cursor: pointer;
          position: relative;
          z-index: 2;
        }
        .customizer-range::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(90deg, rgba(201,169,110,0.35), rgba(201,169,110,0.10));
        }
        .customizer-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, #f0dca0, #c9a96e 60%, #a6863a);
          border: 3px solid #0a0a0a;
          box-shadow: 0 0 12px rgba(201,169,110,0.45), 0 2px 6px rgba(0,0,0,0.5);
          margin-top: -8px;
          cursor: grab;
          transition: box-shadow 0.2s ease, transform 0.15s ease;
        }
        .customizer-range::-webkit-slider-thumb:hover {
          box-shadow: 0 0 20px rgba(201,169,110,0.7), 0 2px 8px rgba(0,0,0,0.6);
          transform: scale(1.12);
        }
        .customizer-range::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.05);
        }
        .customizer-range::-moz-range-track {
          height: 6px;
          border-radius: 3px;
          background: linear-gradient(90deg, rgba(201,169,110,0.35), rgba(201,169,110,0.10));
          border: none;
        }
        .customizer-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, #f0dca0, #c9a96e 60%, #a6863a);
          border: 3px solid #0a0a0a;
          box-shadow: 0 0 12px rgba(201,169,110,0.45), 0 2px 6px rgba(0,0,0,0.5);
          cursor: grab;
        }

        /* Temperature track overlay */
        .customizer-temp-track-wrapper {
          position: relative;
          height: 6px;
          border-radius: 3px;
          overflow: visible;
        }
        .customizer-temp-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          border-radius: 3px;
          opacity: 0.5;
          pointer-events: none;
          z-index: 1;
        }
        .customizer-range-temp {
          position: relative;
          z-index: 2;
          background: transparent !important;
        }
        .customizer-range-temp::-webkit-slider-runnable-track {
          background: transparent !important;
        }
        .customizer-range-temp::-moz-range-track {
          background: transparent !important;
        }

        /* ===== TOGGLES ===== */
        .customizer-toggles-section {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 16px;
          padding: 24px;
        }
        .customizer-toggles-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 20px;
        }
        .customizer-toggles-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .customizer-toggle-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #1a1a22;
          border: 1px solid #1e1e24;
          border-radius: 12px;
          padding: 14px 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #a0a0a0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
        }
        .customizer-toggle-btn:hover {
          border-color: rgba(201,169,110,0.25);
          background: rgba(201,169,110,0.04);
        }
        .customizer-toggle-active {
          border-color: rgba(201,169,110,0.4) !important;
          background: rgba(201,169,110,0.08) !important;
          color: #e0e0e0;
        }
        .customizer-toggle-icon {
          font-size: 1.2rem;
          width: 28px;
          text-align: center;
        }
        .customizer-toggle-label {
          flex: 1;
          font-weight: 500;
        }
        .customizer-toggle-switch {
          width: 44px;
          height: 24px;
          border-radius: 12px;
          background: #2a2a32;
          position: relative;
          transition: background 0.3s ease;
          flex-shrink: 0;
        }
        .customizer-toggle-active .customizer-toggle-switch {
          background: #c9a96e;
        }
        .customizer-toggle-dot {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #f5f5f5;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .customizer-toggle-active .customizer-toggle-dot {
          transform: translateX(20px);
          box-shadow: 0 0 8px rgba(201,169,110,0.5);
        }

        /* ===== PREVIEW ===== */
        .customizer-preview {
          position: sticky;
          top: 32px;
        }
        .customizer-preview-card {
          background: #111116;
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 48px rgba(201,169,110,0.06), 0 0 0 1px rgba(201,169,110,0.05);
        }
        .customizer-preview-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }
        .customizer-preview-badge {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #c9a96e;
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.2);
          padding: 5px 14px;
          border-radius: 20px;
        }
        .customizer-preview-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          animation: customizer-pulse 2s ease-in-out infinite;
        }
        @keyframes customizer-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(74,222,128,0); }
        }

        /* Destination */
        .customizer-preview-destination {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #1e1e24;
        }
        .customizer-preview-dest-icon {
          font-size: 2.8rem;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201,169,110,0.08);
          border-radius: 16px;
          border: 1px solid rgba(201,169,110,0.15);
          flex-shrink: 0;
          transition: transform 0.4s ease;
        }
        .customizer-preview-card:hover .customizer-preview-dest-icon {
          transform: scale(1.05);
        }
        .customizer-preview-dest-label {
          font-size: 0.75rem;
          color: #a0a0a0;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin: 0 0 4px;
        }
        .customizer-preview-dest-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0;
          transition: color 0.3s ease;
        }

        /* Hotel Tier */
        .customizer-preview-tier {
          margin-bottom: 24px;
        }
        .customizer-preview-tier-bar {
          width: 100%;
          height: 4px;
          background: #1a1a22;
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .customizer-preview-tier-fill {
          height: 100%;
          background: linear-gradient(90deg, #c9a96e, #d4af37);
          border-radius: 2px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .customizer-preview-tier-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .customizer-preview-tier-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #c9a96e;
        }
        .customizer-preview-tier-stars {
          color: #d4af37;
          font-size: 0.95rem;
          letter-spacing: 2px;
        }

        /* Stats Grid */
        .customizer-preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }
        .customizer-preview-stat {
          background: #1a1a22;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
          border: 1px solid #1e1e24;
          transition: border-color 0.3s ease, transform 0.2s ease;
        }
        .customizer-preview-stat:hover {
          border-color: rgba(201,169,110,0.2);
          transform: translateY(-2px);
        }
        .customizer-preview-stat-icon {
          font-size: 1.4rem;
        }
        .customizer-preview-stat-value {
          font-weight: 700;
          font-size: 1.05rem;
          color: #f5f5f5;
        }
        .customizer-preview-stat-label {
          font-size: 0.72rem;
          color: #a0a0a0;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Preferences */
        .customizer-preview-prefs {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #1e1e24;
        }
        .customizer-preview-prefs-label {
          font-size: 0.72rem;
          color: #a0a0a0;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin: 0 0 10px;
        }
        .customizer-preview-prefs-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .customizer-tag {
          font-size: 0.8rem;
          padding: 6px 14px;
          border-radius: 20px;
          background: rgba(201,169,110,0.10);
          border: 1px solid rgba(201,169,110,0.2);
          color: #c9a96e;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .customizer-tag-dim {
          background: #1a1a22;
          border-color: #1e1e24;
          color: #a0a0a0;
        }

        /* Cost */
        .customizer-preview-cost {
          background: #1a1a22;
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid rgba(201,169,110,0.15);
        }
        .customizer-preview-cost-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 0;
        }
        .customizer-preview-cost-label {
          font-size: 0.9rem;
          color: #a0a0a0;
        }
        .customizer-preview-cost-amount {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #d4af37;
          transition: all 0.3s ease;
        }
        .customizer-preview-cost-secondary .customizer-preview-cost-amount {
          font-size: 1.05rem;
          color: #c9a96e;
        }
        .customizer-preview-cost-secondary .customizer-preview-cost-label {
          font-size: 0.8rem;
        }
        .customizer-preview-cost-secondary {
          border-top: 1px solid #1e1e24;
          margin-top: 4px;
          padding-top: 10px;
        }

        /* CTA Button */
        .customizer-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 18px 24px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #c9a96e 0%, #d4af37 50%, #c9a96e 100%);
          background-size: 200% 200%;
          color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.4s ease;
          animation: customizer-shimmer 3s ease-in-out infinite;
        }
        .customizer-cta-btn:hover {
          box-shadow: 0 8px 32px rgba(201,169,110,0.3), 0 0 0 2px rgba(201,169,110,0.15);
          transform: translateY(-2px);
        }
        .customizer-cta-arrow {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }
        .customizer-cta-btn:hover .customizer-cta-arrow {
          transform: translateX(4px);
        }
        @keyframes customizer-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  )
}
