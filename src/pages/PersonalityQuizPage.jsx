import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { CITY_LIST } from '../data/travelData'

const QUESTIONS = [
  {
    id: 1,
    question: "What's your ideal vacation budget?",
    options: [
      { label: 'Budget', icon: '💰', value: 'budget' },
      { label: 'Moderate', icon: '💵', value: 'moderate' },
      { label: 'Luxury', icon: '💎', value: 'luxury' },
      { label: 'No Limit', icon: '🏦', value: 'nolimit' },
    ],
  },
  {
    id: 2,
    question: 'Pick your dream climate',
    options: [
      { label: 'Tropical', icon: '🌴', value: 'tropical' },
      { label: 'Mediterranean', icon: '🌊', value: 'mediterranean' },
      { label: 'Cold & Snowy', icon: '❄️', value: 'cold' },
      { label: 'Desert', icon: '🏜️', value: 'desert' },
    ],
  },
  {
    id: 3,
    question: 'What excites you most?',
    options: [
      { label: 'Ancient ruins', icon: '🏛️', value: 'ruins' },
      { label: 'Local food', icon: '🍜', value: 'food' },
      { label: 'Nature hikes', icon: '🥾', value: 'nature' },
      { label: 'Nightlife', icon: '🎶', value: 'nightlife' },
    ],
  },
  {
    id: 4,
    question: 'Your travel style?',
    options: [
      { label: 'Solo wanderer', icon: '🚶', value: 'solo' },
      { label: 'Couple getaway', icon: '💑', value: 'couple' },
      { label: 'Family fun', icon: '👨‍👩‍👧‍👦', value: 'family' },
      { label: 'Group adventure', icon: '🎉', value: 'group' },
    ],
  },
  {
    id: 5,
    question: 'How do you recharge?',
    options: [
      { label: 'Beach & ocean', icon: '🏖️', value: 'beach' },
      { label: 'Mountain views', icon: '🏔️', value: 'mountain' },
      { label: 'City buzz', icon: '🏙️', value: 'city' },
      { label: 'Spa & wellness', icon: '🧖', value: 'spa' },
    ],
  },
  {
    id: 6,
    question: 'Your must-have?',
    options: [
      { label: 'Great WiFi', icon: '📶', value: 'wifi' },
      { label: 'Amazing food', icon: '🍽️', value: 'amazingfood' },
      { label: 'Beautiful nature', icon: '🌿', value: 'beautifulnature' },
      { label: 'Cultural experiences', icon: '🎭', value: 'cultural' },
    ],
  },
  {
    id: 7,
    question: 'Preferred trip length?',
    options: [
      { label: 'Weekend escape', icon: '⚡', value: 'weekend' },
      { label: '1 week', icon: '📅', value: 'oneweek' },
      { label: '2 weeks', icon: '🗓️', value: 'twoweeks' },
      { label: 'Month+', icon: '🌍', value: 'month' },
    ],
  },
  {
    id: 8,
    question: 'Pick an activity',
    options: [
      { label: 'Scuba diving', icon: '🤿', value: 'scuba' },
      { label: 'Museum hopping', icon: '🏛️', value: 'museum' },
      { label: 'Street food tour', icon: '🥘', value: 'streetfood' },
      { label: 'Yoga retreat', icon: '🧘', value: 'yoga' },
    ],
  },
]

