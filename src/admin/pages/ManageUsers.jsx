import { useState, useMemo } from 'react'
import { useAdmin } from '../AdminContext'
import { Link } from 'react-router-dom'

export default function ManageUsers() {
  const { users, addToast } = useAdmin()

  /* Local copy so we can toggle block/unblock without modifying context */
  const [localUsers, setLocalUsers] = useState(() => users.map(u => ({ ...u })))
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [expandedUser, setExpandedUser] = useState(null)
  const [blockConfirm, setBlockConfirm] = useState(null)

  const formatCurrency = (v) => '$' + Number(v).toLocaleString('en-US')
  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  /* ── Stats ── */
  const totalUsers = localUsers.length
  const activeUsers = localUsers.filter(u => u.status === 'active').length
  const blockedUsers = localUsers.filter(u => u.status === 'blocked').length
  const totalRevenue = localUsers.reduce((s, u) => s + u.totalSpent, 0)

  /* ── Filtering ── */
  const filtered = useMemo(() => {
    return localUsers.filter(u => {
      if (statusFilter !== 'All' && u.status !== statusFilter.toLowerCase()) return false
      if (search) {
        const q = search.toLowerCase()
        if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [localUsers, search, statusFilter])

  const toggleExpand = (id) => {
    setExpandedUser(prev => prev === id ? null : id)
  }

  const handleBlockToggle = (user) => {
    if (user.status === 'active') {
      setBlockConfirm(user)
    } else {
      doUnblock(user.id)
    }
  }

  const doBlock = () => {
    if (!blockConfirm) return
    setLocalUsers(prev => prev.map(u => u.id === blockConfirm.id ? { ...u, status: 'blocked' } : u))
    addToast(`${blockConfirm.name} has been blocked`, 'warning')
    setBlockConfirm(null)
  }

  const doUnblock = (id) => {
    const user = localUsers.find(u => u.id === id)
    setLocalUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'active' } : u))
    if (user) addToast(`${user.name} has been unblocked`, 'success')
  }

  /* ── Mock booking history for expanded row ── */
  const getMockHistory = (user) => {
    const count = user.bookings
    const dests = ['Paris', 'Tokyo', 'Bali', 'Dubai', 'Maldives', 'Santorini', 'New York']
    return Array.from({ length: count }, (_, i) => ({
      id: `BK-${String(2000 + i).padStart(4, '0')}`,
      destination: dests[i % dests.length],
      amount: Math.floor(user.totalSpent / Math.max(count, 1)),
      status: i === 0 ? 'completed' : i === 1 ? 'confirmed' : 'completed',
    }))
  }

  const getBadges = (user) => {
    const badges = []
    if (user.bookings >= 5) badges.push('Frequent Traveler')
    if (user.totalSpent >= 3000) badges.push('Big Spender')
    if (user.points >= 1000) badges.push('Points Master')
    if (badges.length === 0) badges.push('New Member')
    return badges
  }

  const statusColors = { active: '#22c55e', blocked: '#ef4444' }

  return (
    <div className="adm-usr-page">
      <style>{`
        .adm-usr-page { padding: 0; min-height: 100%; font-family: 'DM Sans', sans-serif; }

        .admin-layout--dark .adm-usr-page { color: #e0e0e0; }
        .admin-layout--light .adm-usr-page { color: #262626; }

        .admin-layout--dark .adm-usr-card { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-usr-card { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }

        .admin-layout--dark .adm-usr-gold { color: #c9a96e; }
        .admin-layout--light .adm-usr-gold { color: #8b6914; }

        .admin-layout--dark .adm-usr-input { background: #12121a; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-usr-input { background: #f9f9f9; border: 1px solid #e5e5e5; color: #262626; }

        .admin-layout--dark .adm-usr-table th { background: #12121a; border-bottom: 2px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-usr-table th { background: #f9f9f9; border-bottom: 2px solid #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-usr-table td { border-bottom: 1px solid #2a2a32; }
        .admin-layout--light .adm-usr-table td { border-bottom: 1px solid #e5e5e5; }

        .admin-layout--dark .adm-usr-expand-row { background: #12121a; }
        .admin-layout--light .adm-usr-expand-row { background: #f9f9f9; }

        .admin-layout--dark .adm-usr-overlay { background: rgba(0,0,0,0.7); }
        .admin-layout--light .adm-usr-overlay { background: rgba(0,0,0,0.4); }
        .admin-layout--dark .adm-usr-modal { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-usr-modal { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }

        /* ── Header ── */
        .adm-usr-header { margin-bottom: 24px; }
        .adm-usr-header h1 { font-size: 28px; font-weight: 700; margin: 0; }
        .adm-usr-breadcrumb { font-size: 13px; opacity: 0.6; margin-bottom: 4px; }
        .adm-usr-breadcrumb a { text-decoration: none; }
        .admin-layout--dark .adm-usr-breadcrumb a { color: #c9a96e; }
        .admin-layout--light .adm-usr-breadcrumb a { color: #8b6914; }

        /* ── Stats ── */
        .adm-usr-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        @media (max-width: 900px) { .adm-usr-stats { grid-template-columns: repeat(2, 1fr); } }
        .adm-usr-card { border-radius: 12px; padding: 18px 22px; }
        .adm-usr-card-label { font-size: 13px; opacity: 0.6; margin-bottom: 6px; }
        .adm-usr-card-value { font-size: 26px; font-weight: 800; }

        /* ── Filter bar ── */
        .adm-usr-filters { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .adm-usr-input {
          padding: 9px 14px; border-radius: 8px; font-size: 14px; outline: none;
          font-family: 'DM Sans', sans-serif; transition: border-color 0.2s;
        }
        .adm-usr-input:focus { border-color: #c9a96e; }
        .adm-usr-search { flex: 1; min-width: 200px; }
        .adm-usr-select { min-width: 140px; cursor: pointer; }

        /* ── Table ── */
        .adm-usr-table-wrap { overflow-x: auto; border-radius: 12px; }
        .adm-usr-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .adm-usr-table th {
          text-align: left; padding: 12px 14px; font-size: 12px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;
        }
        .adm-usr-table td { padding: 12px 14px; white-space: nowrap; }

        .adm-usr-avatar {
          width: 34px; height: 34px; border-radius: 50%; display: inline-flex;
          align-items: center; justify-content: center; font-weight: 700; font-size: 14px;
        }
        .admin-layout--dark .adm-usr-avatar { background: #2a2a32; color: #c9a96e; }
        .admin-layout--light .adm-usr-avatar { background: #f0e6d2; color: #8b6914; }

        .adm-usr-badge {
          padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.5px; display: inline-block;
        }

        .adm-usr-action-btn {
          padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif; border: none;
          margin-right: 6px; transition: opacity 0.2s;
        }
        .adm-usr-action-btn:hover { opacity: 0.8; }
        .adm-usr-btn-view { background: rgba(59,130,246,0.15); color: #3b82f6; }
        .adm-usr-btn-block { background: rgba(239,68,68,0.15); color: #ef4444; }
        .adm-usr-btn-unblock { background: rgba(34,197,94,0.15); color: #22c55e; }

        /* ── Expanded row ── */
        .adm-usr-expand-row td { padding: 0; }
        .adm-usr-expand-inner { padding: 18px 22px; }
        .adm-usr-expand-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 18px; }
        @media (max-width: 900px) { .adm-usr-expand-grid { grid-template-columns: 1fr; } }
        .adm-usr-expand-section h4 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px; opacity: 0.6; }
        .adm-usr-expand-section p { margin: 4px 0; font-size: 13px; }
        .adm-usr-history-item { font-size: 13px; padding: 4px 0; display: flex; justify-content: space-between; }
        .adm-usr-badge-chip {
          display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px;
          font-weight: 600; margin-right: 6px; margin-bottom: 4px;
        }
        .admin-layout--dark .adm-usr-badge-chip { background: rgba(201,169,110,0.15); color: #c9a96e; }
        .admin-layout--light .adm-usr-badge-chip { background: rgba(139,105,20,0.12); color: #8b6914; }

        /* ── Confirm modal ── */
        .adm-usr-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: center;
        }
        .adm-usr-modal {
          border-radius: 14px; padding: 28px; width: 420px; max-width: 94vw; text-align: center;
        }
        .adm-usr-modal h2 { font-size: 20px; font-weight: 700; margin: 0 0 8px; }
        .adm-usr-modal p { font-size: 14px; opacity: 0.7; margin: 0 0 22px; }
        .adm-usr-modal-actions { display: flex; gap: 10px; }
        .adm-usr-modal-confirm {
          flex: 1; padding: 10px; border: none; border-radius: 8px; background: #ef4444; color: #fff;
          font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .adm-usr-modal-cancel {
          flex: 1; padding: 10px; border-radius: 8px; font-size: 14px; font-weight: 600;
          cursor: pointer; background: transparent; font-family: 'DM Sans', sans-serif;
        }
        .admin-layout--dark .adm-usr-modal-cancel { border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-usr-modal-cancel { border: 1px solid #e5e5e5; color: #262626; }

        .adm-usr-empty { text-align: center; padding: 40px; opacity: 0.5; }
      `}</style>

      <div className="adm-usr-header">
        <div className="adm-usr-breadcrumb"><Link to="/admin">Dashboard</Link> / Users</div>
        <h1>User Management</h1>
      </div>

      {/* ── Stats cards ── */}
      <div className="adm-usr-stats">
        <div className="adm-usr-card">
          <div className="adm-usr-card-label">Total Users</div>
          <div className="adm-usr-card-value">{totalUsers}</div>
        </div>
        <div className="adm-usr-card">
          <div className="adm-usr-card-label">Active Users</div>
          <div className="adm-usr-card-value" style={{ color: '#22c55e' }}>{activeUsers}</div>
        </div>
        <div className="adm-usr-card">
          <div className="adm-usr-card-label">Blocked Users</div>
          <div className="adm-usr-card-value" style={{ color: '#ef4444' }}>{blockedUsers}</div>
        </div>
        <div className="adm-usr-card">
          <div className="adm-usr-card-label">Total Revenue</div>
          <div className="adm-usr-card-value adm-usr-gold">{formatCurrency(totalRevenue)}</div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="adm-usr-filters">
        <input
          className="adm-usr-input adm-usr-search"
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="adm-usr-input adm-usr-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {/* ── Table ── */}
      <div className="adm-usr-card adm-usr-table-wrap">
        <table className="adm-usr-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Bookings</th>
              <th>Total Spent</th>
              <th>Points</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={10} className="adm-usr-empty">No users found.</td></tr>
            )}
            {filtered.map(u => (
              <>
                <tr key={u.id}>
                  <td><span className="adm-usr-avatar">{u.avatar}</span></td>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{formatDate(u.joinDate)}</td>
                  <td>{u.bookings}</td>
                  <td style={{ fontWeight: 700 }}>{formatCurrency(u.totalSpent)}</td>
                  <td>{u.points.toLocaleString()}</td>
                  <td>
                    <span
                      className="adm-usr-badge"
                      style={{ background: `${statusColors[u.status]}20`, color: statusColors[u.status] }}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>{formatDate(u.lastActive)}</td>
                  <td>
                    <button className="adm-usr-action-btn adm-usr-btn-view" onClick={() => toggleExpand(u.id)}>
                      {expandedUser === u.id ? 'Hide' : 'View'}
                    </button>
                    <button
                      className={`adm-usr-action-btn ${u.status === 'active' ? 'adm-usr-btn-block' : 'adm-usr-btn-unblock'}`}
                      onClick={() => handleBlockToggle(u)}
                    >
                      {u.status === 'active' ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
                {expandedUser === u.id && (
                  <tr key={`${u.id}-expand`} className="adm-usr-expand-row">
                    <td colSpan={10}>
                      <div className="adm-usr-expand-inner">
                        <div className="adm-usr-expand-grid">
                          <div className="adm-usr-expand-section">
                            <h4>Booking History</h4>
                            {getMockHistory(u).length === 0 ? (
                              <p style={{ opacity: 0.5 }}>No bookings yet</p>
                            ) : (
                              getMockHistory(u).map(h => (
                                <div className="adm-usr-history-item" key={h.id}>
                                  <span>{h.id} - {h.destination}</span>
                                  <span style={{ fontWeight: 600 }}>{formatCurrency(h.amount)}</span>
                                </div>
                              ))
                            )}
                          </div>
                          <div className="adm-usr-expand-section">
                            <h4>Points & Rewards</h4>
                            <p>Total Points: <strong>{u.points.toLocaleString()}</strong></p>
                            <p>Total Spent: <strong>{formatCurrency(u.totalSpent)}</strong></p>
                            <p>Total Bookings: <strong>{u.bookings}</strong></p>
                          </div>
                          <div className="adm-usr-expand-section">
                            <h4>Badges</h4>
                            <div>
                              {getBadges(u).map((badge, idx) => (
                                <span className="adm-usr-badge-chip" key={idx}>{badge}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Block Confirmation ── */}
      {blockConfirm && (
        <div className="adm-usr-overlay" onClick={() => setBlockConfirm(null)}>
          <div className="adm-usr-modal" onClick={e => e.stopPropagation()}>
            <h2>Block User</h2>
            <p>Are you sure you want to block <strong>{blockConfirm.name}</strong>? They will no longer be able to access their account.</p>
            <div className="adm-usr-modal-actions">
              <button className="adm-usr-modal-confirm" onClick={doBlock}>Block User</button>
              <button className="adm-usr-modal-cancel" onClick={() => setBlockConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
