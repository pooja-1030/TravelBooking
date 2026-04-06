import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message. We will get back to you shortly.')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      <style>{`
        .contact-wrapper {
          max-width: 720px;
          margin: 0 auto;
          padding: 120px 24px 80px;
          font-family: 'Inter', sans-serif;
          color: #374151;
          background: #fff;
        }
        .contact-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 40px;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }
        .contact-form label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #111827;
          margin-bottom: 6px;
        }
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.925rem;
          font-family: 'Inter', sans-serif;
          color: #374151;
          margin-bottom: 18px;
          background: #fff;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #e04e2a;
        }
        .contact-form textarea {
          resize: vertical;
          min-height: 120px;
        }
        .contact-send-btn {
          padding: 11px 32px;
          background: #e04e2a;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: background 0.2s;
        }
        .contact-send-btn:hover {
          background: #c94323;
        }
        .contact-info h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 20px;
        }
        .contact-info-item {
          margin-bottom: 20px;
        }
        .contact-info-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        .contact-info-value {
          font-size: 0.95rem;
          color: #374151;
          line-height: 1.6;
        }
        @media (max-width: 600px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }
        [data-theme="dark"] .contact-wrapper {
          background: #111827;
          color: #d1d5db;
        }
        [data-theme="dark"] .contact-title,
        [data-theme="dark"] .contact-info h2 {
          color: #f9fafb;
        }
        [data-theme="dark"] .contact-form label {
          color: #f9fafb;
        }
        [data-theme="dark"] .contact-form input,
        [data-theme="dark"] .contact-form textarea {
          background: #1f2937;
          border-color: #374151;
          color: #d1d5db;
        }
        [data-theme="dark"] .contact-info-value {
          color: #d1d5db;
        }
        [data-theme="dark"] .contact-info-label {
          color: #9ca3af;
        }
      `}</style>
      <div className="contact-wrapper">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
            <label htmlFor="contact-subject">Subject</label>
            <input id="contact-subject" name="subject" value={form.subject} onChange={handleChange} required placeholder="How can we help?" />
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required placeholder="Tell us more..." />
            <button type="submit" className="contact-send-btn">Send Message</button>
          </form>
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="contact-info-item">
              <div className="contact-info-label">Email</div>
              <div className="contact-info-value">support@wanderlust.com</div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-label">Phone</div>
              <div className="contact-info-value">+1 (800) 555-0199</div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-label">Address</div>
              <div className="contact-info-value">
                123 Travel Street, Suite 400<br />
                San Francisco, CA 94105
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-label">Business Hours</div>
              <div className="contact-info-value">
                Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                Saturday - Sunday: 10:00 AM - 4:00 PM PST
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
