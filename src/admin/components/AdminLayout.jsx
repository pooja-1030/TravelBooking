import { useState, useEffect, useRef } from 'react'
import { Navigate, Link, useLocation, Outlet } from 'react-router-dom'
import { useAdmin } from '../AdminContext'

/* ── Navigation Items ── */
const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: 'grid' },
  { label: 'Destinations', path: '/admin/destinations', icon: 'globe' },
  { label: 'Hotels', path: '/admin/hotels', icon: 'building' },
  { label: 'Restaurants', path: '/admin/restaurants', icon: 'utensils' },
  { label: 'Attractions', path: '/admin/attractions', icon: 'map-pin' },
  { label: 'Packages', path: '/admin/packages', icon: 'box' },
  { label: 'Bookings', path: '/admin/bookings', icon: 'calendar' },
  { label: 'Users', path: '/admin/users', icon: 'users' },
  { label: 'Media', path: '/admin/media', icon: 'image' },
  { label: 'Notifications', path: '/admin/notifications', icon: 'bell' },
  { label: 'Settings', path: '/admin/settings', icon: 'gear' },
]

/* ── SVG Icon component ── */
function NavIcon({ type, size = 18 }) {
  const s = { width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (type) {
    case 'grid':
      return <svg {...s} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    case 'globe':
      return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    case 'building':
      return <svg {...s} viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 7h1"/><path d="M14 7h1"/><path d="M9 11h1"/><path d="M14 11h1"/><path d="M9 15h1"/><path d="M14 15h1"/></svg>
    case 'utensils':
      return <svg {...s} viewBox="0 0 24 24"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
    case 'map-pin':
      return <svg {...s} viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    case 'box':
      return <svg {...s} viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
    case 'calendar':
      return <svg {...s} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
    case 'users':
      return <svg {...s} viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    case 'image':
      return <svg {...s} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
    case 'bell':
      return <svg {...s} viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    case 'gear':
      return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    case 'search':
      return <svg {...s} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    case 'sun':
      return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>
    case 'moon':
      return <svg {...s} viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    case 'menu':
      return <svg {...s} viewBox="0 0 24 24"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>
    case 'x':
      return <svg {...s} viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    case 'log-out':
      return <svg {...s} viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
    case 'chevron-down':
      return <svg {...s} viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
    default:
      return null
  }
}

/* ── Toast Component ── */
function ToastContainer({ toasts }) {
  if (!toasts.length) return null

  const typeColors = {
    success: { bg: '#059669', border: '#34d399' },
    error: { bg: '#dc2626', border: '#f87171' },
    info: { bg: '#2563eb', border: '#60a5fa' },
    warning: { bg: '#d97706', border: '#fbbf24' },
  }

  const typeIcons = {
    success: '\u2713',
    error: '\u2717',
    info: 'i',
    warning: '!',
  }

  return (
    <div className="ap-toast-container">
      {toasts.map((toast, index) => {
        const colors = typeColors[toast.type] || typeColors.info
        return (
          <div
            key={toast.id}
            className="ap-toast"
            style={{
              '--toast-bg': colors.bg,
              '--toast-border': colors.border,
              animationDelay: `${index * 50}ms`,
            }}
          >
            <span className="ap-toast-icon">{typeIcons[toast.type] || 'i'}</span>
            <span className="ap-toast-msg">{toast.message}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ── Main Admin Layout ── */
export default function AdminLayout() {
  const {
    admin, adminLogout, adminTheme, toggleAdminTheme,
    adminNotifications, toasts,
  } = useAdmin()

  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const profileRef = useRef(null)
  const notifRef = useRef(null)

  const unreadCount = adminNotifications.filter(n => !n.read).length

  /* Close dropdowns on outside click */
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  /* Close sidebar on route change (mobile) */
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  /* Protected route guard */
  if (!admin) return <Navigate to="/admin/login" />

  const themeClass = `admin-layout--${adminTheme}`
  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  return (
    <div className={`ap-layout ${themeClass}`}>
      <style>{layoutStyles}</style>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="ap-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`ap-sidebar ${sidebarOpen ? 'ap-sidebar--open' : ''}`}>
        {/* Logo */}
        <div className="ap-sidebar-logo">
          <Link to="/admin" className="ap-logo-link">
            <span className="ap-logo-text">Wanderlust</span>
            <span className="ap-logo-badge">Admin</span>
          </Link>
          <button className="ap-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <NavIcon type="x" size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="ap-sidebar-nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`ap-nav-item ${isActive(item.path) ? 'ap-nav-item--active' : ''}`}
            >
              <span className="ap-nav-icon"><NavIcon type={item.icon} /></span>
              <span className="ap-nav-label">{item.label}</span>
              {item.icon === 'bell' && unreadCount > 0 && (
                <span className="ap-nav-badge">{unreadCount}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Admin profile at bottom */}
        <div className="ap-sidebar-footer">
          <div className="ap-sidebar-admin">
            <div className="ap-admin-avatar-sm">{admin.avatar || admin.name?.charAt(0)}</div>
            <div className="ap-admin-info-sm">
              <div className="ap-admin-name-sm">{admin.name}</div>
              <div className="ap-admin-role-sm">{admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}</div>
            </div>
          </div>
          <button className="ap-logout-btn" onClick={adminLogout} title="Logout">
            <NavIcon type="log-out" size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className="ap-main-wrapper">
        {/* Topbar */}
        <header className="ap-topbar">
          <div className="ap-topbar-left">
            <button className="ap-hamburger" onClick={() => setSidebarOpen(true)}>
              <NavIcon type="menu" size={22} />
            </button>
            <div className="ap-search-box">
              <span className="ap-search-icon"><NavIcon type="search" size={16} /></span>
              <input
                type="text"
                className="ap-search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="ap-topbar-right">
            {/* Theme toggle */}
            <button className="ap-topbar-btn" onClick={toggleAdminTheme} title="Toggle theme">
              <NavIcon type={adminTheme === 'dark' ? 'sun' : 'moon'} size={18} />
            </button>

            {/* Notifications */}
            <div className="ap-topbar-notif" ref={notifRef}>
              <button className="ap-topbar-btn" onClick={() => setNotifOpen(p => !p)}>
                <NavIcon type="bell" size={18} />
                {unreadCount > 0 && <span className="ap-notif-badge">{unreadCount}</span>}
              </button>
              {notifOpen && (
                <div className="ap-dropdown ap-notif-dropdown">
                  <div className="ap-dropdown-header">Notifications</div>
                  {adminNotifications.slice(0, 5).map(n => (
                    <div key={n.id} className={`ap-notif-item ${!n.read ? 'ap-notif-item--unread' : ''}`}>
                      <div className="ap-notif-msg">{n.message}</div>
                      <div className="ap-notif-time">{n.time}</div>
                    </div>
                  ))}
                  <Link to="/admin/notifications" className="ap-dropdown-footer" onClick={() => setNotifOpen(false)}>
                    View all notifications
                  </Link>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="ap-topbar-profile" ref={profileRef}>
              <button className="ap-profile-trigger" onClick={() => setProfileOpen(p => !p)}>
                <div className="ap-admin-avatar-topbar">{admin.avatar || admin.name?.charAt(0)}</div>
                <span className="ap-admin-name-topbar">{admin.name}</span>
                <NavIcon type="chevron-down" size={14} />
              </button>
              {profileOpen && (
                <div className="ap-dropdown ap-profile-dropdown">
                  <div className="ap-dropdown-header">{admin.email}</div>
                  <Link to="/admin/settings" className="ap-dropdown-item" onClick={() => setProfileOpen(false)}>
                    <NavIcon type="gear" size={15} /> Settings
                  </Link>
                  <button className="ap-dropdown-item ap-dropdown-item--danger" onClick={adminLogout}>
                    <NavIcon type="log-out" size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="ap-content">
          <Outlet />
        </main>
      </div>

      {/* Toasts */}
      <ToastContainer toasts={toasts} />
    </div>
  )
}

/* ── Styles ── */
const layoutStyles = `
/* ── Reset & Base ── */
.ap-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'DM Sans', sans-serif;
  transition: background 0.3s;
}
.ap-layout *, .ap-layout *::before, .ap-layout *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ── Theme Variables ── */
.admin-layout--dark {
  --ap-sidebar-bg: #12121a;
  --ap-main-bg: #0e0e12;
  --ap-topbar-bg: #1a1a22;
  --ap-card-bg: #1a1a22;
  --ap-text: #e0e0e0;
  --ap-text-secondary: #8a8a96;
  --ap-border: #2a2a32;
  --ap-gold: #c9a96e;
  --ap-gold-hover: #dbb978;
  --ap-hover-bg: rgba(201, 169, 110, 0.08);
  --ap-active-bg: rgba(201, 169, 110, 0.14);
  --ap-shadow: 0 1px 3px rgba(0,0,0,0.5);
  --ap-input-bg: #22222c;
  --ap-scrollbar-thumb: #2a2a32;
}
.admin-layout--light {
  --ap-sidebar-bg: #ffffff;
  --ap-main-bg: #f8f6f3;
  --ap-topbar-bg: #ffffff;
  --ap-card-bg: #ffffff;
  --ap-text: #262626;
  --ap-text-secondary: #6b6b6b;
  --ap-border: #e5e5e5;
  --ap-gold: #8b6914;
  --ap-gold-hover: #a57d1a;
  --ap-hover-bg: rgba(139, 105, 20, 0.06);
  --ap-active-bg: rgba(139, 105, 20, 0.12);
  --ap-shadow: 0 1px 3px rgba(0,0,0,0.08);
  --ap-input-bg: #f0eeeb;
  --ap-scrollbar-thumb: #d5d5d5;
}

/* ── Sidebar ── */
.ap-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  background: var(--ap-sidebar-bg);
  border-right: 1px solid var(--ap-border);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.ap-sidebar-overlay {
  display: none;
}
.ap-sidebar-close {
  display: none;
}

/* Logo */
.ap-sidebar-logo {
  padding: 20px 22px;
  border-bottom: 1px solid var(--ap-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 65px;
}
.ap-logo-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.ap-logo-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--ap-gold);
  letter-spacing: 0.5px;
}
.ap-logo-badge {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--ap-gold);
  background: var(--ap-active-bg);
  border: 1px solid var(--ap-gold);
  border-radius: 4px;
  padding: 2px 7px;
}

/* Navigation */
.ap-sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 12px 10px;
  scrollbar-width: thin;
  scrollbar-color: var(--ap-scrollbar-thumb) transparent;
}
.ap-sidebar-nav::-webkit-scrollbar { width: 4px; }
.ap-sidebar-nav::-webkit-scrollbar-thumb { background: var(--ap-scrollbar-thumb); border-radius: 4px; }

.ap-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  color: var(--ap-text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
  position: relative;
  margin-bottom: 2px;
}
.ap-nav-item:hover {
  color: var(--ap-text);
  background: var(--ap-hover-bg);
}
.ap-nav-item--active {
  color: var(--ap-gold);
  background: var(--ap-active-bg);
  font-weight: 600;
}
.ap-nav-item--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: var(--ap-gold);
  border-radius: 0 3px 3px 0;
}
.ap-nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  flex-shrink: 0;
}
.ap-nav-badge {
  margin-left: auto;
  background: #dc2626;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

/* Sidebar Footer */
.ap-sidebar-footer {
  border-top: 1px solid var(--ap-border);
  padding: 14px 16px;
}
.ap-sidebar-admin {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.ap-admin-avatar-sm {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--ap-gold), var(--ap-gold-hover));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}
.ap-admin-name-sm {
  font-size: 13px;
  font-weight: 600;
  color: var(--ap-text);
  line-height: 1.3;
}
.ap-admin-role-sm {
  font-size: 11px;
  color: var(--ap-text-secondary);
}
.ap-logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 14px;
  border: 1px solid var(--ap-border);
  border-radius: 8px;
  background: transparent;
  color: var(--ap-text-secondary);
  font-size: 13px;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: all 0.15s;
}
.ap-logout-btn:hover {
  color: #dc2626;
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.06);
}

/* ── Main Wrapper ── */
.ap-main-wrapper {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--ap-main-bg);
}

/* ── Topbar ── */
.ap-topbar {
  position: sticky;
  top: 0;
  height: 65px;
  background: var(--ap-topbar-bg);
  border-bottom: 1px solid var(--ap-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 90;
  box-shadow: var(--ap-shadow);
}
.ap-topbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}
.ap-hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--ap-text);
  cursor: pointer;
  transition: background 0.15s;
}
.ap-hamburger:hover { background: var(--ap-hover-bg); }

/* Search */
.ap-search-box {
  position: relative;
  max-width: 360px;
  flex: 1;
}
.ap-search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ap-text-secondary);
  display: flex;
}
.ap-search-input {
  width: 100%;
  height: 38px;
  padding: 0 14px 0 38px;
  border: 1px solid var(--ap-border);
  border-radius: 8px;
  background: var(--ap-input-bg);
  color: var(--ap-text);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  outline: none;
  transition: border-color 0.15s;
}
.ap-search-input::placeholder { color: var(--ap-text-secondary); }
.ap-search-input:focus { border-color: var(--ap-gold); }

/* Topbar right */
.ap-topbar-right {
  display: flex;
  align-items: center;
  gap: 6px;
}
.ap-topbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--ap-text-secondary);
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
}
.ap-topbar-btn:hover {
  color: var(--ap-text);
  background: var(--ap-hover-bg);
}

/* Notification badge */
.ap-notif-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #dc2626;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

/* Dropdown base */
.ap-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--ap-card-bg);
  border: 1px solid var(--ap-border);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  min-width: 260px;
  overflow: hidden;
  animation: ap-dropdown-in 0.15s ease-out;
  z-index: 200;
}
@keyframes ap-dropdown-in {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
.ap-dropdown-header {
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ap-text);
  border-bottom: 1px solid var(--ap-border);
}
.ap-dropdown-footer {
  display: block;
  padding: 10px 16px;
  font-size: 12px;
  color: var(--ap-gold);
  text-align: center;
  text-decoration: none;
  border-top: 1px solid var(--ap-border);
  transition: background 0.15s;
}
.ap-dropdown-footer:hover { background: var(--ap-hover-bg); }
.ap-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  color: var(--ap-text);
  font-size: 13px;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;
}
.ap-dropdown-item:hover { background: var(--ap-hover-bg); }
.ap-dropdown-item--danger:hover { color: #dc2626; }

/* Notification dropdown */
.ap-topbar-notif { position: relative; }
.ap-notif-dropdown { min-width: 300px; }
.ap-notif-item {
  padding: 10px 16px;
  border-bottom: 1px solid var(--ap-border);
  cursor: pointer;
  transition: background 0.15s;
}
.ap-notif-item:hover { background: var(--ap-hover-bg); }
.ap-notif-item--unread { border-left: 3px solid var(--ap-gold); }
.ap-notif-msg {
  font-size: 13px;
  color: var(--ap-text);
  line-height: 1.4;
}
.ap-notif-time {
  font-size: 11px;
  color: var(--ap-text-secondary);
  margin-top: 3px;
}

/* Profile dropdown */
.ap-topbar-profile { position: relative; }
.ap-profile-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px 4px 4px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--ap-text);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}
.ap-profile-trigger:hover { background: var(--ap-hover-bg); }
.ap-admin-avatar-topbar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--ap-gold), var(--ap-gold-hover));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
}
.ap-admin-name-topbar {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Content ── */
.ap-content {
  flex: 1;
  padding: 28px;
  overflow-y: auto;
}

/* ── Toast Container ── */
.ap-toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  max-width: 380px;
}
.ap-toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 10px;
  background: var(--toast-bg);
  border-left: 4px solid var(--toast-border);
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  animation: ap-toast-in 0.35s ease-out, ap-toast-out 0.4s ease-in 3.5s forwards;
}
.ap-toast-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}
.ap-toast-msg {
  line-height: 1.4;
}
@keyframes ap-toast-in {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes ap-toast-out {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(40px); }
}

/* ── Responsive: < 1024px ── */
@media (max-width: 1023px) {
  .ap-sidebar {
    transform: translateX(-100%);
  }
  .ap-sidebar--open {
    transform: translateX(0);
  }
  .ap-sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 99;
    animation: ap-fade-in 0.2s ease;
  }
  .ap-sidebar-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--ap-text-secondary);
    cursor: pointer;
  }
  .ap-sidebar-close:hover { color: var(--ap-text); }
  .ap-main-wrapper {
    margin-left: 0;
  }
  .ap-hamburger {
    display: flex;
  }
  .ap-admin-name-topbar {
    display: none;
  }
  .ap-content {
    padding: 20px 16px;
  }
  .ap-toast-container {
    right: 16px;
    left: 16px;
    max-width: none;
  }
}
@keyframes ap-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ── Scrollbar for content ── */
.ap-content::-webkit-scrollbar { width: 6px; }
.ap-content::-webkit-scrollbar-thumb { background: var(--ap-scrollbar-thumb); border-radius: 6px; }
`
