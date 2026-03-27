import React, { useState, useMemo } from 'react';

const CATEGORIES = [
  { key: 'hotels', label: 'Hotels', icon: '\u{1F3E8}', color: '#4a90d9' },
  { key: 'food', label: 'Food & Dining', icon: '\u{1F37D}\uFE0F', color: '#e8943a' },
  { key: 'transport', label: 'Transport', icon: '\u{1F697}', color: '#4caf50' },
  { key: 'activities', label: 'Activities', icon: '\u{1F3AF}', color: '#9c27b0' },
  { key: 'shopping', label: 'Shopping', icon: '\u{1F6CD}\uFE0F', color: '#e91e8a' },
  { key: 'other', label: 'Other', icon: '\u{1F4F1}', color: '#888888' },
];

const SAMPLE_TRIPS = [
  { id: 'tokyo', name: 'Tokyo Adventure', budget: 3500 },
  { id: 'paris', name: 'Paris Romance', budget: 4200 },
  { id: 'bali', name: 'Bali Retreat', budget: 2800 },
];

const SAMPLE_EXPENSES = {
  tokyo: [
    { id: 1, category: 'hotels', description: 'Shinjuku Hotel - 3 nights', amount: 720, date: '2026-04-10' },
    { id: 2, category: 'food', description: 'Tsukiji Market sushi breakfast', amount: 45, date: '2026-04-11' },
    { id: 3, category: 'transport', description: 'Suica card top-up', amount: 60, date: '2026-04-10' },
    { id: 4, category: 'activities', description: 'TeamLab Borderless tickets', amount: 55, date: '2026-04-12' },
    { id: 5, category: 'shopping', description: 'Akihabara electronics', amount: 230, date: '2026-04-12' },
    { id: 6, category: 'food', description: 'Ramen dinner in Shibuya', amount: 28, date: '2026-04-11' },
  ],
  paris: [
    { id: 1, category: 'hotels', description: 'Le Marais boutique hotel', amount: 980, date: '2026-05-01' },
    { id: 2, category: 'food', description: 'Dinner at Le Comptoir', amount: 135, date: '2026-05-02' },
    { id: 3, category: 'activities', description: 'Louvre Museum pass', amount: 40, date: '2026-05-02' },
    { id: 4, category: 'transport', description: 'Airport shuttle roundtrip', amount: 75, date: '2026-05-01' },
    { id: 5, category: 'shopping', description: 'Vintage bookshop haul', amount: 62, date: '2026-05-03' },
  ],
  bali: [
    { id: 1, category: 'hotels', description: 'Ubud rice terrace villa', amount: 450, date: '2026-06-15' },
    { id: 2, category: 'activities', description: 'Surf lessons - 3 sessions', amount: 90, date: '2026-06-16' },
    { id: 3, category: 'food', description: 'Beachside seafood grill', amount: 35, date: '2026-06-16' },
    { id: 4, category: 'transport', description: 'Scooter rental - 5 days', amount: 40, date: '2026-06-15' },
    { id: 5, category: 'other', description: 'SIM card & data plan', amount: 15, date: '2026-06-15' },
  ],
};

let nextId = 100;

