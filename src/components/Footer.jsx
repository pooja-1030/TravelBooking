import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="ft-footer">
      <style>{`
        .ft-footer {
          font-family: 'Inter', sans-serif;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          padding: 48px 0 0;
        }

        .ft-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .ft-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
        }

        .ft-logo {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 12px;
        }

        .ft-logo:hover {
          color: #e04e2a;
        }

        .ft-description {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.6;
          max-width: 280px;
          margin: 0;
        }

        .ft-heading {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 16px 0;
        }

        .ft-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .ft-links li {
          margin-bottom: 10px;
        }

        .ft-links a {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }

        .ft-links a:hover {
          color: #e04e2a;
        }

        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 48px;
          padding: 20px 0;
          border-top: 1px solid #e5e7eb;
        }

        .ft-copyright {
          color: #6b7280;
          font-size: 0.8125rem;
          margin: 0;
        }

        .ft-socials {
          display: flex;
          gap: 20px;
        }

        .ft-socials a {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.8125rem;
          transition: color 0.2s ease;
        }

        .ft-socials a:hover {
          color: #e04e2a;
        }

        @media (max-width: 768px) {
          .ft-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .ft-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .ft-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Dark theme */
        [data-theme="dark"] .ft-footer {
          background: #0f1115;
          border-top-color: #2a2d35;
        }

        [data-theme="dark"] .ft-logo {
          color: #f5f6f8;
        }

        [data-theme="dark"] .ft-heading {
          color: #f5f6f8;
        }

        [data-theme="dark"] .ft-description,
        [data-theme="dark"] .ft-links a,
        [data-theme="dark"] .ft-copyright,
        [data-theme="dark"] .ft-socials a {
          color: #a0a3ab;
        }

        [data-theme="dark"] .ft-links a:hover,
        [data-theme="dark"] .ft-socials a:hover,
        [data-theme="dark"] .ft-logo:hover {
          color: #e04e2a;
        }

        [data-theme="dark"] .ft-bottom {
          border-top-color: #2a2d35;
        }
      `}</style>

      <div className="ft-container">
        <div className="ft-grid">
          <div>
            <Link to="/" className="ft-logo">Wanderlust</Link>
            <p className="ft-description">
              Your trusted partner for discovering the world. We make travel simple, memorable, and accessible for everyone.
            </p>
          </div>

          <div>
            <h4 className="ft-heading">Explore</h4>
            <ul className="ft-links">
              <li><Link to="/search">Destinations</Link></li>
              <li><Link to="/search">Hotels</Link></li>
              <li><Link to="/planner">Trip Planner</Link></li>
              <li><Link to="/group-trip">Group Trips</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="ft-heading">Company</h4>
            <ul className="ft-links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="ft-heading">Support</h4>
            <ul className="ft-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/chatbot">Chat Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <p className="ft-copyright">&copy; 2026 Wanderlust. All rights reserved.</p>
          <div className="ft-socials">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
