import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import '../layouts/AdminLayout.css';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchMessages = () => {
    api.get('/contact')
      .then((res) => setMessages(res.data.data))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id) => {
    try {
      await api.put(`/contact/${id}`, { isRead: true });
      fetchMessages();
    } catch {
      toast.error('Update failed');
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Deleted');
      setSelected(null);
      fetchMessages();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div className="loading-spinner" />;

  return (
    <div>
      <h1 className="admin-page-title">Messages</h1>

      <div className="admin-card">
        {messages.length === 0 ? (
          <p className="admin-empty">No messages yet</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Read</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m._id} style={{ fontWeight: m.isRead ? 'normal' : 600 }}>
                    <td>{m.name}</td>
                    <td>{m.subject}</td>
                    <td>{m.isRead ? 'Yes' : 'No'}</td>
                    <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td className="admin-actions">
                      <button className="admin-btn admin-btn--edit" onClick={() => { setSelected(m); markRead(m._id); }}>View</button>
                      <button className="admin-btn admin-btn--delete" onClick={() => deleteMessage(m._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="admin-card">
          <h3>{selected.subject}</h3>
          <p><strong>From:</strong> {selected.name} ({selected.email})</p>
          {selected.phone && <p><strong>Phone:</strong> {selected.phone}</p>}
          <p style={{ marginTop: 16, lineHeight: 1.7 }}>{selected.message}</p>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: 16 }} onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
