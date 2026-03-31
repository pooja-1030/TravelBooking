import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { CITIES } from '../data/travelData'

export default function HotelPage() {
  const { cityId } = useParams()
  const [searchParams] = useSearchParams()
  const hotelId = searchParams.get('hotel')
  const city = CITIES[cityId]
  const { convertPrice, toggleWishlist, isWishlisted, saveTrip, user, setShowAuth, addRecentlyViewed } = useApp()

  const [selectedRoom, setSelectedRoom] = useState(null)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [activeImg, setActiveImg] = useState(0)
  const [bookingToast, setBookingToast] = useState(null)
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  const hotel = city?.hotels?.find(h => h.id === hotelId) || city?.hotels?.[0]

  useEffect(() => {
    if (hotel && city) {
      addRecentlyViewed({ id: hotel.id, name: hotel.name, image: hotel.image, country: city.name, type: 'hotel' })
    }
  }, [hotel?.id])

  if (!city || !hotel) {
    return (
      <div className="hotel-not-found">
        <div className="container" style={{ textAlign: 'center', padding: '120px 24px' }}>
          <h2>Hotel not found</h2>
          <p>The hotel you're looking for doesn't exist.</p>
          <Link to="/search" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Destinations</Link>
        </div>
      </div>
    )
  }

  const allImages = [hotel.image, ...(hotel.rooms || []).map(r => r.img).filter(Boolean)]
  const allAmenities = [...new Set((hotel.rooms || []).flatMap(r => r.amenities || []))]

  const nights = checkIn && checkOut ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000)) : 1
  const totalPrice = selectedRoom ? selectedRoom.price * nights : hotel.price * nights

  const handleBook = () => {
    if (!user) { setShowAuth(true); return }
    if (!selectedRoom) { setBookingToast('Please select a room first'); return }
    saveTrip({
      destination: city.name,
      cityId: city.id,
      hotel: hotel.name,
      room: selectedRoom.name,
      dates: checkIn && checkOut ? `${checkIn} to ${checkOut}` : 'Flexible dates',
      guests,
      totalCost: totalPrice,
      status: 'upcoming',
    })
    setBookingToast('Booking confirmed! Check your dashboard.')
    setTimeout(() => setBookingToast(null), 4000)
  }

  const wishlisted = isWishlisted(hotel.id, 'hotel')

  /* ── Price Tracking Simulation ── */
  const priceChange = Math.random() > 0.5 ? -Math.floor(Math.random() * 30 + 10) : Math.floor(Math.random() * 15 + 5)
  const priceDropped = priceChange < 0

  return (
    <div className="hotel-page">
      {/* Breadcrumb */}
      <div className="hotel-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> <span>/</span>
          <Link to={`/city/${city.id}`}>{city.name}</Link> <span>/</span>
          <span>{hotel.name}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="hotel-gallery">
        <div className="hotel-gallery-main">
          <img
            src={allImages[activeImg] || hotel.image}
            alt={hotel.name}
            onError={e => { e.target.src = city.heroImage }}
          />
          <button
            className={`hotel-gallery-wishlist${wishlisted ? ' active' : ''}`}
            onClick={() => toggleWishlist({ id: hotel.id, type: 'hotel', name: hotel.name, image: hotel.image, price: hotel.price, location: hotel.location })}
          >
            {wishlisted ? 'Saved' : 'Save'}
          </button>
          {/* Price Tracking Badge */}
          {priceDropped && (
            <div className="hotel-price-alert">
              Price dropped by {convertPrice(Math.abs(priceChange))}!
            </div>
          )}
        </div>
        <div className="hotel-gallery-thumbs">
          {allImages.slice(0, 5).map((img, i) => (
            <button key={i} className={`hotel-thumb${activeImg === i ? ' active' : ''}`} onClick={() => setActiveImg(i)}>
              <img src={img} alt={`View ${i + 1}`} onError={e => { e.target.src = city.heroImage }} />
            </button>
          ))}
        </div>
      </div>

      <div className="container hotel-layout">
        {/* Main Content */}
        <div className="hotel-main">
          <div className="hotel-title-section">
            <div>
              <h1>{hotel.name}</h1>
              <p className="hotel-location">{hotel.location}</p>
            </div>
            <div className="hotel-rating-badge">
              <span className="hotel-rating-score">{hotel.rating}</span>
              <span className="hotel-rating-label">{hotel.rating >= 4.8 ? 'Exceptional' : hotel.rating >= 4.5 ? 'Excellent' : 'Very Good'}</span>
              <span className="hotel-stars">{'*'.repeat(hotel.stars)}</span>
            </div>
          </div>

          {/* Smart Travel Insights */}
          <div className="hotel-insights">
            <div className="hotel-insight"><span>Weather</span><div><strong>Weather</strong><p>{city.weather?.slice(0, 60) || 'Check local forecast'}...</p></div></div>
            <div className="hotel-insight"><span>Crowd</span><div><strong>Crowd Level</strong><p>{Math.random() > 0.5 ? 'Moderate' : 'Low'} this week</p></div></div>
            <div className="hotel-insight"><span>Safety</span><div><strong>Safety Score</strong><p>{(4 + Math.random()).toFixed(1)}/5 - {hotel.rating >= 4.5 ? 'Very Safe' : 'Safe'}</p></div></div>
            <div className="hotel-insight"><span>Calendar</span><div><strong>Best Time</strong><p>{city.bestTimeToVisit?.slice(0, 30) || 'Year round'}</p></div></div>
          </div>

          {/* Amenities */}
          <div className="hotel-amenities-section">
            <h2>Amenities & Features</h2>
            <div className="hotel-amenities-grid">
              {(showAllAmenities ? allAmenities : allAmenities.slice(0, 8)).map(a => (
                <div key={a} className="hotel-amenity">
                  <span className="hotel-amenity-icon">
                    {a.includes('WiFi') ? 'WiFi' : a.includes('Pool') ? 'Pool' : a.includes('Breakfast') ? 'Food' : a.includes('Spa') ? 'Spa' : a.includes('View') ? 'View' : a.includes('AC') ? 'AC' : '+'}
                  </span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
            {allAmenities.length > 8 && (
              <button className="btn btn-outline btn-sm" onClick={() => setShowAllAmenities(!showAllAmenities)}>
                {showAllAmenities ? 'Show Less' : `Show All ${allAmenities.length} Amenities`}
              </button>
            )}
          </div>

          {/* Rooms */}
          <div className="hotel-rooms-section">
            <h2>Available Rooms</h2>
            <div className="hotel-rooms-grid">
              {(hotel.rooms || []).map(room => (
                <div key={room.id} className={`hotel-room-card${selectedRoom?.id === room.id ? ' selected' : ''}${room.available <= 2 ? ' low-avail' : ''}`}>
                  <div className="hotel-room-img">
                    <img src={room.img} alt={room.name} onError={e => { e.target.src = hotel.image }} />
                    {room.available <= 2 && <span className="hotel-room-urgent">Only {room.available} left!</span>}
                  </div>
                  <div className="hotel-room-body">
                    <h3>{room.name}</h3>
                    <div className="hotel-room-amenities">
                      {(room.amenities || []).map(a => <span key={a} className="hotel-room-amenity-tag">{a}</span>)}
                    </div>
                    <div className="hotel-room-footer">
                      <div className="hotel-room-price">
                        <strong>{convertPrice(room.price)}</strong>
                        <small>/night</small>
                      </div>
                      <button
                        className={`btn ${selectedRoom?.id === room.id ? 'btn-accent' : 'btn-primary'} btn-sm`}
                        onClick={() => setSelectedRoom(selectedRoom?.id === room.id ? null : room)}
                      >
                        {selectedRoom?.id === room.id ? '\u2713 Selected' : 'Select Room'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Attractions */}
          {city.attractions && (
            <div className="hotel-nearby">
              <h2>Nearby Attractions</h2>
              <div className="hotel-nearby-grid">
                {city.attractions.slice(0, 4).map(a => (
                  <div key={a.name} className="hotel-nearby-card">
                    <img src={a.img} alt={a.name} onError={e => { e.target.src = city.heroImage }} />
                    <div><h4>{a.name}</h4><p>{a.desc?.slice(0, 60)}...</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Sidebar */}
        <aside className="hotel-booking-sidebar">
          <div className="hotel-booking-card">
            <div className="hotel-booking-price">
              <span className="hotel-booking-amount">{convertPrice(selectedRoom?.price || hotel.price)}</span>
              <span>/night</span>
            </div>

            {priceDropped && (
              <div className="hotel-booking-deal">
                Price is {Math.abs(priceChange)}% lower than usual! Book within 2 days.
              </div>
            )}

            <div className="hotel-booking-field">
              <label>Check-in</label>
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
            </div>
            <div className="hotel-booking-field">
              <label>Check-out</label>
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} min={checkIn} />
            </div>
            <div className="hotel-booking-field">
              <label>Guests</label>
              <select value={guests} onChange={e => setGuests(+e.target.value)}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>

            {selectedRoom && (
              <div className="hotel-booking-summary">
                <div className="hotel-booking-row"><span>{selectedRoom.name}</span><span>{convertPrice(selectedRoom.price)} x {nights}</span></div>
                <div className="hotel-booking-row"><span>Service fee</span><span>{convertPrice(Math.round(totalPrice * 0.1))}</span></div>
                <div className="hotel-booking-row total"><span>Total</span><span>{convertPrice(Math.round(totalPrice * 1.1))}</span></div>
              </div>
            )}

            <button className="btn btn-accent hotel-book-btn" onClick={handleBook}>
              {selectedRoom ? `Book ${selectedRoom.name}` : 'Select a Room to Book'}
            </button>

            <p className="hotel-booking-note">Free cancellation up to 48 hours before check-in</p>
          </div>
        </aside>
      </div>

      {/* Booking Toast */}
      {bookingToast && <div className="booking-toast">{bookingToast}</div>}
    </div>
  )
}
