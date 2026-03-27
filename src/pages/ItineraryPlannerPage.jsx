import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { CITIES, CITY_LIST } from '../data/travelData'

/* ── AI Mock Response Generator ── */
function generateAIItinerary(prompt) {
  const lower = prompt.toLowerCase()
  let city = CITY_LIST[0]
  let days = 5
  let budget = 'mid'

  for (const c of CITY_LIST) {
    if (lower.includes(c.name.toLowerCase()) || lower.includes(c.country.toLowerCase())) { city = c; break }
  }
  const dayMatch = lower.match(/(\d+)\s*day/)
  if (dayMatch) days = Math.min(Math.max(parseInt(dayMatch[1]), 1), 10)
  if (lower.includes('budget') || lower.includes('cheap')) budget = 'budget'
  else if (lower.includes('luxury') || lower.includes('premium')) budget = 'luxury'

  const cityData = CITIES[city.id]
  const attractions = cityData?.attractions || []
  const hotels = cityData?.hotels || []
  const restaurants = cityData?.restaurants || []

  const hotel = budget === 'budget' ? hotels[hotels.length - 1] : budget === 'luxury' ? hotels[0] : hotels[Math.floor(hotels.length / 2)] || hotels[0]

  const itineraryDays = Array.from({ length: days }, (_, i) => {
    const dayAttractions = []
    const attrIdx1 = i % attractions.length
    const attrIdx2 = (i + 1) % attractions.length
    if (attractions[attrIdx1]) dayAttractions.push(attractions[attrIdx1].name)
    if (attractions[attrIdx2] && attrIdx2 !== attrIdx1) dayAttractions.push(attractions[attrIdx2].name)

    const rest = restaurants[i % (restaurants?.length || 1)]

    const activities = [
      i === 0 ? 'Arrive & check into hotel' : `Morning: ${dayAttractions[0] || 'Explore local area'}`,
      `Afternoon: ${dayAttractions[1] || 'Free time & shopping'}`,
      rest ? `Dinner at ${rest.name}` : 'Local dining experience',
      i === days - 1 ? 'Pack & prepare for departure' : 'Evening leisure',
    ]

    return {
      day: i + 1,
      title: i === 0 ? 'Arrival Day' : i === days - 1 ? 'Departure Day' : `Day ${i + 1} - Exploration`,
      activities,
    }
  })

  const dailyCost = budget === 'budget' ? 80 : budget === 'luxury' ? 350 : 180
  const hotelCost = (hotel?.price || 100) * days
  const totalEstimate = hotelCost + (dailyCost * days)

  return {
    destination: city.name,
    cityId: city.id,
    days: itineraryDays,
    hotel: hotel?.name || 'Recommended Hotel',
    hotelPrice: hotel?.price || 100,
    totalEstimate,
    budget,
    summary: `${days}-day ${budget} trip to ${city.name}, ${city.country}. Stay at ${hotel?.name || 'a recommended hotel'} and explore ${attractions.slice(0, 3).map(a => a.name).join(', ')}.`,
  }
}

/* ── Packing Suggestions ── */
const PACKING_LISTS = {
  beach: ['Swimsuit', 'Sunscreen SPF 50', 'Sunglasses', 'Beach towel', 'Flip flops', 'Light cover-up', 'Water bottle', 'Snorkeling gear'],
  city: ['Comfortable walking shoes', 'Day backpack', 'Power adapter', 'Portable charger', 'City map/guidebook', 'Rain jacket', 'Smart casual outfit'],
  adventure: ['Hiking boots', 'Quick-dry clothes', 'First aid kit', 'Headlamp', 'Waterproof bag', 'Insect repellent', 'Multi-tool', 'Energy bars'],
  general: ['Passport & copies', 'Travel insurance docs', 'Medications', 'Toiletries', 'Phone & charger', 'Headphones', 'Travel pillow', 'Snacks'],
}

