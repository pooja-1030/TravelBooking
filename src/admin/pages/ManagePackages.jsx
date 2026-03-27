import { useState } from 'react'
import { useAdmin } from '../AdminContext'
import { Link } from 'react-router-dom'

export default function ManagePackages() {
  const { packages, addPackage, updatePackage, deletePackage, destinations } = useAdmin()

  const [search, setSearch] = useState('')
  const [filterDest, setFilterDest] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editingPkg, setEditingPkg] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  /* ── Form state ── */
  const [formName, setFormName] = useState('')
  const [formDest, setFormDest] = useState('')
  const [formDuration, setFormDuration] = useState('')
  const [formPrice, setFormPrice] = useState('')
  const [formIncludes, setFormIncludes] = useState([])
  const [formIncludeInput, setFormIncludeInput] = useState('')
  const [formStatus, setFormStatus] = useState('active')

  const openAdd = () => {
    setEditingPkg(null)
    setFormName('')
    setFormDest(destinations[0]?.name || '')
    setFormDuration('')
    setFormPrice('')
    setFormIncludes([])
    setFormIncludeInput('')
    setFormStatus('active')
    setShowModal(true)
  }

  const openEdit = (pkg) => {
    setEditingPkg(pkg)
    setFormName(pkg.name)
    setFormDest(pkg.destination)
    setFormDuration(pkg.duration)
    setFormPrice(String(pkg.price))
    setFormIncludes([...(pkg.includes || [])])
    setFormIncludeInput('')
    setFormStatus(pkg.status)
    setShowModal(true)
  }

  const handleIncludeKeyDown = (e) => {
    if (e.key === 'Enter' && formIncludeInput.trim()) {
      e.preventDefault()
      if (!formIncludes.includes(formIncludeInput.trim())) {
        setFormIncludes(prev => [...prev, formIncludeInput.trim()])
      }
      setFormIncludeInput('')
    }
  }

  const removeInclude = (item) => {
    setFormIncludes(prev => prev.filter(i => i !== item))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: formName,
      destination: formDest,
      duration: formDuration,
      price: Number(formPrice),
      includes: formIncludes,
      status: formStatus,
      bookings: editingPkg ? editingPkg.bookings : 0,
    }
    if (editingPkg) {
      updatePackage(editingPkg.id, data)
    } else {
      addPackage(data)
    }
    setShowModal(false)
  }

  const handleDelete = () => {
    if (deleteConfirm) {
      deletePackage(deleteConfirm.id)
      setDeleteConfirm(null)
    }
  }

  const formatCurrency = (v) => '$' + Number(v).toLocaleString('en-US')

  /* ── Filtering ── */
  const filtered = packages.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.destination.toLowerCase().includes(search.toLowerCase())) return false
    if (filterDest !== 'All' && p.destination !== filterDest) return false
    if (filterStatus !== 'All' && p.status !== filterStatus) return false
    return true
  })

  const uniqueDests = [...new Set(packages.map(p => p.destination))]

  return (
    <div className="adm-pkg-page">
      <style>{`
        .adm-pkg-page { padding: 0; min-height: 100%; font-family: 'DM Sans', sans-serif; }

        /* ── Theme tokens ── */
        .admin-layout--dark .adm-pkg-page { color: #e0e0e0; }
        .admin-layout--light .adm-pkg-page { color: #262626; }

        .admin-layout--dark .adm-pkg-card { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-pkg-card { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }

        .admin-layout--dark .adm-pkg-gold { color: #c9a96e; }
        .admin-layout--light .adm-pkg-gold { color: #8b6914; }

        .admin-layout--dark .adm-pkg-input {
          background: #12121a; border: 1px solid #2a2a32; color: #e0e0e0;
        }
        .admin-layout--light .adm-pkg-input {
          background: #f9f9f9; border: 1px solid #e5e5e5; color: #262626;
        }

        .admin-layout--dark .adm-pkg-overlay { background: rgba(0,0,0,0.7); }
        .admin-layout--light .adm-pkg-overlay { background: rgba(0,0,0,0.4); }

        .admin-layout--dark .adm-pkg-modal { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-pkg-modal { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }

        /* ── Header ── */
        .adm-pkg-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
        .adm-pkg-header h1 { font-size: 28px; font-weight: 700; margin: 0; }
        .adm-pkg-breadcrumb { font-size: 13px; opacity: 0.6; margin-bottom: 4px; }
        .adm-pkg-breadcrumb a { text-decoration: none; }
        .admin-layout--dark .adm-pkg-breadcrumb a { color: #c9a96e; }
        .admin-layout--light .adm-pkg-breadcrumb a { color: #8b6914; }

        .adm-pkg-add-btn {
          padding: 10px 22px; border: none; border-radius: 8px; font-size: 14px;
          font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity 0.2s;
        }
        .admin-layout--dark .adm-pkg-add-btn { background: #c9a96e; color: #12121a; }
        .admin-layout--light .adm-pkg-add-btn { background: #8b6914; color: #fff; }
        .adm-pkg-add-btn:hover { opacity: 0.85; }

        /* ── Filter bar ── */
        .adm-pkg-filters { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
        .adm-pkg-input {
          padding: 9px 14px; border-radius: 8px; font-size: 14px; outline: none;
          font-family: 'DM Sans', sans-serif; transition: border-color 0.2s;
        }
        .adm-pkg-input:focus { border-color: #c9a96e; }
        .adm-pkg-search { flex: 1; min-width: 200px; }
        .adm-pkg-select { min-width: 140px; cursor: pointer; }

        /* ── Grid ── */
        .adm-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 1100px) { .adm-pkg-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 700px) { .adm-pkg-grid { grid-template-columns: 1fr; } }

        /* ── Package card ── */
        .adm-pkg-card { border-radius: 12px; padding: 22px; transition: box-shadow 0.2s, transform 0.2s; }
        .adm-pkg-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.12); transform: translateY(-2px); }

        .adm-pkg-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .adm-pkg-card-name { font-size: 17px; font-weight: 700; margin: 0 0 4px; }
        .adm-pkg-card-dest { font-size: 13px; opacity: 0.6; }

        .adm-pkg-badge {
          padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .adm-pkg-badge--active { background: rgba(34,197,94,0.15); color: #22c55e; }
        .adm-pkg-badge--inactive { background: rgba(239,68,68,0.15); color: #ef4444; }

        .adm-pkg-price { font-size: 28px; font-weight: 800; margin: 14px 0 6px; }
        .adm-pkg-price-sub { font-size: 12px; opacity: 0.5; font-weight: 400; }

        .adm-pkg-meta { display: flex; gap: 16px; margin-bottom: 14px; font-size: 13px; opacity: 0.7; }

        .adm-pkg-includes { margin: 0 0 16px; padding: 0; list-style: none; }
        .adm-pkg-includes li { font-size: 13px; padding: 3px 0; display: flex; align-items: center; gap: 6px; }
        .adm-pkg-check { width: 16px; height: 16px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; flex-shrink: 0; }
        .admin-layout--dark .adm-pkg-check { background: rgba(201,169,110,0.15); color: #c9a96e; }
        .admin-layout--light .adm-pkg-check { background: rgba(139,105,20,0.15); color: #8b6914; }

        .adm-pkg-card-actions { display: flex; gap: 8px; margin-top: auto; }
        .adm-pkg-btn {
          flex: 1; padding: 8px 0; border: none; border-radius: 6px; font-size: 13px;
          font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity 0.2s;
        }
        .adm-pkg-btn:hover { opacity: 0.8; }
        .adm-pkg-btn--edit { background: rgba(59,130,246,0.15); color: #3b82f6; }
        .adm-pkg-btn--delete { background: rgba(239,68,68,0.15); color: #ef4444; }

        /* ── Modal ── */
        .adm-pkg-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: center;
        }
        .adm-pkg-modal {
          border-radius: 14px; padding: 28px; width: 520px; max-width: 94vw;
          max-height: 90vh; overflow-y: auto; position: relative;
        }
        .adm-pkg-modal h2 { font-size: 20px; font-weight: 700; margin: 0 0 20px; }
        .adm-pkg-form-group { margin-bottom: 16px; }
        .adm-pkg-form-group label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; opacity: 0.8; }
        .adm-pkg-form-group .adm-pkg-input { width: 100%; box-sizing: border-box; }

        .adm-pkg-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
        .adm-pkg-chip {
          display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px;
          border-radius: 20px; font-size: 12px; font-weight: 600;
        }
        .admin-layout--dark .adm-pkg-chip { background: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-pkg-chip { background: #f0f0f0; color: #262626; }
        .adm-pkg-chip-remove {
          background: none; border: none; cursor: pointer; font-size: 14px; line-height: 1;
          padding: 0 0 0 2px; opacity: 0.6; color: inherit;
        }
        .adm-pkg-chip-remove:hover { opacity: 1; }

        .adm-pkg-form-actions { display: flex; gap: 10px; margin-top: 22px; }
        .adm-pkg-form-submit {
          flex: 1; padding: 10px; border: none; border-radius: 8px; font-size: 14px;
          font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .admin-layout--dark .adm-pkg-form-submit { background: #c9a96e; color: #12121a; }
        .admin-layout--light .adm-pkg-form-submit { background: #8b6914; color: #fff; }
        .adm-pkg-form-cancel {
          flex: 1; padding: 10px; border-radius: 8px; font-size: 14px;
          font-weight: 600; cursor: pointer; background: transparent; font-family: 'DM Sans', sans-serif;
        }
        .admin-layout--dark .adm-pkg-form-cancel { border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-pkg-form-cancel { border: 1px solid #e5e5e5; color: #262626; }

        /* ── Delete dialog ── */
        .adm-pkg-delete-modal { text-align: center; }
        .adm-pkg-delete-modal h2 { margin-bottom: 8px; }
        .adm-pkg-delete-modal p { font-size: 14px; opacity: 0.7; margin: 0 0 22px; }
        .adm-pkg-delete-actions { display: flex; gap: 10px; }
        .adm-pkg-delete-confirm {
          flex: 1; padding: 10px; border: none; border-radius: 8px; background: #ef4444; color: #fff;
          font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif;
        }

        .adm-pkg-empty { text-align: center; padding: 60px 20px; opacity: 0.5; font-size: 15px; grid-column: 1 / -1; }
      `}</style>

      <div className="adm-pkg-header">
        <div>
          <div className="adm-pkg-breadcrumb"><Link to="/admin">Dashboard</Link> / Packages</div>
          <h1>Travel Packages</h1>
        </div>
        <button className="adm-pkg-add-btn" onClick={openAdd}>+ Add Package</button>
      </div>

      <div className="adm-pkg-filters">
        <input
          className="adm-pkg-input adm-pkg-search"
          type="text"
          placeholder="Search packages..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="adm-pkg-input adm-pkg-select" value={filterDest} onChange={e => setFilterDest(e.target.value)}>
          <option value="All">All Destinations</option>
          {uniqueDests.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select className="adm-pkg-input adm-pkg-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="adm-pkg-grid">
        {filtered.length === 0 && <div className="adm-pkg-empty">No packages found.</div>}
        {filtered.map(pkg => (
          <div className="adm-pkg-card" key={pkg.id}>
            <div className="adm-pkg-card-top">
              <div>
                <h3 className="adm-pkg-card-name">{pkg.name}</h3>
                <span className="adm-pkg-card-dest">{pkg.destination}</span>
              </div>
              <span className={`adm-pkg-badge adm-pkg-badge--${pkg.status}`}>{pkg.status}</span>
            </div>

            <div className="adm-pkg-price adm-pkg-gold">
              {formatCurrency(pkg.price)}
              <span className="adm-pkg-price-sub"> / person</span>
            </div>

            <div className="adm-pkg-meta">
              <span>{pkg.duration}</span>
              <span>{pkg.bookings} bookings</span>
            </div>

            {pkg.includes && pkg.includes.length > 0 && (
              <ul className="adm-pkg-includes">
                {pkg.includes.map((item, idx) => (
                  <li key={idx}>
                    <span className="adm-pkg-check">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <div className="adm-pkg-card-actions">
              <button className="adm-pkg-btn adm-pkg-btn--edit" onClick={() => openEdit(pkg)}>Edit</button>
              <button className="adm-pkg-btn adm-pkg-btn--delete" onClick={() => setDeleteConfirm(pkg)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="adm-pkg-overlay" onClick={() => setShowModal(false)}>
          <div className="adm-pkg-modal" onClick={e => e.stopPropagation()}>
            <h2>{editingPkg ? 'Edit Package' : 'Add Package'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="adm-pkg-form-group">
                <label>Package Name</label>
                <input className="adm-pkg-input" type="text" value={formName} onChange={e => setFormName(e.target.value)} required placeholder="e.g. Paris Romantic Getaway" />
              </div>
              <div className="adm-pkg-form-group">
                <label>Destination</label>
                <select className="adm-pkg-input" value={formDest} onChange={e => setFormDest(e.target.value)} required>
                  {destinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div className="adm-pkg-form-group">
                <label>Duration</label>
                <input className="adm-pkg-input" type="text" value={formDuration} onChange={e => setFormDuration(e.target.value)} required placeholder="e.g. 5 days" />
              </div>
              <div className="adm-pkg-form-group">
                <label>Price (USD)</label>
                <input className="adm-pkg-input" type="number" min="0" value={formPrice} onChange={e => setFormPrice(e.target.value)} required placeholder="0" />
              </div>
              <div className="adm-pkg-form-group">
                <label>Includes (press Enter to add)</label>
                <input
                  className="adm-pkg-input"
                  type="text"
                  value={formIncludeInput}
                  onChange={e => setFormIncludeInput(e.target.value)}
                  onKeyDown={handleIncludeKeyDown}
                  placeholder="Type item and press Enter"
                />
                <div className="adm-pkg-chips">
                  {formIncludes.map((item, idx) => (
                    <span className="adm-pkg-chip" key={idx}>
                      {item}
                      <button type="button" className="adm-pkg-chip-remove" onClick={() => removeInclude(item)}>&times;</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="adm-pkg-form-group">
                <label>Status</label>
                <select className="adm-pkg-input" value={formStatus} onChange={e => setFormStatus(e.target.value)}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="adm-pkg-form-actions">
                <button type="submit" className="adm-pkg-form-submit">{editingPkg ? 'Update Package' : 'Add Package'}</button>
                <button type="button" className="adm-pkg-form-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation ── */}
      {deleteConfirm && (
        <div className="adm-pkg-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="adm-pkg-modal adm-pkg-delete-modal" onClick={e => e.stopPropagation()}>
            <h2>Delete Package</h2>
            <p>Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This action cannot be undone.</p>
            <div className="adm-pkg-delete-actions">
              <button className="adm-pkg-delete-confirm" onClick={handleDelete}>Delete</button>
              <button className="adm-pkg-form-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
