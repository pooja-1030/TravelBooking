import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AdminContext = createContext()
export function useAdmin() { return useContext(AdminContext) }

/* ── Secure password hash (SHA-256 simulation for demo) ── */
function hashPassword(password) {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return 'h$' + Math.abs(hash).toString(36) + '$' + password.length
}

/* ── Default admin credentials ── */
const DEFAULT_ADMIN = {
  id: 'admin-001',
  username: 'admin',
  email: 'admin@wanderlust.com',
  name: 'Admin',
  role: 'super_admin',
  passwordHash: hashPassword('Admin@123'),
  avatar: 'A',
  createdAt: '2024-01-01T00:00:00.000Z',
}

/* ── Mock Data Generators ── */
function generateMockUsers() {
  const names = ['Emma Wilson', 'James Chen', 'Sofia Garcia', 'Liam Patel', 'Olivia Brown', 'Noah Kim', 'Ava Martinez', 'Ethan Davis', 'Mia Johnson', 'Lucas Anderson', 'Isabella Thomas', 'Mason Lee', 'Charlotte White', 'Logan Harris', 'Amelia Clark', 'Alexander Lewis', 'Harper Robinson', 'Benjamin Walker', 'Evelyn Hall', 'William Allen']
  return names.map((name, i) => ({
    id: `user-${i + 1}`,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
    avatar: name.charAt(0),
    joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    bookings: Math.floor(Math.random() * 8),
    totalSpent: Math.floor(Math.random() * 5000) + 200,
    status: Math.random() > 0.1 ? 'active' : 'blocked',
    lastActive: new Date(2026, 2, Math.floor(Math.random() * 27) + 1).toISOString(),
    points: Math.floor(Math.random() * 2000),
  }))
}

function generateMockBookings() {
  const destinations = ['Paris', 'Tokyo', 'Bali', 'Dubai', 'Santorini', 'New York', 'Maldives']
  const hotels = ['Grand Palace Hotel', 'Ocean View Resort', 'Mountain Lodge', 'City Center Inn', 'Luxury Suites', 'Beach Villa', 'Heritage Palace']
  const statuses = ['confirmed', 'pending', 'cancelled', 'completed']
  return Array.from({ length: 25 }, (_, i) => ({
    id: `BK-${String(1000 + i).padStart(4, '0')}`,
    user: `User ${Math.floor(Math.random() * 20) + 1}`,
    userEmail: `user${Math.floor(Math.random() * 20) + 1}@email.com`,
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    hotel: hotels[Math.floor(Math.random() * hotels.length)],
    checkIn: new Date(2026, Math.floor(Math.random() * 6) + 3, Math.floor(Math.random() * 28) + 1).toISOString(),
    checkOut: new Date(2026, Math.floor(Math.random() * 6) + 3, Math.floor(Math.random() * 28) + 1).toISOString(),
    guests: Math.floor(Math.random() * 4) + 1,
    amount: Math.floor(Math.random() * 3000) + 500,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: new Date(2026, 2, Math.floor(Math.random() * 27) + 1).toISOString(),
    paymentMethod: Math.random() > 0.5 ? 'Credit Card' : 'PayPal',
  }))
}

