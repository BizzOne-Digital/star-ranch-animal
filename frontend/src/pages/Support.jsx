import { useEffect, useState } from 'react';
import { Heart, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import BannerSection from '../components/BannerSection';
import api from '../services/api';
import { DONATION_AMOUNTS } from '../utils/constants';
import './Support.css';

const Support = () => {
  const [settings, setSettings] = useState(null);
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/settings').then((res) => setSettings(res.data.data)).catch(() => {});
  }, []);

  const donation = settings?.donation || {};

  const handleDonate = async (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount < 1) {
      toast.error('Please enter a valid donation amount');
      return;
    }

    setLoading(true);
    try {
      await api.post('/donations', {
        donorName: donorName || 'Anonymous',
        email,
        amount: finalAmount,
        message,
      });
      toast.success('Thank you! Your donation has been recorded.');
      setDonorName('');
      setEmail('');
      setMessage('');
      setCustomAmount('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Support & Donate"
        description="Support Star Ranch Animal Sanctuary. Your donation helps provide food, shelter, and medical care for animals in need."
      />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Support</span>
          <h1>Help Us Keep Saving Lives</h1>
        </div>
      </section>

      <section className="section">
        <div className="container support-page">
          <div className="card support-donate">
            <Heart size={40} color="#C94343" />
            <h2>{donation.heading || 'Help Us Keep Saving Lives'}</h2>
            <p>
              {donation.subheading ||
                'Your support helps provide food, shelter, medical care, and compassion for animals who need a safe place.'}
            </p>

            <form onSubmit={handleDonate}>
              <div className="support-donate__amounts">
                {DONATION_AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={`support-donate__btn ${amount === a && !customAmount ? 'active' : ''}`}
                    onClick={() => { setAmount(a); setCustomAmount(''); }}
                  >
                    ${a}
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="Custom"
                  className="support-donate__custom"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="donorName">Your Name</label>
                <input id="donorName" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="Optional" />
              </div>
              <div className="form-group">
                <label htmlFor="donorEmail">Email</label>
                <input id="donorEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="For receipt (optional)" />
              </div>
              <div className="form-group">
                <label htmlFor="donorMessage">Message</label>
                <textarea id="donorMessage" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Optional message..." />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                <Lock size={18} />
                {loading ? 'Processing...' : 'Donate Securely'}
              </button>

              <p className="support-donate__note">
                Payment integration (Stripe) can be connected to process secure online payments.
              </p>
            </form>
          </div>

          <div className="card support-donate support-zelle">
            <h2>Donate by Zelle</h2>
            <p>
              Scan the code below in your bank&apos;s app to send a donation directly to
              Star Ranch Animal Sanctuary via Zelle.
            </p>
            <img src="/newqr.jpg" alt="Zelle QR code for Star Ranch Animal Sanctuary" className="support-zelle__qr" />
            <p className="support-zelle__note">
              Prefer to send manually? Download the Zelle app and save{' '}
              <strong>Joyce Robinson, 602-328-6333</strong> as a contact. Your donation and
              receipt will show as Star Ranch Animal Sanctuary.
            </p>
          </div>
        </div>
      </section>

      <BannerSection settings={settings} />
    </>
  );
};

export default Support;
