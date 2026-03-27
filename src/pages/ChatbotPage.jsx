import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'bot',
  text: "Hello! I'm your AI travel concierge. Ask me anything about destinations, flights, hotels, or travel tips!",
  suggestions: ['What to do in Tokyo?', 'Budget tips for Europe', 'Top beaches in Maldives'],
  timestamp: new Date(),
}

const SIDEBAR_CHIPS = [
  'What to do in Tokyo?',
  'Cheap flights to Bali',
  'Best time to visit Paris',
  'Budget tips for Europe',
  'Top beaches in Maldives',
  'Food guide: Bangkok',
]

function getBotResponse(message) {
  const lower = message.toLowerCase()

  if (lower.includes('tokyo') || lower.includes('japan')) {
    return {
      text: "Tokyo is a spectacular blend of ultra-modern and traditional! Here are my top recommendations:\n\n- **Shibuya Crossing** — experience the world's busiest intersection at night\n- **Senso-ji Temple** in Asakusa — Tokyo's oldest temple with stunning architecture\n- **Tsukiji Outer Market** — fresh sushi and street food paradise\n- **Shinjuku Gyoen** — a serene garden escape in the heart of the city\n- **Akihabara** — electric town for anime, tech, and pop culture\n\nBest time to visit is late March–April for cherry blossoms, or November for autumn foliage. Budget around $100–150/day for a comfortable mid-range experience.",
      suggestions: ['Best food in Tokyo?', 'Day trips from Tokyo', 'Hotels in Shibuya'],
    }
  }

  if (lower.includes('paris') || lower.includes('france')) {
    return {
      text: "Paris, the City of Light, never disappoints! Here's your essential guide:\n\n- **Eiffel Tower** — book skip-the-line tickets in advance for sunset views\n- **Louvre Museum** — allocate at least 3-4 hours; visit on Wednesday/Friday evenings\n- **Montmartre & Sacré-Cœur** — charming streets and panoramic city views\n- **Seine River Cruise** — magical at twilight\n- **Le Marais** — best neighborhood for boutiques, cafes, and galleries\n\nBest months: April–June and September–October. Avoid August when many locals leave and some shops close. A Paris Museum Pass saves both money and queue time!",
      suggestions: ['Cheap eats in Paris', 'Best time to visit France', 'Paris hotel deals'],
    }
  }

  if (lower.includes('budget') || lower.includes('cheap') || lower.includes('afford') || lower.includes('save')) {
    return {
      text: "Smart traveler! Here are my best budget travel strategies:\n\n- **Flights**: Book 6-8 weeks ahead for domestic, 2-3 months for international. Use flexible date searches and fly mid-week (Tuesdays & Wednesdays are cheapest)\n- **Accommodation**: Consider hostels, guesthouses, or Airbnb in local neighborhoods. Shoulder season rates can be 40-60% cheaper\n- **Food**: Eat where locals eat! Street food and market halls offer authentic cuisine at fraction of restaurant prices\n- **Transport**: City passes, overnight buses/trains save both money and a night's stay\n- **Free Activities**: Walking tours, public parks, museums with free entry days, and local festivals\n\nSoutheast Asia, Eastern Europe, and Central America offer the best value for budget travelers right now.",
      suggestions: ['Cheapest countries to visit', 'Budget hotels in Bali', 'Free things in Europe'],
    }
  }

  if (lower.includes('beach') || lower.includes('maldives') || lower.includes('bali') || lower.includes('island')) {
    return {
      text: "Nothing beats the sound of waves and warm sand! Here are my top beach destinations:\n\n- **Maldives** — overwater villas, crystal-clear lagoons, world-class diving. Luxury from $300/night, but budget guesthouses on local islands start at $50/night\n- **Bali, Indonesia** — surf in Uluwatu, relax in Seminyak, explore rice terraces in Ubud. Great value at $40-80/day\n- **Zanzibar, Tanzania** — pristine white sand, spice tours, and Stone Town heritage\n- **Phi Phi Islands, Thailand** — dramatic limestone cliffs and turquoise waters\n- **Seychelles** — untouched granite boulder beaches, giant tortoises\n\nPro tip: Visit during shoulder season for fewer crowds and better rates. Always check monsoon schedules!",
      suggestions: ['Best time for Maldives', 'Bali itinerary 7 days', 'Affordable beach resorts'],
    }
  }

  if (lower.includes('food') || lower.includes('restaurant') || lower.includes('eat') || lower.includes('cuisine')) {
    return {
      text: "A true trip is tasted, not just seen! Here are the world's best food destinations:\n\n- **Bangkok, Thailand** — Pad Thai on Khao San Road, Tom Yum at street stalls, and Michelin-starred Jay Fai. Budget: $2-5 per street meal\n- **Tokyo, Japan** — Ramen alleys, conveyor-belt sushi, and izakayas. Don't miss Tsukiji Market\n- **Mexico City** — Tacos al pastor, mole, and the world's best churros\n- **Bologna, Italy** — Fresh tortellini, ragù, and aged Parmigiano. The true heart of Italian cuisine\n- **Istanbul, Turkey** — Kebabs, baklava, and Turkish breakfast spreads\n\nPro tip: Take a local cooking class — it's the best souvenir you'll bring home!",
      suggestions: ['Street food in Bangkok', 'Best restaurants in Tokyo', 'Food tours in Italy'],
    }
  }

  if (lower.includes('hotel') || lower.includes('stay') || lower.includes('accommodation') || lower.includes('resort')) {
    return {
      text: "Finding the perfect stay makes all the difference! Here are my hotel booking tips:\n\n- **Book Direct**: Hotels often price-match and throw in perks like free breakfast or room upgrades when you book on their website\n- **Timing**: Book 3-4 weeks ahead for best rates. Sunday evenings often see price drops\n- **Location**: Staying slightly outside the main tourist area can save 30-50% while being just a short walk or metro ride away\n- **Loyalty Programs**: Even free tier memberships unlock late checkout, Wi-Fi, and points\n- **Read Recent Reviews**: Sort by newest to get the most accurate picture\n\nFor luxury on a budget, look at 4-star boutique hotels — they often outshine big-chain 5-stars in service and character.",
      suggestions: ['Luxury hotels in Paris', 'Budget stays in Bali', 'Best resort in Maldives'],
    }
  }

  if (lower.includes('flight') || lower.includes('fly') || lower.includes('airline') || lower.includes('airport')) {
    return {
      text: "Let me help you find the best flights! Here are my top tips:\n\n- **Price Tracking**: Set alerts on Google Flights or Skyscanner — prices fluctuate daily\n- **Flexible Dates**: Shifting your trip by even 1-2 days can save hundreds\n- **Nearby Airports**: Check alternative airports within driving distance\n- **Connections vs Direct**: One-stop flights can be 40-60% cheaper. A 2-hour layover is a small price for big savings\n- **Error Fares**: Follow deal trackers like Secret Flying and The Points Guy for mistake fares\n\nBest days to fly: Tuesday, Wednesday, and Saturday. Best time to book: 6-8 weeks before domestic, 2-3 months before international trips.",
      suggestions: ['Cheap flights to Europe', 'Best airlines ranked', 'Flight deal alerts'],
    }
  }

  return {
    text: "Great question! Here are some general travel tips to make your next trip unforgettable:\n\n- **Plan but stay flexible** — have a loose itinerary but leave room for spontaneous discoveries\n- **Travel insurance** — always worth it. A single medical emergency abroad can cost thousands\n- **Pack light** — one carry-on changes everything. You'll move faster, skip baggage fees, and never lose luggage\n- **Connect with locals** — use apps like Meetup or Couchsurfing hangouts to find authentic experiences\n- **Document wisely** — keep digital copies of your passport, tickets, and insurance\n\nWhere are you dreaming of going? I can give you specific destination advice, flight tips, hotel recommendations, or budget planning help!",
    suggestions: ['Plan a trip to Japan', 'Beach vacation ideas', 'Budget travel tips'],
  }
}

