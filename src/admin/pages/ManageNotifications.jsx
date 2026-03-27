import { useState } from 'react'
import { useAdmin } from '../AdminContext'

const NOTIF_TYPES = ['Deal', 'Update', 'Alert', 'Announcement']
const TARGETS = ['All Users', 'Active Users', 'New Users']

const TEMPLATES = [
  { id: 't1', icon: '\u26a1', name: 'Flash Sale', description: 'Announce a limited-time discount on popular destinations.', title: 'Flash Sale - 30% Off!', message: 'Book your dream vacation now and save 30% on select destinations. Offer ends in 48 hours!', type: 'Deal' },
  { id: 't2', icon: '\u{1f44b}', name: 'Welcome Message', description: 'Greet new users who just signed up.', title: 'Welcome to Wanderlust!', message: 'We\'re thrilled to have you on board. Start exploring amazing destinations and plan your next adventure today.', type: 'Announcement' },
  { id: 't3', icon: '\u{1f9f3}', name: 'Trip Reminder', description: 'Remind users about their upcoming trips.', title: 'Your Trip is Coming Up!', message: 'Don\'t forget to check your itinerary and pack your bags. Your adventure starts soon!', type: 'Update' },
  { id: 't4', icon: '\u{1f4c9}', name: 'Price Drop Alert', description: 'Notify users when prices drop on watched destinations.', title: 'Price Drop Alert', message: 'Great news! Prices have dropped on a destination you\'re watching. Book now before they go back up!', type: 'Alert' },
  { id: 't5', icon: '\u{1f527}', name: 'Maintenance Notice', description: 'Inform users about scheduled maintenance.', title: 'Scheduled Maintenance', message: 'We\'ll be performing scheduled maintenance on our servers. The site may be temporarily unavailable. We apologize for the inconvenience.', type: 'Alert' },
]

const MOCK_HISTORY = [
  { id: 'h1', title: 'Summer Sale - 25% Off', type: 'Deal', recipients: 1250, sentAt: '2026-03-25 14:30' },
  { id: 'h2', title: 'New Feature: Trip Planner', type: 'Update', recipients: 3400, sentAt: '2026-03-22 09:00' },
  { id: 'h3', title: 'System Maintenance Notice', type: 'Alert', recipients: 3400, sentAt: '2026-03-20 18:00' },
  { id: 'h4', title: 'Welcome to Spring Collection', type: 'Announcement', recipients: 850, sentAt: '2026-03-18 10:15' },
  { id: 'h5', title: 'Flash Sale - Maldives', type: 'Deal', recipients: 2100, sentAt: '2026-03-15 12:00' },
]

const TYPE_COLORS = {
  Deal: '#22c55e',
  Update: '#3b82f6',
  Alert: '#ef4444',
  Announcement: '#a855f7',
}

