import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { BOOKING_STATUSES } from '../../utils/constants';
import '../layouts/AdminLayout.css';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchBookings = () => {
    api.get('/bookings')
      .then((res) => setBookings(res.data.data))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      toast.success('Status updated');
      fetchBookings();
      setSelected(null);
    } catch {
      toast.error('Update failed');
    }
  };

  const deleteBooking = async (id) => {
    if (!confirm('Delete this request?')) return;
    try {
      await api.delete(`/bookings/${id}`);
      toast.success('Deleted');
      fetchBookings();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div className="loading-spinner" />;

  return (
    <div>
      <h1 className="admin-page-title">Help Requests</h1>

      <div className="admin-card">
        {bookings.length === 0 ? (
          <p className="admin-empty">No help requests yet</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Animal</th>
                  <th>Assistance</th>
                  <th>Emergency</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.fullName}</td>
                    <td>{b.animalType}{b.animalName ? ` (${b.animalName})` : ''}</td>
                    <td>{b.assistanceType}</td>
                    <td>{b.emergencyStatus}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${b.status.toLowerCase()}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td className="admin-actions">
                      <button className="admin-btn admin-btn--edit" onClick={() => setSelected(b)}>View</button>
                      <button className="admin-btn admin-btn--delete" onClick={() => deleteBooking(b._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="admin-card" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 300, maxWidth: 600, width: '90%', maxHeight: '80vh', overflow: 'auto' }}>
          <h3 style={{ marginBottom: 16 }}>{selected.fullName}&apos;s Request</h3>
          <p><strong>Email:</strong> {selected.email}</p>
          <p><strong>Phone:</strong> {selected.phone}</p>
          <p><strong>Animal:</strong> {selected.animalType} {selected.animalName && `— ${selected.animalName}`}</p>
          <p><strong>Assistance:</strong> {selected.assistanceType}</p>
          <p><strong>Emergency:</strong> {selected.emergencyStatus}</p>
          <p><strong>Contact via:</strong> {selected.preferredContact}</p>
          <p><strong>Description:</strong> {selected.description}</p>
          {selected.photos?.length > 0 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
              {selected.photos.map((p, i) => (
                <img key={i} src={p.imageUrl} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
              ))}
            </div>
          )}
          <div style={{ marginTop: 20 }}>
            <label>Update Status: </label>
            <select
              value={selected.status}
              onChange={(e) => updateStatus(selected._id, e.target.value)}
              style={{ padding: '8px 12px', marginLeft: 8, borderRadius: 6, border: '1px solid #ddd' }}
            >
              {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: 16 }} onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
