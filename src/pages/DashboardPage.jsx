import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { CITY_LIST } from '../data/travelData'

const TABS = ['Overview', 'Wishlist', 'My Trips', 'Itineraries', 'Rewards']

export default function DashboardPage() {
  const {
    user, setShowAuth, wishlist, toggleWishlist, collections, createCollection,
    savedItineraries, deleteItinerary, savedTrips, gamification, BADGES,
    recentlyViewed, convertPrice, addPoints
  } = useApp()
  const [activeTab, setActiveTab] = useState('Overview')
  const [newCollName, setNewCollName] = useState('')
  const [showNewColl, setShowNewColl] = useState(false)

  if (!user) {
    return (
      <div className="dash-login-prompt">
        <div className="dash-login-card">
          <h2>Sign in to access your Dashboard</h2>
          <p>Track your trips, manage your wishlist, earn rewards, and get personalized recommendations.</p>
          <button className="btn btn-primary" onClick={() => setShowAuth(true)}>Sign In</button>
        </div>
      </div>
    )
  }

  const levelProgress = ((gamification.points % 500) / 500) * 100
  const nextLevel = (gamification.level) * 500
  const pointsToNext = nextLevel - gamification.points
  const recommended = CITY_LIST.filter(c => !recentlyViewed.find(r => r.id === c.id)).slice(0, 4)

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div className="container">
          <div className="dash-header-content">
            <div className="dash-user-info">
              <div className="dash-avatar">{user.avatar}</div>
              <div>
                <h1>Welcome back, {user.name}</h1>
                <p>Level {gamification.level} Traveler &middot; {gamification.points} points</p>
              </div>
            </div>
            <div className="dash-quick-stats">
              <div className="dash-stat"><span className="dash-stat-num">{savedTrips.length}</span><span>Trips</span></div>
              <div className="dash-stat"><span className="dash-stat-num">{wishlist.length}</span><span>Wishlist</span></div>
              <div className="dash-stat"><span className="dash-stat-num">{savedItineraries.length}</span><span>Plans</span></div>
              <div className="dash-stat"><span className="dash-stat-num">{gamification.earnedBadges.length}</span><span>Badges</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-tabs">
        <div className="container">
          <div className="dash-tabs-inner">
            {TABS.map(tab => (
              <button key={tab} className={`dash-tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container dash-content">
        {activeTab === 'Overview' && (
          <>
            <div className="dash-section">
              <div className="dash-level-card">
                <div className="dash-level-info">
                  <h3>Level {gamification.level} &mdash; {gamification.level < 3 ? 'Beginner' : gamification.level < 5 ? 'Explorer' : 'Expert'} Traveler</h3>
                  <p>{pointsToNext > 0 ? `${pointsToNext} points to Level ${gamification.level + 1}` : 'Max level reached!'}</p>
                </div>
                <div className="dash-level-bar">
                  <div className="dash-level-fill" style={{ width: `${levelProgress}%` }} />
                </div>
                <div className="dash-level-points">{gamification.points} / {nextLevel} pts</div>
              </div>
            </div>

            {recentlyViewed.length > 0 && (
              <div className="dash-section">
                <h2 className="dash-section-title">Recently Viewed</h2>
                <div className="dash-scroll-row">
                  {recentlyViewed.slice(0, 6).map(item => (
                    <Link to={`/city/${item.id}`} key={item.id} className="dash-recent-card">
                      <img src={item.image} alt={item.name} onError={e => { e.target.src = 'https://images.unsplash.com/photo-1488646472631-26d0e2c95e6d?w=400&q=80' }} />
                      <div className="dash-recent-info">
                        <h4>{item.name}</h4>
                        <span>{item.country}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="dash-section">
              <h2 className="dash-section-title">Recommended for You</h2>
              <div className="dash-reco-grid">
                {recommended.map(city => (
                  <Link to={`/city/${city.id}`} key={city.id} className="dash-reco-card">
                    <div className="dash-reco-img">
                      <img src={city.heroImage} alt={city.name} />
                      <span className="dash-reco-badge">{city.badge}</span>
                    </div>
                    <div className="dash-reco-body">
                      <h4>{city.name}</h4>
                      <p>{city.country} &middot; {city.rating} rating</p>
                      <span className="dash-reco-price">From {convertPrice(city.price)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="dash-section">
              <h2 className="dash-section-title">Quick Actions</h2>
              <div className="dash-actions-grid">
                <Link to="/planner" className="dash-action-card">
                  <h4>AI Trip Planner</h4><p>Plan your next adventure with AI</p>
                </Link>
                <Link to="/group-trip" className="dash-action-card">
                  <h4>Group Trip</h4><p>Plan a trip with friends</p>
                </Link>
                <Link to="/search" className="dash-action-card">
                  <h4>Explore</h4><p>Discover new destinations</p>
                </Link>
                <button className="dash-action-card" onClick={() => addPoints(25)}>
                  <h4>Daily Bonus</h4><p>Claim 25 bonus points</p>
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Wishlist' && (
          <>
            <div className="dash-section">
              <div className="dash-section-header">
                <h2 className="dash-section-title">Collections</h2>
                <button className="btn btn-outline btn-sm" onClick={() => setShowNewColl(!showNewColl)}>+ New Collection</button>
              </div>
              {showNewColl && (
                <form className="dash-new-coll" onSubmit={e => { e.preventDefault(); if (newCollName.trim()) { createCollection(newCollName, ''); setNewCollName(''); setShowNewColl(false) } }}>
                  <input type="text" value={newCollName} onChange={e => setNewCollName(e.target.value)} placeholder="Collection name..." />
                  <button type="submit" className="btn btn-primary btn-sm">Create</button>
                </form>
              )}
              <div className="dash-collections-grid">
                {collections.map(c => (
                  <div key={c.id} className="dash-collection-card">
                    <h4>{c.name}</h4>
                    <p>{(c.items || []).length} items</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="dash-section">
              <h2 className="dash-section-title">Saved Items ({wishlist.length})</h2>
              {wishlist.length === 0 ? (
                <div className="dash-empty">
                  <h3>Your wishlist is empty</h3>
                  <p>Start exploring and save destinations you love!</p>
                  <Link to="/search" className="btn btn-primary">Explore Destinations</Link>
                </div>
              ) : (
                <div className="dash-wishlist-grid">
                  {wishlist.map(item => (
                    <div key={`${item.type}-${item.id}`} className="dash-wishlist-card">
                      <div className="dash-wishlist-img">
                        <img src={item.image} alt={item.name} onError={e => { e.target.src = 'https://images.unsplash.com/photo-1488646472631-26d0e2c95e6d?w=400&q=80' }} />
                        <span className="dash-wishlist-type">{item.type}</span>
                      </div>
                      <div className="dash-wishlist-body">
                        <h4>{item.name}</h4>
                        <p>{item.location || item.country || ''}</p>
                        {item.price && <span className="dash-wishlist-price">{convertPrice(item.price)}</span>}
                      </div>
                      <button className="dash-wishlist-remove" onClick={() => toggleWishlist(item)}>&times;</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'My Trips' && (
          <div className="dash-section">
            <h2 className="dash-section-title">My Trips ({savedTrips.length})</h2>
            {savedTrips.length === 0 ? (
              <div className="dash-empty">
                <h3>No trips booked yet</h3>
                <p>Your booked trips will appear here. Start planning!</p>
                <Link to="/search" className="btn btn-primary">Find Destinations</Link>
              </div>
            ) : (
              <div className="dash-trips-grid">
                {savedTrips.map(trip => (
                  <div key={trip.id} className="dash-trip-card">
                    <div className="dash-trip-header">
                      <h3>{trip.destination}</h3>
                      <span className={`dash-trip-status ${trip.status || 'upcoming'}`}>{trip.status || 'Upcoming'}</span>
                    </div>
                    <div className="dash-trip-details">
                      <p>{trip.dates || 'Dates TBD'}</p>
                      <p>{trip.hotel || 'Hotel TBD'}</p>
                      <p>{convertPrice(trip.totalCost || 0)}</p>
                    </div>
                    <Link to={`/city/${trip.cityId}`} className="btn btn-outline btn-sm">View Details</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'Itineraries' && (
          <div className="dash-section">
            <div className="dash-section-header">
              <h2 className="dash-section-title">Saved Itineraries ({savedItineraries.length})</h2>
              <Link to="/planner" className="btn btn-primary btn-sm">+ New Itinerary</Link>
            </div>
            {savedItineraries.length === 0 ? (
              <div className="dash-empty">
                <h3>No itineraries yet</h3>
                <p>Use the AI Trip Planner to create your first itinerary!</p>
                <Link to="/planner" className="btn btn-primary">Plan a Trip</Link>
              </div>
            ) : (
              <div className="dash-itineraries-grid">
                {savedItineraries.map(it => (
                  <div key={it.id} className="dash-itinerary-card">
                    <div className="dash-itinerary-header">
                      <h3>{it.name || it.destination}</h3>
                      <button className="dash-itinerary-delete" onClick={() => deleteItinerary(it.id)}>&times;</button>
                    </div>
                    <p>{it.days?.length || 0} days &middot; {it.destination}</p>
                    <div className="dash-itinerary-preview">
                      {(it.days || []).slice(0, 3).map((day, i) => (
                        <div key={i} className="dash-itinerary-day">
                          <strong>Day {i + 1}:</strong> {(day.activities || []).slice(0, 2).join(', ')}
                        </div>
                      ))}
                    </div>
                    <span className="dash-itinerary-date">Saved {new Date(it.savedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'Rewards' && (
          <>
            <div className="dash-section">
              <div className="dash-rewards-hero">
                <div className="dash-rewards-points">
                  <span className="dash-rewards-num">{gamification.points}</span>
                  <span>Total Points</span>
                </div>
                <div className="dash-rewards-level">
                  <div className="dash-rewards-badge-big">Lvl {gamification.level}</div>
                  <p>{gamification.level < 3 ? 'Beginner' : gamification.level < 5 ? 'Explorer' : 'Expert'} Traveler</p>
                  <div className="dash-level-bar large">
                    <div className="dash-level-fill" style={{ width: `${levelProgress}%` }} />
                  </div>
                  <small>{pointsToNext > 0 ? `${pointsToNext} pts to next level` : 'Max level!'}</small>
                </div>
              </div>
            </div>

            <div className="dash-section">
              <h2 className="dash-section-title">Badges</h2>
              <div className="dash-badges-grid">
                {BADGES.map(badge => {
                  const earned = gamification.earnedBadges.includes(badge.id)
                  const progress = Math.min((gamification[badge.type] || 0) / badge.requirement * 100, 100)
                  return (
                    <div key={badge.id} className={`dash-badge-card${earned ? ' earned' : ''}`}>
                      <h4>{badge.name}</h4>
                      <p>{badge.desc}</p>
                      {!earned && (
                        <div className="dash-badge-progress">
                          <div className="dash-badge-bar"><div className="dash-badge-fill" style={{ width: `${progress}%` }} /></div>
                          <small>{gamification[badge.type] || 0}/{badge.requirement}</small>
                        </div>
                      )}
                      {earned && <span className="dash-badge-earned">Earned</span>}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="dash-section">
              <h2 className="dash-section-title">How to Earn Points</h2>
              <div className="dash-earn-grid">
                <div className="dash-earn-item"><h4>Explore</h4><p>+10 pts per destination viewed</p></div>
                <div className="dash-earn-item"><h4>Wishlist</h4><p>+10 pts per item saved</p></div>
                <div className="dash-earn-item"><h4>Plan</h4><p>+50 pts per itinerary created</p></div>
                <div className="dash-earn-item"><h4>Book</h4><p>+100 pts per trip booked</p></div>
                <div className="dash-earn-item"><h4>Group Trip</h4><p>+75 pts per group created</p></div>
                <div className="dash-earn-item"><h4>Daily Bonus</h4><p>+25 pts daily claim</p></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
