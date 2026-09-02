import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Lock, MapPin, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { DONATION_AMOUNTS } from '../utils/constants';
import './DonationContact.css';

const DonationContact = ({ settings }) => {
  const contact = settings?.contact || {};
  const donation = settings?.donation || {};
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
      });
      toast.success('Thank you! Your donation has been recorded. Payment integration can be connected.');
      setDonorName('');
      setEmail('');
      setCustomAmount('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section donation-contact">
      <div className="container donation-contact__grid">
        <div className="card donation-card">
          <Heart size={32} color="#C94343" />
          <h2>{donation.heading || 'Help Us Keep Saving Lives'}</h2>
          <p>
            {donation.subheading ||
              'Your support helps provide food, shelter, medical care, and compassion for animals who need a safe place.'}
          </p>

          <form onSubmit={handleDonate}>
            <div className="donation-card__amounts">
              {DONATION_AMOUNTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`donation-card__amount ${amount === a && !customAmount ? 'active' : ''}`}
                  onClick={() => { setAmount(a); setCustomAmount(''); }}
                >
                  ${a}
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom"
                className="donation-card__custom"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                min="1"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email (optional, for receipt)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary donation-card__submit" disabled={loading}>
              <Lock size={18} />
              {loading ? 'Processing...' : 'Donate Securely'}
            </button>
          </form>

          <div className="donation-card__zelle">
            <h3>Or donate by Zelle</h3>
            <img src="/newqr.jpg" alt="Zelle QR code for Star Ranch Animal Sanctuary" />
            <p>
              Save <strong>Joyce Robinson, 602-328-6333</strong> as a Zelle contact.
              Your donation and receipt will show as Star Ranch Animal Sanctuary.
            </p>
          </div>
        </div>

        <div className="card contact-card">
          <h2>Contact Us</h2>
          <ul className="contact-card__list">
            <li>
              <MapPin size={20} />
              <div>
                <strong>{contact.founders || 'Joyce & Keith Robinson'}</strong>
                <span>{contact.address}</span>
                <span>{contact.city}</span>
              </div>
            </li>
            <li>
              <Phone size={20} />
              <a href={`tel:${contact.phone}`}>{contact.phone || '(602) 318-0260'}</a>
            </li>
            <li>
              <Mail size={20} />
              <a href={`mailto:${contact.email}`}>
                {contact.email || 'keithsr@starranchanimalsanctuary.com'}
              </a>
            </li>
          </ul>
          <Link to="/contact" className="btn btn-secondary" style={{ marginTop: 24 }}>
            Send a Message
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonationContact;
