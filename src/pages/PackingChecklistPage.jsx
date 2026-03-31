import React, { useState, useMemo, useCallback } from 'react';

/* ─── Trip type data ─── */
const TRIP_TYPES = [
  { key: 'beach', label: 'Beach Vacation', icon: '' },
  { key: 'city', label: 'City Break', icon: '' },
  { key: 'adventure', label: 'Adventure Trip', icon: '' },
  { key: 'business', label: 'Business Travel', icon: '' },
  { key: 'winter', label: 'Winter Getaway', icon: '' },
];

/* ─── Category definitions ─── */
const CATEGORIES = [
  { key: 'clothing', label: 'Clothing', icon: '' },
  { key: 'toiletries', label: 'Toiletries', icon: '' },
  { key: 'electronics', label: 'Electronics', icon: '' },
  { key: 'documents', label: 'Documents', icon: '' },
  { key: 'health', label: 'Health & Safety', icon: '' },
  { key: 'extras', label: 'Extras', icon: '' },
];

/* ─── Items per trip type, organized by category ─── */
const TRIP_ITEMS = {
  beach: {
    clothing: [
      { name: 'Swimsuit', weight: 0.2, priority: 'high' },
      { name: 'Sunhat', weight: 0.15, priority: 'high' },
      { name: 'Flip-flops', weight: 0.3, priority: 'high' },
      { name: 'Light shorts (x3)', weight: 0.6, priority: 'high' },
      { name: 'Tank tops (x4)', weight: 0.4, priority: 'medium' },
      { name: 'Sarong / cover-up', weight: 0.2, priority: 'medium' },
      { name: 'Light evening outfit', weight: 0.5, priority: 'low' },
    ],
    toiletries: [
      { name: 'Sunscreen SPF 50+', weight: 0.25, priority: 'high' },
      { name: 'After-sun lotion', weight: 0.2, priority: 'medium' },
      { name: 'Shampoo & conditioner', weight: 0.3, priority: 'medium' },
      { name: 'Toothbrush & toothpaste', weight: 0.1, priority: 'high' },
      { name: 'Deodorant', weight: 0.1, priority: 'medium' },
    ],
    electronics: [
      { name: 'Phone charger', weight: 0.1, priority: 'high' },
      { name: 'Waterproof phone pouch', weight: 0.05, priority: 'high' },
      { name: 'Camera', weight: 0.5, priority: 'medium' },
      { name: 'Portable speaker', weight: 0.3, priority: 'low' },
      { name: 'Power bank', weight: 0.25, priority: 'medium' },
    ],
    documents: [
      { name: 'Passport', weight: 0.05, priority: 'high' },
      { name: 'Travel insurance', weight: 0.01, priority: 'high' },
      { name: 'Hotel booking confirmation', weight: 0.01, priority: 'high' },
      { name: 'Flight tickets', weight: 0.01, priority: 'high' },
    ],
    health: [
      { name: 'Sunscreen (face)', weight: 0.1, priority: 'high' },
      { name: 'Insect repellent', weight: 0.15, priority: 'medium' },
      { name: 'Basic first aid kit', weight: 0.3, priority: 'medium' },
      { name: 'Any personal medications', weight: 0.1, priority: 'high' },
      { name: 'Rehydration sachets', weight: 0.05, priority: 'low' },
    ],
    extras: [
      { name: 'Beach towel', weight: 0.5, priority: 'high' },
      { name: 'Snorkel & mask', weight: 0.4, priority: 'medium' },
      { name: 'Beach bag', weight: 0.2, priority: 'medium' },
      { name: 'Paperback book', weight: 0.3, priority: 'low' },
      { name: 'Cooler bag', weight: 0.2, priority: 'low' },
    ],
  },
  city: {
    clothing: [
      { name: 'Comfortable walking shoes', weight: 0.8, priority: 'high' },
      { name: 'Jeans (x2)', weight: 1.2, priority: 'high' },
      { name: 'Casual shirts (x4)', weight: 0.8, priority: 'high' },
      { name: 'Light jacket', weight: 0.6, priority: 'medium' },
      { name: 'Smart evening outfit', weight: 0.7, priority: 'medium' },
      { name: 'Underwear & socks (x5)', weight: 0.4, priority: 'high' },
    ],
    toiletries: [
      { name: 'Travel-size toiletry kit', weight: 0.4, priority: 'high' },
      { name: 'Toothbrush & toothpaste', weight: 0.1, priority: 'high' },
      { name: 'Deodorant', weight: 0.1, priority: 'medium' },
      { name: 'Hand sanitizer', weight: 0.1, priority: 'medium' },
      { name: 'Lip balm', weight: 0.02, priority: 'low' },
    ],
    electronics: [
      { name: 'Phone charger', weight: 0.1, priority: 'high' },
      { name: 'Universal power adapter', weight: 0.15, priority: 'high' },
      { name: 'Camera', weight: 0.5, priority: 'medium' },
      { name: 'Earbuds / headphones', weight: 0.1, priority: 'medium' },
      { name: 'Power bank', weight: 0.25, priority: 'medium' },
    ],
    documents: [
      { name: 'Passport / ID', weight: 0.05, priority: 'high' },
      { name: 'Travel insurance', weight: 0.01, priority: 'high' },
      { name: 'Hotel booking confirmation', weight: 0.01, priority: 'high' },
      { name: 'Transport tickets', weight: 0.01, priority: 'high' },
      { name: 'City pass / museum cards', weight: 0.05, priority: 'medium' },
    ],
    health: [
      { name: 'Blister plasters', weight: 0.03, priority: 'high' },
      { name: 'Pain relief tablets', weight: 0.05, priority: 'medium' },
      { name: 'Any personal medications', weight: 0.1, priority: 'high' },
      { name: 'Hand sanitizer', weight: 0.1, priority: 'medium' },
    ],
    extras: [
      { name: 'Daypack / crossbody bag', weight: 0.3, priority: 'high' },
      { name: 'Reusable water bottle', weight: 0.15, priority: 'medium' },
      { name: 'Umbrella (compact)', weight: 0.25, priority: 'medium' },
      { name: 'Guidebook / map', weight: 0.2, priority: 'low' },
      { name: 'Snacks for transit', weight: 0.2, priority: 'low' },
    ],
  },
  adventure: {
    clothing: [
      { name: 'Hiking boots', weight: 1.2, priority: 'high' },
      { name: 'Moisture-wicking base layers (x3)', weight: 0.6, priority: 'high' },
      { name: 'Trekking pants (x2)', weight: 0.8, priority: 'high' },
      { name: 'Waterproof jacket', weight: 0.5, priority: 'high' },
      { name: 'Fleece / insulation layer', weight: 0.4, priority: 'medium' },
      { name: 'Quick-dry underwear (x5)', weight: 0.3, priority: 'high' },
      { name: 'Wool hiking socks (x4)', weight: 0.3, priority: 'high' },
      { name: 'Cap / sun hat', weight: 0.1, priority: 'medium' },
    ],
    toiletries: [
      { name: 'Biodegradable soap', weight: 0.15, priority: 'high' },
      { name: 'Toothbrush & toothpaste', weight: 0.1, priority: 'high' },
      { name: 'Sunscreen SPF 50', weight: 0.25, priority: 'high' },
      { name: 'Deodorant', weight: 0.1, priority: 'medium' },
      { name: 'Wet wipes', weight: 0.15, priority: 'medium' },
    ],
    electronics: [
      { name: 'Headlamp + batteries', weight: 0.2, priority: 'high' },
      { name: 'Phone charger', weight: 0.1, priority: 'high' },
      { name: 'Solar power bank', weight: 0.35, priority: 'high' },
      { name: 'GPS device / smartwatch', weight: 0.15, priority: 'medium' },
      { name: 'Action camera', weight: 0.3, priority: 'medium' },
    ],
    documents: [
      { name: 'Passport', weight: 0.05, priority: 'high' },
      { name: 'Travel insurance (adventure)', weight: 0.01, priority: 'high' },
      { name: 'Trail permits', weight: 0.01, priority: 'high' },
      { name: 'Emergency contacts card', weight: 0.01, priority: 'high' },
    ],
    health: [
      { name: 'Comprehensive first aid kit', weight: 0.5, priority: 'high' },
      { name: 'Water purification tablets', weight: 0.05, priority: 'high' },
      { name: 'Altitude sickness pills', weight: 0.05, priority: 'medium' },
      { name: 'Insect repellent (DEET)', weight: 0.15, priority: 'high' },
      { name: 'Blister kit', weight: 0.1, priority: 'high' },
      { name: 'Any personal medications', weight: 0.1, priority: 'high' },
    ],
    extras: [
      { name: 'Trekking poles', weight: 0.6, priority: 'medium' },
      { name: 'Dry bags', weight: 0.2, priority: 'high' },
      { name: 'Multi-tool / knife', weight: 0.15, priority: 'medium' },
      { name: 'Paracord (10m)', weight: 0.1, priority: 'low' },
      { name: 'Reusable water bottle (1L)', weight: 0.2, priority: 'high' },
      { name: 'Sleeping bag liner', weight: 0.3, priority: 'medium' },
    ],
  },
  business: {
    clothing: [
      { name: 'Suits (x2)', weight: 2.0, priority: 'high' },
      { name: 'Dress shirts (x4)', weight: 1.0, priority: 'high' },
      { name: 'Dress shoes', weight: 0.9, priority: 'high' },
      { name: 'Ties / scarves (x2)', weight: 0.1, priority: 'medium' },
      { name: 'Belt', weight: 0.2, priority: 'medium' },
      { name: 'Casual outfit for downtime', weight: 0.5, priority: 'low' },
      { name: 'Underwear & socks (x5)', weight: 0.4, priority: 'high' },
    ],
    toiletries: [
      { name: 'Premium toiletry bag', weight: 0.5, priority: 'high' },
      { name: 'Cologne / perfume', weight: 0.15, priority: 'medium' },
      { name: 'Toothbrush & toothpaste', weight: 0.1, priority: 'high' },
      { name: 'Deodorant', weight: 0.1, priority: 'high' },
      { name: 'Hair styling product', weight: 0.1, priority: 'low' },
    ],
    electronics: [
      { name: 'Laptop + charger', weight: 1.5, priority: 'high' },
      { name: 'Phone charger', weight: 0.1, priority: 'high' },
      { name: 'Universal adapter', weight: 0.15, priority: 'high' },
      { name: 'USB drive / portable SSD', weight: 0.1, priority: 'medium' },
      { name: 'Noise-cancelling headphones', weight: 0.25, priority: 'medium' },
      { name: 'HDMI adapter / dongle', weight: 0.05, priority: 'low' },
    ],
    documents: [
      { name: 'Passport / ID', weight: 0.05, priority: 'high' },
      { name: 'Visa (if required)', weight: 0.01, priority: 'high' },
      { name: 'Business cards', weight: 0.05, priority: 'high' },
      { name: 'Meeting itinerary', weight: 0.01, priority: 'high' },
      { name: 'Corporate credit card', weight: 0.01, priority: 'high' },
      { name: 'Travel insurance', weight: 0.01, priority: 'medium' },
    ],
    health: [
      { name: 'Pain relief tablets', weight: 0.05, priority: 'medium' },
      { name: 'Eye drops (for flights)', weight: 0.03, priority: 'low' },
      { name: 'Melatonin (jet lag)', weight: 0.02, priority: 'medium' },
      { name: 'Any personal medications', weight: 0.1, priority: 'high' },
    ],
    extras: [
      { name: 'Garment bag', weight: 0.3, priority: 'high' },
      { name: 'Portable steamer / wrinkle spray', weight: 0.3, priority: 'medium' },
      { name: 'Notebook & pen', weight: 0.15, priority: 'medium' },
      { name: 'Shoe bags', weight: 0.1, priority: 'low' },
      { name: 'Travel pillow', weight: 0.2, priority: 'low' },
    ],
  },
  winter: {
    clothing: [
      { name: 'Heavy winter coat', weight: 1.8, priority: 'high' },
      { name: 'Thermal base layers (x3)', weight: 0.6, priority: 'high' },
      { name: 'Wool sweaters (x3)', weight: 1.2, priority: 'high' },
      { name: 'Insulated pants (x2)', weight: 1.0, priority: 'high' },
      { name: 'Warm boots (waterproof)', weight: 1.2, priority: 'high' },
      { name: 'Gloves / mittens', weight: 0.2, priority: 'high' },
      { name: 'Beanie / warm hat', weight: 0.1, priority: 'high' },
      { name: 'Scarf', weight: 0.15, priority: 'medium' },
      { name: 'Thick wool socks (x5)', weight: 0.4, priority: 'high' },
    ],
    toiletries: [
      { name: 'Moisturizer (heavy duty)', weight: 0.2, priority: 'high' },
      { name: 'Lip balm (SPF)', weight: 0.02, priority: 'high' },
      { name: 'Toothbrush & toothpaste', weight: 0.1, priority: 'high' },
      { name: 'Deodorant', weight: 0.1, priority: 'medium' },
      { name: 'Hand cream', weight: 0.1, priority: 'medium' },
    ],
    electronics: [
      { name: 'Phone charger', weight: 0.1, priority: 'high' },
      { name: 'Camera', weight: 0.5, priority: 'medium' },
      { name: 'Power bank (cold drains battery)', weight: 0.25, priority: 'high' },
      { name: 'Hand warmers (rechargeable)', weight: 0.15, priority: 'medium' },
    ],
    documents: [
      { name: 'Passport / ID', weight: 0.05, priority: 'high' },
      { name: 'Travel insurance', weight: 0.01, priority: 'high' },
      { name: 'Ski pass / resort booking', weight: 0.01, priority: 'high' },
      { name: 'Flight tickets', weight: 0.01, priority: 'high' },
    ],
    health: [
      { name: 'Cold & flu medicine', weight: 0.1, priority: 'medium' },
      { name: 'Vitamin C supplements', weight: 0.05, priority: 'low' },
      { name: 'Basic first aid kit', weight: 0.3, priority: 'medium' },
      { name: 'Sunscreen (snow glare)', weight: 0.2, priority: 'medium' },
      { name: 'Any personal medications', weight: 0.1, priority: 'high' },
    ],
    extras: [
      { name: 'Ski goggles', weight: 0.2, priority: 'high' },
      { name: 'Neck gaiter / balaclava', weight: 0.1, priority: 'medium' },
      { name: 'Hand / toe warmers (disposable)', weight: 0.15, priority: 'medium' },
      { name: 'Thermos flask', weight: 0.35, priority: 'medium' },
      { name: 'Backpack rain cover', weight: 0.1, priority: 'low' },
    ],
  },
};

