import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../AdminContext'

export default function AdminLogin() {
  const { admin, adminLogin, loginError, setLoginError } = useAdmin()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)

  /* Redirect if already logged in */
  useEffect(() => {
    if (admin) navigate('/admin')
  }, [admin, navigate])

  /* Clear errors when inputs change */
  useEffect(() => {
    if (loginError) setLoginError('')
  }, [username, password])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loading) return
    if (!username.trim() || !password.trim()) {
      setLoginError('Please enter both username and password')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const success = adminLogin(username.trim(), password)
      setLoading(false)
      if (success) {
        navigate('/admin')
      }
    }, 1000)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    alert('Password reset is not available in demo mode. Use the default credentials: admin / Admin@123')
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Branding */}
        <div className="admin-login-brand">
          <div className="admin-login-logo">
            <svg
              className="admin-login-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L2 10l7 3 3 7 10-18z" />
            </svg>
          </div>
          <h1 className="admin-login-title">Wanderlust</h1>
          <p className="admin-login-subtitle">Admin Portal</p>
        </div>

        {/* Form */}
        <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
          {/* Username field */}
          <div className={`admin-login-field ${username ? 'admin-login-field--filled' : ''}`}>
            <input
              id="admin-login-username"
              className="admin-login-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              disabled={loading}
            />
            <label htmlFor="admin-login-username" className="admin-login-label">
              Username or Email
            </label>
          </div>

          {/* Password field */}
          <div className={`admin-login-field ${password ? 'admin-login-field--filled' : ''}`}>
            <input
              id="admin-login-password"
              className="admin-login-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              disabled={loading}
            />
            <label htmlFor="admin-login-password" className="admin-login-label">
              Password
            </label>
            <button
              type="button"
              className="admin-login-eye"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                /* Eye-off icon */
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                /* Eye icon */
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* Remember me + Forgot */}
          <div className="admin-login-options">
            <label className="admin-login-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <span className="admin-login-checkbox-mark" />
              <span>Remember me</span>
            </label>
            <a href="#" className="admin-login-forgot" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
          </div>

          {/* Error message */}
          {loginError && (
            <div className="admin-login-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {loginError}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="admin-login-spinner" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo hint */}
        <p className="admin-login-hint">Demo: admin / Admin@123</p>
      </div>

      <style>{`
        .admin-login-page {
          --al-bg: #0e0e12;
          --al-card: #1a1a22;
          --al-border: #2a2a32;
          --al-gold: #c9a96e;
          --al-gold-hover: #dbbf88;
          --al-text: #e0e0e0;
          --al-text-muted: #888;
          --al-error: #ef4444;
          --al-error-bg: rgba(239, 68, 68, 0.08);
          --al-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          --al-input-bg: rgba(255, 255, 255, 0.04);
        }

        [data-theme="light"] .admin-login-page,
        :root:not([data-theme="dark"]) .admin-login-page {
          --al-bg: #f5f3ee;
          --al-card: #ffffff;
          --al-border: #e5e5e5;
          --al-gold: #8b6914;
          --al-gold-hover: #a57d1f;
          --al-text: #262626;
          --al-text-muted: #777;
          --al-error: #dc2626;
          --al-error-bg: rgba(220, 38, 38, 0.06);
          --al-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          --al-input-bg: rgba(0, 0, 0, 0.03);
        }

        /* Reset light-mode override when dark is explicit */
        [data-theme="dark"] .admin-login-page {
          --al-bg: #0e0e12;
          --al-card: #1a1a22;
          --al-border: #2a2a32;
          --al-gold: #c9a96e;
          --al-gold-hover: #dbbf88;
          --al-text: #e0e0e0;
          --al-text-muted: #888;
          --al-error: #ef4444;
          --al-error-bg: rgba(239, 68, 68, 0.08);
          --al-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          --al-input-bg: rgba(255, 255, 255, 0.04);
        }

        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--al-bg);
          font-family: 'DM Sans', sans-serif;
          color: var(--al-text);
          padding: 24px;
          box-sizing: border-box;
        }

        .admin-login-card {
          width: 100%;
          max-width: 420px;
          background: var(--al-card);
          border: 1px solid var(--al-border);
          border-radius: 16px;
          padding: 48px 40px 40px;
          box-shadow: var(--al-shadow);
          animation: admin-login-fadeIn 0.5s ease;
        }

        @keyframes admin-login-fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Branding ── */
        .admin-login-brand {
          text-align: center;
          margin-bottom: 36px;
        }

        .admin-login-logo {
          width: 52px;
          height: 52px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid var(--al-gold);
          border-radius: 14px;
          color: var(--al-gold);
        }

        .admin-login-icon {
          width: 26px;
          height: 26px;
        }

        .admin-login-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: 1px;
          margin: 0 0 4px;
          color: var(--al-text);
        }

        .admin-login-subtitle {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--al-gold);
          margin: 0;
        }

        /* ── Form ── */
        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ── Floating-label field ── */
        .admin-login-field {
          position: relative;
        }

        .admin-login-input {
          width: 100%;
          height: 52px;
          padding: 22px 14px 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: var(--al-text);
          background: var(--al-input-bg);
          border: 1px solid var(--al-border);
          border-radius: 10px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .admin-login-input:focus {
          border-color: var(--al-gold);
          box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.15);
        }

        .admin-login-label {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          color: var(--al-text-muted);
          pointer-events: none;
          transition: all 0.2s ease;
        }

        .admin-login-input:focus ~ .admin-login-label,
        .admin-login-field--filled .admin-login-label {
          top: 14px;
          transform: translateY(0);
          font-size: 11px;
          color: var(--al-gold);
          letter-spacing: 0.3px;
        }

        /* ── Eye toggle ── */
        .admin-login-eye {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: var(--al-text-muted);
          transition: color 0.2s;
        }

        .admin-login-eye:hover {
          color: var(--al-text);
        }

        .admin-login-eye svg {
          width: 18px;
          height: 18px;
        }

        /* ── Options row ── */
        .admin-login-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
        }

        .admin-login-remember {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--al-text-muted);
          user-select: none;
        }

        .admin-login-remember input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .admin-login-checkbox-mark {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 1.5px solid var(--al-border);
          border-radius: 4px;
          transition: all 0.2s;
          position: relative;
          flex-shrink: 0;
        }

        .admin-login-remember input:checked ~ .admin-login-checkbox-mark {
          background: var(--al-gold);
          border-color: var(--al-gold);
        }

        .admin-login-remember input:checked ~ .admin-login-checkbox-mark::after {
          content: '';
          position: absolute;
          left: 4.5px;
          top: 1.5px;
          width: 5px;
          height: 9px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .admin-login-forgot {
          color: var(--al-gold);
          text-decoration: none;
          font-size: 13px;
          transition: opacity 0.2s;
        }

        .admin-login-forgot:hover {
          opacity: 0.8;
          text-decoration: underline;
        }

        /* ── Error ── */
        .admin-login-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: var(--al-error);
          background: var(--al-error-bg);
          border: 1px solid var(--al-error);
          border-radius: 8px;
          animation: admin-login-shake 0.35s ease;
        }

        .admin-login-error svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        @keyframes admin-login-shake {
          0%, 100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }

        /* ── Submit button ── */
        .admin-login-btn {
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--al-gold);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.5px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }

        .admin-login-btn:hover:not(:disabled) {
          background: var(--al-gold-hover);
        }

        .admin-login-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .admin-login-btn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        /* ── Spinner ── */
        .admin-login-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: admin-login-spin 0.6s linear infinite;
        }

        @keyframes admin-login-spin {
          to { transform: rotate(360deg); }
        }

        /* ── Demo hint ── */
        .admin-login-hint {
          margin: 24px 0 0;
          text-align: center;
          font-size: 12px;
          color: var(--al-text-muted);
          opacity: 0.6;
          letter-spacing: 0.3px;
        }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          .admin-login-card {
            padding: 36px 24px 28px;
            border-radius: 12px;
          }

          .admin-login-title {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  )
}
