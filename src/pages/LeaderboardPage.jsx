import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

const MOCK_USERS = [
  { id: 1, name: 'Arjun Mehta', points: 4820, level: 10, badges: 8, trips: 24, topCity: 'Tokyo' },
  { id: 2, name: 'Sofia Laurent', points: 4350, level: 9, badges: 7, trips: 21, topCity: 'Paris' },
  { id: 3, name: 'Liam Chen', points: 3980, level: 8, badges: 7, trips: 19, topCity: 'Bali' },
  { id: 4, name: 'Isabella Rossi', points: 3640, level: 8, badges: 6, trips: 18, topCity: 'Rome' },
  { id: 5, name: 'Ethan Brooks', points: 3310, level: 7, badges: 6, trips: 16, topCity: 'Dubai' },
  { id: 6, name: 'Aanya Sharma', points: 3050, level: 7, badges: 5, trips: 15, topCity: 'Santorini' },
  { id: 7, name: 'Noah Fischer', points: 2780, level: 6, badges: 5, trips: 14, topCity: 'London' },
  { id: 8, name: 'Mia Tanaka', points: 2560, level: 6, badges: 5, trips: 13, topCity: 'Kyoto' },
  { id: 9, name: 'Oscar Hernandez', points: 2340, level: 5, badges: 4, trips: 12, topCity: 'Barcelona' },
  { id: 10, name: 'Chloe Martin', points: 2180, level: 5, badges: 4, trips: 11, topCity: 'Amsterdam' },
  { id: 11, name: 'Ravi Patel', points: 1950, level: 4, badges: 4, trips: 10, topCity: 'Mumbai' },
  { id: 12, name: 'Emma Johansson', points: 1770, level: 4, badges: 3, trips: 9, topCity: 'Stockholm' },
  { id: 13, name: 'Lucas Dupont', points: 1580, level: 4, badges: 3, trips: 8, topCity: 'Nice' },
  { id: 14, name: 'Zara Ali', points: 1420, level: 3, badges: 3, trips: 7, topCity: 'Istanbul' },
  { id: 15, name: 'James O\'Brien', points: 1260, level: 3, badges: 2, trips: 6, topCity: 'Dublin' },
  { id: 16, name: 'Yuki Sato', points: 1100, level: 3, badges: 2, trips: 6, topCity: 'Osaka' },
  { id: 17, name: 'Priya Nair', points: 940, level: 2, badges: 2, trips: 5, topCity: 'Kerala' },
  { id: 18, name: 'Daniel Kim', points: 780, level: 2, badges: 1, trips: 4, topCity: 'Seoul' },
  { id: 19, name: 'Olivia West', points: 610, level: 2, badges: 1, trips: 3, topCity: 'Sydney' },
  { id: 20, name: 'Marco Bianchi', points: 450, level: 1, badges: 1, trips: 2, topCity: 'Venice' },
]

const TOP_DESTINATIONS = [
  { city: 'Tokyo', visits: 87 },
  { city: 'Paris', visits: 74 },
  { city: 'Bali', visits: 68 },
  { city: 'Dubai', visits: 61 },
  { city: 'London', visits: 55 },
]

const TABS = ['All Time', 'This Month', 'This Week']

const MEDAL_COLORS = {
  1: { bg: 'linear-gradient(135deg, #c9a96e 0%, #d4af37 50%, #c9a96e 100%)', text: '#0a0a0a', label: 'Gold', border: '#d4af37', crown: true },
  2: { bg: 'linear-gradient(135deg, #8a8a8a 0%, #c0c0c0 50%, #8a8a8a 100%)', text: '#0a0a0a', label: 'Silver', border: '#c0c0c0', crown: false },
  3: { bg: 'linear-gradient(135deg, #8b5e3c 0%, #cd7f32 50%, #8b5e3c 100%)', text: '#0a0a0a', label: 'Bronze', border: '#cd7f32', crown: false },
}

