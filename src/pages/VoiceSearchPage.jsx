import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VoiceSearchPage = () => {
  const [state, setState] = useState('idle'); // idle | listening | results
  const [transcription, setTranscription] = useState('');
  const fullTranscription = 'Find cheap trips to Goa next weekend';

  useEffect(() => {
    if (state === 'listening') {
      let charIndex = 0;
      setTranscription('');
      const typeInterval = setInterval(() => {
        if (charIndex < fullTranscription.length) {
          setTranscription(fullTranscription.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 80);

      const timeout = setTimeout(() => {
        setState('results');
      }, 3000);

      return () => {
        clearInterval(typeInterval);
        clearTimeout(timeout);
      };
    }
  }, [state]);

  const handleMicClick = () => {
    if (state === 'idle' || state === 'results') {
      setState('listening');
    }
  };

  const handleReset = () => {
    setState('idle');
    setTranscription('');
  };

  const mockResults = [
    { id: 1, title: 'Beaches of North Goa', desc: 'Calangute, Baga & Anjuna — budget-friendly stays from $18/night', rating: 4.7, price: '$120' },
    { id: 2, title: 'Budget Hotels in Goa', desc: 'Top-rated hostels and guesthouses for weekend getaways', rating: 4.5, price: '$45' },
    { id: 3, title: 'Goa Weekend Package', desc: '2N/3D all-inclusive with flights, transfers & breakfast', rating: 4.8, price: '$299' },
    { id: 4, title: 'South Goa Hidden Gems', desc: 'Palolem, Agonda & Cola beach — peaceful & affordable', rating: 4.6, price: '$95' },
  ];

  const recentSearches = [
    { text: 'Beach resorts in Maldives under $200', time: '2 hours ago' },
    { text: 'Best time to visit Switzerland', time: '5 hours ago' },
    { text: 'Family-friendly hotels in Bali', time: 'Yesterday' },
    { text: 'Weekend trips near Mumbai', time: '2 days ago' },
    { text: 'Cheap flights to Thailand in April', time: '3 days ago' },
  ];

  return (
    <>
      <style>{`
        .voice-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #e0e0e0;
          font-family: 'DM Sans', sans-serif;
          padding: 0 0 80px 0;
        }
        .voice-hero {
          text-align: center;
          padding: 60px 20px 40px;
        }
        .voice-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 3rem;
          color: #f5f5f5;
          margin: 0 0 12px 0;
        }
        .voice-hero-title span {
          color: #c9a96e;
        }
        .voice-hero-sub {
          color: #a0a0a0;
          font-size: 1.15rem;
          margin: 0;
        }
        .voice-mic-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
        }
        .voice-mic-btn {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #111116;
          border: 3px solid #c9a96e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
          z-index: 2;
        }
        .voice-mic-btn:hover {
          background: #1a1a22;
          border-color: #d4af37;
          transform: scale(1.05);
        }
        .voice-mic-btn svg {
          width: 40px;
          height: 40px;
          fill: #c9a96e;
          transition: fill 0.3s;
        }
        .voice-mic-btn.voice-active {
          border-color: #d4af37;
          background: rgba(201,169,110,0.15);
        }
        .voice-mic-btn.voice-active svg {
          fill: #d4af37;
        }
        .voice-mic-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 200px;
        }
        .voice-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(201,169,110,0.4);
          animation: voice-ring-expand 1.5s ease-out infinite;
        }
        .voice-ring:nth-child(1) { animation-delay: 0s; }
        .voice-ring:nth-child(2) { animation-delay: 0.5s; }
        .voice-ring:nth-child(3) { animation-delay: 1s; }
        @keyframes voice-ring-expand {
          0% { width: 120px; height: 120px; opacity: 1; }
          100% { width: 220px; height: 220px; opacity: 0; }
        }
        @keyframes voice-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .voice-mic-btn.voice-active {
          animation: voice-pulse 1s ease-in-out infinite;
        }
        .voice-label {
          margin-top: 20px;
          color: #a0a0a0;
          font-size: 1rem;
        }
        .voice-label.voice-listening-text {
          color: #d4af37;
          font-weight: 600;
        }
        .voice-transcription {
          margin-top: 24px;
          padding: 16px 24px;
          background: #111116;
          border-radius: 12px;
          border: 1px solid rgba(201,169,110,0.2);
          max-width: 500px;
          min-height: 24px;
          font-size: 1.1rem;
          color: #e0e0e0;
          text-align: center;
        }
        .voice-transcription .voice-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: #d4af37;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: voice-blink 0.7s step-end infinite;
        }
        @keyframes voice-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .voice-results-section {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .voice-results-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .voice-results-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          color: #f5f5f5;
          margin: 0;
        }
        .voice-reset-btn {
          background: transparent;
          border: 1px solid #c9a96e;
          color: #c9a96e;
          padding: 8px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          transition: all 0.3s;
        }
        .voice-reset-btn:hover {
          background: rgba(201,169,110,0.15);
        }
        .voice-results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 50px;
        }
        .voice-result-card {
          background: #111116;
          border-radius: 14px;
          padding: 24px;
          border: 1px solid rgba(201,169,110,0.1);
          transition: all 0.3s;
          animation: voice-fadeUp 0.5s ease forwards;
          opacity: 0;
        }
        .voice-result-card:nth-child(1) { animation-delay: 0.1s; }
        .voice-result-card:nth-child(2) { animation-delay: 0.2s; }
        .voice-result-card:nth-child(3) { animation-delay: 0.3s; }
        .voice-result-card:nth-child(4) { animation-delay: 0.4s; }
        @keyframes voice-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .voice-result-card:hover {
          border-color: rgba(201,169,110,0.3);
          transform: translateY(-4px);
          background: #1a1a22;
        }
        .voice-result-card h3 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          color: #f5f5f5;
          font-size: 1.25rem;
          margin: 0 0 8px 0;
        }
        .voice-result-card p {
          color: #a0a0a0;
          font-size: 0.9rem;
          margin: 0 0 16px 0;
          line-height: 1.5;
        }
        .voice-result-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .voice-result-rating {
          color: #d4af37;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .voice-result-price {
          color: #c9a96e;
          font-size: 1.15rem;
          font-weight: 700;
        }
        .voice-recent-section {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .voice-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem;
          color: #f5f5f5;
          margin: 0 0 20px 0;
        }
        .voice-recent-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .voice-recent-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #111116;
          border-radius: 10px;
          padding: 14px 20px;
          border: 1px solid rgba(201,169,110,0.07);
          transition: all 0.3s;
          cursor: pointer;
        }
        .voice-recent-item:hover {
          background: #1a1a22;
          border-color: rgba(201,169,110,0.2);
        }
        .voice-recent-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .voice-recent-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(201,169,110,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .voice-recent-icon svg {
          width: 16px;
          height: 16px;
          fill: #c9a96e;
        }
        .voice-recent-text {
          color: #e0e0e0;
          font-size: 0.95rem;
        }
        .voice-recent-time {
          color: #666;
          font-size: 0.8rem;
          flex-shrink: 0;
        }
      `}</style>

      <div className="voice-page">
        <div className="voice-hero">
          <h1 className="voice-hero-title">
            Voice-Powered <span>Search</span>
          </h1>
          <p className="voice-hero-sub">Just speak, we'll find your perfect trip</p>
        </div>

        <div className="voice-mic-area">
          <div className="voice-mic-wrapper">
            {state === 'listening' && (
              <>
                <div className="voice-ring" />
                <div className="voice-ring" />
                <div className="voice-ring" />
              </>
            )}
            <button
              className={`voice-mic-btn ${state === 'listening' ? 'voice-active' : ''}`}
              onClick={handleMicClick}
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </button>
          </div>

          {state === 'idle' && (
            <p className="voice-label">Tap the microphone to speak</p>
          )}
          {state === 'listening' && (
            <p className="voice-label voice-listening-text">Listening...</p>
          )}
          {state === 'results' && (
            <p className="voice-label">Search complete</p>
          )}

          {(state === 'listening' || state === 'results') && (
            <div className="voice-transcription">
              {transcription}
              {state === 'listening' && <span className="voice-cursor" />}
            </div>
          )}
        </div>

        {state === 'results' && (
          <div className="voice-results-section">
            <div className="voice-results-header">
              <h2 className="voice-results-title">Search Results</h2>
              <button className="voice-reset-btn" onClick={handleReset}>
                New Search
              </button>
            </div>
            <div className="voice-results-grid">
              {mockResults.map((r) => (
                <div key={r.id} className="voice-result-card">
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <div className="voice-result-meta">
                    <span className="voice-result-rating">★ {r.rating}</span>
                    <span className="voice-result-price">{r.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="voice-recent-section">
          <h2 className="voice-section-title">Recent Voice Searches</h2>
          <div className="voice-recent-list">
            {recentSearches.map((item, i) => (
              <div key={i} className="voice-recent-item">
                <div className="voice-recent-item-left">
                  <div className="voice-recent-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </svg>
                  </div>
                  <span className="voice-recent-text">{item.text}</span>
                </div>
                <span className="voice-recent-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VoiceSearchPage;
