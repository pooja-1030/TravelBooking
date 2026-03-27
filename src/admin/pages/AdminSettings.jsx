import { useState } from 'react'
import { useAdmin } from '../AdminContext'

const ACCENT_COLORS = [
  { name: 'Classic Gold', value: '#c9a96e' },
  { name: 'Deep Gold', value: '#8b6914' },
  { name: 'Warm Amber', value: '#d4a843' },
  { name: 'Rose Gold', value: '#b76e79' },
]

const CURRENCIES = ['USD ($)', 'EUR (\u20ac)', 'GBP (\u00a3)', 'JPY (\u00a5)', 'AUD (A$)']
const LANGUAGES = ['English', 'French', 'Japanese', 'Spanish']
const TIMEZONES = ['UTC', 'America/New_York', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Asia/Dubai', 'Australia/Sydney']

export default function AdminSettings() {
  const { admin, adminTheme, toggleAdminTheme, addToast } = useAdmin()

  // Profile
  const [email, setEmail] = useState(admin?.email || '')

  // Security
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // Appearance
  const [accentColor, setAccentColor] = useState('#c9a96e')

  // Site Settings
  const [currency, setCurrency] = useState('USD ($)')
  const [language, setLanguage] = useState('English')
  const [timezone, setTimezone] = useState('UTC')

  // Notification Preferences
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)
  const [bookingAlerts, setBookingAlerts] = useState(true)
  const [signupAlerts, setSignupAlerts] = useState(false)

  // Danger zone
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showClearFinal, setShowClearFinal] = useState(false)

  const handleSaveProfile = () => {
    addToast('Profile settings saved successfully', 'success')
  }

  const handleChangePassword = () => {
    setPasswordError('')
    if (!currentPassword) { setPasswordError('Current password is required'); return }
    if (newPassword.length < 6) { setPasswordError('New password must be at least 6 characters'); return }
    if (newPassword !== confirmPassword) { setPasswordError('Passwords do not match'); return }
    addToast('Password changed successfully', 'success')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleSaveAppearance = () => {
    addToast('Appearance settings saved', 'success')
  }

  const handleSaveSiteSettings = () => {
    addToast('Site settings saved successfully', 'success')
  }

  const handleSaveNotifPrefs = () => {
    addToast('Notification preferences saved', 'success')
  }

  const handleClearData = () => {
    if (!showClearConfirm) { setShowClearConfirm(true); return }
    if (!showClearFinal) { setShowClearFinal(true); return }
    addToast('All data has been cleared', 'info')
    setShowClearConfirm(false)
    setShowClearFinal(false)
  }

  const handleExport = () => {
    addToast('Export started', 'success')
  }

  return (
    <div className="adm-set-page">
      <style>{`
        .adm-set-page { padding: 0; min-height: 100%; font-family: 'DM Sans', sans-serif; }

        /* ── Theme tokens ── */
        .admin-layout--dark .adm-set-card { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-set-card { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-set-gold { color: #c9a96e; }
        .admin-layout--light .adm-set-gold { color: #8b6914; }
        .admin-layout--dark .adm-set-muted { color: #888; }
        .admin-layout--light .adm-set-muted { color: #777; }
        .admin-layout--dark .adm-set-input {
          background: #12121a; border: 1px solid #2a2a32; color: #e0e0e0;
        }
        .admin-layout--light .adm-set-input {
          background: #f9f9f9; border: 1px solid #e5e5e5; color: #262626;
        }

        .adm-set-header { margin-bottom: 28px; }
        .adm-set-header h1 { font-size: 28px; font-weight: 700; margin: 0; }

        /* Sections */
        .adm-set-section { padding: 24px; border-radius: 12px; margin-bottom: 20px; }
        .adm-set-section-title { font-size: 18px; font-weight: 700; margin: 0 0 20px; display: flex; align-items: center; gap: 10px; }
        .adm-set-section-title span { font-size: 20px; }

        /* Form elements */
        .adm-set-form-row { display: flex; gap: 16px; margin-bottom: 14px; flex-wrap: wrap; }
        .adm-set-form-group { display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 200px; }
        .adm-set-form-group label {
          font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.6;
        }
        .adm-set-form-group input,
        .adm-set-form-group select {
          padding: 10px 14px; border-radius: 8px; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none;
        }
        .adm-set-form-group input:focus,
        .adm-set-form-group select:focus { border-color: #c9a96e; }
        .adm-set-form-group input:read-only { opacity: 0.6; cursor: not-allowed; }

        /* Role badge */
        .adm-set-role-badge {
          display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .admin-layout--dark .adm-set-role-badge { background: rgba(201,169,110,0.15); color: #c9a96e; }
        .admin-layout--light .adm-set-role-badge { background: rgba(139,105,20,0.1); color: #8b6914; }

        /* Buttons */
        .adm-set-btn {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px;
          font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
          margin-top: 8px;
        }
        .adm-set-btn-primary { background: #c9a96e; color: #000; }
        .adm-set-btn-primary:hover { background: #b8954f; }
        .adm-set-btn-danger { background: #ef4444; color: #fff; }
        .adm-set-btn-danger:hover { background: #dc2626; }
        .adm-set-btn-secondary { background: transparent; }
        .admin-layout--dark .adm-set-btn-secondary { border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-set-btn-secondary { border: 1px solid #e5e5e5; color: #262626; }
        .adm-set-btn-group { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 8px; }

        /* Error text */
        .adm-set-error { color: #ef4444; font-size: 13px; margin-top: 4px; }

        /* Theme toggle */
        .adm-set-theme-toggle { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; }
        .adm-set-theme-option {
          padding: 14px 24px; border-radius: 10px; cursor: pointer; font-weight: 600;
          font-size: 14px; transition: all 0.2s; border: 2px solid transparent;
        }
        .adm-set-theme-option.active { border-color: #c9a96e; }
        .adm-set-theme-dark { background: #1a1a22; color: #e0e0e0; }
        .adm-set-theme-light { background: #f5f5f5; color: #262626; border: 2px solid #e5e5e5; }
        .adm-set-theme-light.active { border-color: #c9a96e; }

        /* Accent color picker */
        .adm-set-accent-row { display: flex; gap: 12px; margin-top: 12px; flex-wrap: wrap; }
        .adm-set-accent-swatch {
          width: 48px; height: 48px; border-radius: 12px; cursor: pointer; transition: all 0.2s;
          border: 3px solid transparent; position: relative;
        }
        .adm-set-accent-swatch.active { border-color: #fff; box-shadow: 0 0 0 2px #c9a96e; }
        .adm-set-accent-label { font-size: 11px; text-align: center; margin-top: 4px; opacity: 0.6; }

        /* Toggle switch */
        .adm-set-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; }
        .adm-set-toggle-row + .adm-set-toggle-row { border-top: 1px solid transparent; }
        .admin-layout--dark .adm-set-toggle-row + .adm-set-toggle-row { border-color: #2a2a32; }
        .admin-layout--light .adm-set-toggle-row + .adm-set-toggle-row { border-color: #f0f0f0; }
        .adm-set-toggle-info { display: flex; flex-direction: column; gap: 2px; }
        .adm-set-toggle-label { font-size: 14px; font-weight: 600; }
        .adm-set-toggle-desc { font-size: 12px; opacity: 0.5; }
        .adm-set-switch {
          position: relative; width: 48px; height: 26px; border-radius: 13px; cursor: pointer;
          transition: background 0.2s; flex-shrink: 0;
        }
        .admin-layout--dark .adm-set-switch { background: #2a2a32; }
        .admin-layout--light .adm-set-switch { background: #ddd; }
        .adm-set-switch.active { background: #c9a96e !important; }
        .adm-set-switch-knob {
          position: absolute; top: 3px; left: 3px; width: 20px; height: 20px;
          border-radius: 50%; background: #fff; transition: transform 0.2s;
        }
        .adm-set-switch.active .adm-set-switch-knob { transform: translateX(22px); }

        /* Danger zone */
        .adm-set-danger-zone { border-color: rgba(239,68,68,0.3) !important; }
        .adm-set-danger-title { color: #ef4444; }
        .adm-set-danger-text { font-size: 13px; opacity: 0.6; margin-bottom: 16px; }
        .adm-set-confirm-text { font-size: 13px; color: #ef4444; margin-bottom: 8px; font-weight: 600; }

        /* About */
        .adm-set-about-row { display: flex; justify-content: space-between; padding: 10px 0; font-size: 14px; }
        .adm-set-about-row + .adm-set-about-row { border-top: 1px solid transparent; }
        .admin-layout--dark .adm-set-about-row + .adm-set-about-row { border-color: #2a2a32; }
        .admin-layout--light .adm-set-about-row + .adm-set-about-row { border-color: #f0f0f0; }
        .adm-set-about-label { opacity: 0.6; }
        .adm-set-about-value { font-weight: 600; }
        .adm-set-about-link { color: #c9a96e; text-decoration: none; font-weight: 600; }
        .admin-layout--light .adm-set-about-link { color: #8b6914; }
        .adm-set-about-link:hover { text-decoration: underline; }

        /* Overlay */
        .adm-set-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex;
          align-items: center; justify-content: center; z-index: 1000;
        }
        .adm-set-confirm-box { padding: 28px; border-radius: 16px; max-width: 400px; width: 90%; text-align: center; }
        .adm-set-confirm-box h3 { margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #ef4444; }
        .adm-set-confirm-box p { font-size: 14px; opacity: 0.7; margin: 0 0 20px; }
        .adm-set-confirm-actions { display: flex; gap: 10px; justify-content: center; }
      `}</style>

      {/* Header */}
      <div className="adm-set-header">
        <h1 className="adm-set-gold">Settings</h1>
      </div>

      {/* 1. Profile Settings */}
      <div className="adm-set-section adm-set-card">
        <h2 className="adm-set-section-title"><span>&#128100;</span> Profile Settings</h2>
        <div className="adm-set-form-row">
          <div className="adm-set-form-group">
            <label>Admin Name</label>
            <input className="adm-set-input" type="text" value={admin?.name || 'Admin'} readOnly />
          </div>
          <div className="adm-set-form-group">
            <label>Email</label>
            <input
              className="adm-set-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.6 }}>Role</label>
          <div style={{ marginTop: 6 }}>
            <span className="adm-set-role-badge">{admin?.role?.replace('_', ' ') || 'Super Admin'}</span>
          </div>
        </div>
        <button className="adm-set-btn adm-set-btn-primary" onClick={handleSaveProfile}>Save Changes</button>
      </div>

      {/* 2. Security */}
      <div className="adm-set-section adm-set-card">
        <h2 className="adm-set-section-title"><span>&#128274;</span> Security</h2>
        <div className="adm-set-form-row">
          <div className="adm-set-form-group">
            <label>Current Password</label>
            <input
              className="adm-set-input"
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="adm-set-form-row">
          <div className="adm-set-form-group">
            <label>New Password</label>
            <input
              className="adm-set-input"
              type="password"
              placeholder="Min 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="adm-set-form-group">
            <label>Confirm Password</label>
            <input
              className="adm-set-input"
              type="password"
              placeholder="Repeat new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        {passwordError && <div className="adm-set-error">{passwordError}</div>}
        <button className="adm-set-btn adm-set-btn-primary" onClick={handleChangePassword}>Change Password</button>
      </div>

      {/* 3. Appearance */}
      <div className="adm-set-section adm-set-card">
        <h2 className="adm-set-section-title"><span>&#127912;</span> Appearance</h2>
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.6, display: 'block', marginBottom: 10 }}>Theme</label>
          <div className="adm-set-theme-toggle">
            <div
              className={`adm-set-theme-option adm-set-theme-dark${adminTheme === 'dark' ? ' active' : ''}`}
              onClick={() => { if (adminTheme !== 'dark') toggleAdminTheme() }}
            >
              Dark Mode
            </div>
            <div
              className={`adm-set-theme-option adm-set-theme-light${adminTheme === 'light' ? ' active' : ''}`}
              onClick={() => { if (adminTheme !== 'light') toggleAdminTheme() }}
            >
              Light Mode
            </div>
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.6, display: 'block' }}>Accent Color</label>
          <div className="adm-set-accent-row">
            {ACCENT_COLORS.map(c => (
              <div key={c.value} style={{ textAlign: 'center' }}>
                <div
                  className={`adm-set-accent-swatch${accentColor === c.value ? ' active' : ''}`}
                  style={{ background: c.value }}
                  onClick={() => setAccentColor(c.value)}
                />
                <div className="adm-set-accent-label">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
        <button className="adm-set-btn adm-set-btn-primary" onClick={handleSaveAppearance} style={{ marginTop: 16 }}>Save Changes</button>
      </div>

      {/* 4. Site Settings */}
      <div className="adm-set-section adm-set-card">
        <h2 className="adm-set-section-title"><span>&#9881;</span> Site Settings</h2>
        <div className="adm-set-form-row">
          <div className="adm-set-form-group">
            <label>Currency</label>
            <select className="adm-set-input" value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="adm-set-form-group">
            <label>Language</label>
            <select className="adm-set-input" value={language} onChange={(e) => setLanguage(e.target.value)}>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="adm-set-form-group">
            <label>Timezone</label>
            <select className="adm-set-input" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>
        </div>
        <button className="adm-set-btn adm-set-btn-primary" onClick={handleSaveSiteSettings}>Save Changes</button>
      </div>

      {/* 5. Notification Preferences */}
      <div className="adm-set-section adm-set-card">
        <h2 className="adm-set-section-title"><span>&#128276;</span> Notification Preferences</h2>
        <div className="adm-set-toggle-row">
          <div className="adm-set-toggle-info">
            <div className="adm-set-toggle-label">Email Notifications</div>
            <div className="adm-set-toggle-desc">Receive important updates via email</div>
          </div>
          <div className={`adm-set-switch${emailNotif ? ' active' : ''}`} onClick={() => setEmailNotif(!emailNotif)}>
            <div className="adm-set-switch-knob" />
          </div>
        </div>
        <div className="adm-set-toggle-row">
          <div className="adm-set-toggle-info">
            <div className="adm-set-toggle-label">Push Notifications</div>
            <div className="adm-set-toggle-desc">Get real-time browser push notifications</div>
          </div>
          <div className={`adm-set-switch${pushNotif ? ' active' : ''}`} onClick={() => setPushNotif(!pushNotif)}>
            <div className="adm-set-switch-knob" />
          </div>
        </div>
        <div className="adm-set-toggle-row">
          <div className="adm-set-toggle-info">
            <div className="adm-set-toggle-label">Booking Alerts</div>
            <div className="adm-set-toggle-desc">Notify when new bookings are made</div>
          </div>
          <div className={`adm-set-switch${bookingAlerts ? ' active' : ''}`} onClick={() => setBookingAlerts(!bookingAlerts)}>
            <div className="adm-set-switch-knob" />
          </div>
        </div>
        <div className="adm-set-toggle-row">
          <div className="adm-set-toggle-info">
            <div className="adm-set-toggle-label">User Signup Alerts</div>
            <div className="adm-set-toggle-desc">Notify when new users register</div>
          </div>
          <div className={`adm-set-switch${signupAlerts ? ' active' : ''}`} onClick={() => setSignupAlerts(!signupAlerts)}>
            <div className="adm-set-switch-knob" />
          </div>
        </div>
        <button className="adm-set-btn adm-set-btn-primary" onClick={handleSaveNotifPrefs}>Save Changes</button>
      </div>

      {/* 6. Danger Zone */}
      <div className="adm-set-section adm-set-card adm-set-danger-zone">
        <h2 className="adm-set-section-title adm-set-danger-title"><span>&#9888;</span> Danger Zone</h2>
        <p className="adm-set-danger-text">These actions are irreversible. Please proceed with caution.</p>
        <div className="adm-set-btn-group">
          <button className="adm-set-btn adm-set-btn-danger" onClick={() => setShowClearConfirm(true)}>Clear All Data</button>
          <button className="adm-set-btn adm-set-btn-secondary" onClick={handleExport}>Export Data</button>
        </div>
      </div>

      {/* Clear data - first confirmation */}
      {showClearConfirm && !showClearFinal && (
        <div className="adm-set-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="adm-set-confirm-box adm-set-card" onClick={(e) => e.stopPropagation()}>
            <h3>Clear All Data?</h3>
            <p>This will permanently remove all bookings, users, and settings. This action cannot be undone.</p>
            <div className="adm-set-confirm-actions">
              <button className="adm-set-btn adm-set-btn-danger" onClick={() => setShowClearFinal(true)}>Yes, Continue</button>
              <button className="adm-set-btn adm-set-btn-secondary" onClick={() => setShowClearConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Clear data - final confirmation */}
      {showClearFinal && (
        <div className="adm-set-overlay" onClick={() => { setShowClearFinal(false); setShowClearConfirm(false) }}>
          <div className="adm-set-confirm-box adm-set-card" onClick={(e) => e.stopPropagation()}>
            <h3>Are you absolutely sure?</h3>
            <p>This is your last chance. All data will be permanently deleted with no way to recover.</p>
            <div className="adm-set-confirm-actions">
              <button className="adm-set-btn adm-set-btn-danger" onClick={handleClearData}>Delete Everything</button>
              <button className="adm-set-btn adm-set-btn-secondary" onClick={() => { setShowClearFinal(false); setShowClearConfirm(false) }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* 7. About */}
      <div className="adm-set-section adm-set-card">
        <h2 className="adm-set-section-title"><span>&#8505;</span> About</h2>
        <div className="adm-set-about-row">
          <span className="adm-set-about-label">App Version</span>
          <span className="adm-set-about-value">1.0.0</span>
        </div>
        <div className="adm-set-about-row">
          <span className="adm-set-about-label">Build Date</span>
          <span className="adm-set-about-value">March 27, 2026</span>
        </div>
        <div className="adm-set-about-row">
          <span className="adm-set-about-label">Documentation</span>
          <a className="adm-set-about-link" href="#docs">View Docs</a>
        </div>
        <div className="adm-set-about-row">
          <span className="adm-set-about-label">Support</span>
          <a className="adm-set-about-link" href="#support">Contact Support</a>
        </div>
        <div className="adm-set-about-row">
          <span className="adm-set-about-label">License</span>
          <span className="adm-set-about-value">MIT</span>
        </div>
      </div>
    </div>
  )
}
