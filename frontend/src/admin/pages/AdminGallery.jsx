import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import '../layouts/AdminLayout.css';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('general');
  const [editId, setEditId] = useState(null);

  const fetchGallery = () => {
    api.get('/gallery?all=true')
      .then((res) => setImages(res.data.data))
      .catch(() => toast.error('Failed to load gallery'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchGallery(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file && !editId) {
      toast.error('Please select an image');
      return;
    }

    const data = new FormData();
    if (file) data.append('image', file);
    data.append('caption', caption);
    data.append('category', category);
    data.append('isActive', 'true');

    try {
      if (editId) {
        await api.put(`/gallery/${editId}`, data);
        toast.success('Image updated');
      } else {
        await api.post('/gallery', data);
        toast.success('Image uploaded');
      }
      setFile(null);
      setCaption('');
      setEditId(null);
      fetchGallery();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Upload failed';
      toast.error(msg);
    }
  };

  const toggleActive = async (id, isActive) => {
    try {
      await api.patch(`/gallery/${id}`, { isActive: !isActive });
      fetchGallery();
    } catch {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image? It will also be removed from Cloudinary.')) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Deleted');
      fetchGallery();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div className="loading-spinner" />;

  return (
    <div>
      <h1 className="admin-page-title">Gallery</h1>

      <div className="admin-card">
        <h3 style={{ marginBottom: 16 }}>{editId ? 'Edit Image' : 'Upload Image'}</h3>
        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label>Image {editId && '(leave empty to keep current)'}</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="form-group">
            <label>Caption</label>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {['dogs', 'horses', 'cats', 'farm', 'wildlife', 'sanctuary', 'founders', 'landscape', 'general'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">{editId ? 'Update' : 'Upload'}</button>
          {editId && (
            <button type="button" className="btn btn-secondary btn-sm" style={{ marginLeft: 8 }} onClick={() => { setEditId(null); setCaption(''); }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="admin-card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {images.map((img) => (
            <div key={img._id} style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden' }}>
              <img src={img.imageUrl} alt={img.caption} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
              <div style={{ padding: 12 }}>
                <p style={{ fontSize: '0.8125rem', marginBottom: 8 }}>{img.caption || 'No caption'}</p>
                <p style={{ fontSize: '0.75rem', color: '#888' }}>{img.category} • Order: {img.order}</p>
                <div className="admin-actions" style={{ marginTop: 8 }}>
                  <button className="admin-btn admin-btn--edit" onClick={() => { setEditId(img._id); setCaption(img.caption); setCategory(img.category); }}>
                    Edit
                  </button>
                  <button className="admin-btn admin-btn--edit" onClick={() => toggleActive(img._id, img.isActive)}>
                    {img.isActive ? 'Hide' : 'Show'}
                  </button>
                  <button className="admin-btn admin-btn--delete" onClick={() => handleDelete(img._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {images.length === 0 && <p className="admin-empty">No gallery images yet</p>}
      </div>
    </div>
  );
};

export default AdminGallery;
