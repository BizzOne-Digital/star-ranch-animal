import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import '../layouts/AdminLayout.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', icon: 'shelter', isActive: true });
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);

  const fetchServices = () => {
    api.get('/services?all=true')
      .then((res) => setServices(res.data.data))
      .catch(() => toast.error('Failed to load services'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchServices(); }, []);

  const resetForm = () => {
    setForm({ title: '', description: '', icon: 'shelter', isActive: true });
    setEditId(null);
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (image) data.append('image', image);

    try {
      if (editId) {
        await api.put(`/services/${editId}`, data);
        toast.success('Service updated');
      } else {
        await api.post('/services', data);
        toast.success('Service created');
      }
      resetForm();
      fetchServices();
    } catch {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (s) => {
    setEditId(s._id);
    setForm({ title: s.title, description: s.description, icon: s.icon, isActive: s.isActive });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      toast.success('Deleted');
      fetchServices();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div className="loading-spinner" />;

  return (
    <div>
      <h1 className="admin-page-title">Services</h1>

      <div className="admin-card">
        <h3 style={{ marginBottom: 16 }}>{editId ? 'Edit Service' : 'Add Service'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Icon (shelter, food, medical)</label>
            <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
            Active
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="btn btn-primary btn-sm">{editId ? 'Update' : 'Create'}</button>
            {editId && <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Icon</th><th>Active</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  <td>{s.title}</td>
                  <td>{s.icon}</td>
                  <td>{s.isActive ? 'Yes' : 'No'}</td>
                  <td className="admin-actions">
                    <button className="admin-btn admin-btn--edit" onClick={() => handleEdit(s)}>Edit</button>
                    <button className="admin-btn admin-btn--delete" onClick={() => handleDelete(s._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminServices;
