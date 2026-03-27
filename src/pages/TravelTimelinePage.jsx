import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const TRIPS = [
  { id: 'tokyo2024', label: 'Tokyo 2024', dates: 'Mar 10 – Mar 14, 2024' },
  { id: 'paris2023', label: 'Paris 2023', dates: 'Jun 18 – Jun 24, 2023' },
  { id: 'bali2024', label: 'Bali 2024', dates: 'Jan 5 – Jan 12, 2024' },
];

const TIMELINES = {
  tokyo2024: {
    stats: { days: 5, places: 12, photos: 247, spent: '$2,840' },
    events: [
      {
        id: 1,
        day: 'Day 1',
        date: 'March 10, 2024',
        icon: '✈️',
        type: 'flight',
        title: 'Touched Down in Tokyo',
        description: 'Landed at Narita International Airport after a 12-hour flight. The city lights from the plane were breathtaking — a glowing grid stretching to the horizon.',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
      },
      {
        id: 2,
        day: 'Day 1',
        date: 'March 10, 2024',
        icon: '🏨',
        type: 'hotel',
        title: 'Checked into Shinjuku Grand',
        description: 'A sleek room on the 32nd floor overlooking the neon-lit Kabukicho district. Floor-to-ceiling windows framing the Tokyo skyline.',
        image: null,
      },
      {
        id: 3,
        day: 'Day 2',
        date: 'March 11, 2024',
        icon: '🎯',
        type: 'activity',
        title: 'Shibuya Crossing at Rush Hour',
        description: 'Stood at the famous scramble crossing and watched thousands of people flow in perfect choreography. The energy was electric.',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80',
      },
      {
        id: 4,
        day: 'Day 2',
        date: 'March 11, 2024',
        icon: '🍽️',
        type: 'dining',
        title: 'Midnight Ramen in Golden Gai',
        description: 'Found a tiny 6-seat ramen shop tucked in a narrow alley. The tonkotsu broth was rich, creamy, and absolutely unforgettable.',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80',
      },
      {
        id: 5,
        day: 'Day 3',
        date: 'March 12, 2024',
        icon: '📸',
        type: 'photo',
        title: 'Senso-ji Temple at Dawn',
        description: 'Arrived before the crowds at Asakusa\'s ancient temple. Morning light filtered through incense smoke, painting everything in gold.',
        image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
      },
      {
        id: 6,
        day: 'Day 3',
        date: 'March 12, 2024',
        icon: '🎯',
        type: 'activity',
        title: 'Harajuku Street Style & Shopping',
        description: 'Explored Takeshita Street\'s wild fashion scene. Picked up vintage finds and tasted the famous rainbow cotton candy.',
        image: null,
      },
      {
        id: 7,
        day: 'Day 4',
        date: 'March 13, 2024',
        icon: '🎯',
        type: 'activity',
        title: 'Mount Fuji Day Trip',
        description: 'Took the bullet train to Kawaguchiko. Fuji appeared from behind the clouds like a painting — snow-capped and perfectly symmetrical against a clear blue sky.',
        image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&q=80',
      },
      {
        id: 8,
        day: 'Day 4',
        date: 'March 13, 2024',
        icon: '🍽️',
        type: 'dining',
        title: 'Kaiseki Dinner Experience',
        description: 'A multi-course traditional Japanese dinner — each dish a tiny work of art. Seasonal ingredients presented with exquisite precision.',
        image: null,
      },
      {
        id: 9,
        day: 'Day 5',
        date: 'March 14, 2024',
        icon: '📸',
        type: 'photo',
        title: 'Final Morning at Tsukiji Outer Market',
        description: 'Savored the freshest sushi breakfast of my life while soaking in the bustling market atmosphere one last time.',
        image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80',
      },
      {
        id: 10,
        day: 'Day 5',
        date: 'March 14, 2024',
        icon: '✈️',
        type: 'flight',
        title: 'Sayonara, Tokyo',
        description: 'Boarded the flight home with a heavy heart and a camera roll full of memories. Already planning the return trip.',
        image: null,
      },
    ],
  },
  paris2023: {
    stats: { days: 7, places: 18, photos: 312, spent: '$4,150' },
    events: [
      {
        id: 1, day: 'Day 1', date: 'June 18, 2023', icon: '✈️', type: 'flight',
        title: 'Arrived in the City of Light',
        description: 'Touched down at Charles de Gaulle. The taxi ride into the city revealed glimpses of the Eiffel Tower between buildings.',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
      },
      {
        id: 2, day: 'Day 2', date: 'June 19, 2023', icon: '🎯', type: 'activity',
        title: 'The Louvre — Mona Lisa & Beyond',
        description: 'Spent 5 hours getting lost in the world\'s greatest museum. The Winged Victory of Samothrace took my breath away.',
        image: null,
      },
      {
        id: 3, day: 'Day 3', date: 'June 20, 2023', icon: '🍽️', type: 'dining',
        title: 'Croissants at a Corner Café',
        description: 'The flakiest, butteriest croissant paired with the strongest espresso. True Parisian mornings.',
        image: null,
      },
      {
        id: 4, day: 'Day 7', date: 'June 24, 2023', icon: '✈️', type: 'flight',
        title: 'Au Revoir, Paris',
        description: 'Left a piece of my heart along the Seine. Paris, I\'ll be back.',
        image: null,
      },
    ],
  },
  bali2024: {
    stats: { days: 8, places: 15, photos: 389, spent: '$1,920' },
    events: [
      {
        id: 1, day: 'Day 1', date: 'January 5, 2024', icon: '✈️', type: 'flight',
        title: 'Welcome to Paradise',
        description: 'Landed in Bali to warm tropical air and the scent of frangipani. The island immediately felt like home.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
      },
      {
        id: 2, day: 'Day 3', date: 'January 7, 2024', icon: '🎯', type: 'activity',
        title: 'Tegallalang Rice Terraces',
        description: 'Walked through cascading emerald rice paddies that seemed to stretch into eternity.',
        image: 'https://images.unsplash.com/photo-1531592937781-2a5798f46b09?w=600&q=80',
      },
      {
        id: 3, day: 'Day 5', date: 'January 9, 2024', icon: '📸', type: 'photo',
        title: 'Uluwatu Temple Sunset',
        description: 'Watched the sun melt into the Indian Ocean from the cliffside temple. Pure magic.',
        image: null,
      },
      {
        id: 4, day: 'Day 8', date: 'January 12, 2024', icon: '✈️', type: 'flight',
        title: 'Until Next Time, Bali',
        description: 'Departed with sun-kissed skin, a peaceful mind, and memories that will last forever.',
        image: null,
      },
    ],
  },
};