export default function ManageNotifications() {
  const { sendUserNotification, addToast } = useAdmin()

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('Deal')
  const [target, setTarget] = useState('All Users')

  const handleSendNow = () => {
    if (!title.trim() || !message.trim()) {
      addToast('Please fill in both title and message', 'error')
      return
    }
    sendUserNotification(`${title} - ${message}`)
    addToast('Notification sent successfully!', 'success')
    setTitle('')
    setMessage('')
  }

  const handleSchedule = () => {
    if (!title.trim() || !message.trim()) {
      addToast('Please fill in both title and message', 'error')
      return
    }
    addToast('Notification scheduled for later delivery', 'success')
  }

  const useTemplate = (template) => {
    setTitle(template.title)
    setMessage(template.message)
    setType(template.type)
    addToast(`Template "${template.name}" loaded`, 'info')
  }

  return (
    <div className="adm-notif-page">
      <style>{`
        .adm-notif-page { padding: 0; min-height: 100%; font-family: 'DM Sans', sans-serif; }

        /* ── Theme tokens ── */
        .admin-layout--dark .adm-notif-card { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-notif-card { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-notif-gold { color: #c9a96e; }
        .admin-layout--light .adm-notif-gold { color: #8b6914; }
        .admin-layout--dark .adm-notif-muted { color: #888; }
        .admin-layout--light .adm-notif-muted { color: #777; }
        .admin-layout--dark .adm-notif-input {
          background: #12121a; border: 1px solid #2a2a32; color: #e0e0e0;
        }
        .admin-layout--light .adm-notif-input {
          background: #f9f9f9; border: 1px solid #e5e5e5; color: #262626;
        }
        .admin-layout--dark .adm-notif-sub-bg { background: #12121a; }
        .admin-layout--light .adm-notif-sub-bg { background: #f5f5f5; }

        .adm-notif-header { margin-bottom: 28px; }
        .adm-notif-header h1 { font-size: 28px; font-weight: 700; margin: 0; }

        /* Section titles */
        .adm-notif-section-title { font-size: 20px; font-weight: 700; margin: 0 0 16px; }

        /* Send form */
        .adm-notif-send-section { padding: 24px; border-radius: 12px; margin-bottom: 28px; }
        .adm-notif-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .adm-notif-form-full { grid-column: 1 / -1; }
        .adm-notif-form-group { display: flex; flex-direction: column; gap: 6px; }
        .adm-notif-form-group label {
          font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.6;
        }
        .adm-notif-form-group input,
        .adm-notif-form-group textarea,
        .adm-notif-form-group select {
          padding: 10px 14px; border-radius: 8px; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none; resize: vertical;
        }
        .adm-notif-form-group input:focus,
        .adm-notif-form-group textarea:focus,
        .adm-notif-form-group select:focus { border-color: #c9a96e; }
        .adm-notif-form-group textarea { min-height: 100px; }

        /* Preview card */
        .adm-notif-preview { padding: 20px; border-radius: 12px; margin-bottom: 16px; }
        .adm-notif-preview-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.5; margin-bottom: 12px; }
        .adm-notif-preview-card { padding: 16px; border-radius: 10px; border-left: 4px solid #c9a96e; }
        .admin-layout--dark .adm-notif-preview-card { background: #12121a; }
        .admin-layout--light .adm-notif-preview-card { background: #f9f9f9; }
        .adm-notif-preview-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .adm-notif-preview-title { font-size: 15px; font-weight: 700; }
        .adm-notif-preview-type {
          padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; color: #fff;
        }
        .adm-notif-preview-msg { font-size: 13px; opacity: 0.7; line-height: 1.5; }
        .adm-notif-preview-meta { display: flex; gap: 16px; margin-top: 10px; font-size: 12px; opacity: 0.5; }

        /* Action buttons */
        .adm-notif-actions { display: flex; gap: 10px; }
        .adm-notif-btn {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px;
          font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .adm-notif-btn-primary { background: #c9a96e; color: #000; }
        .adm-notif-btn-primary:hover { background: #b8954f; }
        .adm-notif-btn-secondary { background: transparent; }
        .admin-layout--dark .adm-notif-btn-secondary { border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-notif-btn-secondary { border: 1px solid #e5e5e5; color: #262626; }

        /* Templates */
        .adm-notif-templates { margin-bottom: 28px; }
        .adm-notif-template-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
        .adm-notif-template-card { padding: 20px; border-radius: 12px; transition: transform 0.2s; }
        .adm-notif-template-card:hover { transform: translateY(-2px); }
        .adm-notif-template-icon { font-size: 28px; margin-bottom: 10px; }
        .adm-notif-template-name { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
        .adm-notif-template-desc { font-size: 13px; opacity: 0.6; line-height: 1.4; margin-bottom: 14px; }
        .adm-notif-template-btn {
          padding: 8px 16px; border-radius: 8px; border: none; font-size: 13px;
          font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif;
          background: rgba(201,169,110,0.15); color: #c9a96e; transition: all 0.2s;
        }
        .admin-layout--light .adm-notif-template-btn { color: #8b6914; background: rgba(139,105,20,0.1); }
        .adm-notif-template-btn:hover { background: rgba(201,169,110,0.25); }

        /* Sent History */
        .adm-notif-history { margin-bottom: 28px; }
        .adm-notif-history-card { padding: 24px; border-radius: 12px; }
        .adm-notif-history-list { display: flex; flex-direction: column; gap: 0; }
        .adm-notif-history-item {
          display: flex; align-items: center; justify-content: space-between; padding: 14px 0;
          font-size: 14px; flex-wrap: wrap; gap: 8px;
        }
        .adm-notif-history-item + .adm-notif-history-item { border-top: 1px solid transparent; }
        .admin-layout--dark .adm-notif-history-item + .adm-notif-history-item { border-color: #2a2a32; }
        .admin-layout--light .adm-notif-history-item + .adm-notif-history-item { border-color: #f0f0f0; }
        .adm-notif-history-title { font-weight: 600; flex: 1; min-width: 200px; }
        .adm-notif-history-badge {
          padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; color: #fff;
        }
        .adm-notif-history-meta { display: flex; gap: 20px; font-size: 13px; opacity: 0.6; }
      `}</style>

      {/* Header */}
      <div className="adm-notif-header">
        <h1 className="adm-notif-gold">Notifications Manager</h1>
      </div>

      {/* Section 1: Send Notification */}
      <div className="adm-notif-send-section adm-notif-card">
        <h2 className="adm-notif-section-title">Send Notification</h2>

        <div className="adm-notif-form-grid">
          <div className="adm-notif-form-group adm-notif-form-full">
            <label>Title</label>
            <input
              className="adm-notif-input"
              type="text"
              placeholder="Notification title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="adm-notif-form-group adm-notif-form-full">
            <label>Message</label>
            <textarea
              className="adm-notif-input"
              placeholder="Write your notification message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="adm-notif-form-group">
            <label>Type</label>
            <select className="adm-notif-input" value={type} onChange={(e) => setType(e.target.value)}>
              {NOTIF_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="adm-notif-form-group">
            <label>Target</label>
            <select className="adm-notif-input" value={target} onChange={(e) => setTarget(e.target.value)}>
              {TARGETS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Preview */}
        <div className="adm-notif-preview">
          <div className="adm-notif-preview-label">Preview</div>
          <div className="adm-notif-preview-card" style={{ borderLeftColor: TYPE_COLORS[type] || '#c9a96e' }}>
            <div className="adm-notif-preview-top">
              <span className="adm-notif-preview-title">{title || 'Notification Title'}</span>
              <span className="adm-notif-preview-type" style={{ background: TYPE_COLORS[type] || '#c9a96e' }}>{type}</span>
            </div>
            <div className="adm-notif-preview-msg">{message || 'Your notification message will appear here...'}</div>
            <div className="adm-notif-preview-meta">
              <span>Target: {target}</span>
              <span>Now</span>
            </div>
          </div>
        </div>

        <div className="adm-notif-actions">
          <button className="adm-notif-btn adm-notif-btn-primary" onClick={handleSendNow}>Send Now</button>
          <button className="adm-notif-btn adm-notif-btn-secondary" onClick={handleSchedule}>Schedule</button>
        </div>
      </div>

      {/* Section 2: Notification Templates */}
      <div className="adm-notif-templates">
        <h2 className="adm-notif-section-title">Notification Templates</h2>
        <div className="adm-notif-template-grid">
          {TEMPLATES.map(tmpl => (
            <div key={tmpl.id} className="adm-notif-template-card adm-notif-card">
              <div className="adm-notif-template-icon">{tmpl.icon}</div>
              <div className="adm-notif-template-name">{tmpl.name}</div>
              <div className="adm-notif-template-desc">{tmpl.description}</div>
              <button className="adm-notif-template-btn" onClick={() => useTemplate(tmpl)}>Use Template</button>
            </div>
          ))}
        </div>
      </div>

      {/* Sent History */}
      <div className="adm-notif-history">
        <h2 className="adm-notif-section-title">Sent History</h2>
        <div className="adm-notif-history-card adm-notif-card">
          <div className="adm-notif-history-list">
            {MOCK_HISTORY.map(item => (
              <div key={item.id} className="adm-notif-history-item">
                <span className="adm-notif-history-title">{item.title}</span>
                <span className="adm-notif-history-badge" style={{ background: TYPE_COLORS[item.type] || '#c9a96e' }}>{item.type}</span>
                <div className="adm-notif-history-meta">
                  <span>{item.recipients.toLocaleString()} recipients</span>
                  <span>{item.sentAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