export default function ItineraryPlannerPage() {
  const { saveItinerary, convertPrice, user, setShowAuth } = useApp()
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiResult, setAiResult] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiTyping, setAiTyping] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [itineraryDays, setItineraryDays] = useState([])
  const [dragState, setDragState] = useState({ dayIdx: -1, actIdx: -1 })
  const [showPacking, setShowPacking] = useState(false)
  const [packingChecked, setPackingChecked] = useState({})
  const [savedToast, setSavedToast] = useState(false)
  const printRef = useRef(null)

  /* ── AI Generation ── */
  const handleAISubmit = (e) => {
    e.preventDefault()
    if (!aiPrompt.trim()) return
    setAiLoading(true)
    setAiResult(null)
    setAiTyping('')

    const fullText = 'Analyzing your preferences... Finding the best destinations... Crafting your perfect itinerary...'
    let idx = 0
    const typeInterval = setInterval(() => {
      if (idx < fullText.length) { setAiTyping(fullText.slice(0, idx + 1)); idx++ }
      else clearInterval(typeInterval)
    }, 30)

    setTimeout(() => {
      clearInterval(typeInterval)
      const result = generateAIItinerary(aiPrompt)
      setAiResult(result)
      setItineraryDays(result.days)
      setAiLoading(false)
      setAiTyping('')
    }, 2500)
  }

  /* ── Drag & Drop ── */
  const handleDragStart = (dayIdx, actIdx) => setDragState({ dayIdx, actIdx })
  const handleDragOver = (e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over') }
  const handleDragLeave = (e) => e.currentTarget.classList.remove('drag-over')

  const handleDrop = (targetDayIdx, targetActIdx) => {
    const { dayIdx: srcDay, actIdx: srcAct } = dragState
    if (srcDay === -1) return
    const newDays = [...itineraryDays.map(d => ({ ...d, activities: [...d.activities] }))]
    const [removed] = newDays[srcDay].activities.splice(srcAct, 1)
    newDays[targetDayIdx].activities.splice(targetActIdx, 0, removed)
    setItineraryDays(newDays)
    setDragState({ dayIdx: -1, actIdx: -1 })
  }

  const addActivity = (dayIdx) => {
    const activity = prompt('Enter new activity:')
    if (!activity?.trim()) return
    const newDays = [...itineraryDays.map(d => ({ ...d, activities: [...d.activities] }))]
    newDays[dayIdx].activities.push(activity.trim())
    setItineraryDays(newDays)
  }

  const removeActivity = (dayIdx, actIdx) => {
    const newDays = [...itineraryDays.map(d => ({ ...d, activities: [...d.activities] }))]
    newDays[dayIdx].activities.splice(actIdx, 1)
    setItineraryDays(newDays)
  }

  /* ── Save ── */
  const handleSave = () => {
    if (!user) { setShowAuth(true); return }
    saveItinerary({
      name: aiResult ? `${aiResult.destination} Trip` : 'Custom Itinerary',
      destination: aiResult?.destination || 'Custom',
      cityId: aiResult?.cityId,
      days: itineraryDays,
      hotel: aiResult?.hotel,
      totalEstimate: aiResult?.totalEstimate,
    })
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 3000)
  }

  /* ── PDF Print ── */
  const handlePrint = () => {
    const printContent = printRef.current
    if (!printContent) return
    const win = window.open('', '_blank')
    win.document.write(`
      <html><head><title>Itinerary - ${aiResult?.destination || 'Trip'}</title>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; padding: 40px; color: #1e293b; }
        h1 { font-size: 28px; margin-bottom: 8px; }
        h2 { font-size: 20px; margin: 24px 0 12px; color: #0ea5e9; }
        .summary { background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0; }
        .day { margin: 20px 0; padding: 16px; border-left: 3px solid #0ea5e9; }
        .day h3 { margin-bottom: 8px; }
        .activity { padding: 4px 0; }
        .footer { margin-top: 40px; color: #94a3b8; font-size: 12px; }
      </style></head><body>
        <h1>\u2708 ${aiResult?.destination || 'Custom'} Itinerary</h1>
        <p>${aiResult?.summary || ''}</p>
        <div class="summary">
          <strong>Hotel:</strong> ${aiResult?.hotel || 'TBD'} |
          <strong>Budget:</strong> ${aiResult?.budget || 'mid'} |
          <strong>Est. Cost:</strong> $${aiResult?.totalEstimate || 0}
        </div>
        ${itineraryDays.map(day => `
          <div class="day">
            <h3>Day ${day.day}: ${day.title}</h3>
            ${day.activities.map(a => `<div class="activity">\u2022 ${a}</div>`).join('')}
          </div>
        `).join('')}
        <div class="footer">Generated by Wanderlust Travel Planner</div>
      </body></html>
    `)
    win.document.close()
    win.print()
  }

  const togglePack = (item) => setPackingChecked(prev => ({ ...prev, [item]: !prev[item] }))

  const quickPrompts = [
    '5-day budget beach trip to Bali',
    '3-day luxury Paris getaway',
    '7-day adventure trip to Switzerland',
    '4-day cultural tour of Tokyo',
    '5-day romantic Santorini escape',
  ]

  return (
    <div className="planner-page">
      {/* Hero */}
      <div className="planner-hero">
        <div className="planner-hero-bg">
          <div className="planner-hero-orb planner-hero-orb-1" />
          <div className="planner-hero-orb planner-hero-orb-2" />
          <div className="planner-hero-orb planner-hero-orb-3" />
        </div>
        <div className="container planner-hero-inner">
          <div className="planner-hero-badge">Powered by AI</div>
          <h1>Your Dream Trip,<br /><span>Planned in Seconds</span></h1>
          <p>Tell us where you want to go, and our AI will craft a personalized day-by-day itinerary with hotels, activities, and budget estimates.</p>

          {/* AI Input - moved into hero */}
          <form onSubmit={handleAISubmit} className="planner-ai-form">
            <div className="planner-ai-input-wrap">
              <div className="planner-ai-input-row">
                <span className="planner-ai-icon">{'\u2728'}</span>
                <textarea
                  value={aiPrompt}
                  onChange={e => setAiPrompt(e.target.value)}
                  placeholder="Describe your ideal trip... e.g., 'I want a 5-day budget beach trip to Bali with cultural experiences'"
                  rows={2}
                />
              </div>
              <button type="submit" className="btn btn-primary planner-ai-btn" disabled={aiLoading || !aiPrompt.trim()}>
                {aiLoading ? <span className="auth-spinner" /> : 'Generate Itinerary'}
              </button>
            </div>
          </form>

          {/* Quick Prompts */}
          <div className="planner-quick-prompts">
            <span>Popular:</span>
            {quickPrompts.map(p => (
              <button key={p} className="planner-quick-chip" onClick={() => setAiPrompt(p)}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="container planner-content">
        {/* AI Typing Animation */}
        {aiLoading && (
          <div className="planner-ai-typing">
            <div className="planner-typing-pulse" />
            <div className="planner-typing-content">
              <div className="planner-typing-dots"><span /><span /><span /></div>
              <p>{aiTyping}</p>
            </div>
          </div>
        )}

        {/* Result */}
        {aiResult && (
          <div className="planner-result" ref={printRef}>
            {/* Summary Card */}
            <div className="planner-summary">
              <div className="planner-summary-header">
                <div>
                  <h2>{'\u2708\ufe0f'} {aiResult.destination} Trip Plan</h2>
                  <p>{aiResult.summary}</p>
                </div>
                <div className="planner-summary-actions">
                  <button className="btn btn-outline btn-sm" onClick={handlePrint}>{'\ud83d\udcc4'} Export PDF</button>
                  <button className="btn btn-primary btn-sm" onClick={handleSave}>{'\ud83d\udcbe'} Save</button>
                  <button className={`btn btn-outline btn-sm${editMode ? ' active' : ''}`} onClick={() => setEditMode(!editMode)}>
                    {editMode ? '\u2705 Done' : '\u270f\ufe0f Edit'}
                  </button>
                </div>
              </div>
              <div className="planner-summary-stats">
                <div className="planner-stat">
                  <div className="planner-stat-icon">{'\ud83d\udcc5'}</div>
                  <div><strong>{itineraryDays.length} Days</strong></div>
                </div>
                <div className="planner-stat">
                  <div className="planner-stat-icon">{'\ud83c\udfe8'}</div>
                  <div><strong>{aiResult.hotel}</strong></div>
                </div>
                <div className="planner-stat">
                  <div className="planner-stat-icon">{'\ud83d\udcb0'}</div>
                  <div><strong>{convertPrice(aiResult.totalEstimate)}</strong><small>estimated</small></div>
                </div>
                <div className="planner-stat">
                  <div className="planner-stat-icon">{'\ud83c\udf1f'}</div>
                  <div><strong>{aiResult.budget}</strong><small>budget level</small></div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="planner-timeline">
              <h3>{'\ud83d\uddd3\ufe0f'} Day-by-Day Itinerary {editMode && <small>(drag to reorder)</small>}</h3>
              {itineraryDays.map((day, dayIdx) => (
                <div key={dayIdx} className="planner-day">
                  <div className="planner-day-marker">
                    <span className="planner-day-num">{day.day}</span>
                    <div className="planner-day-line" />
                  </div>
                  <div className="planner-day-content">
                    <h4>{day.title}</h4>
                    <div className="planner-activities">
                      {day.activities.map((activity, actIdx) => (
                        <div
                          key={actIdx}
                          className={`planner-activity${editMode ? ' editable' : ''}${dragState.dayIdx === dayIdx && dragState.actIdx === actIdx ? ' dragging' : ''}`}
                          draggable={editMode}
                          onDragStart={() => handleDragStart(dayIdx, actIdx)}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => { e.currentTarget.classList.remove('drag-over'); handleDrop(dayIdx, actIdx) }}
                        >
                          {editMode && <span className="planner-drag-handle">{'\u2630'}</span>}
                          <span className="planner-activity-text">{activity}</span>
                          {editMode && <button className="planner-activity-remove" onClick={() => removeActivity(dayIdx, actIdx)}>&times;</button>}
                        </div>
                      ))}
                      {editMode && (
                        <button className="planner-add-activity" onClick={() => addActivity(dayIdx)}>+ Add Activity</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Packing Assistant */}
            <div className="planner-packing-section">
              <button className="planner-packing-toggle" onClick={() => setShowPacking(!showPacking)}>
                <span>{'\ud83e\uddf3'} Packing Assistant</span>
                <span className={`planner-packing-arrow${showPacking ? ' open' : ''}`}>{'\u276f'}</span>
              </button>
              {showPacking && (
                <div className="planner-packing-content">
                  <p>Suggested items based on your destination and trip duration:</p>
                  <div className="planner-packing-grid">
                    {Object.entries(PACKING_LISTS).map(([cat, items]) => (
                      <div key={cat} className="planner-packing-category">
                        <h4>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
                        {items.map(item => (
                          <label key={item} className={`planner-packing-item${packingChecked[item] ? ' checked' : ''}`}>
                            <input type="checkbox" checked={packingChecked[item] || false} onChange={() => togglePack(item)} />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Emergency & Safety */}
            <div className="planner-emergency">
              <h3>{'\ud83c\udd98'} Emergency & Safety Info</h3>
              <div className="planner-emergency-grid">
                <div className="planner-emergency-card">
                  <div className="planner-emergency-icon">{'\ud83c\udfe5'}</div>
                  <div>
                    <h4>Nearest Hospitals</h4>
                    <p>International SOS Clinic, {aiResult.destination} General Hospital</p>
                  </div>
                </div>
                <div className="planner-emergency-card">
                  <div className="planner-emergency-icon">{'\ud83d\udcde'}</div>
                  <div>
                    <h4>Emergency Contacts</h4>
                    <p>Police: 911 | Ambulance: 112 | Embassy Hotline</p>
                  </div>
                </div>
                <div className="planner-emergency-card">
                  <div className="planner-emergency-icon">{'\ud83d\udee1\ufe0f'}</div>
                  <div>
                    <h4>Safety Tips</h4>
                    <p>Keep copies of documents, register with embassy, get travel insurance</p>
                  </div>
                </div>
                <div className="planner-emergency-card">
                  <div className="planner-emergency-icon">{'\ud83d\udcb3'}</div>
                  <div>
                    <h4>Travel Insurance</h4>
                    <p>Recommended: comprehensive coverage for medical & cancellation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* View City Link */}
            <div className="planner-city-link">
              <Link to={`/city/${aiResult.cityId}`} className="btn btn-primary btn-lg">
                {'\ud83c\udf0d'} Explore {aiResult.destination} Details
              </Link>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!aiResult && !aiLoading && (
          <div className="planner-empty">
            <div className="planner-empty-visual">
              <div className="planner-empty-globe">{'\ud83c\udf0d'}</div>
              <div className="planner-empty-ring" />
            </div>
            <h2>Your Adventure Awaits</h2>
            <p>Describe your dream vacation above and our AI will generate a complete day-by-day itinerary with hotel suggestions, cost estimates, and packing lists.</p>
            <div className="planner-features-grid">
              <div className="planner-feature">
                <div className="planner-feature-icon-wrap" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>{'\ud83e\udde0'}</div>
                <h4>AI-Powered Planning</h4>
                <p>Smart itinerary generation tailored to your preferences and budget</p>
              </div>
              <div className="planner-feature">
                <div className="planner-feature-icon-wrap" style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' }}>{'\ud83d\udd04'}</div>
                <h4>Drag & Drop Editor</h4>
                <p>Customize your schedule with intuitive drag and drop controls</p>
              </div>
              <div className="planner-feature">
                <div className="planner-feature-icon-wrap" style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>{'\ud83d\udcc4'}</div>
                <h4>PDF Export</h4>
                <p>Download your itinerary and access it offline anywhere</p>
              </div>
              <div className="planner-feature">
                <div className="planner-feature-icon-wrap" style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)' }}>{'\ud83e\uddf3'}</div>
                <h4>Packing Assistant</h4>
                <p>Never forget essentials with smart packing checklists</p>
              </div>
            </div>

            <div className="planner-stats-bar">
              <div className="planner-stats-item">
                <strong>10K+</strong>
                <span>Trips Planned</span>
              </div>
              <div className="planner-stats-divider" />
              <div className="planner-stats-item">
                <strong>50+</strong>
                <span>Destinations</span>
              </div>
              <div className="planner-stats-divider" />
              <div className="planner-stats-item">
                <strong>4.9</strong>
                <span>User Rating</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Toast */}
      {savedToast && (
        <div className="booking-toast">
          {'\u2705'} Itinerary saved! <Link to="/dashboard">View in Dashboard</Link>
        </div>
      )}
    </div>
  )
}
