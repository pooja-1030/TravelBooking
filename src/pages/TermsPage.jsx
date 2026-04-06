export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      text: 'By accessing or using the Wanderlust platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use our services. We reserve the right to update these terms at any time, and your continued use constitutes acceptance of any changes.',
    },
    {
      title: 'Use of Service',
      text: 'You may use our platform solely for lawful purposes related to researching, planning, and booking travel. You agree not to misuse our services, including attempting to access them through automated means without permission. Any unauthorized use may result in immediate termination of your access.',
    },
    {
      title: 'User Accounts',
      text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account. Notify us immediately if you suspect any unauthorized use of your account.',
    },
    {
      title: 'Booking & Payments',
      text: 'All bookings made through Wanderlust are subject to availability and confirmation by the service provider. Prices displayed are in the selected currency and may be subject to taxes and fees shown at checkout. Payment is processed securely at the time of booking, and you will receive a confirmation email with your booking details.',
    },
    {
      title: 'Cancellation Policy',
      text: 'Cancellation policies vary by booking type and service provider. Standard bookings may be cancelled up to 48 hours before the scheduled date for a full refund. Non-refundable bookings are clearly marked during the checkout process. Refunds are processed to the original payment method within 5-10 business days.',
    },
    {
      title: 'Limitation of Liability',
      text: 'Wanderlust acts as an intermediary between you and travel service providers. We are not liable for the actions, errors, or omissions of hotels, airlines, or other third-party providers. Our total liability to you for any claim arising from the use of our services shall not exceed the amount you paid for the specific booking in question.',
    },
    {
      title: 'Changes to Terms',
      text: 'We may revise these Terms of Service at our discretion. Material changes will be communicated via email or a prominent notice on our platform at least 30 days before they take effect. Your continued use of the platform after changes become effective constitutes your acceptance of the revised terms.',
    },
    {
      title: 'Contact',
      text: 'If you have any questions about these Terms of Service, please contact us at legal@wanderlust.com. You may also reach us by mail at: Wanderlust Inc., 123 Travel Street, Suite 400, San Francisco, CA 94105. We will make reasonable efforts to address your concerns promptly.',
    },
  ]

  return (
    <>
      <style>{`
        .terms-wrapper {
          max-width: 720px;
          margin: 0 auto;
          padding: 120px 24px 80px;
          font-family: 'Inter', sans-serif;
          color: #374151;
          background: #fff;
        }
        .terms-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }
        .terms-updated {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 40px;
        }
        .terms-section {
          margin-bottom: 32px;
        }
        .terms-section h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 10px;
        }
        .terms-section p {
          font-size: 0.95rem;
          line-height: 1.75;
          color: #374151;
        }
        .terms-divider {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 0 0 32px;
        }
        [data-theme="dark"] .terms-wrapper {
          background: #111827;
          color: #d1d5db;
        }
        [data-theme="dark"] .terms-title,
        [data-theme="dark"] .terms-section h2 {
          color: #f9fafb;
        }
        [data-theme="dark"] .terms-updated {
          color: #9ca3af;
        }
        [data-theme="dark"] .terms-section p {
          color: #d1d5db;
        }
        [data-theme="dark"] .terms-divider {
          border-color: #374151;
        }
      `}</style>
      <div className="terms-wrapper">
        <h1 className="terms-title">Terms of Service</h1>
        <p className="terms-updated">Last updated: March 1, 2026</p>
        {sections.map((section, i) => (
          <div key={section.title}>
            {i > 0 && <hr className="terms-divider" />}
            <div className="terms-section">
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