/* ─── AI suggestion extras per trip type per category ─── */
const AI_SUGGESTIONS = {
  beach: {
    clothing: ['Rash guard for water sports', 'Waterproof sandals', 'Beach wedding outfit'],
    toiletries: ['Aloe vera gel', 'Sea salt hair spray', 'Waterproof mascara'],
    electronics: ['Underwater camera housing', 'Kindle / e-reader', 'Drone'],
    documents: ['Dive certification card', 'Vaccination records', 'Car rental confirmation'],
    health: ['Jellyfish sting relief spray', 'Coral-safe reef lotion', 'Anti-nausea tablets'],
    extras: ['Inflatable pool float', 'Sand-free beach blanket', 'Portable hammock'],
  },
  city: {
    clothing: ['Foldable rain jacket', 'Scarf (multi-use)', 'Comfortable dress shoes'],
    toiletries: ['Stain remover pen', 'Mini perfume atomizer', 'Blotting papers'],
    electronics: ['Portable WiFi hotspot', 'Tripod for phone', 'Translation device'],
    documents: ['Metro map (printed)', 'Restaurant reservations', 'Currency exchange receipt'],
    health: ['Activated charcoal tablets', 'Allergy medicine', 'Earplugs for sleeping'],
    extras: ['Packing cubes', 'Laundry bag', 'Collapsible tote bag'],
  },
  adventure: {
    clothing: ['Gaiters', 'Buff / neck tube', 'Camp shoes (lightweight)'],
    toiletries: ['Dr. Bronner\'s all-in-one soap', 'Pee cloth / Go Girl', 'Dry shampoo'],
    electronics: ['Satellite communicator (inReach)', 'Two-way radios', 'Spare batteries'],
    documents: ['Topo map of route', 'Campsite reservations', 'Wildlife permits'],
    health: ['Snake bite kit', 'Electrolyte powder', 'Anti-diarrhea medication'],
    extras: ['Bear canister', 'Emergency whistle', 'Fire starter kit'],
  },
  business: {
    clothing: ['Cufflinks / accessories', 'Pocket square', 'Gym outfit'],
    toiletries: ['Sewing kit (mini)', 'Breath mints', 'Stain pen'],
    electronics: ['Portable monitor', 'Wireless presenter clicker', 'International SIM'],
    documents: ['NDA copies', 'Expense report forms', 'Presentation handouts'],
    health: ['Throat lozenges', 'Energy supplements', 'Sleep mask'],
    extras: ['Shoe shine kit', 'Packing cubes for suits', 'Airport lounge pass'],
  },
  winter: {
    clothing: ['Heated insoles', 'Ski socks (compression)', 'Down vest'],
    toiletries: ['Anti-fog spray for goggles', 'Foot powder', 'Intensive face mask'],
    electronics: ['GoPro for slopes', 'Heated glove liners', 'Avalanche beacon'],
    documents: ['Ski school booking', 'Equipment rental receipt', 'Mountain rescue insurance'],
    health: ['Muscle rub / tiger balm', 'Altitude medication', 'Thermal patches'],
    extras: ['Helmet', 'Ski lock', 'Boot dryer (portable)'],
  },
};