const PERSONALITIES = {
  adventure: {
    title: 'The Adventure Explorer',
    icon: '🧭',
    description:
      'You crave the thrill of the unknown. From scaling mountain peaks to diving into crystal-clear waters, your wanderlust knows no bounds. You feel most alive when pushing boundaries and discovering hidden gems off the beaten path.',
    tags: ['nature', 'scuba', 'mountain', 'beautifulnature'],
    destinationFilter: ['adventure'],
  },
  culture: {
    title: 'The Culture Connoisseur',
    icon: '🎭',
    description:
      'History, art, and tradition light up your soul. You seek out ancient temples, world-class museums, and authentic cultural encounters that broaden your perspective and deepen your understanding of the world.',
    tags: ['ruins', 'museum', 'cultural'],
    destinationFilter: ['culture'],
  },
  luxury: {
    title: 'The Luxury Voyager',
    icon: '✨',
    description:
      'Only the finest will do. You appreciate the art of indulgence — from five-star resorts to private beach villas. Every trip is a curated experience of elegance, comfort, and world-class service.',
    tags: ['luxury', 'nolimit', 'spa', 'couple'],
    destinationFilter: ['luxury', 'relax'],
  },
  urban: {
    title: 'The Urban Nomad',
    icon: '🌃',
    description:
      'Skylines, street art, rooftop bars, and the electric energy of a metropolis — that is your element. You thrive in bustling cities, chasing the pulse of urban life and discovering what makes each city unique.',
    tags: ['nightlife', 'city', 'wifi', 'weekend'],
    destinationFilter: ['city'],
  },
  zen: {
    title: 'The Zen Traveler',
    icon: '🧘',
    description:
      'Travel is your sanctuary. You seek places that restore your spirit — serene beaches, peaceful retreats, and mindful experiences. You return from every trip feeling renewed, grounded, and inspired.',
    tags: ['yoga', 'beach', 'spa', 'beautifulnature'],
    destinationFilter: ['relax', 'wellness'],
  },
}

function computeResult(answers) {
  const scores = { adventure: 0, culture: 0, luxury: 0, urban: 0, zen: 0 }

  answers.forEach((answer) => {
    Object.entries(PERSONALITIES).forEach(([key, p]) => {
      if (p.tags.includes(answer)) {
        scores[key] += 1
      }
    })
  })

  // Budget question bonuses
  if (answers[0] === 'luxury' || answers[0] === 'nolimit') scores.luxury += 2
  if (answers[0] === 'budget') scores.adventure += 1

  // Climate bonuses
  if (answers[1] === 'tropical') { scores.zen += 1; scores.adventure += 1 }
  if (answers[1] === 'cold') scores.adventure += 1
  if (answers[1] === 'mediterranean') scores.luxury += 1

  // Recharge bonuses
  if (answers[4] === 'beach') scores.zen += 1
  if (answers[4] === 'city') scores.urban += 1
  if (answers[4] === 'mountain') scores.adventure += 1
  if (answers[4] === 'spa') { scores.zen += 1; scores.luxury += 1 }

  const maxKey = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0]
  return PERSONALITIES[maxKey]
}

function getSuggestedDestinations(personality) {
  const filters = personality.destinationFilter
  const matched = CITY_LIST.filter((city) =>
    city.travelType && city.travelType.some((t) => filters.includes(t))
  )
  const results = matched.length >= 3 ? matched.slice(0, 3) : CITY_LIST.slice(0, 3)
  return results
}

