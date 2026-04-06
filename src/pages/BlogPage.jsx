import { Link } from 'react-router-dom'

const posts = [
  {
    title: 'Top 10 Budget Destinations 2026',
    excerpt: 'Discover affordable destinations that offer incredible experiences without breaking the bank. From Southeast Asia to Eastern Europe, these picks deliver maximum value.',
    date: 'March 28, 2026',
  },
  {
    title: 'How to Pack Light',
    excerpt: 'Master the art of minimalist packing with our tried-and-tested tips. Learn how to fit everything you need into a single carry-on bag.',
    date: 'March 15, 2026',
  },
  {
    title: 'Best Street Food Cities',
    excerpt: 'From Bangkok to Mexico City, explore the world through its street food scene. These cities offer unforgettable culinary adventures on every corner.',
    date: 'March 2, 2026',
  },
  {
    title: 'Travel Insurance Guide',
    excerpt: 'Everything you need to know about travel insurance: what it covers, when you need it, and how to choose the right plan for your trip.',
    date: 'February 18, 2026',
  },
  {
    title: 'Solo Travel Safety Tips',
    excerpt: 'Traveling alone can be one of the most rewarding experiences. Stay safe and confident with these essential tips for solo adventurers.',
    date: 'February 5, 2026',
  },
  {
    title: 'Hidden Gems in Europe',
    excerpt: 'Skip the tourist traps and discover Europe\'s best-kept secrets. Charming villages, quiet coastlines, and stunning landscapes await.',
    date: 'January 22, 2026',
  },
]

export default function BlogPage() {
  return (
    <>
      <style>{`
        .blog-wrapper {
          max-width: 720px;
          margin: 0 auto;
          padding: 120px 24px 80px;
          font-family: 'Inter', sans-serif;
          color: #374151;
          background: #fff;
        }
        .blog-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }
        .blog-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          margin-bottom: 40px;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .blog-card {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s;
        }
        .blog-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .blog-card-date {
          font-size: 0.8rem;
          color: #6b7280;
          margin-bottom: 8px;
        }
        .blog-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .blog-card-excerpt {
          font-size: 0.9rem;
          color: #374151;
          line-height: 1.65;
          flex: 1;
          margin-bottom: 16px;
        }
        .blog-card-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: #e04e2a;
          text-decoration: none;
        }
        .blog-card-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 600px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
        [data-theme="dark"] .blog-wrapper {
          background: #111827;
          color: #d1d5db;
        }
        [data-theme="dark"] .blog-title {
          color: #f9fafb;
        }
        [data-theme="dark"] .blog-subtitle {
          color: #9ca3af;
        }
        [data-theme="dark"] .blog-card {
          border-color: #374151;
          background: #1f2937;
        }
        [data-theme="dark"] .blog-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        [data-theme="dark"] .blog-card-title {
          color: #f9fafb;
        }
        [data-theme="dark"] .blog-card-excerpt {
          color: #d1d5db;
        }
        [data-theme="dark"] .blog-card-date {
          color: #9ca3af;
        }
      `}</style>
      <div className="blog-wrapper">
        <h1 className="blog-title">Blog</h1>
        <p className="blog-subtitle">Travel tips, guides, and inspiration</p>
        <div className="blog-grid">
          {posts.map((post) => (
            <div className="blog-card" key={post.title}>
              <span className="blog-card-date">{post.date}</span>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <Link to="#" className="blog-card-link">Read more</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
