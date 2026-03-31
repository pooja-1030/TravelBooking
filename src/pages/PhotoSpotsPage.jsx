import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const CITIES = ['All', 'Tokyo', 'Paris', 'Bali', 'Santorini', 'New York', 'Dubai', 'Rome', 'Kyoto'];

const TAGS = ['All', 'Sunset', 'Architecture', 'Nature', 'Street', 'Aerial', 'Night'];

const SORT_OPTIONS = ['Most Popular', 'Nearest', 'Recently Added'];

const BEST_TIME_ICONS = {
  'Golden Hour': '',
  'Sunrise': '',
  'Blue Hour': '',
  'Night': '',
  'Midday': '',
  'Any Time': '',
};

const PHOTO_SPOTS = [
  {
    id: 1,
    name: 'Tokyo Tower at Dusk',
    city: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
    tags: ['Sunset', 'Architecture'],
    tip: 'Best at golden hour — arrive 30 min before sunset for perfect light',
    likes: 4823,
    bestTime: 'Golden Hour',
    addedDays: 3,
  },
  {
    id: 2,
    name: 'Shibuya Crossing',
    city: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80',
    tags: ['Street', 'Night'],
    tip: 'Shoot from the Starbucks above for the iconic aerial view',
    likes: 6201,
    bestTime: 'Night',
    addedDays: 7,
  },
  {
    id: 3,
    name: 'Eiffel Tower from Trocadéro',
    city: 'Paris',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=600&q=80',
    tags: ['Architecture', 'Sunset'],
    tip: 'Visit early morning to avoid crowds — sunrise shots are magical',
    likes: 8934,
    bestTime: 'Sunrise',
    addedDays: 1,
  },
  {
    id: 4,
    name: 'Montmartre Streets',
    city: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
    tags: ['Street', 'Architecture'],
    tip: 'Wander the cobblestone streets before 8 AM for empty lanes',
    likes: 3417,
    bestTime: 'Sunrise',
    addedDays: 12,
  },
  {
    id: 5,
    name: 'Tegallalang Rice Terraces',
    city: 'Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
    tags: ['Nature', 'Aerial'],
    tip: 'Overcast days create the most vivid greens — embrace the clouds',
    likes: 7562,
    bestTime: 'Any Time',
    addedDays: 5,
  },
  {
    id: 6,
    name: 'Uluwatu Temple Cliffs',
    city: 'Bali',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80',
    tags: ['Sunset', 'Nature'],
    tip: 'Stay for the Kecak fire dance at sunset — unforgettable backdrop',
    likes: 5190,
    bestTime: 'Golden Hour',
    addedDays: 9,
  },
  {
    id: 7,
    name: 'Oia Blue Domes',
    city: 'Santorini',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80',
    tags: ['Architecture', 'Sunset'],
    tip: 'The classic shot — use a telephoto lens to compress the domes against the sea',
    likes: 9120,
    bestTime: 'Golden Hour',
    addedDays: 2,
  },
  {
    id: 8,
    name: 'Santorini Caldera View',
    city: 'Santorini',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80',
    tags: ['Nature', 'Aerial'],
    tip: 'Blue hour creates a dreamy atmosphere over the caldera',
    likes: 6803,
    bestTime: 'Blue Hour',
    addedDays: 14,
  },
  {
    id: 9,
    name: 'Brooklyn Bridge at Dawn',
    city: 'New York',
    image: 'https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=600&q=80',
    tags: ['Architecture', 'Sunrise'],
    tip: 'Arrive before 5 AM for an empty bridge — worth the early alarm',
    likes: 7245,
    bestTime: 'Sunrise',
    addedDays: 4,
  },
  {
    id: 10,
    name: 'Times Square Neon Nights',
    city: 'New York',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80',
    tags: ['Street', 'Night'],
    tip: 'Rain reflections make this spot 10x more photogenic',
    likes: 5678,
    bestTime: 'Night',
    addedDays: 6,
  },
  {
    id: 11,
    name: 'Burj Khalifa from Dubai Fountain',
    city: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    tags: ['Architecture', 'Night'],
    tip: 'Capture the fountain show at night — use slow shutter for silky water',
    likes: 8412,
    bestTime: 'Night',
    addedDays: 8,
  },
  {
    id: 12,
    name: 'Dubai Desert Dunes',
    city: 'Dubai',
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=600&q=80',
    tags: ['Nature', 'Sunset'],
    tip: 'Golden hour paints the dunes in deep amber — bring a wide lens',
    likes: 4356,
    bestTime: 'Golden Hour',
    addedDays: 15,
  },
  {
    id: 13,
    name: 'Roman Colosseum',
    city: 'Rome',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
    tags: ['Architecture', 'Street'],
    tip: 'Shoot from Via dei Fori Imperiali for the full grandeur',
    likes: 7890,
    bestTime: 'Sunrise',
    addedDays: 10,
  },
  {
    id: 14,
    name: 'Trevi Fountain',
    city: 'Rome',
    image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=600&q=80',
    tags: ['Architecture', 'Night'],
    tip: 'Visit after 11 PM for crowd-free night shots with dramatic lighting',
    likes: 6234,
    bestTime: 'Night',
    addedDays: 11,
  },
  {
    id: 15,
    name: 'Fushimi Inari Shrine Gates',
    city: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80',
    tags: ['Architecture', 'Nature'],
    tip: 'Start hiking at 6 AM — the torii gates are empty and light filters beautifully',
    likes: 9450,
    bestTime: 'Sunrise',
    addedDays: 2,
  },
  {
    id: 16,
    name: 'Arashiyama Bamboo Grove',
    city: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80',
    tags: ['Nature', 'Street'],
    tip: 'Midday sun creates shafts of light through the bamboo canopy',
    likes: 8100,
    bestTime: 'Midday',
    addedDays: 13,
  },
];

