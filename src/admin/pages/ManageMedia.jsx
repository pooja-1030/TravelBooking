import { useState, useMemo } from 'react'
import { useAdmin } from '../AdminContext'

const CATEGORIES = ['Destinations', 'Hotels', 'Attractions', 'Restaurants']
const CITIES = ['Paris', 'Tokyo', 'Bali', 'Dubai', 'Santorini', 'New York', 'Maldives']

const CATEGORY_GRADIENTS = {
  Destinations: 'linear-gradient(135deg, #c9a96e 0%, #8b6914 100%)',
  Hotels: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  Attractions: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
  Restaurants: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
}

export default function ManageMedia() {
  const { media, addMedia, deleteMedia, addToast } = useAdmin()

  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const [formName, setFormName] = useState('')
  const [formCategory, setFormCategory] = useState('Destinations')
  const [formCity, setFormCity] = useState('Paris')

  const filteredMedia = useMemo(() => {
    return media.filter(item => {
      const matchesCategory = filterCategory === 'All' || item.category === filterCategory
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [media, filterCategory, searchTerm])

  const stats = useMemo(() => {
    const totalSize = media.reduce((sum, m) => {
      const num = parseFloat(m.size)
      return sum + (isNaN(num) ? 0 : num)
    }, 0)
    const breakdown = {}
    CATEGORIES.forEach(c => { breakdown[c] = media.filter(m => m.category === c).length })
    return { totalFiles: media.length, totalSize: totalSize.toFixed(1), breakdown }
  }, [media])

  const handleUpload = () => {
    if (!formName.trim()) { addToast('Please enter a file name', 'error'); return }
    addMedia({
      name: formName.endsWith('.jpg') ? formName : formName + '.jpg',
      category: formCategory,
      city: formCity,
      size: (Math.random() * 4 + 0.5).toFixed(1) + ' MB',
      uploadedAt: new Date().toISOString().split('T')[0],
      type: 'image',
    })
    setFormName('')
    setFormCategory('Destinations')
    setFormCity('Paris')
    setShowUploadForm(false)
  }

  const confirmDelete = (id) => {
    deleteMedia(id)
    setDeleteConfirmId(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    setShowUploadForm(true)
  }

  return (
    <div className="adm-med-page">
      <style>{`
        .adm-med-page { padding: 0; min-height: 100%; font-family: 'DM Sans', sans-serif; }

        /* ── Theme tokens ── */
        .admin-layout--dark .adm-med-card { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-med-card { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-med-gold { color: #c9a96e; }
        .admin-layout--light .adm-med-gold { color: #8b6914; }
        .admin-layout--dark .adm-med-muted { color: #888; }
        .admin-layout--light .adm-med-muted { color: #777; }
        .admin-layout--dark .adm-med-input {
          background: #12121a; border: 1px solid #2a2a32; color: #e0e0e0;
        }
        .admin-layout--light .adm-med-input {
          background: #f9f9f9; border: 1px solid #e5e5e5; color: #262626;
        }
        .admin-layout--dark .adm-med-border { border-color: #2a2a32; }
        .admin-layout--light .adm-med-border { border-color: #e5e5e5; }

        .adm-med-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
        .adm-med-header h1 { font-size: 28px; font-weight: 700; margin: 0; }

        /* Stats bar */
        .adm-med-stats { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
        .adm-med-stat { padding: 16px 20px; border-radius: 12px; min-width: 140px; flex: 1; }
        .adm-med-stat-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.6; margin-bottom: 4px; }
        .adm-med-stat-value { font-size: 24px; font-weight: 700; }
        .adm-med-stat-breakdown { display: flex; gap: 12px; flex-wrap: wrap; font-size: 13px; margin-top: 4px; }

        /* Controls */
        .adm-med-controls { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; align-items: center; }
        .adm-med-search {
          padding: 10px 14px; border-radius: 8px; font-size: 14px; min-width: 220px;
          font-family: 'DM Sans', sans-serif; outline: none;
        }
        .adm-med-search:focus { border-color: #c9a96e; }
        .adm-med-select {
          padding: 10px 14px; border-radius: 8px; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none; cursor: pointer;
        }
        .adm-med-view-toggle { display: flex; gap: 4px; margin-left: auto; }
        .adm-med-view-btn {
          padding: 8px 14px; border-radius: 8px; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; transition: all 0.2s;
        }
        .admin-layout--dark .adm-med-view-btn { background: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-med-view-btn { background: #f0f0f0; color: #262626; }
        .adm-med-view-btn.active { background: #c9a96e !important; color: #000 !important; }

        /* Upload area */
        .adm-med-upload-zone {
          border: 2px dashed #2a2a32; border-radius: 12px; padding: 40px; text-align: center;
          cursor: pointer; margin-bottom: 24px; transition: all 0.2s;
        }
        .admin-layout--light .adm-med-upload-zone { border-color: #e5e5e5; }
        .adm-med-upload-zone.dragover { border-color: #c9a96e; background: rgba(201,169,110,0.05); }
        .adm-med-upload-zone:hover { border-color: #c9a96e; }
        .adm-med-upload-icon { font-size: 36px; margin-bottom: 8px; }
        .adm-med-upload-text { font-size: 15px; opacity: 0.7; }
        .adm-med-upload-hint { font-size: 12px; opacity: 0.4; margin-top: 4px; }

        /* Upload form */
        .adm-med-upload-form { padding: 24px; border-radius: 12px; margin-bottom: 24px; }
        .adm-med-upload-form h3 { margin: 0 0 16px; font-size: 18px; font-weight: 600; }
        .adm-med-form-row { display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
        .adm-med-form-group { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 180px; }
        .adm-med-form-group label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.6; }
        .adm-med-form-group input,
        .adm-med-form-group select {
          padding: 10px 14px; border-radius: 8px; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none;
        }
        .adm-med-form-actions { display: flex; gap: 10px; margin-top: 16px; }
        .adm-med-btn {
          padding: 10px 20px; border-radius: 8px; border: none; font-size: 14px;
          font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .adm-med-btn-primary { background: #c9a96e; color: #000; }
        .adm-med-btn-primary:hover { background: #b8954f; }
        .adm-med-btn-secondary { background: transparent; border: 1px solid #2a2a32; }
        .admin-layout--light .adm-med-btn-secondary { border-color: #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-med-btn-secondary { color: #e0e0e0; }

        /* Grid view */
        .adm-med-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
        .adm-med-grid-card { border-radius: 12px; overflow: hidden; transition: transform 0.2s; }
        .adm-med-grid-card:hover { transform: translateY(-2px); }
        .adm-med-grid-thumb { height: 140px; display: flex; align-items: center; justify-content: center; font-size: 32px; color: #fff; }
        .adm-med-grid-info { padding: 14px; }
        .adm-med-grid-name { font-size: 14px; font-weight: 600; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .adm-med-grid-meta { display: flex; justify-content: space-between; align-items: center; font-size: 12px; opacity: 0.6; margin-bottom: 8px; }
        .adm-med-badge {
          display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
        }
        .admin-layout--dark .adm-med-badge { background: rgba(201,169,110,0.15); color: #c9a96e; }
        .admin-layout--light .adm-med-badge { background: rgba(139,105,20,0.1); color: #8b6914; }
        .adm-med-grid-actions { display: flex; justify-content: flex-end; }
        .adm-med-delete-btn {
          padding: 5px 12px; border-radius: 6px; border: none; font-size: 12px;
          cursor: pointer; font-family: 'DM Sans', sans-serif; background: rgba(239,68,68,0.1);
          color: #ef4444; font-weight: 600; transition: all 0.2s;
        }
        .adm-med-delete-btn:hover { background: rgba(239,68,68,0.2); }

        /* List view */
        .adm-med-table { width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; }
        .adm-med-table-wrap { border-radius: 12px; overflow: hidden; }
        .adm-med-table th {
          text-align: left; padding: 14px 16px; font-size: 12px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.6;
        }
        .adm-med-table td { padding: 14px 16px; font-size: 14px; }
        .admin-layout--dark .adm-med-table th { background: #12121a; border-bottom: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-med-table th { background: #f5f5f5; border-bottom: 1px solid #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-med-table td { border-bottom: 1px solid #2a2a32; }
        .admin-layout--light .adm-med-table td { border-bottom: 1px solid #f0f0f0; }
        .admin-layout--dark .adm-med-table tr:hover td { background: rgba(201,169,110,0.03); }
        .admin-layout--light .adm-med-table tr:hover td { background: rgba(0,0,0,0.02); }

        /* Delete confirm overlay */
        .adm-med-confirm-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex;
          align-items: center; justify-content: center; z-index: 1000;
        }
        .adm-med-confirm-box { padding: 28px; border-radius: 16px; max-width: 380px; width: 90%; text-align: center; }
        .adm-med-confirm-box h3 { margin: 0 0 8px; font-size: 18px; font-weight: 700; }
        .adm-med-confirm-box p { font-size: 14px; opacity: 0.7; margin: 0 0 20px; }
        .adm-med-confirm-actions { display: flex; gap: 10px; justify-content: center; }
        .adm-med-confirm-del {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px;
          font-weight: 600; cursor: pointer; background: #ef4444; color: #fff;
          font-family: 'DM Sans', sans-serif;
        }
        .adm-med-confirm-cancel {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px;
          font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .admin-layout--dark .adm-med-confirm-cancel { background: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-med-confirm-cancel { background: #f0f0f0; color: #262626; }

        .adm-med-empty { text-align: center; padding: 60px 20px; opacity: 0.5; font-size: 15px; }
      `}</style>

      {/* Header */}
      <div className="adm-med-header">
        <h1 className="adm-med-gold">Media Library</h1>
      </div>

      {/* Stats bar */}
      <div className="adm-med-stats">
        <div className="adm-med-stat adm-med-card">
          <div className="adm-med-stat-label">Total Files</div>
          <div className="adm-med-stat-value adm-med-gold">{stats.totalFiles}</div>
        </div>
        <div className="adm-med-stat adm-med-card">
          <div className="adm-med-stat-label">Total Size</div>
          <div className="adm-med-stat-value">{stats.totalSize} MB</div>
        </div>
        <div className="adm-med-stat adm-med-card">
          <div className="adm-med-stat-label">Categories</div>
          <div className="adm-med-stat-breakdown">
            {CATEGORIES.map(c => (
              <span key={c}>{c}: <strong>{stats.breakdown[c]}</strong></span>
            ))}
          </div>
        </div>
      </div>

      {/* Upload zone */}
      <div
        className={`adm-med-upload-zone${dragOver ? ' dragover' : ''}`}
        onClick={() => setShowUploadForm(true)}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="adm-med-upload-icon">+</div>
        <div className="adm-med-upload-text">Drop files here or click to browse</div>
        <div className="adm-med-upload-hint">Supports JPG, PNG, WebP up to 10MB</div>
      </div>

      {/* Upload form */}
      {showUploadForm && (
        <div className="adm-med-upload-form adm-med-card">
          <h3>Upload New Media</h3>
          <div className="adm-med-form-row">
            <div className="adm-med-form-group">
              <label>File Name</label>
              <input
                className="adm-med-input"
                type="text"
                placeholder="e.g. paris-sunset.jpg"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div className="adm-med-form-group">
              <label>Category</label>
              <select
                className="adm-med-input"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="adm-med-form-group">
              <label>City</label>
              <select
                className="adm-med-input"
                value={formCity}
                onChange={(e) => setFormCity(e.target.value)}
              >
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="adm-med-form-actions">
            <button className="adm-med-btn adm-med-btn-primary" onClick={handleUpload}>Upload</button>
            <button className="adm-med-btn adm-med-btn-secondary" onClick={() => setShowUploadForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="adm-med-controls">
        <input
          className="adm-med-search adm-med-input"
          type="text"
          placeholder="Search by file name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="adm-med-select adm-med-input"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="adm-med-view-toggle">
          <button
            className={`adm-med-view-btn${viewMode === 'grid' ? ' active' : ''}`}
            onClick={() => setViewMode('grid')}
          >Grid</button>
          <button
            className={`adm-med-view-btn${viewMode === 'list' ? ' active' : ''}`}
            onClick={() => setViewMode('list')}
          >List</button>
        </div>
      </div>

      {/* Content */}
      {filteredMedia.length === 0 ? (
        <div className="adm-med-empty">No media files found.</div>
      ) : viewMode === 'grid' ? (
        <div className="adm-med-grid">
          {filteredMedia.map(item => (
            <div key={item.id} className="adm-med-grid-card adm-med-card">
              <div
                className="adm-med-grid-thumb"
                style={{ background: CATEGORY_GRADIENTS[item.category] || CATEGORY_GRADIENTS.Destinations }}
              >
                {item.category === 'Destinations' ? '\u{1f30d}' : item.category === 'Hotels' ? '\u{1f3e8}' : item.category === 'Attractions' ? '\u{1f3db}' : '\u{1f37d}'}
              </div>
              <div className="adm-med-grid-info">
                <div className="adm-med-grid-name" title={item.name}>{item.name}</div>
                <div className="adm-med-grid-meta">
                  <span className="adm-med-badge">{item.category}</span>
                  <span>{item.size}</span>
                </div>
                <div className="adm-med-grid-meta">
                  <span>{item.city}</span>
                  <span>{item.uploadedAt}</span>
                </div>
                <div className="adm-med-grid-actions">
                  <button className="adm-med-delete-btn" onClick={() => setDeleteConfirmId(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="adm-med-table-wrap adm-med-card">
          <table className="adm-med-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>City</th>
                <th>Size</th>
                <th>Upload Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedia.map(item => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>{item.name}</td>
                  <td><span className="adm-med-badge">{item.category}</span></td>
                  <td>{item.city}</td>
                  <td>{item.size}</td>
                  <td className="adm-med-muted">{item.uploadedAt}</td>
                  <td>
                    <button className="adm-med-delete-btn" onClick={() => setDeleteConfirmId(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirmId && (
        <div className="adm-med-confirm-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div className="adm-med-confirm-box adm-med-card" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Media</h3>
            <p>Are you sure you want to delete this file? This action cannot be undone.</p>
            <div className="adm-med-confirm-actions">
              <button className="adm-med-confirm-del" onClick={() => confirmDelete(deleteConfirmId)}>Delete</button>
              <button className="adm-med-confirm-cancel" onClick={() => setDeleteConfirmId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