export default function TravelTimelinePage() {
  const [selectedTrip, setSelectedTrip] = useState('tokyo2024');
  const [revealedCards, setRevealedCards] = useState(new Set());
  const timelineRef = useRef(null);
  const cardRefs = useRef({});

  const trip = TRIPS.find(t => t.id === selectedTrip);
  const timeline = TIMELINES[selectedTrip];

  useEffect(() => {
    setRevealedCards(new Set());

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-event-id');
            if (id) {
              setRevealedCards((prev) => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const timeout = setTimeout(() => {
      Object.values(cardRefs.current).forEach((el) => {
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [selectedTrip]);

  return (
    <>
      <style>{`
        .timeline-page {
          min-height: 100vh;
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          color: #e0e0e0;
          padding-bottom: 80px;
        }

        /* ---------- HERO ---------- */
        .timeline-hero {
          text-align: center;
          padding: 64px 24px 32px;
          position: relative;
          overflow: hidden;
        }
        .timeline-hero::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .timeline-hero-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #c9a96e;
          margin-bottom: 12px;
        }
        .timeline-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 8px;
          line-height: 1.15;
        }
        .timeline-hero-title span {
          color: #c9a96e;
        }
        .timeline-hero-sub {
          color: #a0a0a0;
          font-size: 15px;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ---------- TRIP TABS ---------- */
        .timeline-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 0 24px 40px;
          flex-wrap: wrap;
        }
        .timeline-tab {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 40px;
          padding: 10px 24px;
          color: #a0a0a0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .timeline-tab:hover {
          border-color: rgba(201,169,110,0.25);
          color: #e0e0e0;
        }
        .timeline-tab--active {
          background: rgba(201,169,110,0.15);
          border-color: #c9a96e;
          color: #c9a96e;
          font-weight: 600;
        }

        /* ---------- TRIP HEADER ---------- */
        .timeline-trip-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .timeline-trip-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 32px;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 6px;
        }
        .timeline-trip-dates {
          color: #a0a0a0;
          font-size: 14px;
        }

        /* ---------- VERTICAL TIMELINE ---------- */
        .timeline-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, rgba(201,169,110,0.4) 5%, rgba(201,169,110,0.4) 95%, transparent);
          transform: translateX(-50%);
        }

        /* ---------- EVENT ---------- */
        .timeline-event {
          position: relative;
          display: flex;
          align-items: flex-start;
          margin-bottom: 48px;
          width: 100%;
        }
        .timeline-event--left .timeline-card-wrapper {
          width: 50%;
          padding-right: 40px;
          text-align: right;
        }
        .timeline-event--left .timeline-spacer {
          width: 50%;
        }
        .timeline-event--right {
          flex-direction: row-reverse;
        }
        .timeline-event--right .timeline-card-wrapper {
          width: 50%;
          padding-left: 40px;
          text-align: left;
        }
        .timeline-event--right .timeline-spacer {
          width: 50%;
        }

        /* Gold dot on center line */
        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 24px;
          width: 16px;
          height: 16px;
          transform: translateX(-50%);
          z-index: 2;
        }
        .timeline-dot-inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #0a0a0a;
          border: 2px solid #c9a96e;
          box-shadow: 0 0 12px rgba(201,169,110,0.35);
          position: relative;
        }
        .timeline-dot-inner::after {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #c9a96e;
        }

        /* ---------- CARD ---------- */
        .timeline-card {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
          transform: translateY(30px);
        }
        .timeline-event--left .timeline-card {
          transform: translateX(-40px) translateY(20px);
        }
        .timeline-event--right .timeline-card {
          transform: translateX(40px) translateY(20px);
        }
        .timeline-card--revealed {
          opacity: 1;
          transform: translateX(0) translateY(0) !important;
        }
        .timeline-card:hover {
          border-color: rgba(201,169,110,0.25);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,169,110,0.08);
        }
        .timeline-card-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
          border-bottom: 1px solid #1e1e24;
        }
        .timeline-card-body {
          padding: 20px;
        }
        .timeline-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          font-size: 12px;
          color: #a0a0a0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .timeline-event--left .timeline-card-meta {
          justify-content: flex-end;
        }
        .timeline-card-icon {
          font-size: 18px;
          line-height: 1;
        }
        .timeline-card-day {
          color: #c9a96e;
          font-weight: 600;
        }
        .timeline-card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 8px;
          line-height: 1.25;
        }
        .timeline-card-desc {
          font-size: 14px;
          color: #a0a0a0;
          line-height: 1.6;
          margin: 0;
        }

        /* ---------- STATS CARD ---------- */
        .timeline-stats-section {
          max-width: 900px;
          margin: 64px auto 0;
          padding: 0 24px;
        }
        .timeline-stats-label {
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #c9a96e;
          margin-bottom: 20px;
        }
        .timeline-stats-card {
          background: #111116;
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 20px;
          padding: 40px 32px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .timeline-stats-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .timeline-stat-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 36px;
          font-weight: 700;
          color: #c9a96e;
          line-height: 1;
          margin-bottom: 6px;
        }
        .timeline-stat-label {
          font-size: 13px;
          color: #a0a0a0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* ---------- ACTION BUTTONS ---------- */
        .timeline-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 48px;
          padding: 0 24px;
          flex-wrap: wrap;
        }
        .timeline-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
        }
        .timeline-btn--primary {
          background: linear-gradient(135deg, #c9a96e, #d4af37);
          color: #0a0a0a;
        }
        .timeline-btn--primary:hover {
          box-shadow: 0 4px 24px rgba(201,169,110,0.35);
          transform: translateY(-2px);
        }
        .timeline-btn--secondary {
          background: #1a1a22;
          color: #c9a96e;
          border: 1px solid rgba(201,169,110,0.25);
        }
        .timeline-btn--secondary:hover {
          background: rgba(201,169,110,0.15);
          transform: translateY(-2px);
        }

        /* ---------- BACK LINK ---------- */
        .timeline-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #a0a0a0;
          text-decoration: none;
          font-size: 14px;
          padding: 24px;
          transition: color 0.2s;
        }
        .timeline-back:hover {
          color: #c9a96e;
        }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 768px) {
          .timeline-line {
            left: 20px;
          }
          .timeline-dot {
            left: 20px;
            top: 0;
          }
          .timeline-event,
          .timeline-event--right {
            flex-direction: row !important;
          }
          .timeline-event--left .timeline-card-wrapper,
          .timeline-event--right .timeline-card-wrapper {
            width: 100%;
            padding-left: 48px;
            padding-right: 0;
            text-align: left;
          }
          .timeline-event--left .timeline-card-meta {
            justify-content: flex-start;
          }
          .timeline-event--left .timeline-card {
            transform: translateX(40px) translateY(20px);
          }
          .timeline-spacer {
            display: none !important;
          }
          .timeline-stats-card {
            grid-template-columns: repeat(2, 1fr);
            padding: 28px 20px;
          }
          .timeline-card-image {
            height: 150px;
          }
        }

        @media (max-width: 480px) {
          .timeline-hero {
            padding: 48px 20px 24px;
          }
          .timeline-card-body {
            padding: 16px;
          }
          .timeline-card-title {
            font-size: 19px;
          }
        }
      `}</style>

      <div className="timeline-page">
        <Link to="/" className="timeline-back">
          <span>&#8592;</span> Back to Home
        </Link>

        {/* HERO */}
        <div className="timeline-hero">
          <div className="timeline-hero-label">Trip Journal</div>
          <h1 className="timeline-hero-title">
            Your Travel <span>Story</span>
          </h1>
          <p className="timeline-hero-sub">
            Relive every moment — from the first flight to the last sunset.
            Your journeys, beautifully told.
          </p>
        </div>

        {/* TRIP SELECTOR TABS */}
        <div className="timeline-tabs">
          {TRIPS.map((t) => (
            <button
              key={t.id}
              className={`timeline-tab ${selectedTrip === t.id ? 'timeline-tab--active' : ''}`}
              onClick={() => setSelectedTrip(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TRIP HEADER */}
        <div className="timeline-trip-header">
          <h2 className="timeline-trip-name">{trip.label}</h2>
          <div className="timeline-trip-dates">{trip.dates}</div>
        </div>

        {/* VERTICAL TIMELINE */}
        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-line" />

          {timeline.events.map((event, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const revealed = revealedCards.has(String(event.id));

            return (
              <div
                key={event.id}
                className={`timeline-event timeline-event--${side}`}
                data-event-id={event.id}
                ref={(el) => { cardRefs.current[event.id] = el; }}
              >
                <div className="timeline-card-wrapper">
                  <div className={`timeline-card ${revealed ? 'timeline-card--revealed' : ''}`}>
                    {event.image && (
                      <img
                        className="timeline-card-image"
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                      />
                    )}
                    <div className="timeline-card-body">
                      <div className="timeline-card-meta">
                        <span className="timeline-card-icon">{event.icon}</span>
                        <span className="timeline-card-day">{event.day}</span>
                        <span>·</span>
                        <span>{event.date}</span>
                      </div>
                      <h3 className="timeline-card-title">{event.title}</h3>
                      <p className="timeline-card-desc">{event.description}</p>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="timeline-dot">
                  <div className="timeline-dot-inner" />
                </div>

                <div className="timeline-spacer" />
              </div>
            );
          })}
        </div>

        {/* TRIP STATS */}
        <div className="timeline-stats-section">
          <div className="timeline-stats-label">Trip Stats</div>
          <div className="timeline-stats-card">
            <div>
              <div className="timeline-stat-value">{timeline.stats.days}</div>
              <div className="timeline-stat-label">Days</div>
            </div>
            <div>
              <div className="timeline-stat-value">{timeline.stats.places}</div>
              <div className="timeline-stat-label">Places Visited</div>
            </div>
            <div>
              <div className="timeline-stat-value">{timeline.stats.photos}</div>
              <div className="timeline-stat-label">Photos Taken</div>
            </div>
            <div>
              <div className="timeline-stat-value">{timeline.stats.spent}</div>
              <div className="timeline-stat-label">Total Spent</div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="timeline-actions">
          <button className="timeline-btn timeline-btn--primary" onClick={() => alert('Share Story feature coming soon!')}>
            <span>&#9993;</span> Share Story
          </button>
          <button className="timeline-btn timeline-btn--secondary" onClick={() => alert('PDF download coming soon!')}>
            <span>&#128196;</span> Download PDF
          </button>
        </div>
      </div>
    </>
  );
}
