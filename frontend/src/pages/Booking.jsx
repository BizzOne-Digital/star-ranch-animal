import { useState } from 'react';
import { PawPrint, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import api from '../services/api';
import {
  ANIMAL_TYPES,
  ASSISTANCE_TYPES,
  EMERGENCY_STATUSES,
  CONTACT_METHODS,
} from '../utils/constants';
import './Booking.css';

const Booking = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    animalType: '',
    animalName: '',
    assistanceType: '',
    emergencyStatus: 'Not Urgent',
    description: '',
    preferredContact: 'Either',
  });
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.animalType) e.animalType = 'Animal type is required';
    if (!form.assistanceType) e.assistanceType = 'Assistance type is required';
    if (!form.description.trim()) e.description = 'Description is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handlePhotos = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, val]) => data.append(key, val));
      photos.forEach((file) => data.append('photos', file));

      await api.post('/bookings', data);

      setSubmitted(true);
      toast.success('Your request has been submitted!');
    } catch {
      toast.error('Failed to submit. Please try again or call us.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <SEO title="Request Submitted" />
        <section className="section booking-success">
          <div className="container" style={{ textAlign: 'center', maxWidth: 600 }}>
            <PawPrint size={64} color="#C94343" style={{ margin: '0 auto 24px' }} />
            <h1>Thank You!</h1>
            <p style={{ margin: '16px 0 32px', lineHeight: 1.7 }}>
              We have received your help request and will review it as soon as possible.
              For emergencies, please call us at (602) 318-0260.
            </p>
            <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ fullName: '', email: '', phone: '', animalType: '', animalName: '', assistanceType: '', emergencyStatus: 'Not Urgent', description: '', preferredContact: 'Either' }); setPhotos([]); }}>
              Submit Another Request
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Request Help"
        description="Request animal assistance from Star Ranch Animal Sanctuary. Shelter, food, medical care, and rescue support."
      />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Get Help</span>
          <h1>Request Animal Assistance</h1>
        </div>
      </section>

      <section className="section">
        <div className="container booking-form-wrap">
          <form className="card booking-form" onSubmit={handleSubmit} noValidate>
            <div className="booking-form__grid">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="animalType">Animal Type *</label>
                <select id="animalType" name="animalType" value={form.animalType} onChange={handleChange}>
                  <option value="">Select type</option>
                  {ANIMAL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.animalType && <span className="form-error">{errors.animalType}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="animalName">Animal Name</label>
                <input id="animalName" name="animalName" value={form.animalName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="assistanceType">Type of Assistance Needed *</label>
                <select id="assistanceType" name="assistanceType" value={form.assistanceType} onChange={handleChange}>
                  <option value="">Select assistance</option>
                  {ASSISTANCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.assistanceType && <span className="form-error">{errors.assistanceType}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="emergencyStatus">Emergency Status</label>
                <select id="emergencyStatus" name="emergencyStatus" value={form.emergencyStatus} onChange={handleChange}>
                  {EMERGENCY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="preferredContact">Preferred Contact Method</label>
                <select id="preferredContact" name="preferredContact" value={form.preferredContact} onChange={handleChange}>
                  {CONTACT_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Tell us about the animal and situation..." />
              {errors.description && <span className="form-error">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="photos"><Upload size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> Upload Animal Photos (optional, max 5)</label>
              <input id="photos" type="file" accept="image/*" multiple onChange={handlePhotos} />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Submitting...' : 'Submit Help Request'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Booking;
