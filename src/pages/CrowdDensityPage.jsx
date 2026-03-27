import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CrowdDensityPage = () => {
  const cities = {
    Paris: [
      { name: 'Eiffel Tower', crowd: 85, bestTime: '7:00 AM', wait: '45 min' },
      { name: 'Louvre Museum', crowd: 72, bestTime: '9:00 AM', wait: '30 min' },
      { name: 'Notre-Dame', crowd: 55, bestTime: '8:00 AM', wait: '15 min' },
      { name: 'Sacre-Coeur', crowd: 40, bestTime: '6:30 AM', wait: '5 min' },
      { name: 'Arc de Triomphe', crowd: 65, bestTime: '10:00 AM', wait: '20 min' },
      { name: 'Musee d\'Orsay', crowd: 50, bestTime: '2:00 PM', wait: '10 min' },
      { name: 'Champs-Elysees', crowd: 78, bestTime: '11:00 AM', wait: 'N/A' },
      { name: 'Luxembourg Gardens', crowd: 30, bestTime: 'Any time', wait: 'None' },
    ],
    Tokyo: [
      { name: 'Shibuya Crossing', crowd: 92, bestTime: '6:00 AM', wait: 'N/A' },
      { name: 'Senso-ji Temple', crowd: 70, bestTime: '7:00 AM', wait: '20 min' },
      { name: 'Meiji Shrine', crowd: 45, bestTime: '8:00 AM', wait: '10 min' },
      { name: 'Tokyo Skytree', crowd: 80, bestTime: '9:00 AM', wait: '35 min' },
      { name: 'Tsukiji Market', crowd: 88, bestTime: '5:30 AM', wait: '15 min' },
      { name: 'Akihabara', crowd: 60, bestTime: '11:00 AM', wait: 'N/A' },
      { name: 'Imperial Palace', crowd: 35, bestTime: '10:00 AM', wait: '5 min' },
      { name: 'Ueno Park', crowd: 25, bestTime: 'Any time', wait: 'None' },
    ],
    'New York': [
      { name: 'Times Square', crowd: 95, bestTime: '7:00 AM', wait: 'N/A' },
      { name: 'Statue of Liberty', crowd: 82, bestTime: '8:30 AM', wait: '40 min' },
      { name: 'Central Park', crowd: 50, bestTime: 'Early morning', wait: 'None' },
      { name: 'Empire State Building', crowd: 75, bestTime: '9:00 AM', wait: '25 min' },
      { name: 'Brooklyn Bridge', crowd: 68, bestTime: '6:30 AM', wait: 'N/A' },
      { name: 'MoMA', crowd: 58, bestTime: '10:00 AM', wait: '15 min' },
      { name: 'Top of the Rock', crowd: 70, bestTime: '8:00 AM', wait: '20 min' },
      { name: 'High Line', crowd: 42, bestTime: '8:00 AM', wait: 'None' },
    ],
  };

  const [selectedCity, setSelectedCity] = useState('Paris');
  const [crowdData, setCrowdData] = useState(cities['Paris']);
  const [liveUpdateKey, setLiveUpdateKey] = useState(0);

  const hourlyForecast = [
    { hour: '6AM', level: 15 },
    { hour: '7AM', level: 20 },
    { hour: '8AM', level: 35 },
    { hour: '9AM', level: 55 },
    { hour: '10AM', level: 70 },
    { hour: '11AM', level: 82 },
    { hour: '12PM', level: 90 },
    { hour: '1PM', level: 88 },
    { hour: '2PM', level: 80 },
    { hour: '3PM', level: 75 },
    { hour: '4PM', level: 70 },
    { hour: '5PM', level: 78 },
    { hour: '6PM', level: 85 },
    { hour: '7PM', level: 72 },
    { hour: '8PM', level: 55 },
    { hour: '9PM', level: 38 },
    { hour: '10PM', level: 22 },
  ];

  const tips = [
    { title: 'Visit Early', desc: 'Most attractions are least crowded within the first hour of opening.' },
    { title: 'Weekday Advantage', desc: 'Tuesday and Wednesday tend to have the lowest visitor counts.' },
    { title: 'Skip the Line', desc: 'Pre-book timed entry tickets to bypass general admission queues.' },
    { title: 'Off-Peak Lunch', desc: 'Visit popular restaurants before 11:30 AM or after 2:00 PM.' },
    { title: 'Evening Magic', desc: 'Many outdoor attractions are peaceful and beautiful at golden hour.' },
    { title: 'Shoulder Season', desc: 'Travel just before or after peak season for fewer crowds and lower prices.' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdData((prev) =>
        prev.map((item) => ({
          ...item,
          crowd: Math.max(5, Math.min(99, item.crowd + Math.floor(Math.random() * 11) - 5)),
        }))
      );
      setLiveUpdateKey((k) => k + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCrowdData(
      cities[selectedCity].map((item) => ({
        ...item,
        crowd: Math.max(5, Math.min(99, item.crowd + Math.floor(Math.random() * 11) - 5)),
      }))
    );
  }, [selectedCity]);

  const getCrowdColor = (level) => {
    if (level < 30) return '#22c55e';
    if (level < 55) return '#eab308';
    if (level < 75) return '#f97316';
    return '#ef4444';
  };

  const getCrowdLabel = (level) => {
    if (level < 30) return 'Low';
    if (level < 55) return 'Moderate';
    if (level < 75) return 'Busy';
    return 'Very Crowded';
  };

  const mapDots = crowdData.map((item, i) => ({
    x: 15 + ((i * 37 + 13) % 70),
    y: 15 + ((i * 29 + 7) % 65),
    color: getCrowdColor(item.crowd),
    name: item.name,
    size: 8 + item.crowd / 15,
  }));

  return (
    <>
      <style>{`
        .crowd-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #e0e0e0;
          font-family: 'DM Sans', sans-serif;
          padding: 0 0 80px 0;
        }
        .crowd-hero {
          text-align: center;
          padding: 60px 20px 40px;
        }
        .crowd-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3rem;
          color: #f5f5f5;
          margin: 0 0 12px 0;
        }
        .crowd-hero-title span { color: #c9a96e; }
        .crowd-hero-sub {
          color: #a0a0a0;
          font-size: 1.15rem;
          margin: 0;
        }
        .crowd-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .crowd-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(239,68,68,0.15);
          color: #ef4444;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .crowd-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          animation: crowd-pulse-dot 1.5s ease-in-out infinite;
        }
        @keyframes crowd-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .crowd-city-select {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .crowd-city-select label {
          color: #a0a0a0;
          font-size: 0.95rem;
        }
        .crowd-city-select select {
          background: #111116;
          color: #e0e0e0;
          border: 1px solid rgba(201,169,110,0.3);
          padding: 10px 18px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          cursor: pointer;
          outline: none;
        }
        .crowd-city-select select:focus {
          border-color: #c9a96e;
        }
        .crowd-map-area {
          background: #111116;
          border-radius: 16px;
          height: 280px;
          position: relative;
          border: 1px solid rgba(201,169,110,0.1);
          overflow: hidden;
          margin-bottom: 40px;
        }
        .crowd-map-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .crowd-map-dot {
          position: absolute;
          border-radius: 50%;
          transition: all 0.8s ease;
        }
        .crowd-map-dot-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
          animation: crowd-dot-ring-anim 2s ease-out infinite;
          pointer-events: none;
        }
        @keyframes crowd-dot-ring-anim {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }
        .crowd-map-label {
          position: absolute;
          font-size: 0.7rem;
          color: #a0a0a0;
          white-space: nowrap;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .crowd-map-legend {
          position: absolute;
          bottom: 12px;
          right: 16px;
          display: flex;
          gap: 14px;
          font-size: 0.75rem;
        }
        .crowd-map-legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #a0a0a0;
        }
        .crowd-map-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .crowd-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          color: #f5f5f5;
          margin: 50px 0 24px 0;
        }
        .crowd-attractions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .crowd-attraction-row {
          background: #111116;
          border-radius: 12px;
          padding: 16px 20px;
          display: grid;
          grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr;
          align-items: center;
          gap: 16px;
          border: 1px solid rgba(201,169,110,0.06);
          transition: all 0.3s;
        }
        .crowd-attraction-row:hover {
          background: #1a1a22;
          border-color: rgba(201,169,110,0.15);
        }
        .crowd-attraction-name {
          font-weight: 600;
          color: #f5f5f5;
        }
        .crowd-level-bar-bg {
          height: 8px;
          background: #1a1a22;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        .crowd-level-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.8s ease, background 0.8s ease;
        }
        .crowd-level-label {
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .crowd-best-time {
          color: #a0a0a0;
          font-size: 0.85rem;
        }
        .crowd-wait-time {
          color: #a0a0a0;
          font-size: 0.85rem;
          text-align: right;
        }
        .crowd-forecast-chart {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 150px;
          background: #111116;
          border-radius: 14px;
          padding: 20px 16px;
          border: 1px solid rgba(201,169,110,0.08);
        }
        .crowd-forecast-bar-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
        }
        .crowd-forecast-bar {
          width: 100%;
          border-radius: 3px 3px 0 0;
          min-height: 4px;
          transition: height 0.5s ease;
        }
        .crowd-forecast-hour {
          font-size: 0.6rem;
          color: #666;
          margin-top: 6px;
          white-space: nowrap;
        }
        .crowd-tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        .crowd-tip-card {
          background: #111116;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(201,169,110,0.08);
          transition: all 0.3s;
        }
        .crowd-tip-card:hover {
          background: #1a1a22;
          border-color: rgba(201,169,110,0.2);
        }
        .crowd-tip-title {
          color: #c9a96e;
          font-weight: 600;
          margin: 0 0 6px 0;
        }
        .crowd-tip-desc {
          color: #a0a0a0;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }
        .crowd-header-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr;
          gap: 16px;
          padding: 0 20px 10px;
          font-size: 0.78rem;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .crowd-header-row span:last-child {
          text-align: right;
        }
        @media (max-width: 700px) {
          .crowd-attraction-row, .crowd-header-row {
            grid-template-columns: 1fr 1fr;
          }
          .crowd-best-time, .crowd-wait-time {
            font-size: 0.78rem;
          }
        }
      `}</style>

      <div className="crowd-page">
        <div className="crowd-hero">
          <h1 className="crowd-hero-title">
            Live Crowd <span>Density</span>
          </h1>
          <p className="crowd-hero-sub">Avoid the rush, travel smart</p>
        </div>

        <div className="crowd-container">
          <div className="crowd-live-badge">
            <span className="crowd-live-dot" />
            Live Updates Active
          </div>

          <div className="crowd-city-select">
            <label>Select City:</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {Object.keys(cities).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="crowd-map-area">
            <div className="crowd-map-grid" />
            {mapDots.map((dot, i) => (
              <React.Fragment key={i}>
                <div
                  className="crowd-map-dot"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    width: `${dot.size}px`,
                    height: `${dot.size}px`,
                    background: dot.color,
                    boxShadow: `0 0 ${dot.size}px ${dot.color}80`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
                <div
                  className="crowd-map-dot-ring"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    width: `${dot.size}px`,
                    height: `${dot.size}px`,
                    borderColor: dot.color,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
                <span
                  className="crowd-map-label"
                  style={{ left: `${dot.x}%`, top: `calc(${dot.y}% + ${dot.size / 2 + 10}px)` }}
                >
                  {dot.name}
                </span>
              </React.Fragment>
            ))}
            <div className="crowd-map-legend">
              <div className="crowd-map-legend-item">
                <span className="crowd-map-legend-dot" style={{ background: '#22c55e' }} /> Low
              </div>
              <div className="crowd-map-legend-item">
                <span className="crowd-map-legend-dot" style={{ background: '#eab308' }} /> Moderate
              </div>
              <div className="crowd-map-legend-item">
                <span className="crowd-map-legend-dot" style={{ background: '#f97316' }} /> Busy
              </div>
              <div className="crowd-map-legend-item">
                <span className="crowd-map-legend-dot" style={{ background: '#ef4444' }} /> Crowded
              </div>
            </div>
          </div>

          <h2 className="crowd-section-title">{selectedCity} Attractions</h2>
          <div className="crowd-header-row">
            <span>Attraction</span>
            <span>Crowd Level</span>
            <span>Best Time</span>
            <span>Wait Time</span>
          </div>
          <div className="crowd-attractions-list">
            {crowdData.map((item, i) => (
              <div key={i} className="crowd-attraction-row">
                <span className="crowd-attraction-name">{item.name}</span>
                <div>
                  <div className="crowd-level-bar-bg">
                    <div
                      className="crowd-level-bar-fill"
                      style={{
                        width: `${item.crowd}%`,
                        background: getCrowdColor(item.crowd),
                      }}
                    />
                  </div>
                  <span className="crowd-level-label" style={{ color: getCrowdColor(item.crowd) }}>
                    {getCrowdLabel(item.crowd)} ({item.crowd}%)
                  </span>
                </div>
                <span className="crowd-best-time">{item.bestTime}</span>
                <span className="crowd-wait-time">{item.wait}</span>
              </div>
            ))}
          </div>

          <h2 className="crowd-section-title">Crowd Forecast &mdash; Today</h2>
          <div className="crowd-forecast-chart">
            {hourlyForecast.map((h, i) => (
              <div key={i} className="crowd-forecast-bar-wrap">
                <div
                  className="crowd-forecast-bar"
                  style={{
                    height: `${h.level}%`,
                    background: getCrowdColor(h.level),
                  }}
                />
                <span className="crowd-forecast-hour">{h.hour}</span>
              </div>
            ))}
          </div>

          <h2 className="crowd-section-title">Smart Tips</h2>
          <div className="crowd-tips-grid">
            {tips.map((tip, i) => (
              <div key={i} className="crowd-tip-card">
                <p className="crowd-tip-title">{tip.title}</p>
                <p className="crowd-tip-desc">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CrowdDensityPage;
