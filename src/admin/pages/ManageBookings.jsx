import { useState, useMemo } from 'react'
import { useAdmin } from '../AdminContext'
import { Link } from 'react-router-dom'

export default function ManageBookings() {
  const { bookings, updateBookingStatus } = useAdmin()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  const formatCurrency = (v) => '$' + Number(v).toLocaleString('en-US')
  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  /* ── Summary cards ── */
  const totalBookings = bookings.length
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length
  const pendingCount = bookings.filter(b => b.status === 'pending').length
  const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.amount, 0)

  /* ── Filtering ── */
  const filtered = useMemo(() => {
    return bookings.filter(b => {
      if (statusFilter !== 'All' && b.status !== statusFilter.toLowerCase()) return false
      if (search) {
        const q = search.toLowerCase()
        if (!b.user.toLowerCase().includes(q) && !b.destination.toLowerCase().includes(q) && !b.id.toLowerCase().includes(q)) return false
      }
      if (dateFrom) {
        const from = new Date(dateFrom)
        if (new Date(b.createdAt) < from) return false
      }
      if (dateTo) {
        const to = new Date(dateTo)
        to.setHours(23, 59, 59, 999)
        if (new Date(b.createdAt) > to) return false
      }
      return true
    })
  }, [bookings, search, statusFilter, dateFrom, dateTo])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * perPage, safePage * perPage)

  const statusColors = { confirmed: '#22c55e', pending: '#eab308', cancelled: '#ef4444', completed: '#3b82f6' }

  const handleStatusChange = (id, newStatus) => {
    updateBookingStatus(id, newStatus)
  }

  return (
    <div className="adm-bk-page">
      <style>{`
        .adm-bk-page { padding: 0; min-height: 100%; font-family: 'DM Sans', sans-serif; }

        .admin-layout--dark .adm-bk-page { color: #e0e0e0; }
        .admin-layout--light .adm-bk-page { color: #262626; }

        .admin-layout--dark .adm-bk-card { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-bk-card { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }

        .admin-layout--dark .adm-bk-gold { color: #c9a96e; }
        .admin-layout--light .adm-bk-gold { color: #8b6914; }

        .admin-layout--dark .adm-bk-input {
          background: #12121a; border: 1px solid #2a2a32; color: #e0e0e0;
        }
        .admin-layout--light .adm-bk-input {
          background: #f9f9f9; border: 1px solid #e5e5e5; color: #262626;
        }

        .admin-layout--dark .adm-bk-table th { background: #12121a; border-bottom: 2px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-bk-table th { background: #f9f9f9; border-bottom: 2px solid #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-bk-table td { border-bottom: 1px solid #2a2a32; }
        .admin-layout--light .adm-bk-table td { border-bottom: 1px solid #e5e5e5; }

        /* ── Header ── */
        .adm-bk-header { margin-bottom: 24px; }
        .adm-bk-header h1 { font-size: 28px; font-weight: 700; margin: 0; }
        .adm-bk-breadcrumb { font-size: 13px; opacity: 0.6; margin-bottom: 4px; }
        .adm-bk-breadcrumb a { text-decoration: none; }
        .admin-layout--dark .adm-bk-breadcrumb a { color: #c9a96e; }
        .admin-layout--light .adm-bk-breadcrumb a { color: #8b6914; }

        /* ── Summary cards ── */
        .adm-bk-summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        @media (max-width: 900px) { .adm-bk-summary { grid-template-columns: repeat(2, 1fr); } }
        .adm-bk-card { border-radius: 12px; padding: 18px 22px; }
        .adm-bk-card-label { font-size: 13px; opacity: 0.6; margin-bottom: 6px; }
        .adm-bk-card-value { font-size: 26px; font-weight: 800; }

        /* ── Filter bar ── */
        .adm-bk-filters { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; align-items: center; }
        .adm-bk-input {
          padding: 9px 14px; border-radius: 8px; font-size: 14px; outline: none;
          font-family: 'DM Sans', sans-serif; transition: border-color 0.2s;
        }
        .adm-bk-input:focus { border-color: #c9a96e; }
        .adm-bk-search { flex: 1; min-width: 180px; }
        .adm-bk-select { min-width: 140px; cursor: pointer; }
        .adm-bk-date-label { font-size: 12px; opacity: 0.6; margin-right: -6px; }

        /* ── Table ── */
        .adm-bk-table-wrap { overflow-x: auto; border-radius: 12px; }
        .adm-bk-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .adm-bk-table th {
          text-align: left; padding: 12px 14px; font-size: 12px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;
        }
        .adm-bk-table td { padding: 12px 14px; white-space: nowrap; }

        .adm-bk-badge {
          padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.5px; display: inline-block;
        }

        .adm-bk-action-select {
          padding: 6px 10px; border-radius: 6px; font-size: 12px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 600;
        }
        .admin-layout--dark .adm-bk-action-select { background: #2a2a32; border: 1px solid #3a3a42; color: #e0e0e0; }
        .admin-layout--light .adm-bk-action-select { background: #f0f0f0; border: 1px solid #ddd; color: #262626; }

        /* ── Pagination ── */
        .adm-bk-pagination { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; font-size: 14px; }
        .adm-bk-pagination-info { opacity: 0.6; }
        .adm-bk-pagination-btns { display: flex; gap: 8px; }
        .adm-bk-page-btn {
          padding: 7px 16px; border-radius: 6px; font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity 0.2s;
        }
        .adm-bk-page-btn:disabled { opacity: 0.35; cursor: default; }
        .admin-layout--dark .adm-bk-page-btn { background: #2a2a32; border: 1px solid #3a3a42; color: #e0e0e0; }
        .admin-layout--light .adm-bk-page-btn { background: #f0f0f0; border: 1px solid #ddd; color: #262626; }
        .adm-bk-page-btn:not(:disabled):hover { opacity: 0.7; }

        .adm-bk-empty { text-align: center; padding: 40px; opacity: 0.5; }
      `}</style>

      <div className="adm-bk-header">
        <div className="adm-bk-breadcrumb"><Link to="/admin">Dashboard</Link> / Bookings</div>
        <h1>Booking Management</h1>
      </div>

      {/* ── Summary cards ── */}
      <div className="adm-bk-summary">
        <div className="adm-bk-card">
          <div className="adm-bk-card-label">Total Bookings</div>
          <div className="adm-bk-card-value">{totalBookings}</div>
        </div>
        <div className="adm-bk-card">
          <div className="adm-bk-card-label">Confirmed</div>
          <div className="adm-bk-card-value" style={{ color: '#22c55e' }}>{confirmedCount}</div>
        </div>
        <div className="adm-bk-card">
          <div className="adm-bk-card-label">Pending</div>
          <div className="adm-bk-card-value" style={{ color: '#eab308' }}>{pendingCount}</div>
        </div>
        <div className="adm-bk-card">
          <div className="adm-bk-card-label">Revenue</div>
          <div className="adm-bk-card-value adm-bk-gold">{formatCurrency(totalRevenue)}</div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="adm-bk-filters">
        <input
          className="adm-bk-input adm-bk-search"
          type="text"
          placeholder="Search by user, destination, or ID..."
          value={search}
          onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
        />
        <select className="adm-bk-input adm-bk-select" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
          <option value="All">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
        <span className="adm-bk-date-label">From</span>
        <input className="adm-bk-input" type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setCurrentPage(1); }} />
        <span className="adm-bk-date-label">To</span>
        <input className="adm-bk-input" type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setCurrentPage(1); }} />
      </div>

      {/* ── Table ── */}
      <div className="adm-bk-card adm-bk-table-wrap">
        <table className="adm-bk-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Destination</th>
              <th>Hotel</th>
              <th>Guests</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr><td colSpan={9} className="adm-bk-empty">No bookings found.</td></tr>
            )}
            {paginated.map(b => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600 }}>{b.id}</td>
                <td>{b.user}</td>
                <td>{b.destination}</td>
                <td>{b.hotel}</td>
                <td>{b.guests}</td>
                <td style={{ fontWeight: 700 }}>{formatCurrency(b.amount)}</td>
                <td>
                  <span
                    className="adm-bk-badge"
                    style={{
                      background: `${statusColors[b.status]}20`,
                      color: statusColors[b.status],
                    }}
                  >
                    {b.status}
                  </span>
                </td>
                <td>{formatDate(b.createdAt)}</td>
                <td>
                  <select
                    className="adm-bk-action-select"
                    value=""
                    onChange={e => { if (e.target.value) handleStatusChange(b.id, e.target.value); }}
                  >
                    <option value="" disabled>Change...</option>
                    {b.status !== 'confirmed' && <option value="confirmed">Confirm</option>}
                    {b.status !== 'cancelled' && <option value="cancelled">Cancel</option>}
                    {b.status !== 'completed' && <option value="completed">Complete</option>}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="adm-bk-pagination">
        <span className="adm-bk-pagination-info">
          Showing {filtered.length === 0 ? 0 : (safePage - 1) * perPage + 1}–{Math.min(safePage * perPage, filtered.length)} of {filtered.length}
        </span>
        <div className="adm-bk-pagination-btns">
          <button className="adm-bk-page-btn" disabled={safePage <= 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
          <button className="adm-bk-page-btn" disabled={safePage >= totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  )
}
