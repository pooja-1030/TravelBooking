import { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import { supabase } from '../lib/supabase'

export default function AuthModal() {
  const { showAuth, setShowAuth, authTab, setAuthTab, login, signup, authError, setAuthError, authLoading } = useApp()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  if (!showAuth) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (authTab === 'login') {
      await login(email, password)
    } else {
      await signup(email, name, password)
    }
    setEmail(''); setName(''); setPassword('')
  }

  const handleSocial = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    })
    if (error) setAuthError(error.message)
  }

  const handleClose = () => {
    setShowAuth(false)
    setAuthError('')
    setEmail(''); setName(''); setPassword('')
  }

  return (
    <div className="auth-overlay" onClick={handleClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-close" onClick={handleClose}>&times;</button>

        <div className="auth-header">
          <div className="auth-logo">{'\u2708'} Wanderlust</div>
          <h2>{authTab === 'login' ? 'Welcome Back' : 'Join Wanderlust'}</h2>
          <p>{authTab === 'login' ? 'Sign in to access your trips, wishlist & rewards' : 'Create your free account and start exploring'}</p>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab${authTab === 'login' ? ' active' : ''}`} onClick={() => { setAuthTab('login'); setAuthError('') }}>Login</button>
          <button className={`auth-tab${authTab === 'signup' ? ' active' : ''}`} onClick={() => { setAuthTab('signup'); setAuthError('') }}>Sign Up</button>
        </div>

        {authError && (
          <div style={{ padding: '10px 16px', margin: '0 0 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, color: '#ef4444', fontSize: '0.85rem' }}>
            {authError}
          </div>
        )}

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
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'} required minLength={6} />
          </div>
          {authTab === 'login' && <a href="#" className="auth-forgot">Forgot password?</a>}
          <button type="submit" className="btn btn-primary auth-submit" disabled={authLoading}>
            {authLoading ? <span className="auth-spinner" /> : authTab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>
        <div className="auth-social">
          <button className="auth-social-btn" onClick={() => handleSocial('google')} disabled={authLoading}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
          <button className="auth-social-btn" onClick={() => handleSocial('github')} disabled={authLoading}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </button>
        </div>

        <p className="auth-footer-text">
          {authTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button className="auth-switch" onClick={() => { setAuthTab(authTab === 'login' ? 'signup' : 'login'); setAuthError('') }}>
            {authTab === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
