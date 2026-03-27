import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="lux-footer">
      <style>{`
        .lux-footer {
          background: #0a0a0a;
          color: #ffffff;
          padding: 80px 0 0;
          border-top: 1px solid rgba(201, 169, 110, 0.2);
        }

        .lux-footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .lux-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
        }

        .lux-footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #c9a96e;
          text-decoration: none;
          letter-spacing: -0.01em;
          margin-bottom: 14px;
          transition: color 0.3s ease;
        }

        .lux-footer-logo:hover {
          color: #d4b87a;
        }

        .lux-footer-logo-icon {
          font-size: 1.2rem;
        }

        .lux-footer-description {
          color: #6a6a6a;
          font-size: 0.85rem;
          line-height: 1.7;
          margin-top: 14px;
          max-width: 300px;
        }

        .lux-footer-socials {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .lux-footer-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid transparent;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .lux-footer-social-btn svg {
          transition: stroke 0.3s ease;
        }

        .lux-footer-social-btn:hover {
          border-color: #c9a96e;
        }

        .lux-footer-social-btn:hover svg {
          stroke: #c9a96e;
        }

        .lux-footer-heading {
          font-size: 0.7rem;
          font-weight: 600;
          color: #c9a96e;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }

        .lux-footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .lux-footer-links a {
          color: #6a6a6a;
          text-decoration: none;
          font-size: 0.85rem;
          line-height: 2.2;
          display: block;
          transition: color 0.3s ease;
        }

        .lux-footer-links a:hover {
          color: #c9a96e;
        }

        .lux-footer-divider {
          height: 1px;
          background: rgba(201, 169, 110, 0.1);
          margin-top: 60px;
        }

        .lux-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 24px 0;
        }

        .lux-footer-copyright {
          color: #4a4a4a;
          font-size: 0.8rem;
          margin: 0;
        }

        .lux-footer-policy-links {
          display: flex;
          gap: 24px;
        }

        .lux-footer-policy-links a {
          color: #4a4a4a;
          text-decoration: none;
          font-size: 0.8rem;
          transition: color 0.3s ease;
        }

        .lux-footer-policy-links a:hover {
          color: #c9a96e;
        }

        @media (max-width: 768px) {
          .lux-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .lux-footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .lux-footer-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ========== LIGHT THEME ========== */
        [data-theme="light"] .lux-footer {
          background: #f8f6f1;
          border-top-color: rgba(139, 105, 20, 0.2);
        }
        [data-theme="light"] .lux-footer-logo { color: #8b6914; }
        [data-theme="light"] .lux-footer-description { color: #737373; }
        [data-theme="light"] .lux-footer-heading { color: #8b6914; }
        [data-theme="light"] .lux-footer-links a { color: #737373; }
        [data-theme="light"] .lux-footer-links a:hover { color: #8b6914; }
        [data-theme="light"] .lux-footer-bottom { border-top-color: #e5e5e5; color: #a3a3a3; }
        [data-theme="light"] .lux-footer-social-btn { background: rgba(139,105,20,0.06); }
        [data-theme="light"] .lux-footer-social-btn:hover { background: rgba(139,105,20,0.12); }
        [data-theme="light"] .lux-footer-social-btn svg { stroke: #737373; }
        [data-theme="light"] .lux-footer-social-btn:hover svg { stroke: #8b6914; }
      `}</style>

      <div className="lux-footer-container">
        <div className="lux-footer-grid">
          {/* Brand */}
          <div>
            <Link to="/" className="lux-footer-logo">
              <span className="lux-footer-logo-icon">{'\u2708'}</span>
              Wanderlust
            </Link>
            <p className="lux-footer-description">
              Making travel accessible, affordable, and unforgettable since 2020. Your trusted partner for adventures around the globe.
            </p>
            <div className="lux-footer-socials">
              {[
                { label: 'Facebook', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6a6a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { label: 'Twitter', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6a6a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg> },
                { label: 'Instagram', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6a6a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { label: 'YouTube', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6a6a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg> },
              ].map(({ label, icon }) => (
                <a key={label} href="#" aria-label={label} className="lux-footer-social-btn">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="lux-footer-heading">Explore</h4>
            <ul className="lux-footer-links">
              <li><Link to="/search">Destinations</Link></li>
              <li><Link to="/planner">AI Trip Planner</Link></li>
              <li><Link to="/group-trip">Group Trips</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="lux-footer-heading">Company</h4>
            <ul className="lux-footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="lux-footer-heading">Support</h4>
            <ul className="lux-footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Safety</a></li>
              <li><a href="#">Cancellation</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="lux-footer-divider" />

        {/* Bottom bar */}
        <div className="lux-footer-bottom">
          <p className="lux-footer-copyright">
            &copy; 2026 Wanderlust Travel. All rights reserved.
          </p>
          <div className="lux-footer-policy-links">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(text => (
              <a key={text} href="#">{text}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
