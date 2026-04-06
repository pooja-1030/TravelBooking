import { useState } from 'react'

const faqs = [
  {
    question: 'How do I book a trip?',
    answer: 'Browse destinations on our homepage or use the search bar to find your ideal location. Select your dates and number of travelers, choose from available hotels and flights, then proceed to checkout. You will receive a confirmation email once your booking is complete.',
  },
  {
    question: 'Can I cancel my booking?',
    answer: 'Yes, most bookings can be cancelled up to 48 hours before your scheduled departure for a full refund. Some special rate bookings may have different cancellation policies, which are clearly displayed during checkout. Visit your dashboard to manage or cancel existing bookings.',
  },
  {
    question: 'How do I earn rewards points?',
    answer: 'You earn points automatically on every booking made through Wanderlust. Points are credited to your account within 24 hours of completing your trip. You can redeem points for discounts on future bookings, upgrades, or exclusive experiences.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. In select regions, we also support bank transfers and local payment methods. All transactions are secured with industry-standard encryption.',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach our support team 24/7 via live chat on our website, by emailing support@wanderlust.com, or by calling +1 (800) 555-0199 during business hours. For urgent travel issues, our emergency line is available around the clock.',
  },
  {
    question: 'Is my personal data secure?',
    answer: 'Absolutely. We use bank-level encryption to protect your personal and payment information. We never sell your data to third parties. You can review our full privacy practices on our Privacy Policy page, and you can request data deletion at any time.',
  },
]

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const [search, setSearch] = useState('')

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  const filtered = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <style>{`
        .help-wrapper {
          max-width: 720px;
          margin: 0 auto;
          padding: 120px 24px 80px;
          font-family: 'Inter', sans-serif;
          color: #374151;
          background: #fff;
        }
        .help-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 24px;
        }
        .help-search {
          width: 100%;
          padding: 12px 18px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
          color: #374151;
          margin-bottom: 36px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .help-search:focus {
          border-color: #e04e2a;
        }
        .help-search::placeholder {
          color: #9ca3af;
        }
        .help-faq {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          margin-bottom: 12px;
          overflow: hidden;
        }
        .help-faq-q {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          cursor: pointer;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
        }
        .help-faq-q:hover {
          background: #f9fafb;
        }
        .help-faq-arrow {
          font-size: 0.85rem;
          color: #6b7280;
          transition: transform 0.2s;
          flex-shrink: 0;
          margin-left: 12px;
        }
        .help-faq-arrow.help-open {
          transform: rotate(180deg);
        }
        .help-faq-a {
          padding: 0 20px 18px;
          font-size: 0.925rem;
          line-height: 1.7;
          color: #374151;
        }
        .help-no-results {
          text-align: center;
          color: #6b7280;
          padding: 32px 0;
          font-size: 0.95rem;
        }
        [data-theme="dark"] .help-wrapper {
          background: #111827;
          color: #d1d5db;
        }
        [data-theme="dark"] .help-title {
          color: #f9fafb;
        }
        [data-theme="dark"] .help-search {
          background: #1f2937;
          border-color: #374151;
          color: #d1d5db;
        }
        [data-theme="dark"] .help-faq {
          border-color: #374151;
          background: #1f2937;
        }
        [data-theme="dark"] .help-faq-q {
          color: #f9fafb;
        }
        [data-theme="dark"] .help-faq-q:hover {
          background: #374151;
        }
        [data-theme="dark"] .help-faq-a {
          color: #d1d5db;
        }
        [data-theme="dark"] .help-faq-arrow {
          color: #9ca3af;
        }
      `}</style>
      <div className="help-wrapper">
        <h1 className="help-title">Help Center</h1>
        <input
          className="help-search"
          type="text"
          placeholder="Search for help..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filtered.length === 0 && (
          <p className="help-no-results">No results found. Try a different search term.</p>
        )}
        {filtered.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div className="help-faq" key={faq.question}>
              <button className="help-faq-q" onClick={() => toggle(i)}>
                {faq.question}
                <span className={`help-faq-arrow ${isOpen ? 'help-open' : ''}`}>&#9660;</span>
              </button>
              {isOpen && <div className="help-faq-a">{faq.answer}</div>}
            </div>
          )
        })}
      </div>
    </>
  )
}
