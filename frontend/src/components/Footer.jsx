import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

const Footer = ({ settings }) => {
  const contact = settings?.contact || {};

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo size="sm" variant="light" />
            <p className="footer__tagline">
              Rescue. Shelter. Care. Compassion. Second Chances.
            </p>
          </div>

          <div className="footer__links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/our-story">Our Story</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/booking">Get Help</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/support">Support Our Sanctuary</Link></li>
            </ul>
          </div>

          <div className="footer__contact">
            <h4>Contact Us</h4>
            <ul>
              <li><MapPin size={16} /> {contact.address}, {contact.city}</li>
              <li><Phone size={16} /> <a href={`tel:${contact.phone}`}>{contact.phone}</a></li>
              <li><Mail size={16} /> <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Star Ranch Animal Sanctuary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
