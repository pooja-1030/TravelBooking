import { useState } from 'react'
import { useAdmin } from '../AdminContext'
import { Link } from 'react-router-dom'

export default function ManageAttractions() {
  const { attractions, addAttraction, updateAttraction, deleteAttraction, destinations, adminTheme } = useAdmin()

  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const cities = [...new Set(destinations.map(d => d.name))]

  const emptyForm = { name: '', city: '', description: '', coords: '', status: 'active' }
  const [form, setForm] = useState(emptyForm)

  const filtered = attractions.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
      description: item.description || '',
      coords: item.coords || '',
      status: item.status || 'active',
    })
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.city.trim()) return
    if (editingItem) {
      updateAttraction(editingItem.id, form)
    } else {
      addAttraction(form)
    }
    setShowModal(false)
  }

  const confirmDelete = (item) => {
    setDeleteTarget(item)
    setShowDeleteConfirm(true)
  }

  const handleDelete = () => {
    if (deleteTarget) deleteAttraction(deleteTarget.id)
    setShowDeleteConfirm(false)
    setDeleteTarget(null)
  }

  const truncate = (str, max = 50) => str && str.length > max ? str.slice(0, max) + '...' : str || '—'

  return (
    <div className="adm-att-page">
      <style>{`
        .adm-att-page { padding: 0; min-height: 100%; font-family: 'DM Sans', sans-serif; }

        .admin-layout--dark .adm-att-card { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-att-card { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-att-gold { color: #c9a96e; }
        .admin-layout--light .adm-att-gold { color: #8b6914; }
        .admin-layout--dark .adm-att-title { color: #e0e0e0; }
        .admin-layout--light .adm-att-title { color: #262626; }

        .adm-att-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
        .adm-att-title { font-size: 28px; font-weight: 700; margin: 0; }
        .adm-att-add-btn {
          padding: 10px 22px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; gap: 8px; transition: transform 0.15s, box-shadow 0.15s;
        }
        .adm-att-add-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
        .admin-layout--dark .adm-att-add-btn { background: linear-gradient(135deg, #c9a96e, #a88a4e); color: #1a1a22; }
        .admin-layout--light .adm-att-add-btn { background: linear-gradient(135deg, #8b6914, #6b4f0e); color: #ffffff; }

        .adm-att-toolbar { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .adm-att-search {
          flex: 1; min-width: 220px; padding: 10px 14px; border-radius: 8px; border: 1px solid; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s;
        }
        .admin-layout--dark .adm-att-search { background: #12121a; border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-att-search { background: #faf9f7; border-color: #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-att-search:focus { border-color: #c9a96e; }
        .admin-layout--light .adm-att-search:focus { border-color: #8b6914; }

        .adm-att-card { border-radius: 12px; padding: 0; overflow: hidden; }

        .adm-att-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .adm-att-table th {
          text-align: left; padding: 14px 16px; font-weight: 600; font-size: 12px;
          text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.5; white-space: nowrap;
        }
        .adm-att-table td { padding: 14px 16px; vertical-align: middle; }
        .admin-layout--dark .adm-att-table thead { background: #12121a; }
        .admin-layout--light .adm-att-table thead { background: #faf9f7; }
        .admin-layout--dark .adm-att-table tbody tr { border-top: 1px solid #2a2a32; }
        .admin-layout--light .adm-att-table tbody tr { border-top: 1px solid #e5e5e5; }
        .admin-layout--dark .adm-att-table tbody tr:hover { background: #22222c; }
        .admin-layout--light .adm-att-table tbody tr:hover { background: #faf9f7; }

        .adm-att-badge {
          display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: capitalize;
        }
        .adm-att-desc { font-size: 12px; opacity: 0.7; max-width: 220px; }
        .adm-att-coords { font-size: 11px; font-family: 'DM Sans', monospace; opacity: 0.6; }

        .adm-att-actions-cell { display: flex; gap: 8px; }
        .adm-att-btn-edit, .adm-att-btn-del {
          padding: 6px 14px; border-radius: 6px; border: none; font-size: 12px; font-weight: 600; cursor: pointer; transition: opacity 0.2s;
        }
        .adm-att-btn-edit:hover, .adm-att-btn-del:hover { opacity: 0.8; }
        .admin-layout--dark .adm-att-btn-edit { background: rgba(201,169,110,0.15); color: #c9a96e; }
        .admin-layout--light .adm-att-btn-edit { background: rgba(139,105,20,0.15); color: #8b6914; }
        .admin-layout--dark .adm-att-btn-del { background: rgba(239,68,68,0.15); color: #ef4444; }
        .admin-layout--light .adm-att-btn-del { background: rgba(239,68,68,0.1); color: #dc2626; }

        .adm-att-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .admin-layout--dark .adm-att-overlay { background: rgba(0,0,0,0.6); }
        .admin-layout--light .adm-att-overlay { background: rgba(0,0,0,0.3); }
        .adm-att-modal {
          width: 100%; max-width: 540px; border-radius: 14px; padding: 28px; position: relative;
          max-height: 90vh; overflow-y: auto;
        }
        .admin-layout--dark .adm-att-modal { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-att-modal { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .adm-att-modal-title { font-size: 20px; font-weight: 700; margin: 0 0 20px; }
        .adm-att-field { margin-bottom: 16px; }
        .adm-att-field label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; opacity: 0.7; }
        .adm-att-field input, .adm-att-field select, .adm-att-field textarea {
          width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none; box-sizing: border-box;
        }
        .adm-att-field textarea { resize: vertical; min-height: 80px; }
        .admin-layout--dark .adm-att-field input,
        .admin-layout--dark .adm-att-field select,
        .admin-layout--dark .adm-att-field textarea { background: #12121a; border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-att-field input,
        .admin-layout--light .adm-att-field select,
        .admin-layout--light .adm-att-field textarea { background: #faf9f7; border-color: #e5e5e5; color: #262626; }
        .adm-att-modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
        .adm-att-btn-save {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600; cursor: pointer;
        }
        .admin-layout--dark .adm-att-btn-save { background: linear-gradient(135deg, #c9a96e, #a88a4e); color: #1a1a22; }
        .admin-layout--light .adm-att-btn-save { background: linear-gradient(135deg, #8b6914, #6b4f0e); color: #ffffff; }
        .adm-att-btn-cancel {
          padding: 10px 24px; border-radius: 8px; border: 1px solid; font-size: 14px; font-weight: 600;
          cursor: pointer; background: transparent;
        }
        .admin-layout--dark .adm-att-btn-cancel { border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-att-btn-cancel { border-color: #e5e5e5; color: #262626; }

        .adm-att-confirm {
          width: 100%; max-width: 400px; border-radius: 14px; padding: 28px; text-align: center;
        }
        .admin-layout--dark .adm-att-confirm { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-att-confirm { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .adm-att-confirm h3 { margin: 0 0 12px; font-size: 18px; }
        .adm-att-confirm p { margin: 0 0 24px; opacity: 0.7; font-size: 14px; }
        .adm-att-confirm-actions { display: flex; gap: 12px; justify-content: center; }
        .adm-att-btn-confirm-del {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600;
          cursor: pointer; background: #ef4444; color: #fff;
        }

        .adm-att-empty { text-align: center; padding: 40px; opacity: 0.5; font-size: 14px; }

        @media (max-width: 768px) {
          .adm-att-table { font-size: 12px; }
          .adm-att-table th, .adm-att-table td { padding: 10px 8px; }
        }
      `}</style>

      <div className="adm-att-header">
        <h1 className="adm-att-title">Manage Attractions</h1>
        <button className="adm-att-add-btn" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New
        </button>
      </div>

      <div className="adm-att-toolbar">
        <input
          className="adm-att-search"
          type="text"
          placeholder="Search by name or city..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="adm-att-card" style={{ overflow: 'auto' }}>
        <table className="adm-att-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Description</th>
              <th>Coordinates</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6" className="adm-att-empty">No attractions found.</td></tr>
            ) : filtered.map(a => (
              <tr key={a.id}>
                <td style={{ fontWeight: 600 }}>{a.name}</td>
                <td>{a.city}</td>
                <td><span className="adm-att-desc">{truncate(a.description)}</span></td>
                <td><span className="adm-att-coords">{a.coords || '—'}</span></td>
                <td>
                  <span className="adm-att-badge" style={{
                    background: a.status === 'active' ? '#22c55e22' : '#ef444422',
                    color: a.status === 'active' ? '#22c55e' : '#ef4444',
                  }}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <div className="adm-att-actions-cell">
                    <button className="adm-att-btn-edit" onClick={() => openEdit(a)}>Edit</button>
                    <button className="adm-att-btn-del" onClick={() => confirmDelete(a)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="adm-att-overlay" onClick={() => setShowModal(false)}>
          <div className="adm-att-modal" onClick={e => e.stopPropagation()}>
            <h2 className="adm-att-modal-title">{editingItem ? 'Edit Attraction' : 'Add Attraction'}</h2>
            <div className="adm-att-field">
              <label>Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Eiffel Tower" />
            </div>
            <div className="adm-att-field">
              <label>City</label>
              <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                <option value="">Select city...</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="adm-att-field">
              <label>Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description of the attraction..." />
            </div>
            <div className="adm-att-field">
              <label>Coordinates</label>
              <input type="text" value={form.coords} onChange={e => setForm({ ...form, coords: e.target.value })} placeholder="e.g. 48.8584, 2.2945" />
            </div>
            <div className="adm-att-field">
              <label>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="adm-att-modal-actions">
              <button className="adm-att-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="adm-att-btn-save" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="adm-att-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="adm-att-confirm" onClick={e => e.stopPropagation()}>
            <h3>Delete Attraction</h3>
            <p>Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.</p>
            <div className="adm-att-confirm-actions">
              <button className="adm-att-btn-cancel" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="adm-att-btn-confirm-del" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
