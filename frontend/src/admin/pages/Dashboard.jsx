import { useEffect, useState } from 'react';
import api from '../../services/api';
import '../layouts/AdminLayout.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/settings/dashboard')
      .then((res) => setStats(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-spinner" />;

  const cards = [
    { label: 'Total Help Requests', value: stats?.bookings || 0 },
    { label: 'New Requests', value: stats?.newBookings || 0 },
    { label: 'Contact Messages', value: stats?.messages || 0 },
    { label: 'Unread Messages', value: stats?.unreadMessages || 0 },
    { label: 'Gallery Images', value: stats?.gallery || 0 },
    { label: 'Active Services', value: stats?.services || 0 },
    { label: 'Donations', value: stats?.donations || 0 },
  ];

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>

      <div className="admin-stats">
        {cards.map((c) => (
          <div key={c.label} className="admin-stat">
            <div className="admin-stat__value">{c.value}</div>
            <div className="admin-stat__label">{c.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="admin-card">
          <h3 style={{ marginBottom: 16, color: 'var(--navy)' }}>Recent Help Requests</h3>
          {stats?.recentBookings?.length ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Status</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {stats.recentBookings.map((b) => (
                    <tr key={b._id}>
                      <td>{b.fullName}</td>
                      <td><span className={`admin-badge admin-badge--${b.status.toLowerCase()}`}>{b.status}</span></td>
                      <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="admin-empty">No recent requests</p>
          )}
        </div>

        <div className="admin-card">
          <h3 style={{ marginBottom: 16, color: 'var(--navy)' }}>Recent Messages</h3>
          {stats?.recentContacts?.length ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Subject</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {stats.recentContacts.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{c.subject}</td>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="admin-empty">No recent messages</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
