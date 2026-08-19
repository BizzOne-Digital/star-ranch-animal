import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import '../layouts/AdminLayout.css';

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/donations')
      .then((res) => setDonations(res.data.data))
      .catch(() => toast.error('Failed to load donations'))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/donations/${id}`, { status });
      toast.success('Status updated');
      const res = await api.get('/donations');
      setDonations(res.data.data);
    } catch {
      toast.error('Update failed');
    }
  };

  if (loading) return <div className="loading-spinner" />;

  return (
    <div>
      <h1 className="admin-page-title">Donations</h1>

      <div className="admin-card">
        {donations.length === 0 ? (
          <p className="admin-empty">No donations yet</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d._id}>
                    <td>{d.donorName}</td>
                    <td>{d.email || '—'}</td>
                    <td>${d.amount}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${d.status.toLowerCase()}`}>{d.status}</span>
                    </td>
                    <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select
                        value={d.status}
                        onChange={(e) => updateStatus(d._id, e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: '0.8125rem' }}
                      >
                        {['Pending', 'Completed', 'Failed', 'Refunded'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDonations;
