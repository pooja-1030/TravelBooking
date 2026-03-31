import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { CITY_LIST } from '../data/travelData'

const TRAVEL_TYPES = ['adventure', 'relax', 'food', 'culture', 'luxury']
const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low \u2192 High' },
  { value: 'price-high', label: 'Price: High \u2192 Low' },
  { value: 'rating', label: 'Highest Rated' },
]

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialType = searchParams.get('type') || ''
  const { convertPrice, toggleWishlist, isWishlisted, addRecentlyViewed } = useApp()

  const [query, setQuery] = useState(initialQuery)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [minRating, setMinRating] = useState(0)
  const [selectedTypes, setSelectedTypes] = useState(initialType ? [initialType] : [])
  const [sortBy, setSortBy] = useState('popular')
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
    const type = searchParams.get('type') || ''
    if (type) setSelectedTypes([type])
  }, [searchParams])

  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const filtered = useMemo(() => {
    let results = [...CITY_LIST]
    if (query.trim()) {
      const q = query.toLowerCase()
      results = results.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.travelType.some(t => t.includes(q))
      )
    }
    results = results.filter(c => c.price >= priceRange[0] && c.price <= priceRange[1])
    if (minRating > 0) results = results.filter(c => c.rating >= minRating)
    if (selectedTypes.length > 0) results = results.filter(c => selectedTypes.some(t => c.travelType.includes(t)))
    switch (sortBy) {
      case 'price-low': results.sort((a, b) => a.price - b.price); break
      case 'price-high': results.sort((a, b) => b.price - a.price); break
      case 'rating': results.sort((a, b) => b.rating - a.rating); break
      default: results.sort((a, b) => b.reviewCount - a.reviewCount); break
    }
    return results
  }, [query, priceRange, minRating, selectedTypes, sortBy])

  return (
    <div className="search-page">
      <div className="search-page-header">
        <div className="container">
          <h1 className="section-title search-page-title">
            {query ? `Results for "${query}"` : 'Explore All Destinations'}
          </h1>
          <p className="search-page-subtitle">
            {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
          </p>
          <div className="search-page-bar">
            <span className="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
            <input type="text" placeholder="Search destinations, countries..." value={query} onChange={e => setQuery(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="container search-layout">
        <aside className={`filters-sidebar${filtersOpen ? ' open' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="filters-close-btn" onClick={() => setFiltersOpen(false)}>{'\u2715'}</button>
          </div>
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-range-display">
              <span>{convertPrice(priceRange[0])}</span>
              <span>{convertPrice(priceRange[1])}</span>
            </div>
            <input type="range" min="0" max="5000" step="100" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="range-slider" />
          </div>
          <div className="filter-group">
            <h4>Minimum Rating</h4>
            <div className="rating-buttons">
              {[0, 4, 4.5, 4.8].map(r => (
                <button key={r} className={`rating-btn${minRating === r ? ' active' : ''}`} onClick={() => setMinRating(r)}>
                  {r === 0 ? 'Any' : `${r}+ \u2b50`}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <h4>Travel Type</h4>
            <div className="type-chips">
              {TRAVEL_TYPES.map(type => (
                <button key={type} className={`type-chip${selectedTypes.includes(type) ? ' active' : ''}`} onClick={() => toggleType(type)}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-outline" style={{ width: '100%', marginTop: 16 }} onClick={() => { setPriceRange([0, 5000]); setMinRating(0); setSelectedTypes([]) }}>
            Clear All Filters
          </button>
        </aside>

        <div className="search-results">
          <div className="results-toolbar">
            <button className="btn btn-outline filters-toggle-btn" onClick={() => setFiltersOpen(true)}>
              {'\u2699\ufe0f'} Filters
            </button>
            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="results-grid">
              {[1,2,3,4,5,6].map(i => (
                <div className="skeleton-card" key={i}>
                  <div className="skeleton-img shimmer" style={{ height: 200 }} />
                  <div className="skeleton-body">
                    <div className="skeleton-line wide shimmer" />
                    <div className="skeleton-line medium shimmer" />
                    <div className="skeleton-line short shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">{'\ud83d\udd0d'}</div>
              <h3>No destinations found</h3>
              <p>Try adjusting your filters or search for something else.</p>
              <button className="btn btn-primary" onClick={() => { setQuery(''); setPriceRange([0, 5000]); setMinRating(0); setSelectedTypes([]) }}>Reset Search</button>
            </div>
          ) : (
            <div className="results-grid">
              {filtered.map((city, i) => {
                const wishlisted = isWishlisted(city.id, 'destination')
                return (
                  <div className="result-card" key={city.id} style={{ animationDelay: `${i * 80}ms` }}>
                    <Link to={`/city/${city.id}`} className="result-card-link" onClick={() => addRecentlyViewed({ id: city.id, name: city.name, image: city.heroImage, country: city.country })}>
                      <div className="result-card-img">
                        <img src={city.heroImage} alt={city.name} loading="lazy" />
                        <span className="result-card-badge">{city.badge}</span>
                        <div className="result-card-rating">{'\u2b50'} {city.rating}</div>
                      </div>
                      <div className="result-card-body">
                        <h3>{city.name}</h3>
                        <p className="result-card-country">{'\ud83d\udccd'} {city.country}</p>
                        <p className="result-card-desc">{city.shortDesc}</p>
                        <div className="result-card-tags">
                          {city.travelType.map(t => <span key={t} className="result-tag">{t}</span>)}
                        </div>
                        <div className="result-card-footer">
                          <div className="result-card-price">From <strong>{convertPrice(city.price)}</strong></div>
                          <span className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>View Details</span>
                        </div>
                      </div>
                    </Link>
                    <button className={`result-card-wishlist${wishlisted ? ' active' : ''}`} onClick={() => toggleWishlist({ id: city.id, type: 'destination', name: city.name, image: city.heroImage, price: city.price, country: city.country })}>
                      {wishlisted ? '\u2764\ufe0f' : '\ud83e\udd0d'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
