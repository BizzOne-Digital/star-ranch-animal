import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import '../layouts/AdminLayout.css';

const SECTIONS = ['hero', 'about', 'banner', 'contact', 'stats', 'donation'];

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    api.get('/settings')
      .then((res) => {
        setSettings(res.data.data);
        setFormData(res.data.data[activeSection] || {});
      })
      .catch(() => toast.error('Failed to load settings'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (settings) setFormData(settings[activeSection] || {});
  }, [activeSection, settings]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = async () => {
    try {
      const res = await api.put('/settings', { section: activeSection, data: formData });
      setSettings(res.data.data);
      toast.success('Settings saved');
    } catch {
      toast.error('Save failed');
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      toast.error('Select an image first');
      return;
    }
    const data = new FormData();
    data.append('image', imageFile);
    data.append('section', activeSection);
    data.append('field', 'image');

    try {
      const res = await api.post('/settings/upload', data);
      setSettings(res.data.data);
      setFormData(res.data.data[activeSection] || {});
      setImageFile(null);
      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed');
    }
  };

  if (loading) return <div className="loading-spinner" />;

  const renderFields = () => {
    const fields = Object.entries(formData).filter(([k]) => !k.includes('publicId') && k !== '_id');
    return fields.map(([key, value]) => {
      if (key === 'imageUrl') return null;
      const isLong = typeof value === 'string' && value.length > 100;
      return (
        <div key={key} className="form-group">
          <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}</label>
          {isLong ? (
            <textarea value={value || ''} onChange={(e) => handleChange(key, e.target.value)} rows={4} />
          ) : (
            <input value={value || ''} onChange={(e) => handleChange(key, e.target.value)} />
          )}
        </div>
      );
    });
  };

  const hasImage = ['hero', 'about', 'banner'].includes(activeSection);

  return (
    <div>
      <h1 className="admin-page-title">Website Content</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {SECTIONS.map((s) => (
          <button
            key={s}
            className={`admin-btn ${activeSection === s ? 'admin-btn--save' : 'admin-btn--edit'}`}
            onClick={() => setActiveSection(s)}
            style={{ textTransform: 'capitalize' }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: 16, textTransform: 'capitalize' }}>{activeSection} Section</h3>

        {hasImage && formData.imageUrl && (
          <img src={formData.imageUrl} alt="" style={{ maxWidth: 300, borderRadius: 8, marginBottom: 16 }} />
        )}

        {renderFields()}

        {hasImage && (
          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
            <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: 8 }} onClick={handleImageUpload}>
              Upload to Cloudinary
            </button>
          </div>
        )}

        <button className="btn btn-primary" onClick={handleSave} style={{ marginTop: 16 }}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