export default function PersonalityQuizPage() {
  const app = useApp()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [transitioning, setTransitioning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleAnswer = (value) => {
    if (transitioning) return
    setSelectedOption(value)
    setTransitioning(true)

    setTimeout(() => {
      const newAnswers = [...answers, value]
      setAnswers(newAnswers)

      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1)
        setSelectedOption(null)
        setTimeout(() => setTransitioning(false), 60)
      } else {
        const personality = computeResult(newAnswers)
        setResult(personality)
        setTimeout(() => {
          setShowResult(true)
          setTransitioning(false)
        }, 300)
      }
    }, 500)
  }

  const handleRetake = () => {
    setCurrentQ(0)
    setAnswers([])
    setResult(null)
    setShowResult(false)
    setSelectedOption(null)
    setTransitioning(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const progress = result ? 100 : ((currentQ) / QUESTIONS.length) * 100
  const question = QUESTIONS[currentQ]
  const suggested = result ? getSuggestedDestinations(result) : []

  return (
    <div className="quiz-page">
      {/* Hero Section */}
      <section className="quiz-hero">
        <div className="quiz-hero-glow" />
        <p className="quiz-hero-eyebrow">Travel Personality Quiz</p>
        <h1 className="quiz-hero-title">
          Discover Your <span className="quiz-gold">Travel Personality</span>
        </h1>
        <div className="quiz-hero-accent" />
        <p className="quiz-hero-sub">
          Answer 8 quick questions and unlock your unique travel identity.
        </p>
      </section>

      {/* Progress Bar */}
      <div className="quiz-progress-wrapper">
        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="quiz-progress-label">
          {result ? 'Complete!' : `${currentQ + 1} / ${QUESTIONS.length}`}
        </span>
      </div>

      {/* Quiz Area */}
      <div className="quiz-content">
        {!result ? (
          <div
            className={`quiz-question-card ${transitioning ? 'quiz-fade-out' : 'quiz-fade-in'}`}
            key={currentQ}
          >
            <span className="quiz-q-number">Question {question.id}</span>
            <h2 className="quiz-q-text">{question.question}</h2>
            <div className="quiz-options-grid">
              {question.options.map((opt) => (
                <button
                  key={opt.value}
                  className={`quiz-option-card ${selectedOption === opt.value ? 'quiz-option-selected' : ''}`}
                  onClick={() => handleAnswer(opt.value)}
                >
                  <span className="quiz-option-icon">{opt.icon}</span>
                  <span className="quiz-option-label">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={`quiz-result-section ${showResult ? 'quiz-result-visible' : ''}`}>
            <div className="quiz-result-card">
              <div className="quiz-result-icon-wrapper">
                <span className="quiz-result-icon">{result.icon}</span>
              </div>
              <h2 className="quiz-result-title">
                {result.title} {result.icon}
              </h2>
              <p className="quiz-result-desc">{result.description}</p>

              <div className="quiz-suggested">
                <h3 className="quiz-suggested-heading">Suggested Destinations</h3>
                <div className="quiz-suggested-grid">
                  {suggested.map((city) => (
                    <Link
                      to={`/city/${city.id}`}
                      key={city.id}
                      className="quiz-dest-card"
                    >
                      <img
                        src={city.heroImage || city.images?.[0]}
                        alt={city.name}
                        className="quiz-dest-img"
                      />
                      <div className="quiz-dest-info">
                        <span className="quiz-dest-name">{city.name}</span>
                        <span className="quiz-dest-country">{city.country}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <button className="quiz-retake-btn" onClick={handleRetake}>
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* ===== PAGE ===== */
        .quiz-page {
          min-height: 100vh;
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          color: #e0e0e0;
          padding-bottom: 80px;
        }

        /* ===== HERO ===== */
        .quiz-hero {
          position: relative;
          text-align: center;
          padding: 80px 24px 40px;
          overflow: hidden;
        }
        .quiz-hero-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(201,169,110,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .quiz-hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #c9a96e;
          margin-bottom: 16px;
        }
        .quiz-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.4rem);
          font-weight: 700;
          color: #f5f5f5;
          line-height: 1.15;
          margin: 0 0 20px;
        }
        .quiz-gold {
          color: #c9a96e;
        }
        .quiz-hero-accent {
          width: 64px;
          height: 3px;
          background: linear-gradient(90deg, #c9a96e, #d4af37);
          border-radius: 9999px;
          margin: 0 auto 20px;
        }
        .quiz-hero-sub {
          font-size: 16px;
          color: #a0a0a0;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ===== PROGRESS ===== */
        .quiz-progress-wrapper {
          max-width: 600px;
          margin: 0 auto 40px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .quiz-progress-bar {
          flex: 1;
          height: 8px;
          background: #1a1a22;
          border-radius: 9999px;
          overflow: hidden;
          border: 1px solid #1e1e24;
        }
        .quiz-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #c9a96e, #d4af37);
          border-radius: 9999px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .quiz-progress-label {
          font-size: 13px;
          font-weight: 600;
          color: #c9a96e;
          white-space: nowrap;
          min-width: 50px;
          text-align: right;
        }

        /* ===== QUESTION CARD ===== */
        .quiz-content {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .quiz-question-card {
          background: #111116;
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 12px;
          padding: 48px 36px;
          text-align: center;
        }
        .quiz-q-number {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #c9a96e;
          background: rgba(201,169,110,0.15);
          padding: 6px 16px;
          border-radius: 9999px;
          margin-bottom: 24px;
        }
        .quiz-q-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 36px;
          line-height: 1.3;
        }

        /* ===== OPTIONS GRID ===== */
        .quiz-options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 520px) {
          .quiz-options-grid {
            grid-template-columns: 1fr;
          }
          .quiz-question-card {
            padding: 32px 20px;
          }
        }
        .quiz-option-card {
          background: #1a1a22;
          border: 1.5px solid #1e1e24;
          border-radius: 8px;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'DM Sans', sans-serif;
          color: #e0e0e0;
          position: relative;
          overflow: hidden;
        }
        .quiz-option-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(201,169,110,0.08), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .quiz-option-card:hover {
          border-color: rgba(201,169,110,0.5);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(201,169,110,0.1);
        }
        .quiz-option-card:hover::before {
          opacity: 1;
        }
        .quiz-option-selected {
          border-color: #c9a96e !important;
          background: rgba(201,169,110,0.1);
          box-shadow: 0 0 24px rgba(201,169,110,0.15);
        }
        .quiz-option-icon {
          font-size: 32px;
          line-height: 1;
        }
        .quiz-option-label {
          font-size: 15px;
          font-weight: 600;
          position: relative;
        }

        /* ===== TRANSITIONS ===== */
        .quiz-fade-in {
          animation: quizFadeIn 0.45s ease forwards;
        }
        .quiz-fade-out {
          animation: quizFadeOut 0.35s ease forwards;
        }
        @keyframes quizFadeIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes quizFadeOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(-18px) scale(0.97); }
        }

        /* ===== RESULT SECTION ===== */
        .quiz-result-section {
          opacity: 0;
          transform: translateY(30px) scale(0.96);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .quiz-result-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .quiz-result-card {
          background: #111116;
          border: 1.5px solid rgba(201,169,110,0.25);
          border-radius: 12px;
          padding: 56px 40px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .quiz-result-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #c9a96e, #d4af37, #c9a96e);
        }
        .quiz-result-icon-wrapper {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: rgba(201,169,110,0.15);
          border: 2px solid rgba(201,169,110,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
          animation: quizPulseGlow 2.5s ease-in-out infinite;
        }
        .quiz-result-icon {
          font-size: 44px;
          line-height: 1;
        }
        @keyframes quizPulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(201,169,110,0.15); }
          50% { box-shadow: 0 0 40px rgba(201,169,110,0.3); }
        }
        .quiz-result-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 20px;
        }
        .quiz-result-desc {
          font-size: 15px;
          color: #a0a0a0;
          line-height: 1.7;
          max-width: 540px;
          margin: 0 auto 40px;
        }

        /* ===== SUGGESTED DESTINATIONS ===== */
        .quiz-suggested {
          margin-bottom: 36px;
        }
        .quiz-suggested-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #c9a96e;
          margin: 0 0 20px;
        }
        .quiz-suggested-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 580px) {
          .quiz-suggested-grid {
            grid-template-columns: 1fr;
          }
          .quiz-result-card {
            padding: 40px 20px 36px;
          }
        }
        .quiz-dest-card {
          background: #1a1a22;
          border: 1px solid #1e1e24;
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none;
          transition: all 0.3s ease;
          display: block;
        }
        .quiz-dest-card:hover {
          border-color: rgba(201,169,110,0.4);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.4);
        }
        .quiz-dest-img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          display: block;
        }
        .quiz-dest-info {
          padding: 12px 14px;
          text-align: left;
        }
        .quiz-dest-name {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #f5f5f5;
        }
        .quiz-dest-country {
          display: block;
          font-size: 12px;
          color: #a0a0a0;
          margin-top: 2px;
        }

        /* ===== RETAKE BUTTON ===== */
        .quiz-retake-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 40px;
          background: linear-gradient(135deg, #c9a96e, #d4af37);
          color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }
        .quiz-retake-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,169,110,0.35);
        }
      `}</style>
    </div>
  )
}