function generateMockDestinations() {
  return [
    { id: 'dest-1', name: 'Paris', country: 'France', description: 'The City of Light, famous for the Eiffel Tower, Louvre Museum, and exquisite cuisine.', bestTime: 'Apr - Jun, Sep - Nov', costLevel: 'High', rating: 4.8, images: 3, hotels: 12, status: 'active' },
    { id: 'dest-2', name: 'Tokyo', country: 'Japan', description: 'A fascinating blend of ultramodern and traditional, from neon-lit skyscrapers to historic temples.', bestTime: 'Mar - May, Sep - Nov', costLevel: 'High', rating: 4.9, images: 5, hotels: 15, status: 'active' },
    { id: 'dest-3', name: 'Bali', country: 'Indonesia', description: 'Tropical paradise known for forested volcanic mountains, iconic rice paddies, and coral reefs.', bestTime: 'Apr - Oct', costLevel: 'Medium', rating: 4.7, images: 4, hotels: 20, status: 'active' },
    { id: 'dest-4', name: 'Dubai', country: 'UAE', description: 'A city of superlatives — tallest buildings, largest malls, and luxury experiences.', bestTime: 'Nov - Mar', costLevel: 'Very High', rating: 4.6, images: 3, hotels: 18, status: 'active' },
    { id: 'dest-5', name: 'Santorini', country: 'Greece', description: 'Stunning sunsets, white-washed buildings, and crystal-clear waters in the Aegean Sea.', bestTime: 'Jun - Sep', costLevel: 'High', rating: 4.8, images: 4, hotels: 8, status: 'active' },
    { id: 'dest-6', name: 'New York', country: 'USA', description: 'The Big Apple — world-class museums, Broadway shows, and iconic skyline.', bestTime: 'Apr - Jun, Sep - Nov', costLevel: 'Very High', rating: 4.7, images: 5, hotels: 25, status: 'active' },
    { id: 'dest-7', name: 'Maldives', country: 'Maldives', description: 'Paradise on Earth with overwater villas, turquoise lagoons, and pristine beaches.', bestTime: 'Nov - Apr', costLevel: 'Very High', rating: 4.9, images: 6, hotels: 10, status: 'active' },
  ]
}

function generateMockHotels() {
  return [
    { id: 'htl-1', name: 'Le Grand Palace', city: 'Paris', rating: 5, priceRange: '$400-$800', rooms: 120, occupancy: 78, status: 'active', images: 4 },
    { id: 'htl-2', name: 'Hotel Montmartre', city: 'Paris', rating: 4, priceRange: '$150-$300', rooms: 65, occupancy: 85, status: 'active', images: 3 },
    { id: 'htl-3', name: 'Shinjuku Heights', city: 'Tokyo', rating: 5, priceRange: '$350-$700', rooms: 200, occupancy: 92, status: 'active', images: 5 },
    { id: 'htl-4', name: 'Sakura Ryokan', city: 'Tokyo', rating: 4, priceRange: '$200-$400', rooms: 30, occupancy: 65, status: 'active', images: 3 },
    { id: 'htl-5', name: 'Bali Beach Resort', city: 'Bali', rating: 5, priceRange: '$250-$600', rooms: 80, occupancy: 88, status: 'active', images: 6 },
    { id: 'htl-6', name: 'Ubud Jungle Villas', city: 'Bali', rating: 4, priceRange: '$120-$280', rooms: 25, occupancy: 72, status: 'active', images: 4 },
    { id: 'htl-7', name: 'Burj Al Luxury', city: 'Dubai', rating: 5, priceRange: '$600-$1500', rooms: 300, occupancy: 80, status: 'active', images: 5 },
    { id: 'htl-8', name: 'Marina Bay Suites', city: 'Dubai', rating: 4, priceRange: '$200-$450', rooms: 150, occupancy: 75, status: 'active', images: 3 },
    { id: 'htl-9', name: 'Santorini Cliff Hotel', city: 'Santorini', rating: 5, priceRange: '$350-$900', rooms: 40, occupancy: 95, status: 'active', images: 4 },
    { id: 'htl-10', name: 'Overwater Paradise', city: 'Maldives', rating: 5, priceRange: '$800-$2000', rooms: 50, occupancy: 90, status: 'active', images: 6 },
  ]
}

function generateMockRestaurants() {
  return [
    { id: 'rst-1', name: 'Le Petit Bistro', city: 'Paris', cuisine: 'French', priceRange: '$$$$', rating: 4.8, status: 'active' },
    { id: 'rst-2', name: 'Sushi Mastery', city: 'Tokyo', cuisine: 'Japanese', priceRange: '$$$', rating: 4.9, status: 'active' },
    { id: 'rst-3', name: 'Warung Bali', city: 'Bali', cuisine: 'Indonesian', priceRange: '$$', rating: 4.5, status: 'active' },
    { id: 'rst-4', name: 'Al Habtoor Grill', city: 'Dubai', cuisine: 'Middle Eastern', priceRange: '$$$$', rating: 4.7, status: 'active' },
    { id: 'rst-5', name: 'Ammoudi Fish', city: 'Santorini', cuisine: 'Greek', priceRange: '$$$', rating: 4.6, status: 'active' },
    { id: 'rst-6', name: "Joe's Pizza", city: 'New York', cuisine: 'Italian-American', priceRange: '$', rating: 4.4, status: 'active' },
    { id: 'rst-7', name: 'Ocean Grill Maldives', city: 'Maldives', cuisine: 'Seafood', priceRange: '$$$$', rating: 4.8, status: 'active' },
    { id: 'rst-8', name: 'Café de Flore', city: 'Paris', cuisine: 'French', priceRange: '$$$', rating: 4.5, status: 'active' },
  ]
}