export default function LeaderboardPage() {
  const { user, gamification, BADGES } = useApp()
  const [activeTab, setActiveTab] = useState('All Time')

  const userPoints = gamification?.points || 250
  const userLevel = gamification?.level || 1
  const userBadges = gamification?.earnedBadges?.length || 0
  const userTrips = gamification?.bookings || 1
  const userName = user?.name || 'You'

  // Determine user rank among mock users
  const userRank = MOCK_USERS.filter(u => u.points > userPoints).length + 1
  const pointsToNext = userRank > 1 ? MOCK_USERS[userRank - 2].points - userPoints : 0
  const levelProgress = ((userPoints % 500) / 500) * 100

  const top3 = MOCK_USERS.slice(0, 3)
  const rest = MOCK_USERS.slice(3)

  // Podium order: #2 left, #1 center, #3 right
  const podiumOrder = [top3[1], top3[0], top3[2]]

  return (
    <div className="lb-page">
      {/* Hero */}
      <section className="lb-hero">
        <div className="lb-hero-glow" />
        <h1 className="lb-hero-title">Travel Leaderboard</h1>
        <p className="lb-hero-subtitle">See how you rank among fellow explorers</p>
      </section>

      {/* Tabs */}
      <div className="lb-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`lb-tab ${activeTab === tab ? 'lb-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Podium */}
      <section className="lb-podium">
        {podiumOrder.map((person, i) => {
          const rank = i === 1 ? 1 : i === 0 ? 2 : 3
          const medal = MEDAL_COLORS[rank]
          const isFirst = rank === 1
          return (
            <div key={person.id} className={`lb-podium-card ${isFirst ? 'lb-podium-card--first' : ''}`}>
              {medal.crown && <div className="lb-crown">&#9812;</div>}
              <div className="lb-podium-rank" style={{ background: medal.bg, color: medal.text }}>
                #{rank}
              </div>
              <div className="lb-podium-avatar" style={{ borderColor: medal.border }}>
                {person.name.charAt(0)}
              </div>
              <h3 className="lb-podium-name">{person.name}</h3>
              <div className="lb-podium-points">{person.points.toLocaleString()} pts</div>
              <div className="lb-podium-meta">
                <span className="lb-podium-badge-count">{person.badges} badges</span>
                <span className="lb-podium-level">Lvl {person.level}</span>
              </div>
            </div>
          )
        })}
      </section>

      <div className="lb-main">
        {/* Leaderboard Table */}
        <div className="lb-table-wrap">
          <div className="lb-table">
            <div className="lb-table-header">
              <span className="lb-col-rank">Rank</span>
              <span className="lb-col-user">Explorer</span>
              <span className="lb-col-level">Level</span>
              <span className="lb-col-points">Points</span>
              <span className="lb-col-trips">Trips</span>
              <span className="lb-col-badges">Badges</span>
            </div>
            {rest.map((person, idx) => {
              const rank = idx + 4
              const isCurrentUser = false
              return (
                <div
                  key={person.id}
                  className={`lb-row ${idx % 2 === 0 ? 'lb-row--even' : ''} ${isCurrentUser ? 'lb-row--current' : ''}`}
                >
                  <span className="lb-col-rank lb-rank-num">{rank}</span>
                  <span className="lb-col-user">
                    <span className="lb-row-avatar">{person.name.charAt(0)}</span>
                    <span className="lb-row-name">{person.name}</span>
                  </span>
                  <span className="lb-col-level">
                    <span className="lb-level-badge">Lvl {person.level}</span>
                  </span>
                  <span className="lb-col-points">{person.points.toLocaleString()}</span>
                  <span className="lb-col-trips">{person.trips}</span>
                  <span className="lb-col-badges">{person.badges}</span>
                </div>
              )
            })}
            {/* Current user row */}
            <div className="lb-row lb-row--current">
              <span className="lb-col-rank lb-rank-num">{userRank}</span>
              <span className="lb-col-user">
                <span className="lb-row-avatar lb-row-avatar--you">{userName.charAt(0)}</span>
                <span className="lb-row-name">{userName} <span className="lb-you-tag">You</span></span>
              </span>
              <span className="lb-col-level">
                <span className="lb-level-badge">Lvl {userLevel}</span>
              </span>
              <span className="lb-col-points">{userPoints.toLocaleString()}</span>
              <span className="lb-col-trips">{userTrips}</span>
              <span className="lb-col-badges">{userBadges}</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lb-sidebar">
          {/* Your Stats */}
          <div className="lb-stats-card">
            <h3 className="lb-stats-title">Your Stats</h3>
            <div className="lb-stats-rank">
              <span className="lb-stats-label">Current Rank</span>
              <span className="lb-stats-value">#{userRank}</span>
            </div>
            <div className="lb-stats-row">
              <span className="lb-stats-label">Points</span>
              <span className="lb-stats-value">{userPoints.toLocaleString()}</span>
            </div>
            <div className="lb-stats-row">
              <span className="lb-stats-label">Badges</span>
              <span className="lb-stats-value">{userBadges} / {BADGES.length}</span>
            </div>
            <div className="lb-stats-row">
              <span className="lb-stats-label">Level</span>
              <span className="lb-stats-value">{userLevel}</span>
            </div>
            <div className="lb-progress-section">
              <div className="lb-progress-header">
                <span>Level Progress</span>
                <span>{Math.round(levelProgress)}%</span>
              </div>
              <div className="lb-progress-track">
                <div className="lb-progress-fill" style={{ width: `${levelProgress}%` }} />
              </div>
              {pointsToNext > 0 && (
                <p className="lb-progress-hint">{pointsToNext.toLocaleString()} pts to overtake #{userRank - 1}</p>
              )}
            </div>
          </div>

          {/* Most Visited Destinations */}
          <div className="lb-destinations-card">
            <h3 className="lb-stats-title">Most Visited Destinations</h3>
            {TOP_DESTINATIONS.map((dest, idx) => (
              <div key={dest.city} className="lb-dest-row">
                <span className="lb-dest-name">{dest.city}</span>
                <div className="lb-dest-bar-track">
                  <div
                    className="lb-dest-bar-fill"
                    style={{ width: `${(dest.visits / TOP_DESTINATIONS[0].visits) * 100}%` }}
                  />
                </div>
                <span className="lb-dest-count">{dest.visits}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <style>{`
        .lb-page {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 0 0 80px;
          font-family: 'DM Sans', sans-serif;
          color: #e0e0e0;
        }

        /* ── Hero ── */
        .lb-hero {
          position: relative;
          text-align: center;
          padding: 72px 24px 48px;
          overflow: hidden;
        }
        .lb-hero-glow {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .lb-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3rem;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 12px;
          position: relative;
        }
        .lb-hero-subtitle {
          font-size: 1.1rem;
          color: #a0a0a0;
          margin: 0;
          position: relative;
        }

        /* ── Tabs ── */
        .lb-tabs {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin: 0 0 40px;
        }
        .lb-tab {
          background: #111116;
          border: 1px solid #1e1e24;
          color: #a0a0a0;
          padding: 10px 28px;
          border-radius: 40px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .lb-tab:hover {
          color: #e0e0e0;
          border-color: rgba(201,169,110,0.25);
        }
        .lb-tab--active {
          background: rgba(201,169,110,0.15);
          border-color: #c9a96e;
          color: #c9a96e;
        }

        /* ── Podium ── */
        .lb-podium {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 20px;
          max-width: 820px;
          margin: 0 auto 56px;
          padding: 0 24px;
        }
        .lb-podium-card {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 20px;
          padding: 28px 24px 24px;
          text-align: center;
          width: 220px;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .lb-podium-card:hover {
          transform: translateY(-4px);
        }
        .lb-podium-card--first {
          width: 260px;
          padding: 40px 28px 32px;
          border-color: rgba(201,169,110,0.4);
          background: linear-gradient(180deg, #1a1a22 0%, #111116 100%);
          box-shadow: 0 0 40px rgba(201,169,110,0.12), 0 0 80px rgba(201,169,110,0.06);
        }
        .lb-crown {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          color: #d4af37;
          filter: drop-shadow(0 0 8px rgba(212,175,55,0.5));
        }
        .lb-podium-rank {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .lb-podium-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #1a1a22;
          border: 3px solid #c9a96e;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #f5f5f5;
        }
        .lb-podium-card--first .lb-podium-avatar {
          width: 80px;
          height: 80px;
          font-size: 2rem;
          box-shadow: 0 0 20px rgba(212,175,55,0.3);
        }
        .lb-podium-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 6px;
        }
        .lb-podium-card--first .lb-podium-name {
          font-size: 1.3rem;
        }
        .lb-podium-points {
          color: #c9a96e;
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .lb-podium-card--first .lb-podium-points {
          font-size: 1.2rem;
        }
        .lb-podium-meta {
          display: flex;
          justify-content: center;
          gap: 12px;
          font-size: 0.82rem;
          color: #a0a0a0;
        }

        /* ── Main Layout ── */
        .lb-main {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Table ── */
        .lb-table-wrap {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 16px;
          overflow: hidden;
        }
        .lb-table {
          width: 100%;
        }
        .lb-table-header {
          display: grid;
          grid-template-columns: 60px 1fr 80px 100px 70px 80px;
          padding: 14px 20px;
          background: #1a1a22;
          border-bottom: 1px solid #1e1e24;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #a0a0a0;
        }
        .lb-row {
          display: grid;
          grid-template-columns: 60px 1fr 80px 100px 70px 80px;
          padding: 14px 20px;
          align-items: center;
          border-bottom: 1px solid rgba(30,30,36,0.5);
          transition: background 0.2s ease;
        }
        .lb-row:last-child {
          border-bottom: none;
        }
        .lb-row:hover {
          background: rgba(201,169,110,0.04);
        }
        .lb-row--even {
          background: rgba(26,26,34,0.4);
        }
        .lb-row--even:hover {
          background: rgba(201,169,110,0.06);
        }
        .lb-row--current {
          background: rgba(201,169,110,0.15) !important;
          border-left: 3px solid #c9a96e;
        }
        .lb-rank-num {
          font-weight: 700;
          color: #a0a0a0;
          font-size: 0.95rem;
        }
        .lb-col-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .lb-row-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #1a1a22;
          border: 1px solid #1e1e24;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #e0e0e0;
          flex-shrink: 0;
        }
        .lb-row-avatar--you {
          border-color: #c9a96e;
          color: #c9a96e;
        }
        .lb-row-name {
          font-size: 0.92rem;
          color: #e0e0e0;
        }
        .lb-you-tag {
          display: inline-block;
          background: rgba(201,169,110,0.2);
          color: #c9a96e;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 10px;
          margin-left: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .lb-level-badge {
          display: inline-block;
          background: rgba(201,169,110,0.12);
          color: #c9a96e;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 10px;
        }
        .lb-col-points {
          font-weight: 600;
          color: #e0e0e0;
        }
        .lb-col-trips, .lb-col-badges {
          color: #a0a0a0;
          font-size: 0.92rem;
        }

        /* ── Sidebar ── */
        .lb-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .lb-stats-card, .lb-destinations-card {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 16px;
          padding: 24px;
        }
        .lb-stats-card {
          border-color: rgba(201,169,110,0.25);
        }
        .lb-stats-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 20px;
        }
        .lb-stats-rank {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 16px;
          background: rgba(201,169,110,0.1);
          border-radius: 12px;
          margin-bottom: 16px;
        }
        .lb-stats-rank .lb-stats-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #c9a96e;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .lb-stats-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(30,30,36,0.6);
        }
        .lb-stats-row:last-of-type {
          border-bottom: none;
        }
        .lb-stats-label {
          color: #a0a0a0;
          font-size: 0.9rem;
        }
        .lb-stats-value {
          color: #e0e0e0;
          font-weight: 600;
          font-size: 0.95rem;
        }

        /* Progress */
        .lb-progress-section {
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid #1e1e24;
        }
        .lb-progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          color: #a0a0a0;
          margin-bottom: 8px;
        }
        .lb-progress-track {
          height: 8px;
          background: #1a1a22;
          border-radius: 8px;
          overflow: hidden;
        }
        .lb-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #c9a96e, #d4af37);
          border-radius: 8px;
          transition: width 0.6s ease;
        }
        .lb-progress-hint {
          margin: 8px 0 0;
          font-size: 0.78rem;
          color: #a0a0a0;
        }

        /* Destinations */
        .lb-dest-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .lb-dest-row:last-child {
          margin-bottom: 0;
        }
        .lb-dest-name {
          width: 70px;
          flex-shrink: 0;
          font-size: 0.88rem;
          color: #e0e0e0;
        }
        .lb-dest-bar-track {
          flex: 1;
          height: 8px;
          background: #1a1a22;
          border-radius: 8px;
          overflow: hidden;
        }
        .lb-dest-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(201,169,110,0.5), #c9a96e);
          border-radius: 8px;
          transition: width 0.5s ease;
        }
        .lb-dest-count {
          width: 30px;
          text-align: right;
          font-size: 0.82rem;
          color: #a0a0a0;
          font-weight: 600;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .lb-main {
            grid-template-columns: 1fr;
          }
          .lb-sidebar {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .lb-stats-card, .lb-destinations-card {
            flex: 1;
            min-width: 280px;
          }
        }
        @media (max-width: 680px) {
          .lb-hero-title {
            font-size: 2.2rem;
          }
          .lb-podium {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }
          .lb-podium-card, .lb-podium-card--first {
            width: 100%;
            max-width: 300px;
          }
          .lb-table-header, .lb-row {
            grid-template-columns: 44px 1fr 60px 80px;
          }
          .lb-col-trips, .lb-col-badges {
            display: none;
          }
          .lb-tabs {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  )
}
