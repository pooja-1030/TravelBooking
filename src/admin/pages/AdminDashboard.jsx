import { useAdmin } from '../AdminContext'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { metrics, bookings, users, revenueData, adminTheme } = useAdmin()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formatCurrency = (val) =>
    '$' + val.toLocaleString('en-US')

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8)

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
    .slice(0, 5)

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))

  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length
  const pendingCount = bookings.filter((b) => b.status === 'pending').length
  const cancelledCount = bookings.filter((b) => b.status === 'cancelled').length
  const completedCount = bookings.filter((b) => b.status === 'completed').length
  const totalForChart = confirmedCount + pendingCount + cancelledCount + completedCount

  const statusSegments = [
    { label: 'Confirmed', count: confirmedCount, color: '#22c55e' },
    { label: 'Pending', count: pendingCount, color: '#eab308' },
    { label: 'Cancelled', count: cancelledCount, color: '#ef4444' },
    { label: 'Completed', count: completedCount, color: '#3b82f6' },
  ]

  const statusBadgeColor = {
    confirmed: '#22c55e',
    pending: '#eab308',
    cancelled: '#ef4444',
    completed: '#3b82f6',
  }

  return (
    <div className="adm-dash-page">
      <style>{`
        .adm-dash-page {
          padding: 0;
          min-height: 100%;
        }

        /* ── Header ── */
        .adm-dash-header {
          margin-bottom: 28px;
        }
        .adm-dash-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .adm-dash-header-sub {
          font-size: 14px;
          opacity: 0.6;
        }

        /* ── Theme tokens ── */
        .admin-layout--dark .adm-dash-card {
          background: #1a1a22;
          border: 1px solid #2a2a32;
          color: #e0e0e0;
        }
        .admin-layout--light .adm-dash-card {
          background: #ffffff;
          border: 1px solid #e5e5e5;
          color: #262626;
        }
        .admin-layout--dark .adm-dash-gold { color: #c9a96e; }
        .admin-layout--light .adm-dash-gold { color: #8b6914; }
        .admin-layout--dark .adm-dash-header h1 { color: #e0e0e0; }
        .admin-layout--light .adm-dash-header h1 { color: #262626; }
        .admin-layout--dark .adm-dash-header-sub { color: #e0e0e0; }
        .admin-layout--light .adm-dash-header-sub { color: #262626; }

        /* ── Card base ── */
        .adm-dash-card {
          border-radius: 12px;
          padding: 20px;
          transition: box-shadow 0.2s;
        }
        .adm-dash-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }

        /* ── Metrics row ── */
        .adm-dash-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 28px;
        }
        @media (max-width: 1024px) {
          .adm-dash-metrics { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .adm-dash-metrics { grid-template-columns: 1fr; }
        }
        .adm-dash-metric-top {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
        }
        .adm-dash-metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .adm-dash-metric-icon--users { background: rgba(59,130,246,0.15); color: #3b82f6; }
        .adm-dash-metric-icon--calendar { background: rgba(168,85,247,0.15); color: #a855f7; }
        .adm-dash-metric-icon--dollar { background: rgba(34,197,94,0.15); color: #22c55e; }
        .adm-dash-metric-icon--plane { background: rgba(249,115,22,0.15); color: #f97316; }
        .adm-dash-metric-val {
          font-size: 28px;
          font-weight: 700;
          line-height: 1;
        }
        .adm-dash-metric-label {
          font-size: 13px;
          opacity: 0.6;
          margin-top: 2px;
        }
        .adm-dash-metric-trend {
          font-size: 12px;
          color: #22c55e;
          display: flex;
          align-items: center;
          gap: 3px;
          margin-top: 6px;
        }

        /* ── Charts section ── */
        .adm-dash-charts {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
          margin-bottom: 28px;
        }
        @media (max-width: 900px) {
          .adm-dash-charts { grid-template-columns: 1fr; }
        }
        .adm-dash-chart-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        /* Revenue bar chart */
        .adm-dash-bars {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 180px;
          padding-top: 10px;
        }
        .adm-dash-bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
          position: relative;
        }
        .adm-dash-bar {
          width: 100%;
          max-width: 36px;
          border-radius: 4px 4px 0 0;
          transition: opacity 0.2s;
          position: relative;
          cursor: pointer;
        }
        .admin-layout--dark .adm-dash-bar {
          background: linear-gradient(180deg, #c9a96e 0%, #8b6914 100%);
        }
        .admin-layout--light .adm-dash-bar {
          background: linear-gradient(180deg, #c9a96e 0%, #8b6914 100%);
        }
        .adm-dash-bar:hover {
          opacity: 0.8;
        }
        .adm-dash-bar-tooltip {
          display: none;
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          z-index: 5;
          pointer-events: none;
        }
        .admin-layout--dark .adm-dash-bar-tooltip {
          background: #2a2a32;
          color: #e0e0e0;
        }
        .admin-layout--light .adm-dash-bar-tooltip {
          background: #262626;
          color: #fff;
        }
        .adm-dash-bar:hover .adm-dash-bar-tooltip {
          display: block;
        }
        .adm-dash-bar-month {
          font-size: 11px;
          margin-top: 6px;
          opacity: 0.6;
        }

        /* Booking status stacked bar */
        .adm-dash-stacked-bar {
          height: 28px;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          margin-bottom: 20px;
        }
        .adm-dash-stacked-seg {
          height: 100%;
          transition: flex 0.3s;
        }
        .adm-dash-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .adm-dash-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
        }
        .adm-dash-legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .adm-dash-legend-val {
          font-weight: 600;
          margin-left: 2px;
        }

        /* ── Secondary metrics ── */
        .adm-dash-secondary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 28px;
        }
        @media (max-width: 1024px) {
          .adm-dash-secondary { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .adm-dash-secondary { grid-template-columns: 1fr; }
        }
        .adm-dash-sec-val {
          font-size: 24px;
          font-weight: 700;
        }
        .adm-dash-sec-label {
          font-size: 13px;
          opacity: 0.6;
          margin-top: 2px;
        }
        .adm-dash-sec-icon {
          font-size: 22px;
          margin-bottom: 8px;
        }

        /* ── Bottom grid ── */
        .adm-dash-bottom {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-bottom: 28px;
        }
        @media (max-width: 900px) {
          .adm-dash-bottom { grid-template-columns: 1fr; }
        }

        /* ── Table ── */
        .adm-dash-table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .adm-dash-table-header h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }
        .adm-dash-viewall {
          font-size: 13px;
          text-decoration: none;
          font-weight: 500;
        }
        .admin-layout--dark .adm-dash-viewall { color: #c9a96e; }
        .admin-layout--light .adm-dash-viewall { color: #8b6914; }
        .adm-dash-viewall:hover { text-decoration: underline; }

        .adm-dash-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .adm-dash-table th {
          text-align: left;
          padding: 8px 10px;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 0.5;
        }
        .adm-dash-table td {
          padding: 10px 10px;
        }
        .admin-layout--dark .adm-dash-table tr + tr td {
          border-top: 1px solid #2a2a32;
        }
        .admin-layout--light .adm-dash-table tr + tr td {
          border-top: 1px solid #e5e5e5;
        }
        .adm-dash-badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: capitalize;
        }

        /* ── Recent users sidebar ── */
        .adm-dash-user-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
        }
        .admin-layout--dark .adm-dash-user-item + .adm-dash-user-item {
          border-top: 1px solid #2a2a32;
        }
        .admin-layout--light .adm-dash-user-item + .adm-dash-user-item {
          border-top: 1px solid #e5e5e5;
        }
        .adm-dash-user-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }
        .admin-layout--dark .adm-dash-user-avatar {
          background: rgba(201,169,110,0.15);
          color: #c9a96e;
        }
        .admin-layout--light .adm-dash-user-avatar {
          background: rgba(139,105,20,0.15);
          color: #8b6914;
        }
        .adm-dash-user-info {
          flex: 1;
          min-width: 0;
        }
        .adm-dash-user-name {
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .adm-dash-user-email {
          font-size: 11px;
          opacity: 0.5;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .adm-dash-user-date {
          font-size: 11px;
          opacity: 0.5;
          flex-shrink: 0;
        }

        /* ── Quick actions ── */
        .adm-dash-actions {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }
        @media (max-width: 800px) {
          .adm-dash-actions { grid-template-columns: repeat(2, 1fr); }
        }
        .adm-dash-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.15s, box-shadow 0.15s;
          cursor: pointer;
        }
        .adm-dash-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .admin-layout--dark .adm-dash-action-btn {
          background: linear-gradient(135deg, #c9a96e, #a88a4e);
          color: #1a1a22;
        }
        .admin-layout--light .adm-dash-action-btn {
          background: linear-gradient(135deg, #8b6914, #6b4f0e);
          color: #ffffff;
        }
      `}</style>

      {/* ── 1. Page Header ── */}
      <div className="adm-dash-header">
        <h1>Dashboard</h1>
        <div className="adm-dash-header-sub">
          Welcome back, Admin &mdash; {today}
        </div>
      </div>

      {/* ── 2. Metrics Row ── */}
      <div className="adm-dash-metrics">
        <div className="adm-dash-card">
          <div className="adm-dash-metric-top">
            <div className="adm-dash-metric-icon adm-dash-metric-icon--users">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <div className="adm-dash-metric-val">{metrics.totalUsers}</div>
              <div className="adm-dash-metric-label">Total Users</div>
            </div>
          </div>
          <div className="adm-dash-metric-trend">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l5-5 5 5"/><path d="M12 12V4"/></svg>
            +12%
          </div>
        </div>

        <div className="adm-dash-card">
          <div className="adm-dash-metric-top">
            <div className="adm-dash-metric-icon adm-dash-metric-icon--calendar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div>
              <div className="adm-dash-metric-val">{metrics.totalBookings}</div>
              <div className="adm-dash-metric-label">Total Bookings</div>
            </div>
          </div>
          <div className="adm-dash-metric-trend">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l5-5 5 5"/><path d="M12 12V4"/></svg>
            +8%
          </div>
        </div>

        <div className="adm-dash-card">
          <div className="adm-dash-metric-top">
            <div className="adm-dash-metric-icon adm-dash-metric-icon--dollar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <div className="adm-dash-metric-val">{formatCurrency(metrics.revenue)}</div>
              <div className="adm-dash-metric-label">Revenue</div>
            </div>
          </div>
          <div className="adm-dash-metric-trend">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17l5-5 5 5"/><path d="M12 12V4"/></svg>
            +15%
          </div>
        </div>

        <div className="adm-dash-card">
          <div className="adm-dash-metric-top">
            <div className="adm-dash-metric-icon adm-dash-metric-icon--plane">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
            </div>
            <div>
              <div className="adm-dash-metric-val">{metrics.activeTrips}</div>
              <div className="adm-dash-metric-label">Active Trips</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Charts Section ── */}
      <div className="adm-dash-charts">
        <div className="adm-dash-card">
          <div className="adm-dash-chart-title">Revenue Overview</div>
          <div className="adm-dash-bars">
            {revenueData.map((d) => (
              <div className="adm-dash-bar-col" key={d.month}>
                <div
                  className="adm-dash-bar"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                >
                  <div className="adm-dash-bar-tooltip">
                    {formatCurrency(d.revenue)}
                  </div>
                </div>
                <span className="adm-dash-bar-month">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="adm-dash-card">
          <div className="adm-dash-chart-title">Booking Status Breakdown</div>
          <div className="adm-dash-stacked-bar">
            {statusSegments.map((seg) => (
              <div
                key={seg.label}
                className="adm-dash-stacked-seg"
                style={{
                  flex: seg.count,
                  background: seg.color,
                }}
                title={`${seg.label}: ${seg.count}`}
              />
            ))}
          </div>
          <div className="adm-dash-legend">
            {statusSegments.map((seg) => (
              <div className="adm-dash-legend-item" key={seg.label}>
                <span
                  className="adm-dash-legend-dot"
                  style={{ background: seg.color }}
                />
                {seg.label}
                <span className="adm-dash-legend-val">
                  {seg.count} ({totalForChart ? Math.round((seg.count / totalForChart) * 100) : 0}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Secondary Metrics ── */}
      <div className="adm-dash-secondary">
        <div className="adm-dash-card" style={{ textAlign: 'center' }}>
          <div className="adm-dash-sec-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div className="adm-dash-sec-val adm-dash-gold">{metrics.totalDestinations}</div>
          <div className="adm-dash-sec-label">Destinations</div>
        </div>
        <div className="adm-dash-card" style={{ textAlign: 'center' }}>
          <div className="adm-dash-sec-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h1"/><path d="M9 13h1"/><path d="M9 17h1"/></svg>
          </div>
          <div className="adm-dash-sec-val adm-dash-gold">{metrics.totalHotels}</div>
          <div className="adm-dash-sec-label">Hotels</div>
        </div>
        <div className="adm-dash-card" style={{ textAlign: 'center' }}>
          <div className="adm-dash-sec-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
          </div>
          <div className="adm-dash-sec-val adm-dash-gold">{metrics.totalRestaurants}</div>
          <div className="adm-dash-sec-label">Restaurants</div>
        </div>
        <div className="adm-dash-card" style={{ textAlign: 'center' }}>
          <div className="adm-dash-sec-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          </div>
          <div className="adm-dash-sec-val adm-dash-gold">{metrics.totalPackages}</div>
          <div className="adm-dash-sec-label">Packages</div>
        </div>
      </div>

      {/* ── 5 & 6. Recent Bookings + Recent Users ── */}
      <div className="adm-dash-bottom">
        <div className="adm-dash-card" style={{ overflow: 'auto' }}>
          <div className="adm-dash-table-header">
            <h3>Recent Bookings</h3>
            <Link to="/admin/bookings" className="adm-dash-viewall">
              View All &rarr;
            </Link>
          </div>
          <table className="adm-dash-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Destination</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 600 }}>{b.id}</td>
                  <td>{b.user}</td>
                  <td>{b.destination}</td>
                  <td>{formatCurrency(b.amount)}</td>
                  <td>
                    <span
                      className="adm-dash-badge"
                      style={{
                        background: `${statusBadgeColor[b.status]}22`,
                        color: statusBadgeColor[b.status],
                      }}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td style={{ opacity: 0.6, fontSize: 12 }}>
                    {new Date(b.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="adm-dash-card">
          <div className="adm-dash-table-header">
            <h3>New Users</h3>
            <Link to="/admin/users" className="adm-dash-viewall">
              View All &rarr;
            </Link>
          </div>
          {recentUsers.map((u) => (
            <div className="adm-dash-user-item" key={u.id}>
              <div className="adm-dash-user-avatar">{u.avatar}</div>
              <div className="adm-dash-user-info">
                <div className="adm-dash-user-name">{u.name}</div>
                <div className="adm-dash-user-email">{u.email}</div>
              </div>
              <div className="adm-dash-user-date">
                {new Date(u.joinDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. Quick Actions ── */}
      <div className="adm-dash-actions">
        <Link to="/admin/destinations" className="adm-dash-action-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Destination
        </Link>
        <Link to="/admin/hotels" className="adm-dash-action-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Hotel
        </Link>
        <Link to="/admin/bookings" className="adm-dash-action-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          View Bookings
        </Link>
        <Link to="/admin/notifications" className="adm-dash-action-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          Send Notification
        </Link>
      </div>
    </div>
  )
}
