import { Link } from 'react-router-dom'

const teamMembers = [
  { name: 'Sarah Chen', role: 'Co-Founder & CEO' },
  { name: 'Marcus Rivera', role: 'Chief Technology Officer' },
  { name: 'Priya Sharma', role: 'Head of Product' },
  { name: 'James O\'Brien', role: 'Head of Operations' },
]

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-wrapper {
          max-width: 720px;
          margin: 0 auto;
          padding: 120px 24px 80px;
          font-family: 'Inter', sans-serif;
          color: #374151;
          background: #fff;
        }
        .about-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 12px;
        }
        .about-accent {
          color: #e04e2a;
        }
        .about-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          margin-bottom: 40px;
          line-height: 1.7;
        }
        .about-section {
          margin-bottom: 36px;
        }
        .about-section h2 {
          font-size: 1.375rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 12px;
        }
        .about-section p {
          line-height: 1.75;
          margin-bottom: 12px;
          color: #374151;
        }
        .about-values {
          display: flex;
          gap: 20px;
          margin-top: 16px;
          flex-wrap: wrap;
        }
        .about-value-card {
          flex: 1;
          min-width: 180px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          text-align: center;
        }
        .about-value-card h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #e04e2a;
          margin-bottom: 6px;
        }
        .about-value-card p {
          font-size: 0.875rem;
          color: #6b7280;
          line-height: 1.5;
        }
        .about-team-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }
        .about-team-card {
          padding: 24px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          text-align: center;
        }
        .about-team-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          font-size: 1.5rem;
          font-weight: 600;
          color: #e04e2a;
        }
        .about-team-card h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }
        .about-team-card p {
          font-size: 0.875rem;
          color: #6b7280;
        }
        .about-cta {
          margin-top: 48px;
          padding: 32px;
          background: #fef2f0;
          border-radius: 12px;
          text-align: center;
        }
        .about-cta p {
          font-size: 1.125rem;
          color: #111827;
          margin-bottom: 16px;
          font-weight: 500;
        }
        .about-cta-link {
          display: inline-block;
          padding: 10px 28px;
          background: #e04e2a;
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 0.2s;
        }
        .about-cta-link:hover {
          background: #c94323;
        }
        [data-theme="dark"] .about-wrapper {
          background: #111827;
          color: #d1d5db;
        }
        [data-theme="dark"] .about-title,
        [data-theme="dark"] .about-section h2 {
          color: #f9fafb;
        }
        [data-theme="dark"] .about-subtitle {
          color: #9ca3af;
        }
        [data-theme="dark"] .about-section p {
          color: #d1d5db;
        }
        [data-theme="dark"] .about-value-card,
        [data-theme="dark"] .about-team-card {
          border-color: #374151;
          background: #1f2937;
        }
        [data-theme="dark"] .about-value-card p,
        [data-theme="dark"] .about-team-card p {
          color: #9ca3af;
        }
        [data-theme="dark"] .about-team-card h3 {
          color: #f9fafb;
        }
        [data-theme="dark"] .about-team-avatar {
          background: #374151;
        }
        [data-theme="dark"] .about-cta {
          background: #1f2937;
        }
        [data-theme="dark"] .about-cta p {
          color: #f9fafb;
        }
      `}</style>
      <div className="about-wrapper">
        <h1 className="about-title">About <span className="about-accent">Wanderlust</span></h1>
        <p className="about-subtitle">
          We are a travel platform dedicated to connecting people with extraordinary destinations around the world.
        </p>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Wanderlust, we believe that travel has the power to transform lives. Our platform makes it easy for
            anyone to discover, plan, and book their dream trips -- whether it is a weekend getaway or a month-long
            adventure across continents.
          </p>
          <p>
            Founded in 2021, we started with a simple idea: travel planning should be seamless, affordable, and
            inspiring. Today, we serve travelers in over 50 countries, partnering with thousands of hotels, airlines,
            and local experience providers to bring the best deals and curated itineraries to our users.
          </p>
        </div>

        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            Our team is made up of passionate travelers, engineers, and designers spread across the globe. We bring
            diverse perspectives and deep expertise in travel technology to everything we build. From our headquarters
            in San Francisco, we work remotely with team members in London, Singapore, and Sao Paulo.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <div className="about-values">
            <div className="about-value-card">
              <h3>Trust</h3>
              <p>Transparent pricing, honest reviews, and reliable customer support you can count on.</p>
            </div>
            <div className="about-value-card">
              <h3>Innovation</h3>
              <p>Using AI and data to personalize every trip and make travel planning smarter.</p>
            </div>
            <div className="about-value-card">
              <h3>Accessibility</h3>
              <p>Making world-class travel experiences available to everyone, regardless of budget.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Our Team</h2>
          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <div className="about-team-card" key={member.name}>
                <div className="about-team-avatar">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-cta">
          <p>Interested in joining our team?</p>
          <Link to="/careers" className="about-cta-link">View Open Positions</Link>
        </div>
      </div>
    </>
  )
}
