import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import BannerSection from '../components/BannerSection';
import api from '../services/api';
import './Support.css';

const Support = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get('/settings').then((res) => setSettings(res.data.data)).catch(() => {});
  }, []);

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
          <div className="card support-donate support-zelle">
            <h2>Donate by Zelle</h2>
            <p>
              Scan the code below in your bank&apos;s app to send a donation directly to
              Star Ranch Animal Sanctuary via Zelle.
            </p>
            <div className="support-zelle__details">
              <strong>Star Ranch Animal Sanctuary</strong>
              <span>(602) 328-6333</span>
              <span>Bus Complete Chk (...2452)</span>
            </div>
            <img src="/newqr.jpg" alt="Zelle QR code for Star Ranch Animal Sanctuary" className="support-zelle__qr" />
            <p className="support-zelle__logo">Zelle</p>
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
