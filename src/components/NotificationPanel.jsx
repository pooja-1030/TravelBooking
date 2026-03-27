import { useApp } from '../contexts/AppContext'

export default function NotificationPanel() {
  const { notifications, showNotifications, setShowNotifications, markNotificationRead, markAllRead, clearNotifications, unreadCount } = useApp()

  if (!showNotifications) return null

  return (
    <>
      <div className="notif-backdrop" onClick={() => setShowNotifications(false)} />
      <div className="notif-panel">
        <div className="notif-header">
          <h3>Notifications {unreadCount > 0 && <span className="notif-count">{unreadCount}</span>}</h3>
          <div className="notif-actions">
            {unreadCount > 0 && <button onClick={markAllRead}>Mark all read</button>}
            {notifications.length > 0 && <button onClick={clearNotifications}>Clear all</button>}
          </div>
        </div>

        <div className="notif-list">
          {notifications.length === 0 ? (
            <div className="notif-empty">
              <span className="notif-empty-icon">{'\ud83d\udd14'}</span>
              <p>No notifications yet</p>
            </div>
          ) : notifications.map(n => (
            <div
              key={n.id}
              className={`notif-item${n.read ? '' : ' unread'}`}
              onClick={() => markNotificationRead(n.id)}
            >
              <span className="notif-icon">{n.icon}</span>
              <div className="notif-content">
                <h4>{n.title}</h4>
                <p>{n.message}</p>
                <span className="notif-time">{n.time}</span>
              </div>
              {!n.read && <span className="notif-dot" />}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
