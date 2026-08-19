import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import api from '../services/api';
import './Contact.css';

const Contact = () => {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    api.get('/settings').then((res) => setSettings(res.data.data)).catch(() => {});
  }, []);

  const contact = settings?.contact || {};

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post('/contact', form);
      setSubmitted(true);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Contact Star Ranch Animal Sanctuary in Concho, Arizona. Joyce & Keith Robinson — (602) 318-0260."
      />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Contact</span>
          <h1>Get in Touch</h1>
        </div>
      </section>

      <section className="section">
        <div className="container contact-page__grid">
          <div className="card contact-page__info">
            <h2>Contact Information</h2>
            <ul>
              <li>
                <MapPin size={22} />
                <div>
                  <strong>{contact.founders || 'Joyce & Keith Robinson'}</strong>
                  <span>{contact.address || '137 CR 8202 N, HC 30 Box 6D'}</span>
                  <span>{contact.city || 'Concho, Arizona 85924'}</span>
                </div>
              </li>
              <li>
                <Phone size={22} />
                <a href={`tel:${contact.phone || '6023180260'}`}>
                  {contact.phone || '(602) 318-0260'}
                </a>
              </li>
              <li>
                <Mail size={22} />
                <a href={`mailto:${contact.email || 'keithsr@starranchanimalsanctuary.com'}`}>
                  {contact.email || 'keithsr@starranchanimalsanctuary.com'}
                </a>
              </li>
            </ul>
          </div>

          <form className="card contact-page__form" onSubmit={handleSubmit} noValidate>
            <h2>Send a Message</h2>
            {submitted && (
              <div className="contact-page__success">
                Thank you! We will get back to you soon.
              </div>
            )}
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              {errors.subject && <span className="form-error">{errors.subject}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
