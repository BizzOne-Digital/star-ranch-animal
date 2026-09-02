import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';
import './DonationContact.css';

const DonationContact = ({ settings }) => {
  const contact = settings?.contact || {};
  const donation = settings?.donation || {};

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

          <div className="donation-card__zelle donation-card__zelle--solo">
            <h3>Donate by Zelle</h3>
            <div className="donation-card__zelle-details">
              <strong>Star Ranch Animal Sanctuary</strong>
              <span>(602) 328-6333</span>
              <span>Bus Complete Chk (...2452)</span>
            </div>
            <img src="/newqr.jpg" alt="Zelle QR code for Star Ranch Animal Sanctuary" />
            <p className="donation-card__zelle-logo">Zelle</p>
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