export default function ExpenseTrackerPage() {
  const [selectedTrip, setSelectedTrip] = useState('tokyo');
  const [budgets, setBudgets] = useState(() => {
    const b = {};
    SAMPLE_TRIPS.forEach(t => { b[t.id] = t.budget; });
    return b;
  });
  const [expensesByTrip, setExpensesByTrip] = useState(SAMPLE_EXPENSES);
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState('');
  const [form, setForm] = useState({ category: 'hotels', amount: '', description: '', date: '' });

  const budget = budgets[selectedTrip] || 0;
  const expenses = expensesByTrip[selectedTrip] || [];

  const totalSpent = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const remaining = budget - totalSpent;
  const remainingPct = budget > 0 ? (remaining / budget) * 100 : 0;
  const dailyAvg = expenses.length > 0 ? totalSpent / new Set(expenses.map(e => e.date)).size : 0;
  const usagePct = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;

  const categoryTotals = useMemo(() => {
    const totals = {};
    CATEGORIES.forEach(c => { totals[c.key] = 0; });
    expenses.forEach(e => { totals[e.category] = (totals[e.category] || 0) + e.amount; });
    return totals;
  }, [expenses]);

  const maxCategoryTotal = Math.max(...Object.values(categoryTotals), 1);

  const remainingColor = remainingPct > 30 ? '#4caf50' : remainingPct > 10 ? '#f5c542' : '#e53935';

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!form.amount || !form.description || !form.date) return;
    const newExpense = {
      id: nextId++,
      category: form.category,
      amount: parseFloat(form.amount),
      description: form.description,
      date: form.date,
    };
    setExpensesByTrip(prev => ({
      ...prev,
      [selectedTrip]: [...(prev[selectedTrip] || []), newExpense],
    }));
    setForm({ category: 'hotels', amount: '', description: '', date: '' });
  };

  const handleDelete = (id) => {
    setExpensesByTrip(prev => ({
      ...prev,
      [selectedTrip]: (prev[selectedTrip] || []).filter(e => e.id !== id),
    }));
  };

  const handleBudgetSave = () => {
    const val = parseFloat(budgetInput);
    if (!isNaN(val) && val > 0) {
      setBudgets(prev => ({ ...prev, [selectedTrip]: val }));
    }
    setEditingBudget(false);
  };

  const getCat = (key) => CATEGORIES.find(c => c.key === key) || CATEGORIES[5];

  const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // SVG ring calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (usagePct / 100) * circumference;

  return (
    <div className="expense-page">
      {/* Hero */}
      <section className="expense-hero">
        <div className="expense-hero-inner">
          <div className="expense-accent-line" />
          <h1 className="expense-title">Smart Expense Tracker</h1>
          <p className="expense-subtitle">Monitor your travel spending with precision and style</p>
        </div>
      </section>

      <div className="expense-container">
        {/* Trip Selector */}
        <div className="expense-trip-selector">
          <label className="expense-label">Select Trip</label>
          <select
            className="expense-select"
            value={selectedTrip}
            onChange={(e) => setSelectedTrip(e.target.value)}
          >
            {SAMPLE_TRIPS.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Budget Overview Cards */}
        <div className="expense-cards-row">
          <div className="expense-card">
            <span className="expense-card-label">Total Budget</span>
            {editingBudget ? (
              <div className="expense-budget-edit">
                <input
                  type="number"
                  className="expense-budget-input"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleBudgetSave()}
                  autoFocus
                />
                <button className="expense-budget-save" onClick={handleBudgetSave}>Save</button>
              </div>
            ) : (
              <span
                className="expense-card-amount expense-gold-text"
                onClick={() => { setEditingBudget(true); setBudgetInput(String(budget)); }}
                title="Click to edit"
                style={{ cursor: 'pointer' }}
              >
                {fmt(budget)}
              </span>
            )}
            <span className="expense-card-hint">Click to edit</span>
          </div>

          <div className="expense-card">
            <span className="expense-card-label">Total Spent</span>
            <span className="expense-card-amount">{fmt(totalSpent)}</span>
            <span className="expense-card-hint">{expenses.length} transactions</span>
          </div>

          <div className="expense-card">
            <span className="expense-card-label">Remaining</span>
            <span className="expense-card-amount" style={{ color: remainingColor }}>
              {fmt(remaining)}
            </span>
            <span className="expense-card-hint">{remainingPct.toFixed(1)}% of budget</span>
          </div>

          <div className="expense-card">
            <span className="expense-card-label">Daily Average</span>
            <span className="expense-card-amount">{fmt(dailyAvg)}</span>
            <span className="expense-card-hint">per travel day</span>
          </div>
        </div>

        {/* Progress Ring + Category Breakdown */}
        <div className="expense-analytics-row">
          {/* Circular Progress */}
          <div className="expense-ring-card">
            <h3 className="expense-section-title">Budget Usage</h3>
            <div className="expense-ring-wrap">
              <svg className="expense-ring-svg" viewBox="0 0 180 180">
                <circle
                  cx="90" cy="90" r={radius}
                  fill="none"
                  stroke="#1e1e24"
                  strokeWidth="12"
                />
                <circle
                  cx="90" cy="90" r={radius}
                  fill="none"
                  stroke="#c9a96e"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - strokeDash}
                  transform="rotate(-90 90 90)"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
              </svg>
              <div className="expense-ring-center">
                <span className="expense-ring-pct">{usagePct.toFixed(1)}%</span>
                <span className="expense-ring-label">used</span>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="expense-category-card">
            <h3 className="expense-section-title">Category Breakdown</h3>
            <div className="expense-category-list">
              {CATEGORIES.map(cat => {
                const total = categoryTotals[cat.key];
                const pct = maxCategoryTotal > 0 ? (total / maxCategoryTotal) * 100 : 0;
                return (
                  <div className="expense-category-item" key={cat.key}>
                    <div className="expense-category-header">
                      <span className="expense-category-name">
                        <span className="expense-category-icon">{cat.icon}</span>
                        {cat.label}
                      </span>
                      <span className="expense-category-amount">{fmt(total)}</span>
                    </div>
                    <div className="expense-bar-track">
                      <div
                        className="expense-bar-fill"
                        style={{
                          width: pct + '%',
                          backgroundColor: cat.color,
                          transition: 'width 0.4s ease',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Add Expense Form */}
        <div className="expense-form-card">
          <h3 className="expense-section-title">Add New Expense</h3>
          <form className="expense-form" onSubmit={handleAddExpense}>
            <div className="expense-form-group">
              <label className="expense-label">Category</label>
              <select
                className="expense-select"
                value={form.category}
                onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map(c => (
                  <option key={c.key} value={c.key}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>
            <div className="expense-form-group">
              <label className="expense-label">Amount ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="expense-input"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm(f => ({ ...f, amount: e.target.value }))}
                required
              />
            </div>
            <div className="expense-form-group">
              <label className="expense-label">Description</label>
              <input
                type="text"
                className="expense-input"
                placeholder="What did you spend on?"
                value={form.description}
                onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                required
              />
            </div>
            <div className="expense-form-group">
              <label className="expense-label">Date</label>
              <input
                type="date"
                className="expense-input"
                value={form.date}
                onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="expense-add-btn">Add Expense</button>
          </form>
        </div>

        {/* Expense List */}
        <div className="expense-list-card">
          <h3 className="expense-section-title">
            Expense History
            <span className="expense-count">{expenses.length} items</span>
          </h3>
          <div className="expense-list">
            {expenses.length === 0 && (
              <p className="expense-empty">No expenses yet. Add one above!</p>
            )}
            {[...expenses].reverse().map(exp => {
              const cat = getCat(exp.category);
              return (
                <div className="expense-list-item" key={exp.id}>
                  <div className="expense-list-icon" style={{ backgroundColor: cat.color + '22', color: cat.color }}>
                    {cat.icon}
                  </div>
                  <div className="expense-list-details">
                    <span className="expense-list-desc">{exp.description}</span>
                    <span className="expense-list-meta">
                      <span className="expense-list-cat">{cat.label}</span>
                      <span className="expense-list-date">{exp.date}</span>
                    </span>
                  </div>
                  <div className="expense-list-right">
                    <span className="expense-list-amount">{fmt(exp.amount)}</span>
                    <button
                      className="expense-delete-btn"
                      onClick={() => handleDelete(exp.id)}
                      title="Delete expense"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .expense-page {
          min-height: 100vh;
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          color: #e0e0e0;
        }

        /* Hero */
        .expense-hero {
          background: linear-gradient(135deg, #111116 0%, #0a0a0a 100%);
          border-bottom: 1px solid rgba(201,169,110,0.25);
          padding: 64px 24px 48px;
          text-align: center;
        }
        .expense-hero-inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .expense-accent-line {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #c9a96e, #d4af37);
          margin: 0 auto 24px;
          border-radius: 2px;
        }
        .expense-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.75rem;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 12px;
          letter-spacing: 0.02em;
        }
        .expense-subtitle {
          font-size: 1.05rem;
          color: #a0a0a0;
          margin: 0;
        }

        /* Container */
        .expense-container {
          max-width: 1080px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }

        /* Trip Selector */
        .expense-trip-selector {
          margin-bottom: 36px;
        }
        .expense-label {
          display: block;
          font-size: 0.8rem;
          color: #a0a0a0;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }
        .expense-select {
          width: 100%;
          max-width: 340px;
          padding: 12px 16px;
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 10px;
          color: #e0e0e0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
          appearance: none;
          cursor: pointer;
        }
        .expense-select:focus {
          border-color: rgba(201,169,110,0.5);
        }

        /* Cards Row */
        .expense-cards-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 36px;
        }
        @media (max-width: 768px) {
          .expense-cards-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .expense-cards-row { grid-template-columns: 1fr; }
        }
        .expense-card {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 14px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color 0.2s;
        }
        .expense-card:hover {
          border-color: rgba(201,169,110,0.25);
        }
        .expense-card-label {
          font-size: 0.78rem;
          color: #a0a0a0;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .expense-card-amount {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #f5f5f5;
        }
        .expense-gold-text {
          color: #c9a96e !important;
        }
        .expense-card-hint {
          font-size: 0.75rem;
          color: #666;
        }
        .expense-budget-edit {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .expense-budget-input {
          width: 120px;
          padding: 8px 10px;
          background: #1a1a22;
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 8px;
          color: #c9a96e;
          font-size: 1.1rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
        }
        .expense-budget-save {
          padding: 8px 14px;
          background: rgba(201,169,110,0.15);
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 8px;
          color: #c9a96e;
          font-size: 0.82rem;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .expense-budget-save:hover {
          background: rgba(201,169,110,0.25);
        }

        /* Analytics Row */
        .expense-analytics-row {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 20px;
          margin-bottom: 36px;
        }
        @media (max-width: 768px) {
          .expense-analytics-row { grid-template-columns: 1fr; }
        }
        .expense-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .expense-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: #a0a0a0;
          background: #1a1a22;
          padding: 4px 10px;
          border-radius: 20px;
        }

        /* Ring Card */
        .expense-ring-card {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 14px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .expense-ring-wrap {
          position: relative;
          width: 180px;
          height: 180px;
        }
        .expense-ring-svg {
          width: 100%;
          height: 100%;
        }
        .expense-ring-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .expense-ring-pct {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
          color: #c9a96e;
        }
        .expense-ring-label {
          font-size: 0.8rem;
          color: #a0a0a0;
        }

        /* Category Card */
        .expense-category-card {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 14px;
          padding: 28px 24px;
        }
        .expense-category-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .expense-category-item {}
        .expense-category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .expense-category-name {
          font-size: 0.9rem;
          color: #e0e0e0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .expense-category-icon {
          font-size: 1.1rem;
        }
        .expense-category-amount {
          font-size: 0.88rem;
          color: #a0a0a0;
          font-weight: 500;
        }
        .expense-bar-track {
          width: 100%;
          height: 6px;
          background: #1a1a22;
          border-radius: 3px;
          overflow: hidden;
        }
        .expense-bar-fill {
          height: 100%;
          border-radius: 3px;
          min-width: 0;
        }

        /* Form Card */
        .expense-form-card {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 14px;
          padding: 28px 24px;
          margin-bottom: 36px;
        }
        .expense-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          align-items: end;
        }
        @media (max-width: 600px) {
          .expense-form { grid-template-columns: 1fr; }
        }
        .expense-form-group {
          display: flex;
          flex-direction: column;
        }
        .expense-input {
          padding: 12px 16px;
          background: #1a1a22;
          border: 1px solid #1e1e24;
          border-radius: 10px;
          color: #e0e0e0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .expense-input:focus {
          border-color: rgba(201,169,110,0.5);
        }
        .expense-input::placeholder {
          color: #555;
        }
        .expense-add-btn {
          grid-column: 1 / -1;
          padding: 14px 24px;
          background: linear-gradient(135deg, #c9a96e, #d4af37);
          border: none;
          border-radius: 10px;
          color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
          letter-spacing: 0.02em;
        }
        .expense-add-btn:hover {
          opacity: 0.9;
        }

        /* Expense List Card */
        .expense-list-card {
          background: #111116;
          border: 1px solid #1e1e24;
          border-radius: 14px;
          padding: 28px 24px;
        }
        .expense-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .expense-empty {
          text-align: center;
          color: #555;
          padding: 32px 0;
          font-size: 0.95rem;
        }
        .expense-list-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          border-radius: 10px;
          transition: background 0.15s;
        }
        .expense-list-item:hover {
          background: #1a1a22;
        }
        .expense-list-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        .expense-list-details {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .expense-list-desc {
          font-size: 0.92rem;
          color: #e0e0e0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .expense-list-meta {
          display: flex;
          gap: 12px;
          font-size: 0.78rem;
          color: #666;
        }
        .expense-list-cat {
          color: #a0a0a0;
        }
        .expense-list-date {}
        .expense-list-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .expense-list-amount {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #f5f5f5;
          white-space: nowrap;
        }
        .expense-delete-btn {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          border: 1px solid transparent;
          background: transparent;
          color: #555;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .expense-delete-btn:hover {
          background: rgba(229,57,53,0.12);
          border-color: rgba(229,57,53,0.3);
          color: #e53935;
        }
      `}</style>
    </div>
  );
}
