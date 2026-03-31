import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { CITY_LIST } from '../data/travelData'

const MOCK_MEMBERS = [
  { name: 'You', avatar: 'Y', color: '#0ea5e9' },
  { name: 'Alex', avatar: 'A', color: '#f97316' },
  { name: 'Sam', avatar: 'S', color: '#e04e2a' },
  { name: 'Jordan', avatar: 'J', color: '#6366f1' },
]

export default function GroupTripPage() {
  const { user, setShowAuth, convertPrice, groupTrips, createGroupTrip, setGroupTrips } = useApp()
  const [step, setStep] = useState('list') // list, create, detail
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [tripName, setTripName] = useState('')
  const [inviteLink, setInviteLink] = useState('')
  const [showExpenses, setShowExpenses] = useState(false)
  const [newExpense, setNewExpense] = useState({ desc: '', amount: '', paidBy: 'You' })

  /* ── Destination Voting ── */
  const destinationOptions = CITY_LIST.slice(0, 6)

  const handleCreateTrip = (e) => {
    e.preventDefault()
    if (!user) { setShowAuth(true); return }
    if (!tripName.trim()) return
    const trip = createGroupTrip({
      name: tripName,
      destinations: destinationOptions.slice(0, 4).map(d => ({ ...d, votes: [] })),
      members: MOCK_MEMBERS,
      expenses: [],
      hotelVotes: {},
      status: 'planning',
    })
    setSelectedTrip({ ...trip, destinations: destinationOptions.slice(0, 4).map(d => ({ ...d, votes: [] })), members: MOCK_MEMBERS, expenses: [] })
    setInviteLink(`https://wanderlust.app/group/${trip.id}`)
    setTripName('')
    setStep('detail')
  }

  const handleVote = (destId) => {
    if (!selectedTrip) return
    setSelectedTrip(prev => ({
      ...prev,
      destinations: prev.destinations.map(d =>
        d.id === destId
          ? { ...d, votes: d.votes.includes('You') ? d.votes.filter(v => v !== 'You') : [...d.votes, 'You'] }
          : d
      )
    }))
  }

  const addExpense = (e) => {
    e.preventDefault()
    if (!newExpense.desc || !newExpense.amount) return
    setSelectedTrip(prev => ({
      ...prev,
      expenses: [...prev.expenses, { ...newExpense, id: Date.now(), amount: parseFloat(newExpense.amount) }]
    }))
    setNewExpense({ desc: '', amount: '', paidBy: 'You' })
  }

  const totalExpenses = selectedTrip?.expenses?.reduce((sum, e) => sum + e.amount, 0) || 0
  const perPerson = totalExpenses / (selectedTrip?.members?.length || 1)

  const copyLink = () => {
    navigator.clipboard?.writeText(inviteLink)
    alert('Invite link copied!')
  }

  return (
    <div className="group-page">
      {/* Hero */}
      <div className="group-hero">
        <div className="container">
          <h1>Group Trip Planner</h1>
          <p>Plan trips together, vote on destinations, and split expenses with friends</p>
        </div>
      </div>

      <div className="container group-content">
        {/* ── Trip List ── */}
        {step === 'list' && (
          <>
            <div className="group-actions-bar">
              <h2>Your Group Trips</h2>
              <button className="btn btn-primary" onClick={() => setStep('create')}>+ Create Group Trip</button>
            </div>

            {groupTrips.length === 0 ? (
              <div className="group-empty">
                <span></span>
                <h3>No group trips yet</h3>
                <p>Create a group trip and invite your friends to start planning together!</p>
                <button className="btn btn-primary" onClick={() => setStep('create')}>Create Your First Group Trip</button>
              </div>
            ) : (
              <div className="group-trips-grid">
                {groupTrips.map(trip => (
                  <div key={trip.id} className="group-trip-card" onClick={() => { setSelectedTrip({ ...trip, destinations: destinationOptions.slice(0, 4).map(d => ({ ...d, votes: [] })), members: MOCK_MEMBERS, expenses: [] }); setStep('detail') }}>
                    <div className="group-trip-header">
                      <h3>{trip.name}</h3>
                      <span className={`group-trip-status ${trip.status}`}>{trip.status}</span>
                    </div>
                    <div className="group-trip-members">
                      {(trip.members || MOCK_MEMBERS).slice(0, 4).map((m, i) => (
                        <span key={i} className="group-member-avatar" style={{ background: m.color || '#0ea5e9', zIndex: 4 - i }}>{m.avatar}</span>
                      ))}
                      <span className="group-member-count">{(trip.members || MOCK_MEMBERS).length} members</span>
                    </div>
                    <p className="group-trip-date">Created {new Date(trip.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Create Trip ── */}
        {step === 'create' && (
          <div className="group-create">
            <button className="btn btn-outline btn-sm" onClick={() => setStep('list')}>{'\u2190'} Back</button>
            <div className="group-create-card">
              <h2>Create a New Group Trip</h2>
              <form onSubmit={handleCreateTrip}>
                <div className="auth-field">
                  <label>Trip Name</label>
                  <input type="text" value={tripName} onChange={e => setTripName(e.target.value)} placeholder="e.g., Summer 2026 Squad Trip" required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}>Create Trip</button>
              </form>
            </div>
          </div>
        )}

        {/* ── Trip Detail ── */}
        {step === 'detail' && selectedTrip && (
          <>
            <button className="btn btn-outline btn-sm" onClick={() => setStep('list')} style={{ marginBottom: 24 }}>{'\u2190'} Back to Trips</button>

            <div className="group-detail-header">
              <div>
                <h2>{selectedTrip.name}</h2>
                <p>{selectedTrip.members?.length || 0} members &bull; Status: {selectedTrip.status || 'Planning'}</p>
              </div>
              <div className="group-invite-section">
                <input type="text" value={inviteLink || `https://wanderlust.app/group/${selectedTrip.id}`} readOnly className="group-invite-input" />
                <button className="btn btn-primary btn-sm" onClick={copyLink}>Copy Link</button>
              </div>
            </div>

            {/* Members */}
            <div className="group-section">
              <h3>Members</h3>
              <div className="group-members-grid">
                {(selectedTrip.members || MOCK_MEMBERS).map((m, i) => (
                  <div key={i} className="group-member-card">
                    <span className="group-member-big-avatar" style={{ background: m.color }}>{m.avatar}</span>
                    <span>{m.name}</span>
                  </div>
                ))}
                <button className="group-member-add">+ Invite</button>
              </div>
            </div>

            {/* Destination Voting */}
            <div className="group-section">
              <h3>Vote on Destination</h3>
              <p>Select your preferred destinations. Most votes wins!</p>
              <div className="group-vote-grid">
                {(selectedTrip.destinations || []).map(dest => {
                  const voted = dest.votes?.includes('You')
                  return (
                    <div key={dest.id} className={`group-vote-card${voted ? ' voted' : ''}`} onClick={() => handleVote(dest.id)}>
                      <img src={dest.heroImage} alt={dest.name} onError={e => { e.target.src = 'https://images.unsplash.com/photo-1488646472631-26d0e2c95e6d?w=400&q=80' }} />
                      <div className="group-vote-overlay">
                        <h4>{dest.name}</h4>
                        <p>{dest.country}</p>
                        <div className="group-vote-count">
                          <span className="group-vote-num">{dest.votes?.length || 0}</span>
                          <span>vote{(dest.votes?.length || 0) !== 1 ? 's' : ''}</span>
                        </div>
                        <span className={`group-vote-btn${voted ? ' active' : ''}`}>
                          {voted ? 'Voted' : 'Vote'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Expense Splitting */}
            <div className="group-section">
              <div className="group-section-header">
                <h3>Expense Splitting</h3>
                <button className="btn btn-outline btn-sm" onClick={() => setShowExpenses(!showExpenses)}>
                  {showExpenses ? 'Hide' : 'Show'} Details
                </button>
              </div>

              <div className="group-expense-summary">
                <div className="group-expense-stat">
                  <span className="group-expense-total">{convertPrice(totalExpenses)}</span>
                  <span>Total Expenses</span>
                </div>
                <div className="group-expense-stat">
                  <span className="group-expense-per">{convertPrice(perPerson)}</span>
                  <span>Per Person</span>
                </div>
              </div>

              {showExpenses && (
                <>
                  <form onSubmit={addExpense} className="group-expense-form">
                    <input type="text" value={newExpense.desc} onChange={e => setNewExpense(p => ({ ...p, desc: e.target.value }))} placeholder="Description" required />
                    <input type="number" value={newExpense.amount} onChange={e => setNewExpense(p => ({ ...p, amount: e.target.value }))} placeholder="Amount ($)" required min="0" step="0.01" />
                    <select value={newExpense.paidBy} onChange={e => setNewExpense(p => ({ ...p, paidBy: e.target.value }))}>
                      {(selectedTrip.members || MOCK_MEMBERS).map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                    </select>
                    <button type="submit" className="btn btn-primary btn-sm">Add</button>
                  </form>

                  {selectedTrip.expenses?.length > 0 && (
                    <div className="group-expense-list">
                      {selectedTrip.expenses.map(exp => (
                        <div key={exp.id} className="group-expense-item">
                          <span>{exp.desc}</span>
                          <span>{convertPrice(exp.amount)}</span>
                          <span className="group-expense-payer">Paid by {exp.paidBy}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Split Breakdown */}
                  <div className="group-split-breakdown">
                    <h4>Split Breakdown</h4>
                    {(selectedTrip.members || MOCK_MEMBERS).map(m => {
                      const paid = selectedTrip.expenses?.filter(e => e.paidBy === m.name).reduce((s, e) => s + e.amount, 0) || 0
                      const owes = perPerson - paid
                      return (
                        <div key={m.name} className="group-split-row">
                          <span className="group-split-avatar" style={{ background: m.color }}>{m.avatar}</span>
                          <span>{m.name}</span>
                          <span>Paid: {convertPrice(paid)}</span>
                          <span className={owes > 0 ? 'owes' : 'owed'}>{owes > 0 ? `Owes: ${convertPrice(owes)}` : owes < 0 ? `Gets back: ${convertPrice(Math.abs(owes))}` : 'Settled'}</span>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