function generateMockAttractions() {
  return [
    { id: 'att-1', name: 'Eiffel Tower', city: 'Paris', description: 'Iconic iron lattice tower on the Champ de Mars', coords: '48.8584, 2.2945', status: 'active' },
    { id: 'att-2', name: 'Senso-ji Temple', city: 'Tokyo', description: 'Ancient Buddhist temple in Asakusa', coords: '35.7148, 139.7967', status: 'active' },
    { id: 'att-3', name: 'Tegallalang Rice Terrace', city: 'Bali', description: 'Beautiful rice terraces in Ubud', coords: '-8.4312, 115.2793', status: 'active' },
    { id: 'att-4', name: 'Burj Khalifa', city: 'Dubai', description: 'The tallest structure in the world at 828m', coords: '25.1972, 55.2744', status: 'active' },
    { id: 'att-5', name: 'Oia Sunset Point', city: 'Santorini', description: 'Most photographed sunset spot in the world', coords: '36.4618, 25.3753', status: 'active' },
    { id: 'att-6', name: 'Statue of Liberty', city: 'New York', description: 'Iconic symbol of freedom and democracy', coords: '40.6892, -74.0445', status: 'active' },
    { id: 'att-7', name: 'Veligandu Island Reef', city: 'Maldives', description: 'Pristine coral reef with marine life', coords: '3.9988, 72.9124', status: 'active' },
  ]
}

function generateMockPackages() {
  return [
    { id: 'pkg-1', name: 'Paris Romantic Getaway', destination: 'Paris', duration: '5 days', price: 2500, includes: ['Hotel', 'Breakfast', 'City Tour', 'Seine Cruise'], status: 'active', bookings: 45 },
    { id: 'pkg-2', name: 'Tokyo Cultural Explorer', destination: 'Tokyo', duration: '7 days', price: 3200, includes: ['Hotel', 'All Meals', 'Temple Tours', 'Tea Ceremony'], status: 'active', bookings: 32 },
    { id: 'pkg-3', name: 'Bali Wellness Retreat', destination: 'Bali', duration: '5 days', price: 1800, includes: ['Resort', 'Spa', 'Yoga', 'Organic Meals'], status: 'active', bookings: 58 },
    { id: 'pkg-4', name: 'Dubai Luxury Experience', destination: 'Dubai', duration: '4 days', price: 4000, includes: ['5-Star Hotel', 'Desert Safari', 'Gold Souk Tour', 'Dhow Cruise'], status: 'active', bookings: 28 },
    { id: 'pkg-5', name: 'Maldives Overwater Dream', destination: 'Maldives', duration: '6 days', price: 5500, includes: ['Overwater Villa', 'All Inclusive', 'Snorkeling', 'Sunset Cruise'], status: 'active', bookings: 22 },
  ]
}

function generateRevenueData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map(m => ({
    month: m,
    revenue: Math.floor(Math.random() * 50000) + 20000,
    bookings: Math.floor(Math.random() * 80) + 20,
  }))
}

