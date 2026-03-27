import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppContext = createContext()
export function useApp() { return useContext(AppContext) }

const CURRENCIES = {
  USD: { symbol: '$', rate: 1, name: 'US Dollar' },
  INR: { symbol: '\u20b9', rate: 83.5, name: 'Indian Rupee' },
  EUR: { symbol: '\u20ac', rate: 0.92, name: 'Euro' },
  GBP: { symbol: '\u00a3', rate: 0.79, name: 'British Pound' },
  JPY: { symbol: '\u00a5', rate: 149.5, name: 'Japanese Yen' },
  AED: { symbol: '\u062f.\u0625', rate: 3.67, name: 'UAE Dirham' },
}

const BADGES = [
  { id: 'explorer', name: 'Explorer', icon: '\ud83e\udded', desc: 'Visit 3 destinations', requirement: 3, type: 'visits' },
  { id: 'foodie', name: 'Foodie', icon: '\ud83c\udf7d\ufe0f', desc: 'Save 5 restaurants', requirement: 5, type: 'restaurants' },
  { id: 'planner', name: 'Master Planner', icon: '\ud83d\udccb', desc: 'Create 3 itineraries', requirement: 3, type: 'itineraries' },
  { id: 'social', name: 'Social Butterfly', icon: '\ud83e\udd8b', desc: 'Create a group trip', requirement: 1, type: 'groups' },
  { id: 'collector', name: 'Collector', icon: '\ud83d\udc8e', desc: 'Add 10 wishlist items', requirement: 10, type: 'wishlist' },
  { id: 'adventurer', name: 'Adventurer', icon: '\u26f0\ufe0f', desc: 'Book 5 experiences', requirement: 5, type: 'experiences' },
  { id: 'globetrotter', name: 'Globetrotter', icon: '\ud83c\udf0d', desc: 'Earn 1000 points', requirement: 1000, type: 'points' },
  { id: 'reviewer', name: 'Critic', icon: '\u2b50', desc: 'Write 3 reviews', requirement: 3, type: 'reviews' },
]

function loadJSON(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}

