import { useState } from 'react'
import { useAdmin } from '../AdminContext'
import { Link } from 'react-router-dom'

export default function ManageHotels() {
  const { hotels, addHotel, updateHotel, deleteHotel, destinations, adminTheme } = useAdmin()

  const [searchQuery, setSearchQuery] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const cities = [...new Set(destinations.map(d => d.name))]

  const emptyForm = { name: '', city: '', rating: 4, priceRange: '', rooms: '', occupancy: 50, status: 'active' }
  const [form, setForm] = useState(emptyForm)

  const filtered = hotels.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = !cityFilter || h.city === cityFilter
    return matchesSearch && matchesCity
  })

  const openAdd = () => {
    setEditingItem(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setForm({
      name: item.name || '',
      city: item.city || '',
      rating: item.rating || 4,
      priceRange: item.priceRange || '',
      rooms: item.rooms || '',
      occupancy: item.occupancy || 50,
      status: item.status || 'active',
    })
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.city.trim()) return
    const data = { ...form, rating: parseInt(form.rating) || 4, rooms: parseInt(form.rooms) || 0, occupancy: parseInt(form.occupancy) || 0 }
    if (editingItem) {
      updateHotel(editingItem.id, data)
    } else {
      addHotel({ ...data, images: 0 })
    }
    setShowModal(false)
  }

  const confirmDelete = (item) => {
    setDeleteTarget(item)
    setShowDeleteConfirm(true)
  }

  const handleDelete = () => {
    if (deleteTarget) deleteHotel(deleteTarget.id)
    setShowDeleteConfirm(false)
    setDeleteTarget(null)
  }

  const occColor = (val) => val > 70 ? '#22c55e' : val >= 40 ? '#eab308' : '#ef4444'
  const renderStars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n)

  return (
    <div className="adm-htl-page">
      <style>{`
        .adm-htl-page { padding: 0; min-height: 100%; font-family: 'DM Sans', sans-serif; }

        .admin-layout--dark .adm-htl-card { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-htl-card { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-htl-gold { color: #c9a96e; }
        .admin-layout--light .adm-htl-gold { color: #8b6914; }
        .admin-layout--dark .adm-htl-title { color: #e0e0e0; }
        .admin-layout--light .adm-htl-title { color: #262626; }

        .adm-htl-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
        .adm-htl-title { font-size: 28px; font-weight: 700; margin: 0; }
        .adm-htl-add-btn {
          padding: 10px 22px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; gap: 8px; transition: transform 0.15s, box-shadow 0.15s;
        }
        .adm-htl-add-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
        .admin-layout--dark .adm-htl-add-btn { background: linear-gradient(135deg, #c9a96e, #a88a4e); color: #1a1a22; }
        .admin-layout--light .adm-htl-add-btn { background: linear-gradient(135deg, #8b6914, #6b4f0e); color: #ffffff; }

        .adm-htl-toolbar { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .adm-htl-search, .adm-htl-filter {
          padding: 10px 14px; border-radius: 8px; border: 1px solid; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s;
        }
        .adm-htl-search { flex: 1; min-width: 200px; }
        .adm-htl-filter { min-width: 160px; }
        .admin-layout--dark .adm-htl-search, .admin-layout--dark .adm-htl-filter { background: #12121a; border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-htl-search, .admin-layout--light .adm-htl-filter { background: #faf9f7; border-color: #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-htl-search:focus, .admin-layout--dark .adm-htl-filter:focus { border-color: #c9a96e; }
        .admin-layout--light .adm-htl-search:focus, .admin-layout--light .adm-htl-filter:focus { border-color: #8b6914; }

        .adm-htl-card { border-radius: 12px; padding: 0; overflow: hidden; }

        .adm-htl-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .adm-htl-table th {
          text-align: left; padding: 14px 16px; font-weight: 600; font-size: 12px;
          text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.5; white-space: nowrap;
        }
        .adm-htl-table td { padding: 14px 16px; vertical-align: middle; }
        .admin-layout--dark .adm-htl-table thead { background: #12121a; }
        .admin-layout--light .adm-htl-table thead { background: #faf9f7; }
        .admin-layout--dark .adm-htl-table tbody tr { border-top: 1px solid #2a2a32; }
        .admin-layout--light .adm-htl-table tbody tr { border-top: 1px solid #e5e5e5; }
        .admin-layout--dark .adm-htl-table tbody tr:hover { background: #22222c; }
        .admin-layout--light .adm-htl-table tbody tr:hover { background: #faf9f7; }

        .adm-htl-badge {
          display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: capitalize;
        }
        .adm-htl-stars { color: #eab308; font-size: 14px; letter-spacing: 1px; }
        .adm-htl-occ-bar {
          width: 80px; height: 8px; border-radius: 4px; overflow: hidden; display: inline-block; vertical-align: middle; margin-right: 8px;
        }
        .admin-layout--dark .adm-htl-occ-bar { background: #2a2a32; }
        .admin-layout--light .adm-htl-occ-bar { background: #e5e5e5; }
        .adm-htl-occ-fill { height: 100%; border-radius: 4px; transition: width 0.3s; }

        .adm-htl-actions-cell { display: flex; gap: 8px; }
        .adm-htl-btn-edit, .adm-htl-btn-del {
          padding: 6px 14px; border-radius: 6px; border: none; font-size: 12px; font-weight: 600; cursor: pointer; transition: opacity 0.2s;
        }
        .adm-htl-btn-edit:hover, .adm-htl-btn-del:hover { opacity: 0.8; }
        .admin-layout--dark .adm-htl-btn-edit { background: rgba(201,169,110,0.15); color: #c9a96e; }
        .admin-layout--light .adm-htl-btn-edit { background: rgba(139,105,20,0.15); color: #8b6914; }
        .admin-layout--dark .adm-htl-btn-del { background: rgba(239,68,68,0.15); color: #ef4444; }
        .admin-layout--light .adm-htl-btn-del { background: rgba(239,68,68,0.1); color: #dc2626; }

        .adm-htl-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .admin-layout--dark .adm-htl-overlay { background: rgba(0,0,0,0.6); }
        .admin-layout--light .adm-htl-overlay { background: rgba(0,0,0,0.3); }
        .adm-htl-modal {
          width: 100%; max-width: 540px; border-radius: 14px; padding: 28px; position: relative;
          max-height: 90vh; overflow-y: auto;
        }
        .admin-layout--dark .adm-htl-modal { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-htl-modal { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .adm-htl-modal-title { font-size: 20px; font-weight: 700; margin: 0 0 20px; }
        .adm-htl-field { margin-bottom: 16px; }
        .adm-htl-field label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; opacity: 0.7; }
        .adm-htl-field input, .adm-htl-field select {
          width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none; box-sizing: border-box;
        }
        .admin-layout--dark .adm-htl-field input, .admin-layout--dark .adm-htl-field select { background: #12121a; border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-htl-field input, .admin-layout--light .adm-htl-field select { background: #faf9f7; border-color: #e5e5e5; color: #262626; }
        .adm-htl-modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
        .adm-htl-btn-save {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600; cursor: pointer;
        }
        .admin-layout--dark .adm-htl-btn-save { background: linear-gradient(135deg, #c9a96e, #a88a4e); color: #1a1a22; }
        .admin-layout--light .adm-htl-btn-save { background: linear-gradient(135deg, #8b6914, #6b4f0e); color: #ffffff; }
        .adm-htl-btn-cancel {
          padding: 10px 24px; border-radius: 8px; border: 1px solid; font-size: 14px; font-weight: 600;
          cursor: pointer; background: transparent;
        }
        .admin-layout--dark .adm-htl-btn-cancel { border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-htl-btn-cancel { border-color: #e5e5e5; color: #262626; }

        .adm-htl-confirm {
          width: 100%; max-width: 400px; border-radius: 14px; padding: 28px; text-align: center;
        }
        .admin-layout--dark .adm-htl-confirm { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-htl-confirm { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .adm-htl-confirm h3 { margin: 0 0 12px; font-size: 18px; }
        .adm-htl-confirm p { margin: 0 0 24px; opacity: 0.7; font-size: 14px; }
        .adm-htl-confirm-actions { display: flex; gap: 12px; justify-content: center; }
        .adm-htl-btn-confirm-del {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600;
          cursor: pointer; background: #ef4444; color: #fff;
        }

        .adm-htl-empty { text-align: center; padding: 40px; opacity: 0.5; font-size: 14px; }

        @media (max-width: 768px) {
          .adm-htl-table { font-size: 12px; }
          .adm-htl-table th, .adm-htl-table td { padding: 10px 8px; }
        }
      `}</style>

      <div className="adm-htl-header">
        <h1 className="adm-htl-title">Manage Hotels</h1>
        <button className="adm-htl-add-btn" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New
        </button>
      </div>

      <div className="adm-htl-toolbar">
        <input
          className="adm-htl-search"
          type="text"
          placeholder="Search by hotel name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <select className="adm-htl-filter" value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="adm-htl-card" style={{ overflow: 'auto' }}>
        <table className="adm-htl-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Rating</th>
              <th>Price Range</th>
              <th>Rooms</th>
              <th>Occupancy%</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="8" className="adm-htl-empty">No hotels found.</td></tr>
            ) : filtered.map(h => (
              <tr key={h.id}>
                <td style={{ fontWeight: 600 }}>{h.name}</td>
                <td>{h.city}</td>
                <td><span className="adm-htl-stars">{renderStars(h.rating)}</span></td>
                <td>{h.priceRange}</td>
                <td>{h.rooms}</td>
                <td>
                  <div className="adm-htl-occ-bar">
                    <div className="adm-htl-occ-fill" style={{ width: `${h.occupancy}%`, background: occColor(h.occupancy) }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: occColor(h.occupancy) }}>{h.occupancy}%</span>
                </td>
                <td>
                  <span className="adm-htl-badge" style={{
                    background: h.status === 'active' ? '#22c55e22' : '#ef444422',
                    color: h.status === 'active' ? '#22c55e' : '#ef4444',
                  }}>
                    {h.status}
                  </span>
                </td>
                <td>
                  <div className="adm-htl-actions-cell">
                    <button className="adm-htl-btn-edit" onClick={() => openEdit(h)}>Edit</button>
                    <button className="adm-htl-btn-del" onClick={() => confirmDelete(h)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="adm-htl-overlay" onClick={() => setShowModal(false)}>
          <div className="adm-htl-modal" onClick={e => e.stopPropagation()}>
            <h2 className="adm-htl-modal-title">{editingItem ? 'Edit Hotel' : 'Add Hotel'}</h2>
            <div className="adm-htl-field">
              <label>Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Grand Palace Hotel" />
            </div>
            <div className="adm-htl-field">
              <label>City</label>
              <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                <option value="">Select city...</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="adm-htl-field">
              <label>Rating (1-5)</label>
              <input type="number" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} />
            </div>
            <div className="adm-htl-field">
              <label>Price Range</label>
              <input type="text" value={form.priceRange} onChange={e => setForm({ ...form, priceRange: e.target.value })} placeholder="e.g. $200-$500" />
            </div>
            <div className="adm-htl-field">
              <label>Rooms</label>
              <input type="number" min="0" value={form.rooms} onChange={e => setForm({ ...form, rooms: e.target.value })} placeholder="e.g. 120" />
            </div>
            <div className="adm-htl-field">
              <label>Occupancy (0-100%)</label>
              <input type="number" min="0" max="100" value={form.occupancy} onChange={e => setForm({ ...form, occupancy: e.target.value })} />
            </div>
            <div className="adm-htl-field">
              <label>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="adm-htl-modal-actions">
              <button className="adm-htl-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="adm-htl-btn-save" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="adm-htl-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="adm-htl-confirm" onClick={e => e.stopPropagation()}>
            <h3>Delete Hotel</h3>
            <p>Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.</p>
            <div className="adm-htl-confirm-actions">
              <button className="adm-htl-btn-cancel" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="adm-htl-btn-confirm-del" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