let msgIdCounter = 1

export default function ChatbotPage() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const sendMessage = (text) => {
    if (!text.trim() || isTyping) return

    const userMsg = {
      id: `user-${msgIdCounter++}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getBotResponse(text)
      const botMsg = {
        id: `bot-${msgIdCounter++}`,
        role: 'bot',
        text: response.text,
        suggestions: response.suggestions,
        timestamp: new Date(),
      }
      setIsTyping(false)
      setMessages((prev) => [...prev, botMsg])
    }, 1500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleChipClick = (chip) => {
    sendMessage(chip)
  }

  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      let formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      if (line.startsWith('- ')) {
        formatted = formatted.substring(2)
        return <li key={i} className="chat-msg-li" dangerouslySetInnerHTML={{ __html: formatted }} />
      }
      if (formatted.trim() === '') return <br key={i} />
      return <p key={i} className="chat-msg-p" dangerouslySetInnerHTML={{ __html: formatted }} />
    })
  }

  return (
    <>
      <div className="chat-page">
        {/* Sidebar */}
        <aside className="chat-sidebar">
          <div className="chat-sidebar-header">
            <div className="chat-sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h2 className="chat-sidebar-title">Travel Assistant</h2>
          </div>

          <div className="chat-sidebar-section">
            <span className="chat-sidebar-label">Quick Questions</span>
            <div className="chat-sidebar-chips">
              {SIDEBAR_CHIPS.map((chip) => (
                <button
                  key={chip}
                  className="chat-sidebar-chip"
                  onClick={() => handleChipClick(chip)}
                  disabled={isTyping}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="chat-sidebar-section">
            <span className="chat-sidebar-label">Explore</span>
            <Link to="/search" className="chat-sidebar-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search Destinations
            </Link>
            <Link to="/itinerary-planner" className="chat-sidebar-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Plan Itinerary
            </Link>
            <Link to="/dashboard" className="chat-sidebar-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Dashboard
            </Link>
          </div>

          <div className="chat-sidebar-footer">
            <p className="chat-sidebar-note">Responses are simulated for demo purposes.</p>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="chat-main">
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-bubble-row ${msg.role === 'user' ? 'chat-bubble-row--user' : 'chat-bubble-row--bot'}`}>
                {msg.role === 'bot' && (
                  <div className="chat-avatar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                )}
                <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble--user' : 'chat-bubble--bot'}`}>
                  <div className="chat-bubble-content">
                    {formatText(msg.text)}
                  </div>
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="chat-follow-ups">
                      {msg.suggestions.map((s) => (
                        <button
                          key={s}
                          className="chat-follow-chip"
                          onClick={() => handleChipClick(s)}
                          disabled={isTyping}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                  <span className="chat-timestamp">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-row chat-bubble-row--bot">
                <div className="chat-avatar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div className="chat-bubble chat-bubble--bot chat-typing-bubble">
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form className="chat-input-bar" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Ask me about any destination, hotel, flight, or travel tip..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </main>
      </div>

      <style>{`
        .chat-page {
          display: flex;
          height: calc(100vh - 72px);
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          color: #e0e0e0;
          overflow: hidden;
        }

        /* ── Sidebar ── */
        .chat-sidebar {
          width: 280px;
          min-width: 280px;
          background: #111116;
          border-right: 1px solid #1e1e24;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .chat-sidebar-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 24px 20px 16px;
          border-bottom: 1px solid #1e1e24;
        }
        .chat-sidebar-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(201,169,110,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .chat-sidebar-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0;
        }
        .chat-sidebar-section {
          padding: 20px;
          border-bottom: 1px solid #1e1e24;
        }
        .chat-sidebar-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #a0a0a0;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .chat-sidebar-chips {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .chat-sidebar-chip {
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.15);
          color: #c9a96e;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          text-align: left;
          transition: all 0.25s ease;
        }
        .chat-sidebar-chip:hover:not(:disabled) {
          background: rgba(201,169,110,0.18);
          border-color: rgba(201,169,110,0.35);
          transform: translateX(4px);
        }
        .chat-sidebar-chip:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .chat-sidebar-link {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #a0a0a0;
          text-decoration: none;
          font-size: 0.85rem;
          padding: 10px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .chat-sidebar-link:hover {
          background: rgba(201,169,110,0.08);
          color: #c9a96e;
        }
        .chat-sidebar-footer {
          margin-top: auto;
          padding: 16px 20px;
        }
        .chat-sidebar-note {
          font-size: 0.72rem;
          color: #555;
          margin: 0;
          line-height: 1.4;
        }

        /* ── Main Chat ── */
        .chat-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 32px 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          scroll-behavior: smooth;
        }
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: #2a2a32;
          border-radius: 3px;
        }

        /* ── Bubbles ── */
        .chat-bubble-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          max-width: 720px;
          animation: chat-fadeIn 0.35s ease;
        }
        .chat-bubble-row--user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .chat-bubble-row--bot {
          align-self: flex-start;
        }
        .chat-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #1a1a22;
          border: 1px solid rgba(201,169,110,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .chat-bubble {
          border-radius: 16px;
          padding: 14px 18px;
          position: relative;
          line-height: 1.6;
          font-size: 0.9rem;
        }
        .chat-bubble--bot {
          background: #1a1a22;
          border-left: 3px solid #c9a96e;
          border-top-left-radius: 4px;
        }
        .chat-bubble--user {
          background: rgba(201,169,110,0.15);
          border: 1px solid rgba(201,169,110,0.2);
        }
        .chat-bubble-content ul {
          margin: 0;
          padding-left: 0;
          list-style: none;
        }
        .chat-msg-p {
          margin: 0 0 6px;
        }
        .chat-msg-p:last-child {
          margin-bottom: 0;
        }
        .chat-msg-li {
          position: relative;
          padding-left: 16px;
          margin-bottom: 6px;
        }
        .chat-msg-li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c9a96e;
        }
        .chat-msg-li:last-child {
          margin-bottom: 0;
        }
        .chat-bubble--bot strong {
          color: #d4af37;
          font-weight: 600;
        }
        .chat-timestamp {
          display: block;
          font-size: 0.68rem;
          color: #555;
          margin-top: 8px;
          text-align: right;
        }

        /* ── Follow-up Chips ── */
        .chat-follow-ups {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(201,169,110,0.1);
        }
        .chat-follow-chip {
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.2);
          color: #c9a96e;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .chat-follow-chip:hover:not(:disabled) {
          background: rgba(201,169,110,0.22);
          border-color: #c9a96e;
        }
        .chat-follow-chip:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ── Typing Indicator ── */
        .chat-typing-bubble {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 16px 22px;
        }
        .chat-typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #c9a96e;
          animation: chat-bounce 1.4s ease-in-out infinite;
        }
        .chat-typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .chat-typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        /* ── Input Bar ── */
        .chat-input-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 40px;
          background: rgba(17,17,22,0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid #1e1e24;
        }
        .chat-input {
          flex: 1;
          background: #1a1a22;
          border: 1px solid #1e1e24;
          border-radius: 14px;
          padding: 14px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #e0e0e0;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .chat-input::placeholder {
          color: #555;
        }
        .chat-input:focus {
          border-color: rgba(201,169,110,0.4);
          box-shadow: 0 0 0 3px rgba(201,169,110,0.08);
        }
        .chat-input:disabled {
          opacity: 0.6;
        }
        .chat-send-btn {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #c9a96e 0%, #d4af37 100%);
          border: none;
          color: #0a0a0a;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }
        .chat-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(201,169,110,0.3);
        }
        .chat-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ── Animations ── */
        @keyframes chat-fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes chat-bounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .chat-sidebar {
            display: none;
          }
          .chat-messages {
            padding: 20px 16px;
          }
          .chat-input-bar {
            padding: 16px;
          }
          .chat-bubble-row {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  )
}
