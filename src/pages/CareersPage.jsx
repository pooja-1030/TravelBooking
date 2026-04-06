const jobs = [
  {
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build beautiful, performant user interfaces for our travel platform using React and modern web technologies. You will work closely with designers and backend engineers to deliver seamless booking experiences.',
  },
  {
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design and scale the APIs and services that power millions of travel bookings. You will work with Node.js, PostgreSQL, and cloud infrastructure to ensure reliability and performance.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Shape the future of travel planning through thoughtful design. You will conduct user research, create wireframes and prototypes, and collaborate with engineering to ship polished features.',
  },
  {
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Drive growth and brand awareness across digital channels. You will develop campaigns, manage partnerships, and analyze performance data to optimize our marketing strategy.',
  },
]

export default function CareersPage() {
  return (
    <>
      <style>{`
        .career-wrapper {
          max-width: 720px;
          margin: 0 auto;
          padding: 120px 24px 80px;
          font-family: 'Inter', sans-serif;
          color: #374151;
          background: #fff;
        }
        .career-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }
        .career-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          margin-bottom: 40px;
          line-height: 1.7;
        }
        .career-card {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 28px;
          margin-bottom: 20px;
        }
        .career-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .career-card-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #111827;
        }
        .career-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .career-tag {
          font-size: 0.78rem;
          padding: 4px 12px;
          border-radius: 20px;
          background: #f3f4f6;
          color: #6b7280;
          font-weight: 500;
        }
        .career-card-desc {
          font-size: 0.925rem;
          line-height: 1.7;
          color: #374151;
          margin-bottom: 20px;
        }
        .career-apply-btn {
          display: inline-block;
          padding: 10px 28px;
          background: #e04e2a;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .career-apply-btn:hover {
          background: #c94323;
        }
        [data-theme="dark"] .career-wrapper {
          background: #111827;
          color: #d1d5db;
        }
        [data-theme="dark"] .career-title {
          color: #f9fafb;
        }
        [data-theme="dark"] .career-subtitle {
          color: #9ca3af;
        }
        [data-theme="dark"] .career-card {
          border-color: #374151;
          background: #1f2937;
        }
        [data-theme="dark"] .career-card-title {
          color: #f9fafb;
        }
        [data-theme="dark"] .career-card-desc {
          color: #d1d5db;
        }
        [data-theme="dark"] .career-tag {
          background: #374151;
          color: #9ca3af;
        }
      `}</style>
      <div className="career-wrapper">
        <h1 className="career-title">Careers at Wanderlust</h1>
        <p className="career-subtitle">Join our team and help people explore the world</p>
        {jobs.map((job) => (
          <div className="career-card" key={job.title}>
            <div className="career-card-header">
              <h2 className="career-card-title">{job.title}</h2>
              <div className="career-tags">
                <span className="career-tag">{job.department}</span>
                <span className="career-tag">{job.location}</span>
                <span className="career-tag">{job.type}</span>
              </div>
            </div>
            <p className="career-card-desc">{job.description}</p>
            <button className="career-apply-btn">Apply</button>
          </div>
        ))}
      </div>
    </>
  )
}
