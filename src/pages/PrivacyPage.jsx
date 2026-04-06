export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      text: 'We collect information you provide directly, such as your name, email address, and payment details when you create an account or make a booking. We also collect usage data automatically, including your IP address, browser type, and pages visited. Location data may be collected when you use our mobile app with your permission.',
    },
    {
      title: 'How We Use Your Information',
      text: 'Your information is used to process bookings, personalize your travel recommendations, and improve our services. We may send you promotional communications about deals and new features, which you can opt out of at any time. We also use aggregated, anonymized data for analytics and service improvement.',
    },
    {
      title: 'Data Sharing',
      text: 'We share your information with travel service providers (hotels, airlines) only as necessary to fulfill your bookings. We may share data with trusted third-party service providers who assist us in operating our platform, subject to strict confidentiality agreements. We will never sell your personal information to advertisers or data brokers.',
    },
    {
      title: 'Cookies',
      text: 'We use cookies and similar technologies to maintain your session, remember your preferences, and analyze site traffic. Essential cookies are required for the platform to function properly. You can manage your cookie preferences through your browser settings or our cookie consent banner.',
    },
    {
      title: 'Security',
      text: 'We implement industry-standard security measures including SSL encryption, secure data storage, and regular security audits to protect your information. Access to personal data is restricted to authorized employees who need it to perform their job functions. While no system is completely secure, we are committed to protecting your data to the best of our ability.',
    },
    {
      title: 'Your Rights',
      text: 'You have the right to access, correct, or delete your personal information at any time through your account settings. You may request a copy of all data we hold about you by contacting our support team. Depending on your jurisdiction, you may have additional rights under GDPR, CCPA, or other applicable data protection laws.',
    },
    {
      title: 'Contact Us',
      text: 'If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@wanderlust.com. You may also write to us at: Wanderlust Inc., 123 Travel Street, Suite 400, San Francisco, CA 94105. We aim to respond to all privacy inquiries within 30 business days.',
    },
  ]

  return (
    <>
      <style>{`
        .privacy-wrapper {
          max-width: 720px;
          margin: 0 auto;
          padding: 120px 24px 80px;
          font-family: 'Inter', sans-serif;
          color: #374151;
          background: #fff;
        }
        .privacy-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }
        .privacy-updated {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 40px;
        }
        .privacy-section {
          margin-bottom: 32px;
        }
        .privacy-section h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 10px;
        }
        .privacy-section p {
          font-size: 0.95rem;
          line-height: 1.75;
          color: #374151;
        }
        .privacy-divider {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 0 0 32px;
        }
        [data-theme="dark"] .privacy-wrapper {
          background: #111827;
          color: #d1d5db;
        }
        [data-theme="dark"] .privacy-title,
        [data-theme="dark"] .privacy-section h2 {
          color: #f9fafb;
        }
        [data-theme="dark"] .privacy-updated {
          color: #9ca3af;
        }
        [data-theme="dark"] .privacy-section p {
          color: #d1d5db;
        }
        [data-theme="dark"] .privacy-divider {
          border-color: #374151;
        }
      `}</style>
      <div className="privacy-wrapper">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-updated">Last updated: March 1, 2026</p>
        {sections.map((section, i) => (
          <div key={section.title}>
            {i > 0 && <hr className="privacy-divider" />}
            <div className="privacy-section">
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