export default function PhotoSpotsPage() {
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortOption, setSortOption] = useState('Most Popular');
  const [savedSpots, setSavedSpots] = useState(new Set());

  const filteredSpots = useMemo(() => {
    let spots = [...PHOTO_SPOTS];

    if (selectedCity !== 'All') {
      spots = spots.filter((s) => s.city === selectedCity);
    }
    if (selectedTag !== 'All') {
      spots = spots.filter((s) => s.tags.includes(selectedTag));
    }

    switch (sortOption) {
      case 'Most Popular':
        spots.sort((a, b) => b.likes - a.likes);
        break;
      case 'Nearest':
        spots.sort((a, b) => a.id - b.id);
        break;
      case 'Recently Added':
        spots.sort((a, b) => a.addedDays - b.addedDays);
        break;
      default:
        break;
    }

    return spots;
  }, [selectedCity, selectedTag, sortOption]);

  const toggleSave = (id) => {
    setSavedSpots((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleShare = (spot) => {
    if (navigator.share) {
      navigator.share({ title: spot.name, text: `Check out ${spot.name} in ${spot.city}!` });
    }
  };

  return (
    <>
      <style>{`
        .photo-page {
          min-height: 100vh;
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          color: #e0e0e0;
        }

        .photo-hero {
          text-align: center;
          padding: 72px 24px 40px;
          position: relative;
          overflow: hidden;
        }

        .photo-hero::before {
          content: '';
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .photo-hero-label {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 16px;
          padding: 6px 16px;
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 20px;
          background: rgba(201,169,110,0.06);
        }

        .photo-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 52px;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 16px;
          line-height: 1.15;
        }

        .photo-hero-title span {
          color: #c9a96e;
        }

        .photo-hero-sub {
          font-size: 17px;
          color: #a0a0a0;
          margin: 0;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        /* City pills */
        .photo-city-bar {
          display: flex;
          gap: 10px;
          padding: 0 24px 24px;
          overflow-x: auto;
          justify-content: center;
          flex-wrap: wrap;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .photo-city-bar::-webkit-scrollbar {
          display: none;
        }

        .photo-city-pill {
          padding: 8px 20px;
          border-radius: 24px;
          border: 1px solid #1e1e24;
          background: #111116;
          color: #a0a0a0;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.25s ease;
        }

        .photo-city-pill:hover {
          border-color: rgba(201,169,110,0.25);
          color: #e0e0e0;
        }

        .photo-city-pill--active {
          background: rgba(201,169,110,0.15);
          border-color: #c9a96e;
          color: #c9a96e;
          font-weight: 600;
        }

        /* Controls bar */
        .photo-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px 28px;
          max-width: 1320px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 16px;
        }

        .photo-tag-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .photo-tag-btn {
          padding: 6px 14px;
          border-radius: 16px;
          border: 1px solid #1e1e24;
          background: transparent;
          color: #a0a0a0;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .photo-tag-btn:hover {
          border-color: rgba(201,169,110,0.25);
          color: #e0e0e0;
        }

        .photo-tag-btn--active {
          background: rgba(201,169,110,0.12);
          border-color: rgba(201,169,110,0.4);
          color: #d4af37;
        }

        .photo-sort-select {
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid #1e1e24;
          background: #111116;
          color: #e0e0e0;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }

        .photo-sort-select:focus {
          border-color: rgba(201,169,110,0.4);
        }

        .photo-sort-select option {
          background: #111116;
          color: #e0e0e0;
        }

        /* Masonry grid */
        .photo-grid {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px 80px;
          columns: 3;
          column-gap: 20px;
        }

        @media (max-width: 960px) {
          .photo-grid { columns: 2; }
          .photo-hero-title { font-size: 38px; }
        }

        @media (max-width: 600px) {
          .photo-grid { columns: 1; }
          .photo-hero-title { font-size: 30px; }
          .photo-controls { flex-direction: column; align-items: flex-start; }
        }

        /* Card */
        .photo-card {
          break-inside: avoid;
          margin-bottom: 20px;
          border-radius: 16px;
          overflow: hidden;
          background: #111116;
          border: 1px solid #1e1e24;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        .photo-card:hover {
          transform: translateY(-4px);
          border-color: rgba(201,169,110,0.25);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }

        .photo-card-img-wrap {
          position: relative;
          overflow: hidden;
        }

        .photo-card-img {
          width: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .photo-card:hover .photo-card-img {
          transform: scale(1.05);
        }

        /* Varying heights for masonry effect */
        .photo-card:nth-child(3n+1) .photo-card-img { height: 300px; }
        .photo-card:nth-child(3n+2) .photo-card-img { height: 220px; }
        .photo-card:nth-child(3n+3) .photo-card-img { height: 360px; }

        /* Best time badge */
        .photo-best-time {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          border-radius: 8px;
          background: rgba(10,10,10,0.75);
          backdrop-filter: blur(8px);
          font-size: 12px;
          color: #d4af37;
          font-weight: 600;
          z-index: 2;
          border: 1px solid rgba(201,169,110,0.2);
        }

        /* Likes badge */
        .photo-likes-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 5px 10px;
          border-radius: 8px;
          background: rgba(10,10,10,0.75);
          backdrop-filter: blur(8px);
          font-size: 12px;
          color: #e0e0e0;
          z-index: 2;
        }

        /* Hover overlay */
        .photo-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent 30%, rgba(10,10,10,0.85) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          padding: 20px;
          gap: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 3;
        }

        .photo-card:hover .photo-card-overlay {
          opacity: 1;
        }

        .photo-overlay-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .photo-view-btn {
          padding: 10px 22px;
          border-radius: 10px;
          border: none;
          background: #c9a96e;
          color: #0a0a0a;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s;
        }

        .photo-view-btn:hover {
          background: #d4af37;
        }

        .photo-overlay-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
          color: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s;
          backdrop-filter: blur(6px);
        }

        .photo-overlay-icon:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(201,169,110,0.5);
        }

        .photo-overlay-icon--saved {
          color: #e74c3c;
          border-color: rgba(231,76,60,0.4);
          background: rgba(231,76,60,0.12);
        }

        /* Card body */
        .photo-card-body {
          padding: 16px 18px;
        }

        .photo-card-city {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 6px;
        }

        .photo-card-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 10px;
          line-height: 1.3;
        }

        .photo-card-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .photo-card-tag {
          padding: 3px 10px;
          border-radius: 10px;
          background: rgba(201,169,110,0.08);
          border: 1px solid rgba(201,169,110,0.15);
          color: #c9a96e;
          font-size: 11px;
          font-weight: 500;
        }

        .photo-card-tip {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 10px;
          background: #1a1a22;
          font-size: 13px;
          color: #a0a0a0;
          line-height: 1.5;
        }

        .photo-card-tip-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* Empty state */
        .photo-empty {
          text-align: center;
          padding: 80px 24px;
          color: #a0a0a0;
        }

        .photo-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .photo-empty-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 24px;
          color: #f5f5f5;
          margin: 0 0 8px;
        }

        .photo-empty-sub {
          font-size: 15px;
        }

        .photo-results-count {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px 16px;
          font-size: 14px;
          color: #a0a0a0;
        }

        .photo-results-count strong {
          color: #c9a96e;
          font-weight: 600;
        }
      `}</style>

      <div className="photo-page">
        {/* Hero */}
        <div className="photo-hero">
          <div className="photo-hero-label">Photographer's Guide</div>
          <h1 className="photo-hero-title">
            <span>Instagram-Worthy</span> Photo Spots
          </h1>
          <p className="photo-hero-sub">
            Discover the most photogenic locations around the world, curated with
            shooting tips from professional photographers.
          </p>
        </div>

        {/* City filter pills */}
        <div className="photo-city-bar">
          {CITIES.map((city) => (
            <button
              key={city}
              className={`photo-city-pill${selectedCity === city ? ' photo-city-pill--active' : ''}`}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Tags + Sort controls */}
        <div className="photo-controls">
          <div className="photo-tag-row">
            {TAGS.map((tag) => (
              <button
                key={tag}
                className={`photo-tag-btn${selectedTag === tag ? ' photo-tag-btn--active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <select
            className="photo-sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <div className="photo-results-count">
          <strong>{filteredSpots.length}</strong> photo spot{filteredSpots.length !== 1 ? 's' : ''} found
        </div>

        {/* Grid */}
        {filteredSpots.length === 0 ? (
          <div className="photo-empty">
            <div className="photo-empty-icon">No results</div>
            <p className="photo-empty-text">No spots found</p>
            <p className="photo-empty-sub">Try adjusting your filters to discover more locations.</p>
          </div>
        ) : (
          <div className="photo-grid">
            {filteredSpots.map((spot) => (
              <div className="photo-card" key={spot.id}>
                <div className="photo-card-img-wrap">
                  <img
                    className="photo-card-img"
                    src={spot.image}
                    alt={spot.name}
                    loading="lazy"
                  />

                  {/* Best time badge */}
                  <div className="photo-best-time">
                    <span>{BEST_TIME_ICONS[spot.bestTime] || ''}</span>
                    {spot.bestTime}
                  </div>

                  {/* Likes badge */}
                  <div className="photo-likes-badge">
                    ♥ {spot.likes.toLocaleString()}
                  </div>

                  {/* Hover overlay */}
                  <div className="photo-card-overlay">
                    <div className="photo-overlay-actions">
                      <button className="photo-view-btn">
                        View Location
                      </button>
                      <button
                        className={`photo-overlay-icon${savedSpots.has(spot.id) ? ' photo-overlay-icon--saved' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(spot.id);
                        }}
                        title={savedSpots.has(spot.id) ? 'Unsave' : 'Save'}
                      >
                        {savedSpots.has(spot.id) ? '♥' : '♡'}
                      </button>
                      <button
                        className="photo-overlay-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(spot);
                        }}
                        title="Share"
                      >
                        ↗
                      </button>
                    </div>
                  </div>
                </div>

                <div className="photo-card-body">
                  <div className="photo-card-city">{spot.city}</div>
                  <h3 className="photo-card-name">{spot.name}</h3>
                  <div className="photo-card-tags">
                    {spot.tags.map((tag) => (
                      <span className="photo-card-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="photo-card-tip">
                    <span className="photo-card-tip-icon">Tip:</span>
                    <span>{spot.tip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