function generateMediaItems() {
  return [
    { id: 'med-1', name: 'paris-eiffel.jpg', category: 'Destinations', city: 'Paris', size: '2.4 MB', uploadedAt: '2026-01-15', type: 'image' },
    { id: 'med-2', name: 'tokyo-temple.jpg', category: 'Attractions', city: 'Tokyo', size: '1.8 MB', uploadedAt: '2026-01-20', type: 'image' },
    { id: 'med-3', name: 'bali-resort.jpg', category: 'Hotels', city: 'Bali', size: '3.1 MB', uploadedAt: '2026-02-01', type: 'image' },
    { id: 'med-4', name: 'dubai-skyline.jpg', category: 'Destinations', city: 'Dubai', size: '2.8 MB', uploadedAt: '2026-02-10', type: 'image' },
    { id: 'med-5', name: 'santorini-sunset.jpg', category: 'Destinations', city: 'Santorini', size: '1.5 MB', uploadedAt: '2026-02-15', type: 'image' },
    { id: 'med-6', name: 'maldives-villa.jpg', category: 'Hotels', city: 'Maldives', size: '4.2 MB', uploadedAt: '2026-03-01', type: 'image' },
    { id: 'med-7', name: 'nyc-liberty.jpg', category: 'Attractions', city: 'New York', size: '2.1 MB', uploadedAt: '2026-03-05', type: 'image' },
    { id: 'med-8', name: 'paris-bistro.jpg', category: 'Restaurants', city: 'Paris', size: '1.9 MB', uploadedAt: '2026-03-10', type: 'image' },
  ]
}

/* ── Session timeout (30 min) ── */
const SESSION_TIMEOUT = 30 * 60 * 1000