export function AppProvider({ children }) {
  /* ── Theme ── */
  const [theme, setTheme] = useState(() => localStorage.getItem('wl-theme') || 'dark')
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  /* ── Auth ── */
  const [user, setUser] = useState(() => loadJSON('wl-user', null))
  const [showAuth, setShowAuth] = useState(false)
  const [authTab, setAuthTab] = useState('login')

  /* ── Currency ── */
  const [currency, setCurrency] = useState(() => localStorage.getItem('wl-currency') || 'USD')

  /* ── Wishlist ── */
  const [wishlist, setWishlist] = useState(() => loadJSON('wl-wishlist', []))
  const [collections, setCollections] = useState(() => loadJSON('wl-collections', [
    { id: 'dream', name: 'Dream Trips', icon: '\u2728', items: [] },
    { id: 'summer26', name: 'Summer 2026', icon: '\u2600\ufe0f', items: [] },
  ]))

  /* ── Notifications ── */
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'price', title: 'Price Drop Alert', message: 'Bali packages dropped by 15%!', time: '2h ago', read: false, icon: '\ud83d\udcb0' },
    { id: 2, type: 'weather', title: 'Weather Update', message: 'Perfect weather in Santorini this week', time: '5h ago', read: false, icon: '\ud83c\udf24\ufe0f' },
    { id: 3, type: 'reminder', title: 'Trip Reminder', message: 'Your Paris trip is in 2 weeks', time: '1d ago', read: true, icon: '\ud83d\udcc5' },
    { id: 4, type: 'deal', title: 'Flash Sale!', message: 'Dubai hotels 40% off for 24 hours', time: '3h ago', read: false, icon: '\u26a1' },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  /* ── Gamification ── */
  const [gamification, setGamification] = useState(() => loadJSON('wl-gamification', {
    points: 250, level: 1, visits: 2, restaurants: 1, itineraries: 1,
    groups: 0, wishlist: 0, experiences: 0, reviews: 1, bookings: 1,
    earnedBadges: [],
  }))

  /* ── Recently Viewed ── */
  const [recentlyViewed, setRecentlyViewed] = useState(() => loadJSON('wl-recent', []))

  /* ── Saved Itineraries ── */
  const [savedItineraries, setSavedItineraries] = useState(() => loadJSON('wl-itineraries', []))

  /* ── Saved Trips (bookings) ── */
  const [savedTrips, setSavedTrips] = useState(() => loadJSON('wl-trips', []))

  /* ── Group Trips ── */
  const [groupTrips, setGroupTrips] = useState(() => loadJSON('wl-groups', []))

  /* ─────── Persistence ─────── */
  useEffect(() => { localStorage.setItem('wl-theme', theme); document.documentElement.setAttribute('data-theme', theme) }, [theme])
  useEffect(() => { user ? localStorage.setItem('wl-user', JSON.stringify(user)) : localStorage.removeItem('wl-user') }, [user])
  useEffect(() => { localStorage.setItem('wl-currency', currency) }, [currency])
  useEffect(() => { localStorage.setItem('wl-wishlist', JSON.stringify(wishlist)) }, [wishlist])
  useEffect(() => { localStorage.setItem('wl-collections', JSON.stringify(collections)) }, [collections])
  useEffect(() => { localStorage.setItem('wl-gamification', JSON.stringify(gamification)) }, [gamification])
  useEffect(() => { localStorage.setItem('wl-recent', JSON.stringify(recentlyViewed)) }, [recentlyViewed])
  useEffect(() => { localStorage.setItem('wl-itineraries', JSON.stringify(savedItineraries)) }, [savedItineraries])
  useEffect(() => { localStorage.setItem('wl-trips', JSON.stringify(savedTrips)) }, [savedTrips])
  useEffect(() => { localStorage.setItem('wl-groups', JSON.stringify(groupTrips)) }, [groupTrips])

  /* Set theme attribute on mount */
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [])

  /* ─────── Currency ─────── */
  const convertPrice = useCallback((priceUSD) => {
    const c = CURRENCIES[currency]
    const converted = priceUSD * c.rate
    if (currency === 'JPY') return `${c.symbol}${Math.round(converted).toLocaleString()}`
    if (currency === 'INR') return `${c.symbol}${Math.round(converted).toLocaleString()}`
    return `${c.symbol}${converted.toFixed(converted < 100 ? 2 : 0)}`
  }, [currency])

  const formatPrice = useCallback((priceUSD) => {
    const c = CURRENCIES[currency]
    const converted = priceUSD * c.rate
    return Math.round(converted)
  }, [currency])

  const currencySymbol = CURRENCIES[currency]?.symbol || '$'

  /* ─────── Auth Actions ─────── */
  const login = (email, name) => {
    setUser({ email, name, avatar: name.charAt(0).toUpperCase(), joinDate: new Date().toISOString() })
    setShowAuth(false)
    addNotification('welcome', 'Welcome Back!', `Welcome back, ${name}!`, '\ud83c\udf89')
    addPoints(50, 'Login bonus')
  }
  const signup = (email, name) => {
    setUser({ email, name, avatar: name.charAt(0).toUpperCase(), joinDate: new Date().toISOString() })
    setShowAuth(false)
    addNotification('welcome', 'Welcome!', `Welcome to Wanderlust, ${name}!`, '\ud83c\udf89')
    addPoints(100, 'Signup bonus')
  }
  const logout = () => { setUser(null); localStorage.removeItem('wl-user') }

  /* ─────── Wishlist Actions ─────── */
  const toggleWishlist = (item) => {
    setWishlist(prev => {
      const exists = prev.find(w => w.id === item.id && w.type === item.type)
      if (exists) return prev.filter(w => !(w.id === item.id && w.type === item.type))
      addPoints(10, 'Added to wishlist')
      updateStat('wishlist', 1)
      return [...prev, { ...item, addedAt: new Date().toISOString() }]
    })
  }
  const isWishlisted = (id, type) => wishlist.some(w => w.id === id && w.type === type)

  const addToCollection = (collectionId, item) => {
    setCollections(prev => prev.map(c =>
      c.id === collectionId ? { ...c, items: [...(c.items || []), item] } : c
    ))
  }

  const createCollection = (name, icon) => {
    setCollections(prev => [...prev, { id: Date.now().toString(), name, icon, items: [] }])
  }

  /* ─────── Notifications ─────── */
  const addNotification = (type, title, message, icon) => {
    setNotifications(prev => [
      { id: Date.now(), type, title, message, time: 'Just now', read: false, icon },
      ...prev.slice(0, 19)
    ])
  }
  const markNotificationRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  const clearNotifications = () => setNotifications([])
  const unreadCount = notifications.filter(n => !n.read).length

  /* ─────── Gamification ─────── */
  const addPoints = (pts) => {
    setGamification(prev => {
      const newPoints = prev.points + pts
      const newLevel = Math.floor(newPoints / 500) + 1
      return { ...prev, points: newPoints, level: newLevel }
    })
  }

  const updateStat = (stat, increment) => {
    setGamification(prev => {
      const newVal = (prev[stat] || 0) + increment
      const updated = { ...prev, [stat]: newVal }
      BADGES.forEach(badge => {
        if (!updated.earnedBadges.includes(badge.id) && updated[badge.type] >= badge.requirement) {
          updated.earnedBadges = [...updated.earnedBadges, badge.id]
          setTimeout(() => addNotification('badge', 'Badge Earned!', `You earned the ${badge.name} badge! ${badge.icon}`, '\ud83c\udfc6'), 500)
        }
      })
      return updated
    })
  }

  /* ─────── Recently Viewed ─────── */
  const addRecentlyViewed = (item) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(r => r.id !== item.id)
      return [{ ...item, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 12)
    })
  }

  /* ─────── Itineraries ─────── */
  const saveItinerary = (itinerary) => {
    setSavedItineraries(prev => [...prev, { ...itinerary, id: Date.now(), savedAt: new Date().toISOString() }])
    addPoints(50, 'Itinerary saved')
    updateStat('itineraries', 1)
  }
  const deleteItinerary = (id) => setSavedItineraries(prev => prev.filter(i => i.id !== id))

  /* ─────── Trips ─────── */
  const saveTrip = (trip) => {
    setSavedTrips(prev => [...prev, { ...trip, id: Date.now(), bookedAt: new Date().toISOString() }])
    addPoints(100, 'Trip booked')
    updateStat('bookings', 1)
    addNotification('booking', 'Booking Confirmed!', `Your trip to ${trip.destination} has been booked!`, '\u2705')
  }

  /* ─────── Group Trips ─────── */
  const createGroupTrip = (trip) => {
    const newTrip = { ...trip, id: Date.now(), createdAt: new Date().toISOString(), members: [user?.name || 'You'], votes: {} }
    setGroupTrips(prev => [...prev, newTrip])
    updateStat('groups', 1)
    addPoints(75, 'Group trip created')
    return newTrip
  }

  const value = {
    theme, toggleTheme,
    user, showAuth, setShowAuth, authTab, setAuthTab, login, signup, logout,
    currency, setCurrency, convertPrice, formatPrice, currencySymbol, CURRENCIES,
    wishlist, toggleWishlist, isWishlisted, collections, setCollections, addToCollection, createCollection,
    notifications, showNotifications, setShowNotifications, addNotification, markNotificationRead, markAllRead, clearNotifications, unreadCount,
    gamification, addPoints, updateStat, BADGES,
    recentlyViewed, addRecentlyViewed,
    savedItineraries, saveItinerary, deleteItinerary,
    savedTrips, saveTrip,
    groupTrips, createGroupTrip, setGroupTrips,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