let uid = 1000;
const genId = () => ++uid;

function buildChecklist(tripKey) {
  const tripData = TRIP_ITEMS[tripKey];
  if (!tripData) return [];
  const items = [];
  for (const cat of CATEGORIES) {
    const catItems = tripData[cat.key] || [];
    for (const item of catItems) {
      items.push({
        id: genId(),
        category: cat.key,
        name: item.name,
        weight: item.weight,
        priority: item.priority,
        checked: false,
        isCustom: false,
      });
    }
  }
  return items;
}

/* ─── Component ─── */
export default function PackingChecklistPage() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [items, setItems] = useState([]);
  const [collapsedCats, setCollapsedCats] = useState({});
  const [customInputs, setCustomInputs] = useState({});
  const [savedMsg, setSavedMsg] = useState('');

  /* derived */
  const totalItems = items.length;
  const packedCount = useMemo(() => items.filter(i => i.checked).length, [items]);
  const pctReady = totalItems ? Math.round((packedCount / totalItems) * 100) : 0;
  const totalWeight = useMemo(() => items.reduce((s, i) => s + (i.weight || 0), 0), [items]);
  const packedWeight = useMemo(() => items.filter(i => i.checked).reduce((s, i) => s + (i.weight || 0), 0), [items]);

  /* handlers */
  const selectTrip = useCallback((key) => {
    setSelectedTrip(key);
    setItems(buildChecklist(key));
    setCollapsedCats({});
    setCustomInputs({});
    setSavedMsg('');
  }, []);

  const toggleItem = useCallback((id) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
  }, []);

  const toggleCategory = useCallback((catKey) => {
    setCollapsedCats(prev => ({ ...prev, [catKey]: !prev[catKey] }));
  }, []);

  const addCustomItem = useCallback((catKey) => {
    const name = (customInputs[catKey] || '').trim();
    if (!name) return;
    setItems(prev => [...prev, {
      id: genId(),
      category: catKey,
      name,
      weight: 0.1,
      priority: 'medium',
      checked: false,
      isCustom: true,
    }]);
    setCustomInputs(prev => ({ ...prev, [catKey]: '' }));
  }, [customInputs]);

  const addAiSuggestions = useCallback((catKey) => {
    if (!selectedTrip) return;
    const suggestions = AI_SUGGESTIONS[selectedTrip]?.[catKey] || [];
    const existingNames = new Set(items.map(i => i.name.toLowerCase()));
    const newItems = suggestions
      .filter(s => !existingNames.has(s.toLowerCase()))
      .map(s => ({
        id: genId(),
        category: catKey,
        name: s,
        weight: 0.15,
        priority: 'low',
        checked: false,
        isCustom: false,
        isSuggested: true,
      }));
    if (newItems.length > 0) {
      setItems(prev => [...prev, ...newItems]);
    }
  }, [selectedTrip, items]);

  const resetList = useCallback(() => {
    if (selectedTrip) {
      setItems(buildChecklist(selectedTrip));
      setCustomInputs({});
      setSavedMsg('');
    }
  }, [selectedTrip]);

  const saveList = useCallback(() => {
    setSavedMsg('Checklist saved successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const priorityBadge = (p) => {
    const colors = { high: '#e74c3c', medium: '#c9a96e', low: '#5a8f5a' };
    return (
      <span style={{
        fontSize: '0.65rem',
        padding: '2px 7px',
        borderRadius: '8px',
        background: `${colors[p] || '#888'}22`,
        color: colors[p] || '#888',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}>
        {p}
      </span>
    );
  };

  return (
    <>
      <style>{`
        .packing-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #e0e0e0;
          font-family: 'DM Sans', sans-serif;
          padding: 0 0 80px 0;
        }
        .packing-hero {
          text-align: center;
          padding: 56px 24px 36px;
        }
        .packing-hero h1 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.6rem;
          color: #f5f5f5;
          margin: 0 0 6px;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        .packing-hero-accent {
          display: inline-block;
          width: 54px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c9a96e, transparent);
          border-radius: 2px;
          margin-bottom: 10px;
        }
        .packing-hero p {
          color: #a0a0a0;
          font-size: 1.05rem;
          margin: 0;
        }

        /* trip selector */
        .packing-trip-grid {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          padding: 0 24px 32px;
          max-width: 860px;
          margin: 0 auto;
        }
        .packing-trip-card {
          background: #111116;
          border: 1.5px solid #1e1e24;
          border-radius: 14px;
          padding: 18px 22px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: center;
          min-width: 140px;
          flex: 1;
        }
        .packing-trip-card:hover {
          border-color: rgba(201,169,110,0.35);
          background: #1a1a22;
          transform: translateY(-2px);
        }
        .packing-trip-card.packing-active {
          border-color: #c9a96e;
          background: rgba(201,169,110,0.10);
          box-shadow: 0 0 24px rgba(201,169,110,0.10);
        }
        .packing-trip-icon {
          font-size: 1.75rem;
          display: block;
          margin-bottom: 6px;
        }
        .packing-trip-label {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1rem;
          color: #e0e0e0;
          font-weight: 600;
        }

        /* content area */
        .packing-content {
          max-width: 820px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* progress bar */
        .packing-progress-wrap {
          margin-bottom: 28px;
        }
        .packing-progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 8px;
          color: #a0a0a0;
        }
        .packing-progress-label strong {
          color: #c9a96e;
        }
        .packing-progress-bar {
          height: 10px;
          background: #1e1e24;
          border-radius: 6px;
          overflow: hidden;
        }
        .packing-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #c9a96e, #d4af37);
          border-radius: 6px;
          transition: width 0.4s ease;
        }

        /* summary card */
        .packing-summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 32px;
        }
        .packing-summary-cell {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 12px;
          padding: 18px 14px;
          text-align: center;
        }
        .packing-summary-val {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #c9a96e;
          line-height: 1.1;
        }
        .packing-summary-lbl {
          font-size: 0.78rem;
          color: #a0a0a0;
          margin-top: 4px;
        }

        /* category sections */
        .packing-cat-section {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 14px;
          margin-bottom: 18px;
          overflow: hidden;
        }
        .packing-cat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          cursor: pointer;
          transition: background 0.2s ease;
          user-select: none;
        }
        .packing-cat-header:hover {
          background: #1a1a22;
        }
        .packing-cat-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .packing-cat-icon {
          font-size: 1.25rem;
        }
        .packing-cat-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.2rem;
          color: #f5f5f5;
          font-weight: 600;
        }
        .packing-cat-count {
          font-size: 0.78rem;
          color: #a0a0a0;
          margin-left: 8px;
        }
        .packing-cat-chevron {
          color: #a0a0a0;
          font-size: 0.85rem;
          transition: transform 0.25s ease;
        }
        .packing-cat-chevron.packing-open {
          transform: rotate(180deg);
        }

        /* items list */
        .packing-items {
          padding: 0 20px 16px;
        }
        .packing-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #1e1e2488;
        }
        .packing-item:last-of-type {
          border-bottom: none;
        }
        .packing-checkbox-wrap {
          position: relative;
          width: 22px;
          height: 22px;
          flex-shrink: 0;
        }
        .packing-checkbox-wrap input {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
          z-index: 2;
          margin: 0;
        }
        .packing-checkmark {
          position: absolute;
          top: 0;
          left: 0;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          border: 2px solid #444;
          background: transparent;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .packing-checkbox-wrap input:checked + .packing-checkmark {
          background: #c9a96e;
          border-color: #c9a96e;
          animation: packing-pop 0.3s ease;
        }
        .packing-checkmark-icon {
          opacity: 0;
          color: #0a0a0a;
          font-size: 14px;
          font-weight: 700;
          transition: opacity 0.2s ease;
        }
        .packing-checkbox-wrap input:checked + .packing-checkmark .packing-checkmark-icon {
          opacity: 1;
        }
        @keyframes packing-pop {
          0% { transform: scale(1); }
          40% { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        .packing-item-name {
          flex: 1;
          font-size: 0.92rem;
          color: #e0e0e0;
          transition: all 0.3s ease;
        }
        .packing-item-name.packing-checked {
          text-decoration: line-through;
          color: #666;
        }
        .packing-item-weight {
          font-size: 0.72rem;
          color: #666;
          min-width: 42px;
          text-align: right;
        }
        .packing-item-suggested {
          font-size: 0.65rem;
          color: #d4af37;
          background: rgba(212,175,55,0.12);
          padding: 1px 6px;
          border-radius: 6px;
          white-space: nowrap;
        }
        .packing-item-remove {
          background: none;
          border: none;
          color: #555;
          cursor: pointer;
          font-size: 1rem;
          padding: 2px 6px;
          border-radius: 4px;
          transition: all 0.2s;
          line-height: 1;
        }
        .packing-item-remove:hover {
          color: #e74c3c;
          background: rgba(231,76,60,0.1);
        }

        /* category footer / actions */
        .packing-cat-footer {
          display: flex;
          gap: 10px;
          padding: 0 20px 16px;
          align-items: center;
          flex-wrap: wrap;
        }
        .packing-custom-input {
          flex: 1;
          min-width: 160px;
          background: #1a1a22;
          border: 1px solid #1e1e24;
          border-radius: 8px;
          padding: 8px 12px;
          color: #e0e0e0;
          font-size: 0.85rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .packing-custom-input:focus {
          border-color: rgba(201,169,110,0.5);
        }
        .packing-custom-input::placeholder {
          color: #555;
        }
        .packing-btn-add {
          background: rgba(201,169,110,0.15);
          border: 1px solid rgba(201,169,110,0.25);
          color: #c9a96e;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .packing-btn-add:hover {
          background: rgba(201,169,110,0.25);
        }
        .packing-btn-ai {
          background: linear-gradient(135deg, rgba(201,169,110,0.12), rgba(212,175,55,0.08));
          border: 1px solid rgba(201,169,110,0.3);
          color: #d4af37;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .packing-btn-ai:hover {
          background: linear-gradient(135deg, rgba(201,169,110,0.22), rgba(212,175,55,0.15));
          box-shadow: 0 0 16px rgba(201,169,110,0.12);
        }

        /* action buttons */
        .packing-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          margin-top: 32px;
        }
        .packing-btn-reset {
          background: transparent;
          border: 1.5px solid #444;
          color: #a0a0a0;
          padding: 12px 28px;
          border-radius: 10px;
          font-size: 0.95rem;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
        }
        .packing-btn-reset:hover {
          border-color: #e74c3c;
          color: #e74c3c;
        }
        .packing-btn-save {
          background: linear-gradient(135deg, #c9a96e, #d4af37);
          border: none;
          color: #0a0a0a;
          padding: 12px 32px;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
        }
        .packing-btn-save:hover {
          box-shadow: 0 4px 24px rgba(201,169,110,0.3);
          transform: translateY(-1px);
        }
        .packing-saved-msg {
          text-align: center;
          color: #5aae5a;
          font-size: 0.9rem;
          margin-top: 14px;
          animation: packing-fade-in 0.3s ease;
        }

        /* empty state */
        .packing-empty {
          text-align: center;
          padding: 60px 24px;
          color: #555;
        }
        .packing-empty-icon {
          font-size: 3.5rem;
          margin-bottom: 16px;
          display: block;
        }
        .packing-empty h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          color: #a0a0a0;
          font-size: 1.4rem;
          margin: 0 0 8px;
        }
        .packing-empty p {
          font-size: 0.92rem;
        }

        @keyframes packing-fade-in {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .packing-hero h1 { font-size: 2rem; }
          .packing-summary { grid-template-columns: repeat(2, 1fr); }
          .packing-trip-card { min-width: 110px; padding: 14px 12px; }
          .packing-cat-footer { flex-direction: column; }
          .packing-custom-input { min-width: 100%; }
        }
      `}</style>

      <div className="packing-page">
        {/* Hero */}
        <div className="packing-hero">
          <span className="packing-hero-accent" />
          <h1>Smart Packing Assistant</h1>
          <p>Select your trip type and never forget an essential again</p>
        </div>

        {/* Trip Type Selector */}
        <div className="packing-trip-grid">
          {TRIP_TYPES.map(t => (
            <div
              key={t.key}
              className={`packing-trip-card${selectedTrip === t.key ? ' packing-active' : ''}`}
              onClick={() => selectTrip(t.key)}
            >
              <span className="packing-trip-icon">{t.icon}</span>
              <span className="packing-trip-label">{t.label}</span>
            </div>
          ))}
        </div>

        <div className="packing-content">
          {!selectedTrip && (
            <div className="packing-empty">
              <span className="packing-empty-icon"></span>
              <h2>Choose a trip type to get started</h2>
              <p>We'll generate a personalized packing checklist for you</p>
            </div>
          )}

          {selectedTrip && (
            <>
              {/* Progress Bar */}
              <div className="packing-progress-wrap">
                <div className="packing-progress-label">
                  <span><strong>{packedCount}</strong> of <strong>{totalItems}</strong> items packed</span>
                  <span>{pctReady}% ready</span>
                </div>
                <div className="packing-progress-bar">
                  <div
                    className="packing-progress-fill"
                    style={{ width: `${pctReady}%` }}
                  />
                </div>
              </div>

              {/* Summary Card */}
              <div className="packing-summary">
                <div className="packing-summary-cell">
                  <div className="packing-summary-val">{totalItems}</div>
                  <div className="packing-summary-lbl">Total Items</div>
                </div>
                <div className="packing-summary-cell">
                  <div className="packing-summary-val">{packedCount}</div>
                  <div className="packing-summary-lbl">Packed</div>
                </div>
                <div className="packing-summary-cell">
                  <div className="packing-summary-val">{totalWeight.toFixed(1)}<span style={{ fontSize: '0.9rem' }}>kg</span></div>
                  <div className="packing-summary-lbl">Est. Weight</div>
                </div>
                <div className="packing-summary-cell">
                  <div className="packing-summary-val" style={{ color: pctReady === 100 ? '#5aae5a' : '#c9a96e' }}>
                    {pctReady}%
                  </div>
                  <div className="packing-summary-lbl">
                    {pctReady === 100 ? 'All packed!' : `You're ${pctReady}% ready!`}
                  </div>
                </div>
              </div>

              {/* Category Sections */}
              {CATEGORIES.map(cat => {
                const catItems = items.filter(i => i.category === cat.key);
                if (catItems.length === 0) return null;
                const catPacked = catItems.filter(i => i.checked).length;
                const isCollapsed = !!collapsedCats[cat.key];

                return (
                  <div className="packing-cat-section" key={cat.key}>
                    <div className="packing-cat-header" onClick={() => toggleCategory(cat.key)}>
                      <div className="packing-cat-left">
                        <span className="packing-cat-icon">{cat.icon}</span>
                        <span className="packing-cat-title">{cat.label}</span>
                        <span className="packing-cat-count">
                          {catPacked}/{catItems.length}
                        </span>
                      </div>
                      <span className={`packing-cat-chevron${isCollapsed ? '' : ' packing-open'}`}>
                        ▼
                      </span>
                    </div>

                    {!isCollapsed && (
                      <>
                        <div className="packing-items">
                          {catItems.map(item => (
                            <div className="packing-item" key={item.id}>
                              <label className="packing-checkbox-wrap">
                                <input
                                  type="checkbox"
                                  checked={item.checked}
                                  onChange={() => toggleItem(item.id)}
                                />
                                <span className="packing-checkmark">
                                  <span className="packing-checkmark-icon">✓</span>
                                </span>
                              </label>
                              <span className={`packing-item-name${item.checked ? ' packing-checked' : ''}`}>
                                {item.name}
                              </span>
                              {item.isSuggested && (
                                <span className="packing-item-suggested">AI</span>
                              )}
                              {priorityBadge(item.priority)}
                              <span className="packing-item-weight">{item.weight}kg</span>
                              {(item.isCustom || item.isSuggested) && (
                                <button
                                  className="packing-item-remove"
                                  onClick={() => removeItem(item.id)}
                                  title="Remove item"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="packing-cat-footer">
                          <input
                            className="packing-custom-input"
                            type="text"
                            placeholder="Add custom item..."
                            value={customInputs[cat.key] || ''}
                            onChange={e => setCustomInputs(prev => ({ ...prev, [cat.key]: e.target.value }))}
                            onKeyDown={e => { if (e.key === 'Enter') addCustomItem(cat.key); }}
                          />
                          <button className="packing-btn-add" onClick={() => addCustomItem(cat.key)}>
                            + Add Item
                          </button>
                          <button className="packing-btn-ai" onClick={() => addAiSuggestions(cat.key)}>
                            AI Suggestions
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              {/* Action Buttons */}
              <div className="packing-actions">
                <button className="packing-btn-reset" onClick={resetList}>
                  ↻ Reset List
                </button>
                <button className="packing-btn-save" onClick={saveList}>
                  Save List
                </button>
              </div>
              {savedMsg && <div className="packing-saved-msg">{savedMsg}</div>}
            </>
          )}
        </div>
      </div>
    </>
  );
}
