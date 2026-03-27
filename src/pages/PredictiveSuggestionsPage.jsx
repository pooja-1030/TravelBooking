import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PredictiveSuggestionsPage = () => {
  const getSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  };

  const currentSeason = getSeason();
  const [selectedSeason, setSelectedSeason] = useState(currentSeason);

  const seasonData = {
    spring: [
      { dest: 'Kyoto, Japan', why: 'Cherry blossom season at its peak', dates: 'Mar 20 - Apr 15', popularity: 92, emoji: '🌸' },
      { dest: 'Amsterdam, Netherlands', why: 'Tulip festival & perfect weather', dates: 'Apr 1 - May 10', popularity: 85, emoji: '🌷' },
      { dest: 'Provence, France', why: 'Lavender fields beginning to bloom', dates: 'Apr - May', popularity: 78, emoji: '💜' },
      { dest: 'Queenstown, NZ', why: 'Autumn colors in the Southern Hemisphere', dates: 'Mar - May', popularity: 70, emoji: '🍂' },
      { dest: 'Washington D.C.', why: 'National Cherry Blossom Festival', dates: 'Mar 20 - Apr 14', popularity: 88, emoji: '🏛️' },
      { dest: 'Marrakech, Morocco', why: 'Comfortable temps before summer heat', dates: 'Mar - May', popularity: 65, emoji: '🕌' },
    ],
    summer: [
      { dest: 'Santorini, Greece', why: 'Peak Mediterranean summer vibes', dates: 'Jun - Aug', popularity: 96, emoji: '🏖️' },
      { dest: 'Bali, Indonesia', why: 'Dry season with perfect surf conditions', dates: 'Jun - Sep', popularity: 90, emoji: '🌴' },
      { dest: 'Reykjavik, Iceland', why: 'Midnight sun & whale watching', dates: 'Jun - Aug', popularity: 82, emoji: '☀️' },
      { dest: 'Amalfi Coast, Italy', why: 'Iconic coastal roads & beach clubs', dates: 'Jun - Aug', popularity: 94, emoji: '🍋' },
      { dest: 'Dubrovnik, Croatia', why: 'Old town & crystal-clear Adriatic', dates: 'Jun - Sep', popularity: 87, emoji: '🏰' },
      { dest: 'Maui, Hawaii', why: 'Perfect beach weather year-round peak', dates: 'Jun - Aug', popularity: 91, emoji: '🌺' },
    ],
    fall: [
      { dest: 'New England, USA', why: 'World-famous fall foliage', dates: 'Sep 15 - Nov 1', popularity: 93, emoji: '🍁' },
      { dest: 'Tuscany, Italy', why: 'Harvest season, wine & truffle festivals', dates: 'Sep - Nov', popularity: 88, emoji: '🍷' },
      { dest: 'Patagonia, Argentina', why: 'Spring wildflowers in the south', dates: 'Oct - Nov', popularity: 75, emoji: '🏔️' },
      { dest: 'Seoul, South Korea', why: 'Stunning autumn temple visits', dates: 'Oct - Nov', popularity: 80, emoji: '🍂' },
      { dest: 'Munich, Germany', why: 'Oktoberfest & Bavarian charm', dates: 'Sep - Oct', popularity: 95, emoji: '🍺' },
      { dest: 'Rajasthan, India', why: 'Cool desert weather & festivals', dates: 'Oct - Nov', popularity: 72, emoji: '🐫' },
    ],
    winter: [
      { dest: 'Tromso, Norway', why: 'Northern lights season at peak', dates: 'Nov - Mar', popularity: 89, emoji: '🌌' },
      { dest: 'Swiss Alps', why: 'World-class skiing & cozy chalets', dates: 'Dec - Mar', popularity: 94, emoji: '⛷️' },
      { dest: 'Maldives', why: 'Dry season, perfect island weather', dates: 'Dec - Apr', popularity: 91, emoji: '🏝️' },
      { dest: 'Lapland, Finland', why: 'Northern lights & Santa Claus Village', dates: 'Dec - Feb', popularity: 86, emoji: '🎅' },
      { dest: 'Cape Town, South Africa', why: 'Summer in the Southern Hemisphere', dates: 'Dec - Feb', popularity: 83, emoji: '🦁' },
      { dest: 'Tokyo, Japan', why: 'Winter illuminations & hot springs', dates: 'Dec - Feb', popularity: 78, emoji: '🗼' },
    ],
  };

  const pricePredictions = [
    {
      city: 'Paris',
      prices: [320, 290, 260, 240, 310, 380, 410, 390, 280, 250, 230, 340],
      bestMonth: 'November',
      currency: '$',
    },
    {
      city: 'Bangkok',
      prices: [180, 160, 150, 170, 140, 120, 110, 115, 130, 155, 190, 210],
      bestMonth: 'July',
      currency: '$',
    },
    {
      city: 'New York',
      prices: [280, 260, 290, 310, 340, 380, 400, 390, 350, 300, 270, 310],
      bestMonth: 'February',
      currency: '$',
    },
  ];

  const upcomingEvents = [
    { name: 'Holi Festival', location: 'India', date: 'Mar 14, 2026', type: 'Cultural' },
    { name: 'Coachella', location: 'California, USA', date: 'Apr 10-19, 2026', type: 'Music' },
    { name: 'Tour de France', location: 'France', date: 'Jul 4-26, 2026', type: 'Sports' },
    { name: 'La Tomatina', location: 'Valencia, Spain', date: 'Aug 26, 2026', type: 'Festival' },
    { name: 'Diwali', location: 'India', date: 'Oct 20, 2026', type: 'Cultural' },
    { name: 'Rio Carnival', location: 'Brazil', date: 'Feb 13-18, 2027', type: 'Festival' },
  ];

  const personalizedPicks = [
    { dest: 'Bali, Indonesia', reason: 'Based on your beach trip searches', match: 95 },
    { dest: 'Kyoto, Japan', reason: 'You loved cultural experiences', match: 90 },
    { dest: 'Swiss Alps', reason: 'Matches your adventure preference', match: 85 },
    { dest: 'Lisbon, Portugal', reason: 'Fits your budget range', match: 82 },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const seasons = ['spring', 'summer', 'fall', 'winter'];
  const seasonLabels = { spring: 'Spring', summer: 'Summer', fall: 'Fall', winter: 'Winter' };

  return (
    <>
      <style>{`
        .predict-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #e0e0e0;
          font-family: 'DM Sans', sans-serif;
          padding: 0 0 80px 0;
        }
        .predict-hero {
          text-align: center;
          padding: 60px 20px 40px;
        }
        .predict-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3rem;
          color: #f5f5f5;
          margin: 0 0 12px 0;
        }
        .predict-hero-title span { color: #c9a96e; }
        .predict-hero-sub {
          color: #a0a0a0;
          font-size: 1.15rem;
          margin: 0;
        }
        .predict-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .predict-season-filter {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin: 30px 0 40px;
          flex-wrap: wrap;
        }
        .predict-season-btn {
          padding: 10px 28px;
          border-radius: 30px;
          border: 1px solid rgba(201,169,110,0.3);
          background: #111116;
          color: #a0a0a0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .predict-season-btn:hover {
          border-color: #c9a96e;
          color: #e0e0e0;
        }
        .predict-season-btn.predict-active {
          background: rgba(201,169,110,0.15);
          border-color: #c9a96e;
          color: #c9a96e;
          font-weight: 600;
        }
        .predict-current-badge {
          font-size: 0.7rem;
          background: #c9a96e;
          color: #0a0a0a;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 6px;
          font-weight: 700;
          vertical-align: middle;
        }
        .predict-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          color: #f5f5f5;
          margin: 50px 0 24px 0;
        }
        .predict-trending-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .predict-trend-card {
          background: #111116;
          border-radius: 14px;
          padding: 24px;
          border: 1px solid rgba(201,169,110,0.08);
          transition: all 0.3s;
        }
        .predict-trend-card:hover {
          border-color: rgba(201,169,110,0.25);
          background: #1a1a22;
          transform: translateY(-3px);
        }
        .predict-trend-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .predict-trend-emoji {
          font-size: 1.8rem;
        }
        .predict-trend-dest {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          color: #f5f5f5;
          margin: 0;
        }
        .predict-trend-why {
          color: #a0a0a0;
          font-size: 0.9rem;
          margin: 0 0 12px 0;
          line-height: 1.5;
        }
        .predict-trend-dates {
          color: #c9a96e;
          font-size: 0.85rem;
          margin-bottom: 12px;
        }
        .predict-popularity-bar-bg {
          height: 6px;
          background: #1a1a22;
          border-radius: 3px;
          overflow: hidden;
        }
        .predict-popularity-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #c9a96e, #d4af37);
          border-radius: 3px;
          transition: width 0.6s ease;
        }
        .predict-popularity-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: #666;
          margin-top: 4px;
        }
        .predict-price-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .predict-price-card {
          background: #111116;
          border-radius: 14px;
          padding: 24px;
          border: 1px solid rgba(201,169,110,0.08);
        }
        .predict-price-city {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.4rem;
          color: #f5f5f5;
          margin: 0 0 16px 0;
        }
        .predict-chart {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 120px;
          margin-bottom: 8px;
        }
        .predict-chart-bar-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
        }
        .predict-chart-bar {
          width: 100%;
          border-radius: 4px 4px 0 0;
          background: rgba(201,169,110,0.3);
          transition: background 0.3s;
          min-height: 4px;
        }
        .predict-chart-bar.predict-best {
          background: #d4af37;
        }
        .predict-chart-label {
          font-size: 0.65rem;
          color: #666;
          margin-top: 4px;
        }
        .predict-best-badge {
          display: inline-block;
          background: rgba(201,169,110,0.15);
          color: #d4af37;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-top: 12px;
        }
        .predict-events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        .predict-event-card {
          background: #111116;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(201,169,110,0.08);
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s;
        }
        .predict-event-card:hover {
          background: #1a1a22;
          border-color: rgba(201,169,110,0.2);
        }
        .predict-event-type-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          background: rgba(201,169,110,0.15);
          color: #c9a96e;
          white-space: nowrap;
        }
        .predict-event-info {
          flex: 1;
        }
        .predict-event-name {
          color: #f5f5f5;
          font-weight: 600;
          margin: 0 0 4px 0;
        }
        .predict-event-meta {
          color: #a0a0a0;
          font-size: 0.85rem;
          margin: 0;
        }
        .predict-personal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }
        .predict-personal-card {
          background: #111116;
          border-radius: 14px;
          padding: 22px;
          border: 1px solid rgba(201,169,110,0.08);
          transition: all 0.3s;
        }
        .predict-personal-card:hover {
          background: #1a1a22;
          transform: translateY(-3px);
          border-color: rgba(201,169,110,0.2);
        }
        .predict-personal-dest {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.2rem;
          color: #f5f5f5;
          margin: 0 0 6px 0;
        }
        .predict-personal-reason {
          color: #a0a0a0;
          font-size: 0.85rem;
          margin: 0 0 12px 0;
        }
        .predict-match-badge {
          display: inline-block;
          background: rgba(201,169,110,0.15);
          color: #d4af37;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }
      `}</style>

      <div className="predict-page">
        <div className="predict-hero">
          <h1 className="predict-hero-title">
            Trending <span>Now</span>
          </h1>
          <p className="predict-hero-sub">AI-powered travel predictions based on season & trends</p>
        </div>

        <div className="predict-container">
          <div className="predict-season-filter">
            {seasons.map((s) => (
              <button
                key={s}
                className={`predict-season-btn ${selectedSeason === s ? 'predict-active' : ''}`}
                onClick={() => setSelectedSeason(s)}
              >
                {seasonLabels[s]}
                {s === currentSeason && <span className="predict-current-badge">NOW</span>}
              </button>
            ))}
          </div>

          <h2 className="predict-section-title">Trending This {seasonLabels[selectedSeason]}</h2>
          <div className="predict-trending-grid">
            {seasonData[selectedSeason].map((item, i) => (
              <div key={i} className="predict-trend-card">
                <div className="predict-trend-header">
                  <span className="predict-trend-emoji">{item.emoji}</span>
                  <h3 className="predict-trend-dest">{item.dest}</h3>
                </div>
                <p className="predict-trend-why">{item.why}</p>
                <div className="predict-trend-dates">Best dates: {item.dates}</div>
                <div className="predict-popularity-bar-bg">
                  <div
                    className="predict-popularity-bar-fill"
                    style={{ width: `${item.popularity}%` }}
                  />
                </div>
                <div className="predict-popularity-label">
                  <span>Popularity</span>
                  <span>{item.popularity}%</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="predict-section-title">Price Predictions</h2>
          <div className="predict-price-grid">
            {pricePredictions.map((city, ci) => {
              const maxPrice = Math.max(...city.prices);
              const minPrice = Math.min(...city.prices);
              const bestIdx = city.prices.indexOf(minPrice);
              return (
                <div key={ci} className="predict-price-card">
                  <h3 className="predict-price-city">{city.city}</h3>
                  <div className="predict-chart">
                    {city.prices.map((p, pi) => (
                      <div key={pi} className="predict-chart-bar-wrapper">
                        <div
                          className={`predict-chart-bar ${pi === bestIdx ? 'predict-best' : ''}`}
                          style={{ height: `${(p / maxPrice) * 100}%` }}
                        />
                        <span className="predict-chart-label">{months[pi]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="predict-best-badge">
                    Best Time to Book: {city.bestMonth} ({city.currency}{minPrice}/night)
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="predict-section-title">Upcoming Events</h2>
          <div className="predict-events-grid">
            {upcomingEvents.map((evt, i) => (
              <div key={i} className="predict-event-card">
                <span className="predict-event-type-badge">{evt.type}</span>
                <div className="predict-event-info">
                  <p className="predict-event-name">{evt.name}</p>
                  <p className="predict-event-meta">{evt.location} &middot; {evt.date}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="predict-section-title">Personalized For You</h2>
          <div className="predict-personal-grid">
            {personalizedPicks.map((pick, i) => (
              <div key={i} className="predict-personal-card">
                <h3 className="predict-personal-dest">{pick.dest}</h3>
                <p className="predict-personal-reason">{pick.reason}</p>
                <span className="predict-match-badge">{pick.match}% Match</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PredictiveSuggestionsPage;
