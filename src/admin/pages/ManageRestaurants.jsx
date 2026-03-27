import { useState } from 'react'
import { useAdmin } from '../AdminContext'
import { Link } from 'react-router-dom'

export default function ManageRestaurants() {
  const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant, destinations, adminTheme } = useAdmin()

  const [searchQuery, setSearchQuery] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [cuisineFilter, setCuisineFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const cities = [...new Set(destinations.map(d => d.name))]
  const cuisines = [...new Set(restaurants.map(r => r.cuisine))].sort()

  const emptyForm = { name: '', city: '', cuisine: '', priceRange: '$$', rating: '', status: 'active' }
  const [form, setForm] = useState(emptyForm)

  const filtered = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCity = !cityFilter || r.city === cityFilter
    const matchesCuisine = !cuisineFilter || r.cuisine === cuisineFilter
    return matchesSearch && matchesCity && matchesCuisine
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
      cuisine: item.cuisine || '',
      priceRange: item.priceRange || '$$',
      rating: item.rating || '',
      status: item.status || 'active',
    })
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.city.trim()) return
    const data = { ...form, rating: parseFloat(form.rating) || 0 }
    if (editingItem) {
      updateRestaurant(editingItem.id, data)
    } else {
      addRestaurant(data)
    }
    setShowModal(false)
  }

  const confirmDelete = (item) => {
    setDeleteTarget(item)
    setShowDeleteConfirm(true)
  }

  const handleDelete = () => {
    if (deleteTarget) deleteRestaurant(deleteTarget.id)
    setShowDeleteConfirm(false)
    setDeleteTarget(null)
  }

  const priceColor = (p) => {
    if (p === '$$$$') return '#ef4444'
    if (p === '$$$') return '#f97316'
    if (p === '$$') return '#eab308'
    return '#22c55e'
  }

  return (
    <div className="adm-rst-page">
      <style>{`
        .adm-rst-page { padding: 0; min-height: 100%; font-family: 'DM Sans', sans-serif; }

        .admin-layout--dark .adm-rst-card { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-rst-card { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-rst-gold { color: #c9a96e; }
        .admin-layout--light .adm-rst-gold { color: #8b6914; }
        .admin-layout--dark .adm-rst-title { color: #e0e0e0; }
        .admin-layout--light .adm-rst-title { color: #262626; }

        .adm-rst-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
        .adm-rst-title { font-size: 28px; font-weight: 700; margin: 0; }
        .adm-rst-add-btn {
          padding: 10px 22px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; gap: 8px; transition: transform 0.15s, box-shadow 0.15s;
        }
        .adm-rst-add-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
        .admin-layout--dark .adm-rst-add-btn { background: linear-gradient(135deg, #c9a96e, #a88a4e); color: #1a1a22; }
        .admin-layout--light .adm-rst-add-btn { background: linear-gradient(135deg, #8b6914, #6b4f0e); color: #ffffff; }

        .adm-rst-toolbar { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .adm-rst-search, .adm-rst-filter {
          padding: 10px 14px; border-radius: 8px; border: 1px solid; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s;
        }
        .adm-rst-search { flex: 1; min-width: 200px; }
        .adm-rst-filter { min-width: 150px; }
        .admin-layout--dark .adm-rst-search, .admin-layout--dark .adm-rst-filter { background: #12121a; border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-rst-search, .admin-layout--light .adm-rst-filter { background: #faf9f7; border-color: #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-rst-search:focus, .admin-layout--dark .adm-rst-filter:focus { border-color: #c9a96e; }
        .admin-layout--light .adm-rst-search:focus, .admin-layout--light .adm-rst-filter:focus { border-color: #8b6914; }

        .adm-rst-card { border-radius: 12px; padding: 0; overflow: hidden; }

        .adm-rst-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .adm-rst-table th {
          text-align: left; padding: 14px 16px; font-weight: 600; font-size: 12px;
          text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.5; white-space: nowrap;
        }
        .adm-rst-table td { padding: 14px 16px; vertical-align: middle; }
        .admin-layout--dark .adm-rst-table thead { background: #12121a; }
        .admin-layout--light .adm-rst-table thead { background: #faf9f7; }
        .admin-layout--dark .adm-rst-table tbody tr { border-top: 1px solid #2a2a32; }
        .admin-layout--light .adm-rst-table tbody tr { border-top: 1px solid #e5e5e5; }
        .admin-layout--dark .adm-rst-table tbody tr:hover { background: #22222c; }
        .admin-layout--light .adm-rst-table tbody tr:hover { background: #faf9f7; }

        .adm-rst-badge {
          display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: capitalize;
        }
        .adm-rst-actions-cell { display: flex; gap: 8px; }
        .adm-rst-btn-edit, .adm-rst-btn-del {
          padding: 6px 14px; border-radius: 6px; border: none; font-size: 12px; font-weight: 600; cursor: pointer; transition: opacity 0.2s;
        }
        .adm-rst-btn-edit:hover, .adm-rst-btn-del:hover { opacity: 0.8; }
        .admin-layout--dark .adm-rst-btn-edit { background: rgba(201,169,110,0.15); color: #c9a96e; }
        .admin-layout--light .adm-rst-btn-edit { background: rgba(139,105,20,0.15); color: #8b6914; }
        .admin-layout--dark .adm-rst-btn-del { background: rgba(239,68,68,0.15); color: #ef4444; }
        .admin-layout--light .adm-rst-btn-del { background: rgba(239,68,68,0.1); color: #dc2626; }

        .adm-rst-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .admin-layout--dark .adm-rst-overlay { background: rgba(0,0,0,0.6); }
        .admin-layout--light .adm-rst-overlay { background: rgba(0,0,0,0.3); }
        .adm-rst-modal {
          width: 100%; max-width: 540px; border-radius: 14px; padding: 28px; position: relative;
          max-height: 90vh; overflow-y: auto;
        }
        .admin-layout--dark .adm-rst-modal { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-rst-modal { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .adm-rst-modal-title { font-size: 20px; font-weight: 700; margin: 0 0 20px; }
        .adm-rst-field { margin-bottom: 16px; }
        .adm-rst-field label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; opacity: 0.7; }
        .adm-rst-field input, .adm-rst-field select {
          width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none; box-sizing: border-box;
        }
        .admin-layout--dark .adm-rst-field input, .admin-layout--dark .adm-rst-field select { background: #12121a; border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-rst-field input, .admin-layout--light .adm-rst-field select { background: #faf9f7; border-color: #e5e5e5; color: #262626; }
        .adm-rst-modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
        .adm-rst-btn-save {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600; cursor: pointer;
        }
        .admin-layout--dark .adm-rst-btn-save { background: linear-gradient(135deg, #c9a96e, #a88a4e); color: #1a1a22; }
        .admin-layout--light .adm-rst-btn-save { background: linear-gradient(135deg, #8b6914, #6b4f0e); color: #ffffff; }
        .adm-rst-btn-cancel {
          padding: 10px 24px; border-radius: 8px; border: 1px solid; font-size: 14px; font-weight: 600;
          cursor: pointer; background: transparent;
        }
        .admin-layout--dark .adm-rst-btn-cancel { border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-rst-btn-cancel { border-color: #e5e5e5; color: #262626; }

        .adm-rst-confirm {
          width: 100%; max-width: 400px; border-radius: 14px; padding: 28px; text-align: center;
        }
        .admin-layout--dark .adm-rst-confirm { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-rst-confirm { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .adm-rst-confirm h3 { margin: 0 0 12px; font-size: 18px; }
        .adm-rst-confirm p { margin: 0 0 24px; opacity: 0.7; font-size: 14px; }
        .adm-rst-confirm-actions { display: flex; gap: 12px; justify-content: center; }
        .adm-rst-btn-confirm-del {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600;
          cursor: pointer; background: #ef4444; color: #fff;
        }

        .adm-rst-empty { text-align: center; padding: 40px; opacity: 0.5; font-size: 14px; }

        @media (max-width: 768px) {
          .adm-rst-table { font-size: 12px; }
          .adm-rst-table th, .adm-rst-table td { padding: 10px 8px; }
        }
      `}</style>

      <div className="adm-rst-header">
        <h1 className="adm-rst-title">Manage Restaurants</h1>
        <button className="adm-rst-add-btn" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New
        </button>
      </div>

      <div className="adm-rst-toolbar">
        <input
          className="adm-rst-search"
          type="text"
          placeholder="Search by restaurant name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <select className="adm-rst-filter" value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="adm-rst-filter" value={cuisineFilter} onChange={e => setCuisineFilter(e.target.value)}>
          <option value="">All Cuisines</option>
          {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="adm-rst-card" style={{ overflow: 'auto' }}>
        <table className="adm-rst-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Cuisine</th>
              <th>Price Range</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="7" className="adm-rst-empty">No restaurants found.</td></tr>
            ) : filtered.map(r => (
              <tr key={r.id}>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td>{r.city}</td>
                <td>
                  <span className="adm-rst-badge" style={{
                    background: 'rgba(139,105,20,0.1)',
                    color: adminTheme === 'dark' ? '#c9a96e' : '#8b6914',
                  }}>
                    {r.cuisine}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 700, color: priceColor(r.priceRange) }}>{r.priceRange}</span>
                </td>
                <td>
                  <span className="adm-rst-gold" style={{ fontWeight: 600 }}>
                    {r.rating ? r.rating.toFixed(1) : '—'}
                  </span>
                </td>
                <td>
                  <span className="adm-rst-badge" style={{
                    background: r.status === 'active' ? '#22c55e22' : '#ef444422',
                    color: r.status === 'active' ? '#22c55e' : '#ef4444',
                  }}>
                    {r.status}
                  </span>
                </td>
                <td>
                  <div className="adm-rst-actions-cell">
                    <button className="adm-rst-btn-edit" onClick={() => openEdit(r)}>Edit</button>
                    <button className="adm-rst-btn-del" onClick={() => confirmDelete(r)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="adm-rst-overlay" onClick={() => setShowModal(false)}>
          <div className="adm-rst-modal" onClick={e => e.stopPropagation()}>
            <h2 className="adm-rst-modal-title">{editingItem ? 'Edit Restaurant' : 'Add Restaurant'}</h2>
            <div className="adm-rst-field">
              <label>Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Le Petit Bistro" />
            </div>
            <div className="adm-rst-field">
              <label>City</label>
              <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                <option value="">Select city...</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="adm-rst-field">
              <label>Cuisine</label>
              <input type="text" value={form.cuisine} onChange={e => setForm({ ...form, cuisine: e.target.value })} placeholder="e.g. French, Japanese, Italian" />
            </div>
            <div className="adm-rst-field">
              <label>Price Range</label>
              <select value={form.priceRange} onChange={e => setForm({ ...form, priceRange: e.target.value })}>
                <option value="$">$</option>
                <option value="$$">$$</option>
                <option value="$$$">$$$</option>
                <option value="$$$$">$$$$</option>
              </select>
            </div>
            <div className="adm-rst-field">
              <label>Rating</label>
              <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} placeholder="e.g. 4.5" />
            </div>
            <div className="adm-rst-field">
              <label>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="adm-rst-modal-actions">
              <button className="adm-rst-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="adm-rst-btn-save" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="adm-rst-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="adm-rst-confirm" onClick={e => e.stopPropagation()}>
            <h3>Delete Restaurant</h3>
            <p>Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.</p>
            <div className="adm-rst-confirm-actions">
              <button className="adm-rst-btn-cancel" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="adm-rst-btn-confirm-del" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