function loadJSON(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(() => loadJSON('wl-admin-session', null))
  const [adminTheme, setAdminTheme] = useState(() => localStorage.getItem('wl-admin-theme') || 'dark')
  const [sessionTimer, setSessionTimer] = useState(null)
  const [loginError, setLoginError] = useState('')

  /* ── Data states ── */
  const [users] = useState(generateMockUsers)
  const [bookings, setBookings] = useState(generateMockBookings)
  const [destinations, setDestinations] = useState(generateMockDestinations)
  const [hotels, setHotels] = useState(generateMockHotels)
  const [restaurants, setRestaurants] = useState(generateMockRestaurants)
  const [attractions, setAttractions] = useState(generateMockAttractions)
  const [packages, setPackages] = useState(generateMockPackages)
  const [media, setMedia] = useState(generateMediaItems)
  const [revenueData] = useState(generateRevenueData)
  const [adminNotifications, setAdminNotifications] = useState([
    { id: 1, message: 'New booking: Paris Romantic Getaway', time: '5 min ago', read: false },
    { id: 2, message: 'User Emma Wilson signed up', time: '15 min ago', read: false },
    { id: 3, message: 'Payment received: $2,500', time: '1 hour ago', read: true },
    { id: 4, message: 'Review flagged for moderation', time: '2 hours ago', read: false },
    { id: 5, message: 'Server backup completed', time: '3 hours ago', read: true },
  ])

  /* ── Toast notifications ── */
  const [toasts, setToasts] = useState([])
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }, [])

  /* ── Theme ── */
  useEffect(() => {
    localStorage.setItem('wl-admin-theme', adminTheme)
  }, [adminTheme])
  const toggleAdminTheme = () => setAdminTheme(t => t === 'light' ? 'dark' : 'light')

  /* ── Session management ── */
  const resetSessionTimer = useCallback(() => {
    if (sessionTimer) clearTimeout(sessionTimer)
    const timer = setTimeout(() => {
      adminLogout()
      addToast('Session expired. Please log in again.', 'warning')
    }, SESSION_TIMEOUT)
    setSessionTimer(timer)
  }, [sessionTimer])

  useEffect(() => {
    if (admin) {
      resetSessionTimer()
      const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
      events.forEach(e => window.addEventListener(e, resetSessionTimer, { passive: true }))
      return () => {
        events.forEach(e => window.removeEventListener(e, resetSessionTimer))
        if (sessionTimer) clearTimeout(sessionTimer)
      }
    }
  }, [admin])

  /* ── Auth ── */
  const adminLogin = (username, password) => {
    setLoginError('')
    const passwordHash = hashPassword(password)
    if ((username === DEFAULT_ADMIN.username || username === DEFAULT_ADMIN.email) && passwordHash === DEFAULT_ADMIN.passwordHash) {
      const session = { ...DEFAULT_ADMIN, loginAt: new Date().toISOString() }
      delete session.passwordHash
      setAdmin(session)
      localStorage.setItem('wl-admin-session', JSON.stringify(session))
      return true
    }
    setLoginError('Invalid username or password')
    return false
  }

  const adminLogout = () => {
    setAdmin(null)
    localStorage.removeItem('wl-admin-session')
    if (sessionTimer) clearTimeout(sessionTimer)
  }

  /* ── CRUD operations ── */
  const addDestination = (dest) => { setDestinations(prev => [...prev, { ...dest, id: `dest-${Date.now()}` }]); addToast('Destination added successfully') }
  const updateDestination = (id, data) => { setDestinations(prev => prev.map(d => d.id === id ? { ...d, ...data } : d)); addToast('Destination updated') }
  const deleteDestination = (id) => { setDestinations(prev => prev.filter(d => d.id !== id)); addToast('Destination deleted', 'info') }

  const addHotel = (hotel) => { setHotels(prev => [...prev, { ...hotel, id: `htl-${Date.now()}` }]); addToast('Hotel added successfully') }
  const updateHotel = (id, data) => { setHotels(prev => prev.map(h => h.id === id ? { ...h, ...data } : h)); addToast('Hotel updated') }
  const deleteHotel = (id) => { setHotels(prev => prev.filter(h => h.id !== id)); addToast('Hotel deleted', 'info') }

  const addRestaurant = (rest) => { setRestaurants(prev => [...prev, { ...rest, id: `rst-${Date.now()}` }]); addToast('Restaurant added successfully') }
  const updateRestaurant = (id, data) => { setRestaurants(prev => prev.map(r => r.id === id ? { ...r, ...data } : r)); addToast('Restaurant updated') }
  const deleteRestaurant = (id) => { setRestaurants(prev => prev.filter(r => r.id !== id)); addToast('Restaurant deleted', 'info') }

  const addAttraction = (att) => { setAttractions(prev => [...prev, { ...att, id: `att-${Date.now()}` }]); addToast('Attraction added successfully') }
  const updateAttraction = (id, data) => { setAttractions(prev => prev.map(a => a.id === id ? { ...a, ...data } : a)); addToast('Attraction updated') }
  const deleteAttraction = (id) => { setAttractions(prev => prev.filter(a => a.id !== id)); addToast('Attraction deleted', 'info') }

  const addPackage = (pkg) => { setPackages(prev => [...prev, { ...pkg, id: `pkg-${Date.now()}` }]); addToast('Package added successfully') }
  const updatePackage = (id, data) => { setPackages(prev => prev.map(p => p.id === id ? { ...p, ...data } : p)); addToast('Package updated') }
  const deletePackage = (id) => { setPackages(prev => prev.filter(p => p.id !== id)); addToast('Package deleted', 'info') }

  const updateBookingStatus = (id, status) => { setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b)); addToast(`Booking ${status}`) }

  const addMedia = (item) => { setMedia(prev => [...prev, { ...item, id: `med-${Date.now()}` }]); addToast('Media uploaded') }
  const deleteMedia = (id) => { setMedia(prev => prev.filter(m => m.id !== id)); addToast('Media deleted', 'info') }

  const markAdminNotifRead = (id) => setAdminNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const sendUserNotification = (message) => { addToast(`Notification sent: ${message}`); }

  /* ── Computed metrics ── */
  const metrics = {
    totalUsers: users.length,
    totalBookings: bookings.length,
    revenue: bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.amount, 0),
    activeTrips: bookings.filter(b => b.status === 'confirmed').length,
    totalDestinations: destinations.length,
    totalHotels: hotels.length,
    totalRestaurants: restaurants.length,
    totalAttractions: attractions.length,
    totalPackages: packages.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
  }

  const value = {
    admin, adminLogin, adminLogout, loginError, setLoginError,
    adminTheme, toggleAdminTheme,
    users, bookings, destinations, hotels, restaurants, attractions, packages, media, revenueData,
    metrics,
    addDestination, updateDestination, deleteDestination,
    addHotel, updateHotel, deleteHotel,
    addRestaurant, updateRestaurant, deleteRestaurant,
    addAttraction, updateAttraction, deleteAttraction,
    addPackage, updatePackage, deletePackage,
    updateBookingStatus,
    addMedia, deleteMedia,
    adminNotifications, markAdminNotifRead, sendUserNotification,
    toasts, addToast,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
