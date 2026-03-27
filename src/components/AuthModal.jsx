import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function AuthModal() {
  const { showAuth, setShowAuth, authTab, setAuthTab, login, signup } = useApp()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  if (!showAuth) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (authTab === 'login') login(email, name || email.split('@')[0])
      else signup(email, name)
      setEmail(''); setName(''); setPassword(''); setLoading(false)
    }, 800)
  }

  const handleSocial = (provider) => {
    setLoading(true)
    setTimeout(() => {
      login(`${provider}@email.com`, `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`)
      setLoading(false)
    }, 600)
  }

  return (
    <div className="auth-overlay" onClick={() => setShowAuth(false)}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-close" onClick={() => setShowAuth(false)}>&times;</button>

        <div className="auth-header">
          <div className="auth-logo">\u2708 Wanderlust</div>
          <h2>{authTab === 'login' ? 'Welcome Back' : 'Join Wanderlust'}</h2>
          <p>{authTab === 'login' ? 'Sign in to access your trips, wishlist & rewards' : 'Create your free account and start exploring'}</p>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab${authTab === 'login' ? ' active' : ''}`} onClick={() => setAuthTab('login')}>Login</button>
          <button className={`auth-tab${authTab === 'signup' ? ' active' : ''}`} onClick={() => setAuthTab('signup')}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {authTab === 'signup' && (
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required minLength={6} />
          </div>
          {authTab === 'login' && <a href="#" className="auth-forgot">Forgot password?</a>}
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : authTab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>
        <div className="auth-social">
          <button className="auth-social-btn" onClick={() => handleSocial('google')} disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
          <button className="auth-social-btn" onClick={() => handleSocial('apple')} disabled={loading}>
            <span style={{ fontSize: 18 }}>\ud83c\udf4e</span> Apple
          </button>
        </div>

        <p className="auth-footer-text">
          {authTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button className="auth-switch" onClick={() => setAuthTab(authTab === 'login' ? 'signup' : 'login')}>
            {authTab === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
