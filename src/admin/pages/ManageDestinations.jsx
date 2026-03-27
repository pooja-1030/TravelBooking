import { useState } from 'react'
import { useAdmin } from '../AdminContext'
import { Link } from 'react-router-dom'

export default function ManageDestinations() {
  const { destinations, addDestination, updateDestination, deleteDestination, adminTheme } = useAdmin()

  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const emptyForm = { name: '', country: '', description: '', bestTime: '', costLevel: 'Medium', rating: '', status: 'active' }
  const [form, setForm] = useState(emptyForm)

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.country.toLowerCase().includes(searchQuery.toLowerCase())
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
      country: item.country || '',
      description: item.description || '',
      bestTime: item.bestTime || '',
      costLevel: item.costLevel || 'Medium',
      rating: item.rating || '',
      status: item.status || 'active',
    })
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.country.trim()) return
    const data = { ...form, rating: parseFloat(form.rating) || 0 }
    if (editingItem) {
      updateDestination(editingItem.id, data)
    } else {
      addDestination({ ...data, images: 0, hotels: 0 })
    }
    setShowModal(false)
  }

  const confirmDelete = (item) => {
    setDeleteTarget(item)
    setShowDeleteConfirm(true)
  }

  const handleDelete = () => {
    if (deleteTarget) deleteDestination(deleteTarget.id)
    setShowDeleteConfirm(false)
    setDeleteTarget(null)
  }

  const costColors = { Low: '#22c55e', Medium: '#eab308', High: '#f97316', 'Very High': '#ef4444' }

  return (
    <div className="adm-dest-page">
      <style>{`
        .adm-dest-page { padding: 0; min-height: 100%; font-family: 'DM Sans', sans-serif; }

        /* Theme tokens */
        .admin-layout--dark .adm-dest-card { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-dest-card { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-dest-gold { color: #c9a96e; }
        .admin-layout--light .adm-dest-gold { color: #8b6914; }
        .admin-layout--dark .adm-dest-title { color: #e0e0e0; }
        .admin-layout--light .adm-dest-title { color: #262626; }

        .adm-dest-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
        .adm-dest-title { font-size: 28px; font-weight: 700; margin: 0; }
        .adm-dest-add-btn {
          padding: 10px 22px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; gap: 8px; transition: transform 0.15s, box-shadow 0.15s;
        }
        .adm-dest-add-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
        .admin-layout--dark .adm-dest-add-btn { background: linear-gradient(135deg, #c9a96e, #a88a4e); color: #1a1a22; }
        .admin-layout--light .adm-dest-add-btn { background: linear-gradient(135deg, #8b6914, #6b4f0e); color: #ffffff; }

        /* Search bar */
        .adm-dest-toolbar { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .adm-dest-search {
          flex: 1; min-width: 220px; padding: 10px 14px; border-radius: 8px; border: 1px solid; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s;
        }
        .admin-layout--dark .adm-dest-search { background: #12121a; border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-dest-search { background: #faf9f7; border-color: #e5e5e5; color: #262626; }
        .admin-layout--dark .adm-dest-search:focus { border-color: #c9a96e; }
        .admin-layout--light .adm-dest-search:focus { border-color: #8b6914; }

        /* Card */
        .adm-dest-card { border-radius: 12px; padding: 0; overflow: hidden; }

        /* Table */
        .adm-dest-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .adm-dest-table th {
          text-align: left; padding: 14px 16px; font-weight: 600; font-size: 12px;
          text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.5; white-space: nowrap;
        }
        .adm-dest-table td { padding: 14px 16px; vertical-align: middle; }
        .admin-layout--dark .adm-dest-table thead { background: #12121a; }
        .admin-layout--light .adm-dest-table thead { background: #faf9f7; }
        .admin-layout--dark .adm-dest-table tbody tr { border-top: 1px solid #2a2a32; }
        .admin-layout--light .adm-dest-table tbody tr { border-top: 1px solid #e5e5e5; }
        .admin-layout--dark .adm-dest-table tbody tr:hover { background: #22222c; }
        .admin-layout--light .adm-dest-table tbody tr:hover { background: #faf9f7; }

        .adm-dest-badge {
          display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: capitalize;
        }
        .adm-dest-actions-cell { display: flex; gap: 8px; }
        .adm-dest-btn-edit, .adm-dest-btn-del {
          padding: 6px 14px; border-radius: 6px; border: none; font-size: 12px; font-weight: 600;
          cursor: pointer; transition: opacity 0.2s;
        }
        .adm-dest-btn-edit:hover, .adm-dest-btn-del:hover { opacity: 0.8; }
        .admin-layout--dark .adm-dest-btn-edit { background: rgba(201,169,110,0.15); color: #c9a96e; }
        .admin-layout--light .adm-dest-btn-edit { background: rgba(139,105,20,0.15); color: #8b6914; }
        .admin-layout--dark .adm-dest-btn-del { background: rgba(239,68,68,0.15); color: #ef4444; }
        .admin-layout--light .adm-dest-btn-del { background: rgba(239,68,68,0.1); color: #dc2626; }

        /* Modal overlay */
        .adm-dest-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .admin-layout--dark .adm-dest-overlay { background: rgba(0,0,0,0.6); }
        .admin-layout--light .adm-dest-overlay { background: rgba(0,0,0,0.3); }
        .adm-dest-modal {
          width: 100%; max-width: 540px; border-radius: 14px; padding: 28px; position: relative;
          max-height: 90vh; overflow-y: auto;
        }
        .admin-layout--dark .adm-dest-modal { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-dest-modal { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .adm-dest-modal-title { font-size: 20px; font-weight: 700; margin: 0 0 20px; }
        .adm-dest-field { margin-bottom: 16px; }
        .adm-dest-field label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; opacity: 0.7; }
        .adm-dest-field input, .adm-dest-field select, .adm-dest-field textarea {
          width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid; font-size: 14px;
          font-family: 'DM Sans', sans-serif; outline: none; box-sizing: border-box;
        }
        .adm-dest-field textarea { resize: vertical; min-height: 80px; }
        .admin-layout--dark .adm-dest-field input,
        .admin-layout--dark .adm-dest-field select,
        .admin-layout--dark .adm-dest-field textarea { background: #12121a; border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-dest-field input,
        .admin-layout--light .adm-dest-field select,
        .admin-layout--light .adm-dest-field textarea { background: #faf9f7; border-color: #e5e5e5; color: #262626; }
        .adm-dest-modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
        .adm-dest-btn-save {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600; cursor: pointer;
        }
        .admin-layout--dark .adm-dest-btn-save { background: linear-gradient(135deg, #c9a96e, #a88a4e); color: #1a1a22; }
        .admin-layout--light .adm-dest-btn-save { background: linear-gradient(135deg, #8b6914, #6b4f0e); color: #ffffff; }
        .adm-dest-btn-cancel {
          padding: 10px 24px; border-radius: 8px; border: 1px solid; font-size: 14px; font-weight: 600;
          cursor: pointer; background: transparent;
        }
        .admin-layout--dark .adm-dest-btn-cancel { border-color: #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-dest-btn-cancel { border-color: #e5e5e5; color: #262626; }

        /* Delete confirm */
        .adm-dest-confirm {
          width: 100%; max-width: 400px; border-radius: 14px; padding: 28px; text-align: center;
        }
        .admin-layout--dark .adm-dest-confirm { background: #1a1a22; border: 1px solid #2a2a32; color: #e0e0e0; }
        .admin-layout--light .adm-dest-confirm { background: #ffffff; border: 1px solid #e5e5e5; color: #262626; }
        .adm-dest-confirm h3 { margin: 0 0 12px; font-size: 18px; }
        .adm-dest-confirm p { margin: 0 0 24px; opacity: 0.7; font-size: 14px; }
        .adm-dest-confirm-actions { display: flex; gap: 12px; justify-content: center; }
        .adm-dest-btn-confirm-del {
          padding: 10px 24px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600;
          cursor: pointer; background: #ef4444; color: #fff;
        }

        .adm-dest-empty { text-align: center; padding: 40px; opacity: 0.5; font-size: 14px; }

        @media (max-width: 768px) {
          .adm-dest-table { font-size: 12px; }
          .adm-dest-table th, .adm-dest-table td { padding: 10px 8px; }
        }
      `}</style>

      <div className="adm-dest-header">
        <h1 className="adm-dest-title">Manage Destinations</h1>
        <button className="adm-dest-add-btn" onClick={openAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New
        </button>
      </div>

      <div className="adm-dest-toolbar">
        <input
          className="adm-dest-search"
          type="text"
          placeholder="Search by name or country..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="adm-dest-card" style={{ overflow: 'auto' }}>
        <table className="adm-dest-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Rating</th>
              <th>Cost Level</th>
              <th>Best Time</th>
              <th>Hotels</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="8" className="adm-dest-empty">No destinations found.</td></tr>
            ) : filtered.map(d => (
              <tr key={d.id}>
                <td style={{ fontWeight: 600 }}>{d.name}</td>
                <td>{d.country}</td>
                <td>
                  <span className="adm-dest-gold" style={{ fontWeight: 600 }}>
                    {d.rating ? d.rating.toFixed(1) : '—'}
                  </span>
                </td>
                <td>
                  <span className="adm-dest-badge" style={{
                    background: `${costColors[d.costLevel] || '#888'}22`,
                    color: costColors[d.costLevel] || '#888',
                  }}>
                    {d.costLevel}
                  </span>
                </td>
                <td style={{ fontSize: 12, opacity: 0.7 }}>{d.bestTime}</td>
                <td>{d.hotels}</td>
                <td>
                  <span className="adm-dest-badge" style={{
                    background: d.status === 'active' ? '#22c55e22' : '#ef444422',
                    color: d.status === 'active' ? '#22c55e' : '#ef4444',
                  }}>
                    {d.status}
                  </span>
                </td>
                <td>
                  <div className="adm-dest-actions-cell">
                    <button className="adm-dest-btn-edit" onClick={() => openEdit(d)}>Edit</button>
                    <button className="adm-dest-btn-del" onClick={() => confirmDelete(d)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="adm-dest-overlay" onClick={() => setShowModal(false)}>
          <div className="adm-dest-modal" onClick={e => e.stopPropagation()}>
            <h2 className="adm-dest-modal-title">{editingItem ? 'Edit Destination' : 'Add Destination'}</h2>
            <div className="adm-dest-field">
              <label>Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Paris" />
            </div>
            <div className="adm-dest-field">
              <label>Country</label>
              <input type="text" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="e.g. France" />
            </div>
            <div className="adm-dest-field">
              <label>Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." />
            </div>
            <div className="adm-dest-field">
              <label>Best Time to Visit</label>
              <input type="text" value={form.bestTime} onChange={e => setForm({ ...form, bestTime: e.target.value })} placeholder="e.g. Apr - Jun" />
            </div>
            <div className="adm-dest-field">
              <label>Cost Level</label>
              <select value={form.costLevel} onChange={e => setForm({ ...form, costLevel: e.target.value })}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
              </select>
            </div>
            <div className="adm-dest-field">
              <label>Rating</label>
              <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} placeholder="e.g. 4.5" />
            </div>
            <div className="adm-dest-field">
              <label>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="adm-dest-modal-actions">
              <button className="adm-dest-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="adm-dest-btn-save" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="adm-dest-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="adm-dest-confirm" onClick={e => e.stopPropagation()}>
            <h3>Delete Destination</h3>
            <p>Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.</p>
            <div className="adm-dest-confirm-actions">
              <button className="adm-dest-btn-cancel" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="adm-dest-btn-confirm-del" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
